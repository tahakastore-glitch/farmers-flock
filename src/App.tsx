import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Brand } from './components/Brand'
import { ContactForm } from './components/ContactForm'
import { ImageFrame } from './components/ImageFrame'
import { ProductCard } from './components/ProductCard'
import { ProductDialog } from './components/ProductDialog'
import { categories, industries, products, solutions, type Product } from './data'
import { Icon } from './Icons'

const navItems = [
  ['Home', '#home'],
  ['Solutions', '#solutions'],
  ['Products', '#products'],
  ['Industries', '#industries'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

const benefits = [
  { title: 'Find with less friction', body: 'A considered catalog makes categories and sample listings easier to browse.', mark: '01' },
  { title: 'Ask a clearer question', body: 'Product-level inquiry paths help buyers share the context suppliers need.', mark: '02' },
  { title: 'Built for business buyers', body: 'Poultry, pharmacy, feed and livestock needs each get a relevant starting point.', mark: '03' },
  { title: 'Ready for your next step', body: 'A clear digital foundation can grow with a real supplier’s verified content.', mark: '04' },
]

function SectionHeading({ label, title, body, light = false }: { label: string; title: ReactNode; body?: string; light?: boolean }) {
  return (
    <div className={`section-heading${light ? ' section-heading-light' : ''}`}>
      <span className="eyebrow"><span className="eyebrow-rule" />{label}</span>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<string>('All products')
  const [search, setSearch] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)

  const visibleProducts = useMemo(() => {
    const normalized = search.trim().toLocaleLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'All products' || product.category === category
      const matchesSearch = !normalized || `${product.name} ${product.category} ${product.summary}`.toLocaleLowerCase().includes(normalized)
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  const closeProduct = useCallback(() => setSelectedProduct(null), [])

  useEffect(() => {
    function onScroll() { setShowBackToTop(window.scrollY > 680) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onSearchShortcut(event: KeyboardEvent) {
      if (event.key !== '/' || event.altKey || event.ctrlKey || event.metaKey || menuOpen || document.body.classList.contains('dialog-open')) return
      const target = event.target
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return
      const searchField = document.getElementById('product-search')
      if (!searchField) return
      event.preventDefault()
      searchField.focus()
    }
    window.addEventListener('keydown', onSearchShortcut)
    return () => window.removeEventListener('keydown', onSearchShortcut)
  }, [menuOpen])

  function goToInquiry(message: string) {
    setContactMessage(message)
    setSelectedProduct(null)
    setMenuOpen(false)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    window.setTimeout(() => document.getElementById('message')?.focus({ preventScroll: true }), 650)
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement"><span className="announcement-dot" /> A digital showcase concept for Pakistan’s veterinary &amp; poultry sector <a href="#about">Meet FARMORA <Icon name="arrow" size={13} /></a></div>
      <header className="site-header">
        <div className="header-inner shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <a className="button button-small header-cta" href="#contact">Request a quote <Icon name="arrow" size={15} /></a>
          <button className="mobile-menu-toggle icon-button" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
        <nav className={`mobile-nav${menuOpen ? ' mobile-nav-open' : ''}`} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
          {navItems.map(([label, href]) => <a key={href} href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>{label}<Icon name="arrow" size={16} /></a>)}
          <a className="button button-primary mobile-nav-cta" href="#contact" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>Request a quote <Icon name="arrow" size={16} /></a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero shell" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-line" /> Veterinary &amp; Poultry Solutions <span className="kicker-region">PAKISTAN</span></div>
            <h1 id="hero-title">Smarter Solutions for <em>Healthier Farms.</em></h1>
            <p className="hero-lede">A clearer way to discover animal-care essentials, explore supplier categories and start the right conversation for your business.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#products">Explore products <Icon name="arrow" size={17} /></a>
              <a className="button button-outline" href="#contact"><Icon name="message" size={17} /> Talk to our team</a>
            </div>
            <div className="hero-footnote"><Icon name="leaf" size={17} /><span>Thoughtful sourcing starts with a better conversation.</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-wrap">
              <ImageFrame src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1500&q=88" alt="A flock of chickens in natural farm light" className="hero-photo" eager />
              <div className="hero-image-shade" />
              <div className="hero-image-label"><span className="label-mark"><Icon name="leaf" size={18} /></span><span><small>BETTER CARE, BY DESIGN</small><strong>For every kind of farm.</strong></span></div>
              <div className="hero-image-count"><span>01</span><i /> 04</div>
            </div>
            <div className="hero-stamp"><span>F</span><small>BETTER<br />CARE</small></div>
            <div className="hero-side-note">HEALTHIER OPERATIONS, ONE CONVERSATION AT A TIME</div>
          </div>
          <div className="hero-bottom-rule"><span>SCROLL TO EXPLORE</span><i /><span>01 — 06</span></div>
        </section>

        <section className="approach-strip" aria-label="Our approach">
          <div className="shell approach-inner">
            <span className="approach-intro">A more considered way to buy</span>
            <div className="approach-step"><span>01</span><strong>Browse by need</strong></div>
            <div className="approach-step"><span>02</span><strong>Explore the range</strong></div>
            <div className="approach-step"><span>03</span><strong>Talk to a supplier</strong></div>
            <span className="approach-leaf"><Icon name="leaf" size={21} /></span>
          </div>
        </section>

        <section className="solutions-section section-pad shell" id="solutions">
          <div className="section-head-row">
            <SectionHeading label="What we bring together" title={<>Support for every<br /><em>side of the farm.</em></>} body="Four thoughtful starting points for buyers across the animal-care supply chain." />
            <a href="#contact" className="text-link section-side-link">Discuss your business <Icon name="arrow" size={17} /></a>
          </div>
          <div className="solution-grid">
            {solutions.map((solution) => (
              <article className="solution-card" key={solution.number}>
                <a className="solution-image" href={solution.anchor} aria-label={`Explore ${solution.title}`}>
                  <ImageFrame src={solution.image} alt={solution.alt} />
                  <span className="solution-number">{solution.number}</span>
                  <span className="solution-arrow"><Icon name="arrow" size={18} /></span>
                </a>
                <div className="solution-copy"><h3>{solution.title}</h3><p>{solution.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="catalog-section section-pad" id="products">
          <div className="shell">
            <div className="catalog-topline"><span className="eyebrow"><span className="eyebrow-rule" />The FARMORA catalog</span><span className="catalog-note">A SAMPLE RANGE, CREATED FOR THIS DEMO</span></div>
            <div className="section-head-row catalog-heading-row">
              <SectionHeading label="Explore products" title={<>Find your next<br /><em>point of discovery.</em></>} body="Search sample listings by name or browse by category. Every item here is fictional and illustrative." />
              <label className="search-box"><Icon name="search" size={19} /><span className="sr-only">Search products</span><input id="product-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the catalog" type="search" />{search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search"><Icon name="close" size={17} /></button>}<kbd>/</kbd></label>
            </div>
            <div className="catalog-toolbar">
              <div className="filter-list" aria-label="Filter products by category" role="group">
                {categories.map((item) => <button type="button" className={`filter-chip${category === item ? ' filter-chip-active' : ''}`} key={item} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}<span>{item === 'All products' ? products.length : products.filter((product) => product.category === item).length}</span></button>)}
              </div>
              <span className="result-count" aria-live="polite">Showing {visibleProducts.length} {visibleProducts.length === 1 ? 'item' : 'items'}</span>
            </div>
            {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} onInquire={(item) => goToInquiry(`Product inquiry: ${item.name} — ${item.category}. Please share verified availability and product details.`)} />)}</div> : (
              <div className="empty-state"><span className="empty-icon"><Icon name="search" size={23} /></span><h3>No matches this time.</h3><p>Try another product name or choose a different category.</p><button className="text-link" type="button" onClick={() => { setSearch(''); setCategory('All products') }}>Clear search &amp; filters <Icon name="arrow" size={16} /></button></div>
            )}
            <div className="catalog-disclaimer"><Icon name="spark" size={16} /><p>All product names and descriptions are fictional showcase examples. For product-specific guidance, ask a qualified supplier or veterinarian.</p></div>
          </div>
        </section>

        <section className="industries-section section-pad shell" id="industries">
          <div className="industries-image-block">
            <ImageFrame src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=86" alt="Cattle in a pasture under a calm open sky" />
            <div className="image-caption"><span>MADE TO SUPPORT</span><strong>Better conversations<br />across the supply chain.</strong></div>
          </div>
          <div className="industries-copy">
            <SectionHeading label="Who it's for" title={<>Business support,<br /><em>by industry.</em></>} body="A digital catalog gives different buyers a clear path to the supplier details they need." />
            <div className="industry-list">
              {industries.map((industry, index) => (
                <a className="industry-row" href="#contact" key={industry.title}>
                  <span className="industry-icon"><Icon name={industry.icon as 'flock' | 'pharmacy' | 'feed' | 'herd'} size={21} /></span>
                  <span className="industry-text"><strong>{industry.title}</strong><small>{industry.body}</small></span>
                  <span className="industry-index">0{index + 1}</span><Icon name="arrow" className="industry-arrow" size={17} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="benefits-section section-pad">
          <div className="shell">
            <div className="benefits-heading"><SectionHeading label="The FARMORA approach" title={<>Good digital experiences<br /><em>make work feel clearer.</em></>} body="A fictional concept shaped around the everyday needs of farm-focused businesses." /><span className="benefit-seal"><Icon name="leaf" size={26} /><small>BETTER CARE<br />STRONGER FARMS</small></span></div>
            <div className="benefit-grid">
              {benefits.map((benefit) => <article className="benefit-item" key={benefit.mark}><span>{benefit.mark}</span><h3>{benefit.title}</h3><p>{benefit.body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="catalog-cta-section shell" aria-labelledby="catalog-cta-title">
          <div className="catalog-cta-ornament"><Icon name="leaf" size={40} /></div>
          <div><span className="eyebrow eyebrow-light"><span className="eyebrow-rule" />Start a conversation</span><h2 id="catalog-cta-title">A better catalog starts<br />with <em>the right questions.</em></h2><p>Request a conversation about product range, wholesale needs or the kind of catalog your business could use.</p></div>
          <div className="catalog-cta-actions"><button className="button button-cream" type="button" onClick={() => goToInquiry('Catalog request: Please share details about the product range and catalog format.')}>Request a catalog outline <Icon name="arrow" size={17} /></button><a className="cta-secondary-link" href="#products">Explore the sample range <Icon name="arrow" size={15} /></a></div>
          <div className="cta-watermark">F</div>
        </section>

        <section className="about-section section-pad shell" id="about">
          <div className="about-mark"><Brand /></div>
          <div className="about-copy">
            <span className="eyebrow"><span className="eyebrow-rule" />About this concept</span>
            <h2>Good farm care<br /><em>needs good partners.</em></h2>
            <p>FARMORA is a fictional demonstration brand created to show how a veterinary and poultry supplier could bring its catalog, business inquiries and customer experience together online.</p>
            <p>This concept makes no claims about real products, certifications, partners or company history. A live business would add its own verified details and qualified guidance.</p>
            <a className="text-link" href="#contact">Talk about a project like this <Icon name="arrow" size={16} /></a>
          </div>
          <div className="about-note"><span>BETTER CARE.<br />STRONGER FARMS.</span><i /><small>VETERINARY &amp; POULTRY SOLUTIONS</small></div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="shell contact-layout">
            <div className="contact-intro">
              <SectionHeading label="Let's talk" title={<>Your next step<br /><em>starts here.</em></>} body="Share what your business is looking for. In a live deployment, this form can connect to your chosen inbox or CRM." />
              <div className="contact-note"><span className="contact-note-mark"><Icon name="mail" size={20} /></span><p><strong>Thoughtful replies begin with context.</strong><small>Product, sourcing and wholesale questions can each start here.</small></p></div>
              <div className="region-note"><Icon name="leaf" size={18} /><span>Designed for business conversations across Pakistan.</span></div>
            </div>
            <div className="form-panel">
              <div className="form-panel-head"><div><span>INQUIRY FORM</span><h3>Tell us what you need.</h3></div><span className="form-reference">F / 01</span></div>
              <div id="inquiry-form"><ContactForm initialMessage={contactMessage} /></div>
              <p className="privacy-note" id="privacy-note"><strong>Demo privacy note</strong> — This front-end form does not send or save submitted information.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand-col"><Brand light /><p>Better care. Stronger farms.<br />A considered digital showcase for animal health and agriculture.</p><span className="footer-fictional">FICTIONAL DEMONSTRATION BRAND</span></div>
          <div className="footer-nav-col"><strong>Explore</strong><div className="footer-links">{navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div></div>
          <div className="footer-nav-col"><strong>Solutions</strong><div className="footer-links"><a href="#solutions">Poultry health</a><a href="#solutions">Livestock care</a><a href="#solutions">Farm hygiene</a><a href="#solutions">Farm nutrition</a></div></div>
          <div className="footer-contact"><span className="footer-contact-kicker">LET'S BUILD SOMETHING CLEARER</span><h3>Make room for<br /><em>better conversations.</em></h3><a className="footer-contact-link" href="#contact">Start an inquiry <Icon name="arrow" size={16} /></a><a className="privacy-link" href="#privacy-note">Privacy note</a></div>
        </div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} FARMORA Showcase</span><span>Concept website · No real business or product claims</span><a href="#home">Back to top <Icon name="top" size={15} /></a></div>
      </footer>
      {showBackToTop && <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><Icon name="top" size={19} /></button>}
      <ProductDialog product={selectedProduct} onClose={closeProduct} onInquire={(item) => goToInquiry(`Product inquiry: ${item.name} — ${item.category}. Please share verified availability and product details.`)} />
    </>
  )
}

export default App
