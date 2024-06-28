/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const ClientsController = () => import('#controllers/clients_controller')
const AdressesController = () => import('#controllers/adresses_controller')
const PhoneNumbersController = () => import('#controllers/phone_numbers_controller')
const ProductsController = () => import('#controllers/products_controller')
const OrdersController = () => import('#controllers/orders_controller')

router
  .group(() => {
    router.post('', [UsersController, 'signup']).use(middleware.user())
    router.post('login', [UsersController, 'login'])
  })
  .prefix('users')

router
  .group(() => {
    router.get('', [ClientsController, 'index'])
    router.get(':id', [ClientsController, 'show']).use(middleware.clients())
    router.post('', [ClientsController, 'store'])
    router.put(':id', [ClientsController, 'update'])
    router.delete(':id', [ClientsController, 'delete'])
  })
  .prefix('clients')
  .use(middleware.verifyToken())

router
  .group(() => {
    router.post('', [AdressesController, 'store'])
    router.put(':id', [AdressesController, 'update'])
    router.delete(':id', [AdressesController, 'delete'])
  })
  .prefix('adresses')
  .use(middleware.verifyToken())

router
  .group(() => {
    router.post('', [PhoneNumbersController, 'store'])
    router.put(':id', [PhoneNumbersController, 'update'])
    router.delete(':id', [PhoneNumbersController, 'delete'])
  })
  .prefix('phone_numbers')
  .use(middleware.verifyToken())

router
  .group(() => {
    router.get('', [ProductsController, 'index'])
    router.get(':id', [ProductsController, 'show'])
    router.post('', [ProductsController, 'store'])
    router.put(':id', [ProductsController, 'update'])
    router.delete(':id', [ProductsController, 'delete'])
    router.post(':id', [ProductsController, 'restore'])
  })
  .prefix('products')
  .use(middleware.verifyToken())

router
  .group(() => {
    router.post('', [OrdersController, 'store']).use(middleware.orders())
  })
  .prefix('orders')
  .use(middleware.verifyToken())
