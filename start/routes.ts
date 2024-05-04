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

router.post('/users', '#controllers/users_controller.index')
router.post('/users/signin', '#controllers/users_controller.signIn')
router.post('/users/login', '#controllers/users_controller.logIn')
router.post('/users/verifytoken', '#controllers/users_controller.verifyToken')
router.post('/users/show', '#controllers/users_controller.show')

router.post('/users/address', '#controllers/addresses_controller.index')
router.post('/users/address/create', '#controllers/addresses_controller.store')
router.post('/users/address/delete', '#controllers/addresses_controller.destroy')
