import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import env from '#start/env'
import jwt from 'jsonwebtoken'
import User from '#models/user'

export default class UsersController {
  async signup({ request, response }: HttpContext) {
    const { email, password } = request.body()

    const emailUsed = await User.findBy({ email })

    if (emailUsed) return response.status(400).json({ message: 'Email já registrado' })

    const newUser = await User.create({ email, password })

    return response.status(201).json({ message: 'Usuário registrado', data: { newUser } })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.body()
    const user = await User.findBy({ email })

    if (user) {
      const verifyPassword = await hash.verify(user.password, password)
      if (verifyPassword) {
        const token = jwt.sign({ email }, env.get('SECRET'))

        return response.status(200).json({ message: 'Login realizado', data: { token } })
      }

      return response.status(401).json({ message: 'Senha incorreta' })
    }

    return response.status(404).json({ messge: 'Usuário não encontrado' })
  }
}
