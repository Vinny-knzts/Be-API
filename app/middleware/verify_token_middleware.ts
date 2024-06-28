import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class VerifyTokenMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const { authorization } = await request.headers()

    if (!authorization) return response.status(400).json({ message: 'Token não informado' })

    try {
      jwt.verify(authorization, env.get('SECRET'))
    } catch (err) {
      return response.status(401).json({ message: 'Token inválido' })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
