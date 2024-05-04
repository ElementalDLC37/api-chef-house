import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { HttpContext } from '@adonisjs/core/http'
import { Bouncer } from '@adonisjs/bouncer'
import { DateTime } from 'luxon'

export default class UsersController {
  async index({ auth, response }: HttpContext) {
    await auth.use('api').authenticate()

    const user = await User.all()

    response.json(user)
  }

  async signIn({ request, response }: HttpContext) {
    const data = request.all()

    await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
    })

    const user = await User.verifyCredentials(data.email, data.password)

    const token = await User.accessTokens.create(user)

    return response.status(200).json({
      type: 'Bearer',
      value: token.value!.release(),
    })
  }

  async logIn({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const accessTokens = await User.accessTokens.all(user)

    if (accessTokens.length >= 5) {
      const mostOldToken = accessTokens[accessTokens.length - 1]
      await User.accessTokens.delete(user, mostOldToken.identifier)
    }

    const token = await User.accessTokens.create(user)

    return response.status(200).json({
      type: 'Bearer',
      value: token.value!.release(),
    })
  }

  async logoff({ auth, request, response }: HttpContext) {
    const user = await auth.use('api').authenticate()

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.status(200)
  }

  async verifyToken({ auth, response }: HttpContext) {
    await auth.use('api').authenticate()

    return response.status(200)
  }

  async show({ auth, params, response }: HttpContext) {
    await auth.use('api').authenticate()

    const { id } = params
    const user = await User.findBy({ id: id })

    return response.json(user)
  }

  async update({ auth, request }: HttpContext) {
    const user = await auth.use('api').authenticate()
    const data = request.all()

    await user
      .merge({
        name: data.name,
        email: data.email,
        phone: data.phone,
        updatedAt: DateTime.local(),
      })
      .save()
  }

  async destroy({ auth, request, response }: HttpContext) {
    const user = await auth.use('api').authenticate()

    const { email, password } = request.only(['email', 'password'])

    await User.verifyCredentials(email, password)

    await user.delete()

    return response.status(200).json({ code: 200, text: 'User deleted!' })
  }
}
