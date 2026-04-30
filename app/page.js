import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import QuoteForm from '@/components/QuoteForm'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-[5vw] pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="StormGlide Logistics" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-3 bg-brand-orange/10 backdrop-blur-md border border-brand-orange/30
            px-4 py-2 mb-8 rounded-full">
            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_rgba(243,146,0,1)]" />
            <span className="text-brand-orange text-[10px] font-bold tracking-[0.2em] uppercase">
              Global Logistics &middot; Accra, Ghana
            </span>
          </div>

          <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] font-black
            uppercase tracking-tighter mb-8 animate-in fade-in slide-in-from-left-8 duration-700">
            MOVING<br />
            <span className="text-brand-orange drop-shadow-2xl">GLOBAL</span><br />
            <span className="text-white/20" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
              COMMERCE
            </span>
          </h1>

          <p className="text-slate text-[clamp(16px,2vw,20px)] max-w-[580px] mb-12 font-medium leading-relaxed
            animate-in fade-in slide-in-from-left-12 duration-1000 delay-200">
            Enterprise-grade freight forwarding and cross-border supply chain solutions. 
            <span className="text-white"> Linking African markets to the world</span> with industrial precision.
          </p>

          <div className="flex gap-6 flex-wrap animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Link href="/catalog" className="btn-brand no-underline">
              Request Quote
            </Link>
            <Link href="#services" className="btn-outline no-underline group">
              Our Services
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Floating element */}
        <div className="absolute bottom-10 right-[5vw] hidden lg:block animate-bounce duration-[3000ms]">
          <div className="glass-panel p-6 flex flex-col gap-2">
            <span className="text-brand-orange text-2xl font-bold">500+</span>
            <span className="text-white text-[10px] uppercase tracking-widest font-bold">Successful Shipments</span>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-navy-2 border-y border-border/50 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/30">
          {[
            ['8+', 'Years Excellence'],
            ['500+', 'Cargo Units'],
            ['12+', 'Direct Corridors'],
            ['3PL', 'End-to-End'],
          ].map(([val, label]) => (
            <div key={label} className="px-8 py-12 text-center group hover:bg-white/5 transition-colors">
              <div className="font-display text-[clamp(2rem,4vw,3.5rem)] text-brand-orange font-black leading-none mb-2
                group-hover:scale-110 transition-transform duration-500">
                {val}
              </div>
              <div className="text-slate text-[10px] tracking-[0.2em] font-bold uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="py-32 px-[5vw] bg-navy relative">
        <div className="flex justify-between items-end flex-wrap gap-12 mb-20">
          <div className="max-w-2xl">
            <p className="section-tag">Core Capabilities</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase font-black leading-[0.95] mb-6">
              Industrial Grade<br /><span className="text-brand-orange">Logistics Services</span>
            </h2>
          </div>
          <p className="text-slate text-lg max-w-[500px] font-medium leading-relaxed">
            Propelling West African trade with seamless consolidation from China and 
            efficient last-mile distribution across the continent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { num: '01', title: 'LCL Shipping', badge: 'Consolidated',
              desc: 'Optimized cargo sharing for small-to-medium imports. Weekly sailings from Guangzhou and Yiwu hubs.',
              tags: ['Guangzhou Hub','Yiwu Hub','Weekly','Shared Containers'] },
            { num: '02', title: 'FCL Shipping', badge: 'Full Cargo',
              desc: 'Dedicated container solutions for high-volume enterprise logistics. Port-to-door management.',
              tags: ['20ft/40ft/45ft','Direct Vessel','Port Handling','Full BL'] },
            { num: '03', title: 'Air Freight', badge: 'Priority',
              desc: 'Time-critical shipping via direct air corridors to Kotoka International. Secure and rapid transit.',
              tags: ['Express','High-Value','Sensitive Cargo','Daily Flights'] },
            { num: '04', title: 'Managed 3PL', badge: 'Integrated',
              desc: 'Full supply chain outsourcing including warehousing, inventory control, and multi-modal distribution.',
              tags: ['Warehousing','Inventory','Customs Brokerage','Reporting'] },
          ].map(s => (
            <div key={s.num} className="glass-panel p-12 relative overflow-hidden group hover:border-brand-orange/50 transition-all duration-500">
              <span className="absolute top-10 right-10 font-display text-[7rem] font-black
                text-white/5 leading-none select-none group-hover:text-brand-orange/10 transition-colors">{s.num}</span>
              
              <div className="relative z-10">
                <span className="inline-block bg-brand-orange/20 text-brand-orange text-[10px] px-3 py-1
                  font-bold tracking-[0.2em] uppercase mb-6 rounded">{s.badge}</span>
                <h3 className="font-display text-3xl uppercase tracking-tighter font-bold mb-4 group-hover:text-brand-orange transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed font-medium mb-8 max-w-[320px]">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest border border-white/10 text-slate/60 px-3 py-1.5
                      group-hover:border-brand-orange/30 group-hover:text-white transition-all">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUPPLY / CATALOG CTA ── */}
      <section id="supply" className="py-32 px-[5vw] bg-navy-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/5 blur-[120px] rounded-full" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div>
            <p className="section-tag">Direct Sourcing</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase font-black
              leading-[0.95] mb-8">
              Reliable <br /><span className="text-brand-orange">Global Procurement</span>
            </h2>
            <p className="text-slate text-lg leading-relaxed font-medium mb-6">
              Bridging the gap between international manufacturers and West African markets. 
              We don't just ship—we source, inspect, and deliver.
            </p>
            <p className="text-slate text-sm leading-relaxed font-medium mb-10 opacity-70">
              Our specialized procurement teams in China and Europe handle the complexities of 
              industrial sourcing, quality assurance, and export compliance so you can focus on growth.
            </p>
            <div className="flex gap-6 flex-wrap items-center">
              <Link href="/catalog" className="btn-brand no-underline">
                Explore Catalog
              </Link>
              <div className="flex items-center gap-3 glass-panel px-5 py-3
                text-white text-xs font-bold tracking-[0.2em] uppercase">
                <span className="text-brand-orange">●</span> Factory Direct
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: '🧪', title: 'Industrial Chemicals',
                desc: 'ISO certified construction and manufacturing inputs.' },
              { icon: '🏗️', title: 'Heavy Machinery',
                desc: 'XCMG & SANY earthmoving and construction fleet.', featured: true },
              { icon: '🚛', title: 'Commercial Fleet',
                desc: 'Heavy-duty tippers and specialized transport vehicles.' },
              { icon: '📦', title: 'Custom Sourcing',
                desc: 'Tailored CapEx procurement for any industry.' },
            ].map(item => (
              <div key={item.title}
                className={`card p-8 group hover:-translate-y-2
                  ${item.featured ? 'border-brand-orange/40 bg-brand-orange/5' : ''}`}>
                <span className="text-4xl block mb-6 group-hover:scale-110 transition-transform">{item.icon}</span>
                <h4 className={`font-display text-base uppercase font-bold tracking-tighter mb-3
                  ${item.featured ? 'text-brand-orange' : 'text-white'}`}>
                  {item.title}
                </h4>
                <p className="text-slate text-[10px] leading-relaxed font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section id="why" className="py-32 px-[5vw] bg-navy relative">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="section-tag justify-center">The StormGlide Edge</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase font-black leading-[0.95] mb-6">
            Engineered for <br /><span className="text-brand-orange">Industrial Growth</span>
          </h2>
          <p className="text-slate text-lg font-medium leading-relaxed">
            We navigate the complexities of international trade so you don't have to. 
            Deep expertise, port mastery, and full-chain visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: '01', title: 'Corridor Mastery',
              body: 'Years of strategic presence in key shipping hubs ensures rapid transit and cost-effective consolidation.',
              points: ['Direct China-Africa corridors','Factory-gate inspections','Customs pre-clearance','Mandarin-fluent support'] },
            { num: '02', title: 'Port Operations',
              body: "Our dedicated on-ground teams at Tema and Takoradi Ports ensure minimal demurrage and maximum speed.",
              points: ['Direct port handling','Duty optimization','Compliance management','Rapid vessel discharge'] },
            { num: '03', title: 'Full Visibility',
              body: 'Advanced reporting and dedicated account management keep you informed at every critical milestone.',
              points: ['Milestone tracking','Daily status updates','Digital document hub','Post-delivery support'] },
          ].map(w => (
            <div key={w.num} className="glass-panel p-10 group hover:border-brand-orange/30 transition-all">
              <span className="font-display text-[4rem] font-black text-brand-orange/10 leading-none block mb-6 group-hover:text-brand-orange/20 transition-colors">
                {w.num}
              </span>
              <h3 className="font-display text-2xl uppercase tracking-tighter font-bold mb-4 group-hover:text-brand-orange transition-colors">
                {w.title}
              </h3>
              <p className="text-slate text-sm leading-relaxed font-medium mb-8 opacity-70">{w.body}</p>
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                {w.points.map(pt => (
                  <li key={pt} className="text-white text-xs flex items-start gap-3 font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mt-1 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="py-32 px-[5vw] bg-navy-2 relative">
        <p className="section-tag">Industries Served</p>
        <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] uppercase font-black leading-[0.95] mb-12">
          Sectors We <span className="text-brand-orange">Empower</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ['Construction','Advanced materials & machinery'],
            ['Manufacturing','Raw inputs & factory systems'],
            ['Retail & FMCG','Bulk supply chain management'],
            ['Mining & Energy','Specialized heavy equipment'],
            ['Agriculture','Industrial irrigation & inputs'],
            ['Healthcare','Medical technology & logistics'],
            ['Infrastructure','Public-sector project supply'],
            ['Wholesale','Large-scale trade distribution'],
          ].map(([name, desc]) => (
            <div key={name} className="glass-panel p-8 hover:bg-brand-orange/5 hover:border-brand-orange/20 transition-all group cursor-default">
              <div className="w-8 h-1 bg-brand-orange mb-6 group-hover:w-16 transition-all duration-500" />
              <div className="font-display text-lg uppercase tracking-tight font-bold mb-2 group-hover:text-brand-orange transition-colors">
                {name}
              </div>
              <div className="text-slate text-[10px] font-bold uppercase tracking-widest opacity-60">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT / QUOTE ── */}
      <section id="contact" className="py-32 px-[5vw] bg-navy relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 font-display text-[30vw] font-black
          text-brand-orange/[0.02] whitespace-nowrap leading-none select-none pointer-events-none
          flex items-center tracking-tighter">
          STORMGLIDE
        </div>
        
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <p className="section-tag">Direct Line</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase font-black
              leading-[0.95] mb-8">
              Command <br /><span className="text-brand-orange">Your Logistics</span>
            </h2>
            <p className="text-slate text-lg leading-relaxed font-medium mb-12 max-w-md">
              Ready to streamline your global procurement? Contact our industrial experts 
              for a comprehensive quote tailored to your operations.
            </p>
            <div className="flex flex-col gap-8">
              {[
                { icon: '📍', label: 'Operations Hub', val: 'Accra Financial District, Ghana' },
                { icon: '📧', label: 'Commercial Desk', val: 'solutions@stormglide.com' },
                { icon: '📱', label: 'Priority Line', val: '+233 (0) XX XXX XXXX' },
              ].map(d => (
                <div key={d.label} className="flex gap-6 items-center group">
                  <div className="w-14 h-14 glass-panel flex items-center
                    justify-center text-2xl group-hover:border-brand-orange/50 transition-all duration-300">
                    {d.icon}
                  </div>
                  <div>
                    <div className="text-brand-orange text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                      {d.label}
                    </div>
                    <div className="text-white text-base font-bold tracking-tight">{d.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-10 relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange" />
            <h3 className="font-display text-2xl uppercase tracking-tighter font-bold mb-8">
              Procurement Request
            </h3>
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
