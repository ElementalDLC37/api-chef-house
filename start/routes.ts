/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('/users', UsersController)
router.post('users/login', '#controllers/sessions_controller.store')

router.post('/users/:user_id/address', '#controllers/addresses_controller.index')
