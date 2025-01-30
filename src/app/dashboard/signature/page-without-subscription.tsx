import BannerWarning from '@/components/banner-warning'
import PricingCard from '@/components/pricing-card'

export default async function MySubscription() {
  return (
    <>
      <h1 className="mb-6 font-bold text-3xl">Minha Assinatura</h1>
      <BannerWarning text="Você precisa de uma assinatura ativa. Quer tal assinar agora?" />
      <PricingCard />
    </>
  )
}
