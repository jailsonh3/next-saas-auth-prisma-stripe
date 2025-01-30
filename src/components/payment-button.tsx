'use client'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { type ReactNode, useCallback } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

type PaymentButtonProps = {
  children: ReactNode
}

export function PaymentButton({ children }: PaymentButtonProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
  )

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => data.client_secret)
  }, [])

  const options = { fetchClientSecret }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">Assinatura Pro</DialogTitle>
        <DialogDescription className="sr-only">
          Você cliqout no button
        </DialogDescription>
        <div id="checkout">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}
