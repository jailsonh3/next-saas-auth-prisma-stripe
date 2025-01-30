import BannerWarning from '@/components/banner-warning'
import PricingCard from '@/components/pricing-card'

export default async function MonthlyBook() {
  return (
    <>
      <h1 className="mb-6 font-bold text-3xl">Livro do Mês</h1>
      <BannerWarning text="Para acessar o livro do mês, você precisa de uma assinatura ativa. Quer tal assinar agora?" />
      <PricingCard />
    </>
  )
}
