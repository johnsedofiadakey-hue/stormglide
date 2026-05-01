'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-[5vw] h-[72px] flex items-center justify-between transition-all
      ${scrolled ? 'bg-navy/95 backdrop-blur-md border-b border-border' : 'border-b border-transparent'}`}>

      <Link href="/" className="flex items-center gap-3 no-underline group">
        <div className="relative">
          <div className="w-10 h-10 bg-brand-orange group-hover:rotate-12 transition-transform duration-500"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }} />
          <div className="absolute inset-0 bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-col -gap-1">
          <span className="font-display text-xl tracking-tighter font-bold text-white leading-none">
            STORM<span className="text-brand-orange">GLIDE</span>
          </span>
          <span className="text-[10px] tracking-[0.3em] font-bold text-slate uppercase leading-none">
            Logistics
          </span>
        </div>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-10 list-none m-0 p-0">
        {[['/#services','Services'],['/#supply','Supply'],['/#why','Why Us'],
          ['/catalog','Catalog'],['/#contact','Contact']].map(([href, label]) => (
          <li key={href}>
            <Link href={href}
              className="text-slate/80 text-xs font-bold tracking-[0.15em] uppercase no-underline hover:text-brand-orange transition-all duration-300 relative group">
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/catalog" className="hidden md:block btn-brand text-xs py-2.5 px-6 no-underline uppercase tracking-widest">
        Request Quote
      </Link>

      {/* Mobile hamburger */}
      <button className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-0 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span className={`w-6 h-0.5 bg-white block transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-white block transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-white block transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-navy/98 backdrop-blur-xl border-b border-border
          flex flex-col p-8 gap-6 md:hidden animate-in fade-in slide-in-from-top-4">
          {[['/#services','Services'],['/#supply','Supply'],['/#why','Why Us'],
            ['/catalog','Catalog'],['/#contact','Contact']].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              className="text-white text-lg font-display tracking-widest uppercase no-underline hover:text-brand-orange">
              {label}
            </Link>
          ))}
          <Link href="/catalog" className="btn-brand text-sm text-center mt-4 no-underline uppercase tracking-widest"
            onClick={() => setMenuOpen(false)}>
            Request Quote
          </Link>
        </div>
      )}
    </nav>
  )
}
