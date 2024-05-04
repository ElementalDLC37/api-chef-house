import Address from '#models/address'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class AddressesController {
  async index({ auth, response }: HttpContext) {
    const user = await auth.use('api').authenticate()

    const addresses = await Address.findManyBy({ user_id: user.id })

    return response.status(200).json(addresses)
  }

  async store({ auth, request, response }: HttpContext) {
    const user = await auth.use('api').authenticate()
    const data = request.all()

    const addresses = await Address.findManyBy({ user_id: user.id })

    if (addresses.length >= 5) {
      return response.status(200).json({ code: 200, text: 'An user can have most 5 addresses!' })
    }

    await Address.create({
      user_id: user.id,
      local_name: data.local_name,
      country: data.country,
      state: data.state,
      city: data.city,
      adress: data.adress,
      number: data.number,
    })

    return response.status(200).json({ code: 200, text: 'Adress created!' })
  }

  async update({ auth, request, response }: HttpContext) {
    const user = await auth.use('api').authenticate()
    const data = request.all()

    const adress = await Address.findOrFail(data.adress_id)
    if (adress.user_id === user.id) {
      await adress
        .merge({
          local_name: data.local_name,
          country: data.country,
          state: data.state,
          city: data.city,
          adress: data.adress,
          number: data.number,
          updatedAt: DateTime.local(),
        })
        .save()
    }
  }

  async destroy({ auth, request, response }: HttpContext) {
    const user = await auth.use('api').authenticate()
    const data = request.all()

    const adress = await Address.findOrFail(data.adress_id)
    if (adress.user_id === user.id) {
      await adress.delete()
    }

    return response.status(200).json({ code: 200, text: 'Adress deleted!' })
  }
}
