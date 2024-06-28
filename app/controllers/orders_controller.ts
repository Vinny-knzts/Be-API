import Client from '#models/client'
import Order from '#models/order'
import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
  async store({ request, response }: HttpContext) {
    const { clientId, productId, quantity } = request.body()

    const client = await Client.find(clientId)

    if (!client) return response.status(404).json({ message: 'Cliente não encontrado' })

    const product = await Product.find(productId)

    if (!product || product.deleted) {
      return response.status(404).json({ message: 'Produto não encontrado' })
    }

    if (product.stock - quantity < 0) {
      return response.status(400).json({ message: 'Produto com estoque insuficiente' })
    }

    const newOrder = await Order.create({
      clientId,
      productId,
      quantity,
      unitPrice: product.price,
      totalPrice: 'R$' + Number(product.price.slice(2)) * quantity,
    })

    product.stock -= quantity

    await product.save()

    return response.status(201).json({ message: 'Venda registrada', data: { newOrder } })
  }
}
