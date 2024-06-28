import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clientId: number

  @column()
  declare productId: number

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @column()
  declare quantity: number

  @column()
  declare unitPrice: string

  @column()
  declare totalPrice: string

  @column.dateTime({ autoCreate: true })
  declare date: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
