import { DateTime } from 'luxon'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Adress from '#models/adress'
import PhoneNumber from '#models/phone_number'
import Order from './order.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  @hasOne(() => Adress)
  declare adress: HasOne<typeof Adress>

  @hasOne(() => PhoneNumber)
  declare phoneNumber: HasOne<typeof PhoneNumber>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
