import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionsController {
  async index({ auth }: HttpContext) {
    const user = await auth.use('api').authenticate()

    console.log(auth.use('api').user!)

    return { user: 'ok' }
  }

  async store({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return {
      type: 'bearer',
      value: token.value!.release(),
    }
  }
}
