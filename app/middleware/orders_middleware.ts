import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class OrdersMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const { quantity } = request.body()

    if (quantity < 1 || !quantity) {
      return response.status(400).json({ message: 'Quantidade inválida' })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
