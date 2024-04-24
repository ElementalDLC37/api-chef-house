import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ response }: HttpContext) {
    let user = await User.all()

    response.json(user)
  }

  async store({ request, response }: HttpContext) {
    let data = request.all()
    let user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    })

    return response.status(200).json({ '200': 'User created!', user })
  }

  async show({ params, request, response }: HttpContext) {
    let { id } = params
    let user = await User.findBy({ id: id })

    return response.json(user)
  }

  async update({}: HttpContext) {}

  async destroy({}: HttpContext) {}
}
