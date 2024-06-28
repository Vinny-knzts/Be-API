import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.query().orderBy('id', 'asc')

    if (clients.length === 0) {
      return response.status(404).json({ message: 'Nenhum cliente registrado' })
    }

    return response.status(200).json({ data: clients })
  }

  async show({ params: { id }, request, response }: HttpContext) {
    const { year, month } = request.qs()
    let from = '1000-01-01'
    let to = '3000-01-01'

    if (year && month) {
      from = `${year}-${month}-01`
      to = month === '12' ? `${Number(year) + 1}-01-01` : `${year}-${Number(month) + 1}-01`
    }

    const client = await Client.query()
      .where({ id })
      .preload('phoneNumber')
      .preload('adress')
      .preload('orders', (ordersQuery) => {
        ordersQuery
          .whereBetween('date', [from, to])
          .orderBy('date', 'desc')
          .preload('product', (productQuery) => {
            productQuery.select('name')
          })
      })

    if (client.length === 0) return response.status(404).json({ message: 'Cliente não encontrado' })

    return response.status(200).json({ data: client })
  }

  async store({ request, response }: HttpContext) {
    const { name, cpf } = request.body()

    const newClient = await Client.create({ name, cpf })

    return response.status(201).json({ message: 'Cliente registrado', data: { newClient } })
  }

  async update({ params: { id }, request, response }: HttpContext) {
    const { name, cpf } = request.body()

    const client = await Client.find(id)

    if (!client) return response.status(404).json({ message: 'Cliente não encontrado' })

    if (name) client.name = name
    if (cpf) client.cpf = cpf

    await client.save()

    return response.status(201).json({ message: 'Cliente editado', data: { client } })
  }

  async delete({ params: { id }, response }: HttpContext) {
    const client = await Client.find(id)

    if (!client) return response.status(404).json({ message: 'Cliente não encontrado' })

    await client.delete()

    return response.status(200).json({ message: 'Cliente removido', data: { client } })
  }
}
