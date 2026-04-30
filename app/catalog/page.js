'use client'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { products, CATEGORIES } from '@/lib/data/products'

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')

  useEffect(() => {
    const c = searchParams.get('cat')
    if (c) setCat(c)
  }, [searchParams])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return products.filter(p => {
      const matchCat = cat === 'all' || p.category === cat
      const matchQ = !q || p.name.toLowerCase().includes(q)
                     || p.subtitle.toLowerCase().includes(q)
                     || p.tags.some(t => t.includes(q))
                     || p.description.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [query, cat])

  const counts = useMemo(() => ({
    all: products.length,
    chem: products.filter(p => p.category === 'chem').length,
    mach: products.filter(p => p.category === 'mach').length,
    veh:  products.filter(p => p.category === 'veh').length,
  }), [])

  return (
    <>
      <Nav />

      {/* Header */}
      <div className="bg-navy border-b border-border/50 pt-[72px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/5 blur-[100px] rounded-full" />
        <div className="px-[5vw] py-20 relative z-10">
          <p className="section-tag">Industrial Inventory</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase font-black
            leading-[0.95] mb-6 tracking-tighter">
            PROVEN <br /><span className="text-brand-orange">SUPPLY SOLUTIONS</span>
          </h1>
          <p className="text-slate text-lg font-medium max-w-xl opacity-80 leading-relaxed">
            High-specification industrial inputs, heavy machinery, and specialized vehicles. 
            Vetted for the African industrial landscape.
          </p>
        </div>
      </div>

      <div className="bg-navy-2 min-h-screen px-[5vw] py-16">

        {/* Search + Filter bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="relative flex-1 group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/50 group-focus-within:text-brand-orange transition-colors">🔍</span>
            <input
              className="input-field pl-12 h-14 bg-navy/40 border-white/5 focus:border-brand-orange/50 transition-all text-base"
              placeholder="Search specifications, certifications, products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap items-center">
            {CATEGORIES.map(c => (
              <button key={c.id}
                onClick={() => setCat(c.id)}
                className={`px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] border transition-all rounded-full
                  ${cat === c.id
                    ? 'bg-brand-orange text-white border-brand-orange shadow-[0_0_20px_rgba(243,146,0,0.3)]'
                    : 'bg-navy/40 border-white/10 text-slate hover:text-white hover:border-white/30'
                  }`}>
                {c.label}
                <span className={`ml-2 opacity-50 ${cat === c.id ? 'text-white' : ''}`}>
                  {counts[c.id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/30">
          <p className="text-slate text-[10px] font-bold uppercase tracking-widest">
            Showing {filtered.length} specialized unit{filtered.length !== 1 ? 's' : ''}
            {query && <span className="text-white"> matching "{query}"</span>}
          </p>
          {query && (
            <button className="text-brand-orange text-[10px] font-bold uppercase tracking-widest hover:underline"
              onClick={() => setQuery('')}>
              Reset Search
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="glass-panel text-center py-32">
            <div className="text-6xl mb-8 opacity-20">📦</div>
            <h3 className="font-display text-3xl uppercase tracking-tighter font-black mb-4">No Inventory Match</h3>
            <p className="text-slate text-sm font-medium max-w-md mx-auto mb-8 opacity-70 leading-relaxed">
              We may not have this specific item in our catalog, but we source hundreds of unlisted industrial products daily.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="btn-brand" onClick={() => { setQuery(''); setCat('all') }}>
                Show All Inventory
              </button>
              <a href="/#contact" className="btn-outline">
                Inquire Sourcing
              </a>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-24 glass-panel p-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[100px] rounded-full group-hover:bg-brand-orange/10 transition-all duration-700" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <p className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Can't find your specification?</p>
            <h3 className="font-display text-4xl uppercase tracking-tighter font-black mb-6">
              Bespoke <span className="text-brand-orange">Sourcing Command</span>
            </h3>
            <p className="text-slate text-base font-medium mb-10 opacity-80 leading-relaxed">
              Our procurement infrastructure extends far beyond this catalog. We identify, 
              negotiate, and ship specialized equipment directly from manufacturer gates.
            </p>
            <Link href="/#contact" className="btn-brand no-underline">
              Submit Custom Request
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
