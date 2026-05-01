import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CertBadge from '@/components/CertBadge'
import QuoteForm from '@/components/QuoteForm'
import { getProduct, products } from '@/lib/data/products'

export async function generateStaticParams() {
  return products.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }) {
  const p = getProduct(params.id)
  if (!p) return {}
  return {
    title: `${p.name} — STORMGLIDE Supply`,
    description: p.description.slice(0, 155),
  }
}

const CAT_ICONS = { chem: '🧪', mach: '⚙️', veh: '🚛' }
const CAT_LABELS = { chem: 'Chemical', mach: 'Machinery', veh: 'Vehicle' }
const AVAIL_COLOR = a =>
  a.toLowerCase().includes('stock') ? 'text-green-400 border-green-400/30 bg-green-900/20'
  : a.toLowerCase().includes('order') ? 'text-amber-400 border-amber-400/30 bg-amber-900/20'
  : 'text-slate border-border bg-navy-3'

export default function ProductDetailPage({ params }) {
  const product = getProduct(params.id)
  if (!product) notFound()

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <>
      <Nav />

      <div className="bg-navy-2 pt-[72px] min-h-screen">

        {/* Breadcrumb */}
        <div className="px-[5vw] py-4 border-b border-border flex items-center gap-2 text-xs text-slate">
          <Link href="/" className="hover:text-white transition-colors no-underline text-slate">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-white transition-colors no-underline text-slate">Catalog</Link>
          <span>/</span>
          <Link href={`/catalog?cat=${product.category}`}
            className="hover:text-white transition-colors no-underline text-slate">
            {CAT_LABELS[product.category]}
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="px-[5vw] py-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,420px] gap-10">

            {/* Left: Product info */}
            <div>
              {/* Header */}
              <div className="bg-navy border border-border p-8 mb-6">
                <div className="flex items-start gap-5 flex-wrap">
                  <div className="w-16 h-16 bg-navy-3 rounded flex items-center justify-center
                    text-4xl flex-shrink-0">
                    {CAT_ICONS[product.category]}
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-1 block">
                      {CAT_LABELS[product.category]}
                    </span>
                    <h1 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] uppercase font-bold
                      leading-tight mb-1">
                      {product.name}
                    </h1>
                    <p className="text-slate text-sm font-light">{product.subtitle}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.certifications.map(c => <CertBadge key={c} cert={c} />)}
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 border rounded text-sm font-medium ${AVAIL_COLOR(product.availability)}`}>
                    {product.availability}
                  </div>
                </div>

                <p className="text-slate text-sm leading-relaxed font-light mt-6 border-t border-border pt-6">
                  {product.description}
                </p>

                {product.qualityNote && (
                  <div className="mt-4 bg-gold/5 border border-gold/20 px-4 py-3">
                    <span className="text-gold text-xs font-semibold tracking-wide uppercase block mb-1">
                      Quality & Equivalence
                    </span>
                    <p className="text-ice text-xs leading-relaxed">{product.qualityNote}</p>
                  </div>
                )}
              </div>

              {/* Technical Specs */}
              <div className="bg-navy border border-border p-8 mb-6">
                <h2 className="font-display text-base uppercase tracking-widest font-semibold mb-5
                  text-slate pb-3 border-b border-border">
                  Technical Specifications
                </h2>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-navy-3/40' : ''}>
                        <td className="py-2.5 px-3 text-slate font-light w-2/5">{key}</td>
                        <td className="py-2.5 px-3 text-white font-medium">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Applications */}
              <div className="bg-navy border border-border p-8 mb-6">
                <h2 className="font-display text-base uppercase tracking-widest font-semibold mb-5
                  text-slate pb-3 border-b border-border">
                  Applications
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {product.applications.map(a => (
                    <span key={a} className="text-xs border border-border text-ice px-3 py-1.5 rounded-sm">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Packaging & Logistics */}
              <div className="bg-navy border border-border p-8">
                <h2 className="font-display text-base uppercase tracking-widest font-semibold mb-5
                  text-slate pb-3 border-b border-border">
                  Supply & Logistics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="text-slate text-xs uppercase tracking-wider font-semibold mb-2">
                      Minimum Order
                    </div>
                    <div className="text-white font-medium">{product.minOrder}</div>
                  </div>
                  <div>
                    <div className="text-slate text-xs uppercase tracking-wider font-semibold mb-2">
                      Origin
                    </div>
                    <div className="text-white font-medium">🇨🇳 {product.origin}</div>
                  </div>
                  <div>
                    <div className="text-slate text-xs uppercase tracking-wider font-semibold mb-2">
                      Packaging Options
                    </div>
                    <div className="flex flex-col gap-1">
                      {product.packagingOptions.map(o => (
                        <span key={o} className="text-ice text-xs">{o}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-slate text-xs leading-relaxed">
                    🚢 STORMGLIDE manages the full import chain: factory procurement → quality check
                    → ocean/air freight → Tema port customs clearance → delivery to your site in Ghana
                    or across West Africa.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Quote form (sticky) */}
            <div className="lg:sticky lg:top-[90px] self-start">
              <div className="bg-navy border border-border p-7">
                <h3 className="font-display text-lg uppercase tracking-wide font-semibold mb-1">
                  Request a Quote
                </h3>
                <p className="text-slate text-xs mb-5">
                  We respond within 24 hours with pricing, availability, and shipping cost to Ghana.
                </p>
                <QuoteForm
                  productName={product.name}
                  productId={product.id}
                  prefillService="product"
                />
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-xl uppercase tracking-wide font-semibold mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map(p => (
                  <Link key={p.id} href={`/catalog/${p.id}`} className="no-underline">
                    <div className="card card-hover p-5 group">
                      <div className="text-2xl mb-3">{CAT_ICONS[p.category]}</div>
                      <h3 className="font-display text-sm uppercase tracking-wide font-semibold
                        mb-1 group-hover:text-gold transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-slate text-xs font-light">{p.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
