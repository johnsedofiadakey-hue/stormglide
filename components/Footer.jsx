import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-border px-[5vw] pt-14 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 bg-brand-orange"
              style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }} />
            <span className="font-display text-lg tracking-widest font-bold">
              STORM<span className="text-brand-orange">GLIDE</span>
            </span>
          </div>
          <p className="text-slate text-sm leading-relaxed font-body max-w-[260px]">
            Enterprise logistics and supply solutions connecting West Africa to global markets.
            Industrial-grade precision, world-class reliability.
          </p>
        </div>

        {[
          ['Services', [
            ['/#services','LCL Shipping'],['/#services','FCL Shipping'],
            ['/#services','Air Freight'],['/#services','3PL / 4PL'],
            ['/#services','Customs Clearance'],
          ]],
          ['Supply', [
            ['/catalog?cat=chem','Industrial Chemicals'],
            ['/catalog?cat=mach','Heavy Machinery'],
            ['/catalog?cat=veh','Commercial Vehicles'],
            ['/catalog','Full Catalog'],
          ]],
          ['Company', [
            ['/#why','About Us'],['/#industries','Industries'],
            ['/#corridor','Coverage'],['/#contact','Contact Us'],
            ['/admin','Admin Portal'],
          ]],
        ].map(([title, links]) => (
          <div key={title}>
            <h5 className="font-display text-xs tracking-[0.2em] text-brand-orange uppercase font-bold mb-6">
              {title}
            </h5>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}
                    className="text-slate/80 text-sm no-underline hover:text-white hover:translate-x-1 transition-all inline-block font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/50 pt-8 flex flex-wrap justify-between items-center gap-4">
        <p className="text-slate/60 text-xs font-medium">
          © {new Date().getFullYear()} STORMGLIDE Enterprise Systems & Logistics. Designed for Industry.
        </p>
        <div className="flex gap-4">
          {['Freight Forwarder','Customs Cleared','Global Reach'].map(b => (
            <span key={b} className="text-slate/40 text-[9px] tracking-[0.2em] uppercase
              border border-border/30 px-3 py-1.5 font-bold hidden sm:block rounded">
              {b}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
