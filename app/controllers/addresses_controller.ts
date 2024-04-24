import Address from '#models/address'
import { HttpContext } from '@adonisjs/core/http'

export default class AddressesController {
  async index({ auth, params, response }: HttpContext) {
    await auth.use('api').authenticate()

    const address = await Address.findManyBy({ user_id: params.user_id })

    response.json(address)
  }

  async store({ auth, params, request, response }: HttpContext) {
    await auth.use('api').authenticate()

    const data = request.all()

    const address = await Address.create({
      user_id: params.user_id,
      local_name: data.local_name,
      country: data.country,
      state: data.state,
      city: data.city,
      adress: data.adress,
      number: data.number,
    })

    return response.status(200).json({ '200': 'User created!', address })
  }

  async show({}: HttpContext) {}

  async update({}: HttpContext) {}

  async destroy({}: HttpContext) {}
}
