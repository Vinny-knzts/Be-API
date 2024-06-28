import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.query().orderBy('name', 'asc').where({ deleted: false })

    if (products.length === 0) {
      return response.status(404).json({ message: 'Nenhum produto registrado' })
    }

    return response.status(200).json({ data: { products } })
  }

  async show({ params: { id }, response }: HttpContext) {
    const product = await await Product.query().where({ id, deleted: false })

    if (product.length === 0) {
      return response.status(404).json({ message: 'Produto não encontrado' })
    }

    return response.status(200).json({ data: { product } })
  }

  async store({ request, response }: HttpContext) {
    const { name, price, stock } = request.body()

    const newProduct = await Product.create({
      name,
      stock: stock || 0,
      price: 'R$' + price,
      deleted: false,
    })

    return response.status(201).json({ message: 'Produto registrado', data: { newProduct } })
  }

  async update({ params: { id }, request, response }: HttpContext) {
    const { name, stock, price } = request.body()

    const product = await Product.find(id)

    if (!product) return response.status(404).json({ message: 'Cliente não encontrado' })

    if (name) product.name = name
    if (stock) product.stock = stock
    if (price) product.price = 'R$' + price

    await product.save()

    return response.status(201).json({ message: 'Produto editado', data: { product } })
  }

  async delete({ params: { id }, response }: HttpContext) {
    const product = await Product.find(id)

    if (!product) return response.status(404).json({ message: 'Produto não encontrado' })

    product.deleted = true

    await product.save()

    return response.status(200).json({ message: 'Produto deletado' })
  }

  async restore({ params: { id }, response }: HttpContext) {
    const product = await Product.find(id)

    if (!product) return response.status(404).json({ message: 'Produto não encontrado' })

    product.deleted = false

    await product.save()

    return response.status(200).json({ message: 'Produto restaurado' })
  }
}
