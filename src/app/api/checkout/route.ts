import { type NextRequest, NextResponse } from 'next/server'
import Stipe from 'stripe'

export async function POST(request: NextRequest) {
  if (request.method === 'POST') {
    const stripe = new Stipe(process.env.STRIPE_SECRET_KEY ?? '')

    try {
      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
          {
            quantity: 1,
            price: process.env.STRIPE_PRICE_ID,
          },
        ],
        mode: 'subscription',
        payment_method_types: ['card'],
        return_url: `${request.headers.get('origin')}/payment_confirmation?session_id={CHECKOUT_SESSION_ID}`,
      })

      return NextResponse.json({
        id: session.id,
        client_secret: session.client_secret,
      })
    } catch (error) {
      return NextResponse.json(
        { error: 'Erro ao processar o checkout' },
        { status: 400 },
      )
    }
  }
}
