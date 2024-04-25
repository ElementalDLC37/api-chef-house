import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionsController {
  async store({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    console.log(email, password)
    const token = await User.accessTokens.create(user)

    return {
      type: 'bearer',
      value: token.value!.release(),
    }
  }
}
