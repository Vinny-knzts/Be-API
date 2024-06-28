import type { HttpContext } from '@adonisjs/core/http'
import PhoneNumber from '#models/phone_number'
import Client from '#models/client'

export default class PhoneNumbersController {
  async store({ request, response }: HttpContext) {
    const { clientId, phoneNumber } = request.body()

    const client = await Client.find(clientId)

    if (!client) return response.status(404).json({ message: 'Cliente não encontrado' })

    const number = await PhoneNumber.findBy({ clientId })

    if (number) {
      return response.status(400).json({ message: 'Cliente já possui um número registrado' })
    }

    const newPhoneNumber = await PhoneNumber.create({ clientId, phoneNumber })

    return response.status(201).json({ message: 'Número registrado', data: { newPhoneNumber } })
  }

  async update({ params: { id }, request, response }: HttpContext) {
    const { phoneNumber } = request.body()

    const number = await PhoneNumber.find(id)

    if (!number) return response.status(404).json({ message: 'Número não encontrado' })

    if (phoneNumber) number.phoneNumber = phoneNumber

    await number.save()

    return response.status(201).json({ message: 'Número editado', data: { number } })
  }

  async delete({ params: { id }, response }: HttpContext) {
    const number = await PhoneNumber.find(id)

    if (!number) return response.status(404).json({ message: 'Número não encontrado' })

    await number.delete()

    return response.status(200).json({ message: 'Número removido', data: { number } })
  }
}
