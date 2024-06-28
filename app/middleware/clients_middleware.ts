import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ClientsMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const { month } = request.qs()

    if (month) {
      if (Number(month) < 1 || Number(month) > 12) {
        return response.status(400).json({ message: 'Mês inválido' })
      }
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
