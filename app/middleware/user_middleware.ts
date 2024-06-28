import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { validate } from 'email-validator'

export default class UserMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const { email } = await request.body()

    if (!validate(email)) return response.status(400).json({ message: 'Formato de email inválido' })

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
