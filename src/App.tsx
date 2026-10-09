import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import { Brand } from './components/Brand'
import { ContactForm } from './components/ContactForm'
import { ImageFrame } from './components/ImageFrame'
import { ProductCard } from './components/ProductCard'
import { ProductDialog } from './components/ProductDialog'
import { categories, digitalServices, faqs, industries, products, solutions, type Product } from './data'
import { Icon } from './Icons'

const navItems = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Catalog', href: '#products' },
  { label: 'Industries', href: '#industries' },
  { label: 'How it works', href: '#workflow' },
  { label: 'FAQ', href: '#faq' },
] as const

const workflowSteps = [
  {
    number: '01',
    title: 'Explore the product catalog',
    body: 'A buyer browses clear categories, searches sample listings and opens the details they want to discuss.',
    note: 'The demo catalog is fictional. A live version would use the business’s verified product information.',
  },
  {
    number: '02',
    title: 'Submit a product inquiry',
    body: 'A focused inquiry can carry the product name and category into a form, so the buyer has a useful starting point.',
    note: 'This form is front-end only. It does not send or store the information entered here.',
  },
  {
    number: '03',
    title: 'Continue with the sales team',
    body: 'In a commissioned solution, the inquiry could reach the company’s chosen inbox, CRM or configured business channel.',
    note: 'No sales system or messaging integration is connected to this concept.',
  },
]

function SectionHeading({ label, title, body, light = false, id }: { label: string; title: ReactNode; body?: string; light?: boolean; id?: string }) {
  return (
    <div className={`section-heading${light ? ' section-heading-light' : ''}`} data-reveal>
      <span className="eyebrow"><span className="eyebrow-rule" />{label}</span>
      <h2 id={id}>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  )
}

function useScrollReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    document.documentElement.classList.add('has-reveals')
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        currentObserver.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -48px 0px', threshold: 0.08 })

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('has-reveals')
    }
  }, [])
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<string>('All products')
  const [search, setSearch] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [prefillRevision, setPrefillRevision] = useState(0)
  const [activeIndustry, setActiveIndustry] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const industryTabRefs = useRef<Array<HTMLButtonElement | null>>([])

  useScrollReveals()

  const visibleProducts = useMemo(() => {
    const normalized = search.trim().toLocaleLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'All products' || product.category === category
      const matchesSearch = !normalized || `${product.name} ${product.category} ${product.summary}`.toLocaleLowerCase().includes(normalized)
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  const closeProduct = useCallback(() => setSelectedProduct(null), [])
  const selectedIndustry = industries[activeIndustry]

  useEffect(() => {
    function onScroll() { setShowBackToTop(window.scrollY > 700) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null)
    if (!('IntersectionObserver' in window) || !sections.length) return

    const observer = new IntersectionObserver((entries) => {
      const next = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0]
      if (next) setActiveSection(next.target.id)
    }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    function onMenuKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onMenuKeyDown)
    return () => window.removeEventListener('keydown', onMenuKeyDown)
  }, [menuOpen])

  useEffect(() => {
    function onSearchShortcut(event: globalThis.KeyboardEvent) {
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
    setPrefillRevision((revision) => revision + 1)
    setSelectedProduct(null)
    setMenuOpen(false)
    document.getElementById('contact')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  function selectIndustry(index: number, moveFocus = false) {
    const nextIndex = (index + industries.length) % industries.length
    setActiveIndustry(nextIndex)
    if (moveFocus) industryTabRefs.current[nextIndex]?.focus()
  }

  function onIndustryKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectIndustry(index + 1, true)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectIndustry(index - 1, true)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectIndustry(0, true)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectIndustry(industries.length - 1, true)
    }
  }

  const workflowProgress = { '--workflow-progress': `${(activeStep / (workflowSteps.length - 1)) * 100}%` } as CSSProperties

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement"><span className="announcement-dot" /> A fictional digital showcase for Pakistan’s animal-health sector <a href="#about">About the concept <Icon name="arrow" size={14} /></a></div>

      <header className="site-header">
        <div className="header-inner shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(({ label, href }) => <a key={href} href={href} aria-current={activeSection === href.slice(1) ? 'location' : undefined}>{label}</a>)}
          </nav>
          <a className="button button-small header-cta" href="#contact">Discuss a project <Icon name="arrow" size={15} /></a>
          <button className="mobile-menu-toggle icon-button" ref={menuButtonRef} type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
        <nav className={`mobile-nav${menuOpen ? ' mobile-nav-open' : ''}`} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
          {navItems.map(({ label, href }) => <a key={href} href={href} aria-current={activeSection === href.slice(1) ? 'location' : undefined} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>{label}<Icon name="arrow" size={16} /></a>)}
          <a className="button button-primary mobile-nav-cta" href="#contact" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>Discuss a project <Icon name="arrow" size={16} /></a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero shell" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-line" /> Animal care, thoughtfully presented <span className="kicker-region">A DEMO CONCEPT</span></div>
            <h1 id="hero-title">A clearer digital home for <em>farm care.</em></h1>
            <p className="hero-lede">A considered showcase for how veterinary and poultry businesses could bring product discovery and customer conversations together online.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#products">Explore the sample catalog <Icon name="arrow" size={17} /></a>
              <a className="button button-outline" href="#contact">Discuss a digital project</a>
            </div>
            <div className="hero-footnote"><Icon name="leaf" size={17} /><span>Fictional brand. Illustrative product listings.</span></div>
          </div>
          <div className="hero-visual" aria-label="Poultry farm photography">
            <div className="hero-photo-wrap">
              <ImageFrame src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1500&q=88" alt="A flock of chickens in natural farm light" className="hero-photo" eager sizes="(max-width: 760px) 100vw, 52vw" />
              <div className="hero-image-shade" />
              <div className="hero-image-label"><span className="label-mark"><Icon name="leaf" size={18} /></span><span><small>FARMORA FIELD NOTE 01</small><strong>For the people behind the work.</strong></span></div>
              <div className="hero-image-count"><span>01</span><i /> 04</div>
            </div>
            <div className="hero-stamp"><span>F</span><small>DEMO<br />CONCEPT</small></div>
            <div className="hero-side-note">A DIGITAL SHOWCASE FOR ANIMAL HEALTH</div>
          </div>
          <a className="hero-bottom-rule" href="#solutions"><span>SCROLL TO EXPLORE</span><i /><span>01 — 06</span></a>
        </section>

        <section className="approach-strip" aria-label="A possible buyer journey">
          <div className="shell approach-inner">
            <span className="approach-intro">A clearer route from browse to conversation</span>
            <div className="approach-step"><span>01</span><strong>Browse by need</strong></div>
            <div className="approach-step"><span>02</span><strong>Explore a listing</strong></div>
            <div className="approach-step"><span>03</span><strong>Ask a question</strong></div>
            <span className="approach-leaf"><Icon name="leaf" size={21} /></span>
          </div>
        </section>

        <section className="solutions-section section-pad shell" id="solutions">
          <div className="section-head-row">
            <SectionHeading label="A considered starting point" title={<>Browse the needs<br /><em>behind the range.</em></>} body="Four sample areas show how a real business could make its offering easier to explore." />
            <a href="#contact" className="text-link section-side-link">Shape a solution for your business <Icon name="arrow" size={17} /></a>
          </div>
          <div className="solution-grid">
            {solutions.map((solution) => (
              <article className="solution-card" key={solution.number} data-reveal>
                <a className="solution-image" href={solution.anchor} aria-label={`Explore ${solution.title}`}>
                  <ImageFrame src={solution.image} alt={solution.alt} sizes="(max-width: 760px) 50vw, (max-width: 1100px) 25vw, 300px" />
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
            <div className="catalog-topline"><span className="eyebrow"><span className="eyebrow-rule" />The FARMORA catalog</span><span className="catalog-note" id="catalog-note">SAMPLE LISTINGS · CREATED FOR THIS DEMO</span></div>
            <div className="section-head-row catalog-heading-row">
              <SectionHeading label="Explore the sample range" title={<>A range made for<br /><em>easy discovery.</em></>} body="Search fictional listings by name or browse by category. Product details are illustrative, not purchasing or treatment guidance." />
              <label className="search-box"><Icon name="search" size={19} /><span className="sr-only">Search sample product catalog</span><input id="product-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the catalog" type="search" aria-controls="product-results" aria-describedby="catalog-note" />{search && <button type="button" onClick={() => setSearch('')} aria-label="Clear product search"><Icon name="close" size={17} /></button>}<kbd aria-hidden="true">/</kbd></label>
            </div>
            <div className="catalog-toolbar">
              <div className="filter-list" aria-label="Filter sample products by category" role="group">
                {categories.map((item) => <button type="button" className={`filter-chip${category === item ? ' filter-chip-active' : ''}`} key={item} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}<span>{item === 'All products' ? products.length : products.filter((product) => product.category === item).length}</span></button>)}
              </div>
              <span className="result-count" aria-live="polite">{visibleProducts.length === products.length && category === 'All products' && !search ? `All ${products.length} sample listings` : `Showing ${visibleProducts.length} ${visibleProducts.length === 1 ? 'listing' : 'listings'}`}</span>
            </div>
            {visibleProducts.length ? <div className="product-grid" id="product-results">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} onInquire={(item) => goToInquiry(`Product inquiry: ${item.name} — ${item.category}. Please share verified availability and product details.`)} />)}</div> : (
              <div className="empty-state" id="product-results"><span className="empty-icon"><Icon name="search" size={23} /></span><h3>No sample listings found</h3><p>Try a different term or clear the category filter to see the full range.</p><button className="text-link" type="button" onClick={() => { setSearch(''); setCategory('All products') }}>Clear search and filters <Icon name="arrow" size={16} /></button></div>
            )}
            <div className="catalog-disclaimer"><Icon name="spark" size={16} /><p>Every product name and description is fictional. For product-specific guidance, consult a veterinarian and request verified information from a supplier.</p></div>
          </div>
        </section>

        <section className="industries-section section-pad shell" id="industries" aria-labelledby="industries-title">
          <div className="industries-intro">
            <SectionHeading id="industries-title" label="Different buyers, different needs" title={<>Start with the<br /><em>buyer’s context.</em></>} body="Select an industry to see how a tailored digital experience could give its audience a more relevant path." />
            <div className="industry-tabs" role="tablist" aria-label="Explore business types" aria-orientation="horizontal">
              {industries.map((industry, index) => (
                <button
                  key={industry.id}
                  ref={(element) => { industryTabRefs.current[index] = element }}
                  className={`industry-tab${activeIndustry === index ? ' industry-tab-active' : ''}`}
                  id={`industry-tab-${industry.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeIndustry === index}
                  aria-controls="industry-panel"
                  tabIndex={activeIndustry === index ? 0 : -1}
                  onClick={() => selectIndustry(index)}
                  onKeyDown={(event) => onIndustryKeyDown(event, index)}
                >
                  <span className="industry-tab-number">0{index + 1}</span><span>{industry.tabLabel}</span><Icon name={industry.icon as 'flock' | 'pharmacy' | 'feed' | 'herd'} size={19} />
                </button>
              ))}
            </div>
          </div>
          <article className="industry-panel" id="industry-panel" role="tabpanel" aria-labelledby={`industry-tab-${selectedIndustry.id}`} tabIndex={0}>
            <div className="industry-panel-copy" key={selectedIndustry.id}>
              <span className="industry-panel-label"><span>0{activeIndustry + 1}</span> / INDUSTRY NOTE</span>
              <h3>{selectedIndustry.title}</h3>
              <p className="industry-panel-body">{selectedIndustry.body}</p>
              <p className="industry-panel-detail">{selectedIndustry.detail}</p>
              <div className="industry-focus"><span>Potential focus</span><strong>{selectedIndustry.focus}</strong></div>
              <button className="text-link" type="button" onClick={() => goToInquiry(`Business inquiry: I’m interested in a digital solution for ${selectedIndustry.title.toLocaleLowerCase()}. Please discuss possible scope.`)}>Discuss this audience <Icon name="arrow" size={16} /></button>
            </div>
            <div className="industry-panel-image">
              <ImageFrame key={selectedIndustry.id} src={selectedIndustry.image} alt={selectedIndustry.imageAlt} sizes="(max-width: 760px) 100vw, 48vw" />
              <span className="industry-image-caption">Illustrative farm photography</span>
            </div>
          </article>
        </section>

        <section className="workflow-section section-pad" id="workflow">
          <div className="shell">
            <div className="workflow-heading-row">
              <SectionHeading label="A possible digital journey" title={<>From first look<br /><em>to a useful conversation.</em></>} body="An example of how a buyer could move through a thoughtfully planned product experience." light />
              <span className="workflow-edition">POTENTIAL WORKFLOW<br />NOT A CONNECTED SERVICE</span>
            </div>
            <div className="workflow-steps" role="group" aria-label="Choose a step in the example workflow" style={workflowProgress}>
              <div className="workflow-track" aria-hidden="true"><span /></div>
              {workflowSteps.map((step, index) => (
                <button className={`workflow-step${activeStep === index ? ' workflow-step-active' : ''}`} type="button" key={step.number} aria-pressed={activeStep === index} onClick={() => setActiveStep(index)}>
                  <span className="workflow-node"><span>{step.number}</span></span>
                  <span className="workflow-step-title">{step.title}</span>
                  <span className="workflow-step-action">View step <Icon name="arrow" size={15} /></span>
                </button>
              ))}
            </div>
            <div className="workflow-detail" aria-live="polite" aria-atomic="true">
              <div className="workflow-detail-index">{workflowSteps[activeStep].number}<span> / 03</span></div>
              <div className="workflow-detail-copy"><h3>{workflowSteps[activeStep].title}</h3><p>{workflowSteps[activeStep].body}</p></div>
              <p className="workflow-demo-note"><Icon name="spark" size={18} />{workflowSteps[activeStep].note}</p>
            </div>
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="shell">
            <div className="services-heading-row">
              <SectionHeading label="Possible digital services" title={<>Useful tools,<br /><em>built around your work.</em></>} body="This concept can be a starting point for a wider digital project, scoped to the systems and customer journey a real business needs." />
              <span className="services-side-note">IDEAS TO COMMISSION<br />NOT FEATURES OF THIS DEMO</span>
            </div>
            <div className="service-list">
              {digitalServices.map((service) => (
                <article className="service-item" key={service.number} data-reveal>
                  <span className="service-number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  <span className="service-arrow" aria-hidden="true"><Icon name="arrow" size={17} /></span>
                </article>
              ))}
            </div>
            <p className="service-disclaimer">Integrations, reporting and automation would be designed and connected only after requirements, data sources and access are agreed with the business.</p>
          </div>
        </section>

        <section className="about-section section-pad shell" id="about">
          <div className="about-mark" data-reveal><Brand /></div>
          <div className="about-copy" data-reveal>
            <span className="eyebrow"><span className="eyebrow-rule" />About this concept</span>
            <h2>Good farm care<br /><em>deserves clear information.</em></h2>
            <p>FARMORA is a fictional demonstration brand created to show how a veterinary and poultry business could bring product discovery and customer inquiries together online.</p>
            <p>This concept makes no claims about real products, certifications, customers, partners or company history. A live business would supply its own approved content and qualified guidance.</p>
            <a className="text-link" href="#services">Explore possible digital services <Icon name="arrow" size={16} /></a>
          </div>
          <div className="about-note" data-reveal><span>BETTER CARE.<br />CLEARER CONVERSATIONS.</span><i /><small>FICTIONAL SHOWCASE CONCEPT</small></div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="shell faq-layout">
            <div className="faq-intro"><SectionHeading label="Good to know" title={<>A few clear<br /><em>answers.</em></>} body="What this concept does, what it leaves open and how a real project could take shape." /><a className="text-link faq-contact-link" href="#contact">Ask about a project <Icon name="arrow" size={16} /></a></div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details className="faq-item" key={faq.question} data-reveal>
                  <summary><span className="faq-number">0{index + 1}</span><span className="faq-question">{faq.question}</span><span className="faq-toggle" aria-hidden="true"><Icon name="chevron" size={19} /></span></summary>
                  <div className="faq-answer"><p>{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="shell contact-layout">
            <div className="contact-intro">
              <SectionHeading label="Start a conversation" title={<>Your next digital idea<br /><em>starts here.</em></>} body="Share what your business needs. A live project can connect an inquiry form to the inbox or CRM you choose." />
              <div className="contact-note"><span className="contact-note-mark"><Icon name="mail" size={20} /></span><p><strong>Begin with the right context.</strong><small>Tell us about your audience, product range or workflow.</small></p></div>
              <div className="region-note"><Icon name="leaf" size={18} /><span>Designed for business conversations across Pakistan.</span></div>
            </div>
            <div className="form-panel" data-reveal>
              <div className="form-panel-head"><div><span>PROJECT INQUIRY</span><h3>Tell us what you have in mind.</h3></div><span className="form-reference">F / 01</span></div>
              <div id="inquiry-form"><ContactForm initialMessage={contactMessage} prefillRevision={prefillRevision} /></div>
              <p className="privacy-note" id="privacy-note"><strong>Demo privacy note</strong> — This front-end form does not send or save submitted information.</p>
            </div>
          </div>
        </section>

        <section className="final-cta shell" aria-labelledby="final-cta-title" data-reveal>
          <div className="final-cta-mark" aria-hidden="true"><span>F</span><i /></div>
          <div className="final-cta-copy">
            <span className="eyebrow eyebrow-light"><span className="eyebrow-rule" />A thoughtful next step</span>
            <h2 id="final-cta-title">Let’s shape a clearer<br /><em>digital experience.</em></h2>
            <p>Bring your audience, goals and questions. We can explore what a custom website or business solution could look like.</p>
          </div>
          <div className="final-cta-actions"><a className="button button-cream" href="#contact">Discuss your project <Icon name="arrow" size={17} /></a><a className="final-cta-link" href="#home">Return to the beginning <Icon name="top" size={15} /></a></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand-col"><Brand light /><p>Better care. Clearer conversations.<br />A digital showcase concept for animal health and agriculture.</p><span className="footer-fictional">FICTIONAL DEMONSTRATION BRAND</span></div>
          <div className="footer-nav-col"><strong>Explore</strong><div className="footer-links">{navItems.map(({ label, href }) => <a href={href} key={href}>{label}</a>)}</div></div>
          <div className="footer-nav-col"><strong>Possible services</strong><div className="footer-links"><a href="#services">Digital catalogs</a><a href="#services">Business websites</a><a href="#services">Inquiry management</a><a href="#services">Workflow automation</a></div></div>
          <div className="footer-contact"><span className="footer-contact-kicker">BUILT AROUND A REAL BUSINESS</span><h3>Make space for<br /><em>better conversations.</em></h3><a className="footer-contact-link" href="#contact">Start a project inquiry <Icon name="arrow" size={16} /></a><a className="privacy-link" href="#privacy-note">Read the demo privacy note</a></div>
        </div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} FARMORA Showcase</span><span>Concept website · No real business or product claims</span><a href="#home">Back to top <Icon name="top" size={15} /></a></div>
      </footer>

      {showBackToTop && <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} aria-label="Back to top"><Icon name="top" size={19} /></button>}
      <ProductDialog product={selectedProduct} onClose={closeProduct} onInquire={(item) => goToInquiry(`Product inquiry: ${item.name} — ${item.category}. Please share verified availability and product details.`)} />
    </>
  )
}

export default App
