'use server'

import { revalidatePath } from 'next/cache'
import Stripe from 'stripe'

export default async function cancelSubscriptionAction(formData: FormData) {
  const subscriptionId = formData.get('subscriptionId') as string

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '')

  stripe.subscriptions.cancel(subscriptionId)

  return revalidatePath('/dashboard/signature')
}
