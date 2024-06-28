import Adress from '#models/adress'
import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdressesController {
  async store({ request, response }: HttpContext) {
    const { clientId, cep, bairro, avenida, numero } = request.body()

    const client = await Client.find(clientId)

    if (!client) return response.status(404).json({ message: 'Cliente não encontrado' })

    const adress = await Adress.findBy({ clientId })

    if (adress) {
      return response.status(400).json({ message: 'Cliente já possui um endereço registrado' })
    }

    const newAdress = await Adress.create({ clientId, cep, bairro, avenida, numero })

    return response.status(201).json({ message: 'Endereço registrado', data: { newAdress } })
  }

  async update({ params: { id }, request, response }: HttpContext) {
    const { cep, bairro, avenida, numero } = request.body()

    const adress = await Adress.find(id)

    if (!adress) return response.status(404).json({ message: 'Endereço não encontrado' })

    if (cep) adress.cep = cep
    if (bairro) adress.bairro = bairro
    if (avenida) adress.avenida = avenida
    if (numero) adress.numero = numero

    await adress.save()

    return response.status(201).json({ message: 'Endereço editado', data: { adress } })
  }

  async delete({ params: { id }, response }: HttpContext) {
    const adress = await Adress.find(id)

    if (!adress) return response.status(404).json({ message: 'Endereço não encontrado' })

    await adress.delete()

    return response.status(200).json({ message: 'Endereço removido', data: { adress } })
  }
}
