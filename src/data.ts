export type ProductCategory = 'Poultry care' | 'Farm hygiene' | 'Farm nutrition' | 'Livestock care'

export type Product = {
  id: string
  name: string
  category: ProductCategory
  summary: string
  description: string
  image: string
  imageAlt: string
  format: string
  label: string
}

export const categories = ['All products', 'Poultry care', 'Farm hygiene', 'Farm nutrition', 'Livestock care'] as const

export const products: Product[] = [
  {
    id: 'flock-balance',
    name: 'Flock Balance',
    category: 'Poultry care',
    summary: 'A sample everyday poultry-care range listing.',
    description: 'A fictional example of how a poultry-care item could be presented in a supplier catalog. Ask a qualified supplier or veterinarian for product-specific information before making a purchasing decision.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=82',
    imageAlt: 'Chickens in a bright farm setting',
    format: 'Catalog sample · format varies',
    label: '01 / Poultry',
  },
  {
    id: 'coop-care',
    name: 'Coop Care',
    category: 'Farm hygiene',
    summary: 'A demo listing for routine farm-hygiene supplies.',
    description: 'A fictional catalog placeholder for farm-hygiene supplies. Handling and application details depend on the actual product label; consult a qualified supplier for verified information.',
    image: 'https://images.unsplash.com/photo-1556316918-880f9e893822?auto=format&fit=crop&w=900&q=82',
    imageAlt: 'Brown hens moving around a farm shelter',
    format: 'Catalog sample · format varies',
    label: '02 / Hygiene',
  },
  {
    id: 'field-nourish',
    name: 'Field Nourish',
    category: 'Farm nutrition',
    summary: 'A sample feed and nutrition category entry.',
    description: 'A fictional demonstration entry for feed and nutrition discovery. Composition and suitability must always be confirmed with the manufacturer or a qualified animal-nutrition professional.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=82',
    imageAlt: 'Sunlit agricultural fields with crops and open sky',
    format: 'Catalog sample · format varies',
    label: '03 / Nutrition',
  },
  {
    id: 'herd-compass',
    name: 'Herd Compass',
    category: 'Livestock care',
    summary: 'A demo discovery card for livestock operations.',
    description: 'A fictional listing to demonstrate livestock-care discovery. For animal-specific questions, seek advice from a veterinarian and request verified product details from a supplier.',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=900&q=82',
    imageAlt: 'Cattle standing together in a grassy pasture',
    format: 'Catalog sample · format varies',
    label: '04 / Livestock',
  },
  {
    id: 'clean-start',
    name: 'Clean Start',
    category: 'Farm hygiene',
    summary: 'A fictional placeholder for cleaning essentials.',
    description: 'A fictional entry for a farm-hygiene category. This showcase does not make claims about disinfection, efficacy, or regulatory status.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=82',
    imageAlt: 'Poultry in a bright farm setting',
    format: 'Catalog sample · format varies',
    label: '05 / Hygiene',
  },
  {
    id: 'daily-grow',
    name: 'Daily Grow',
    category: 'Poultry care',
    summary: 'An example entry for a broad poultry catalog.',
    description: 'A fictional placeholder showing how poultry items could be organized for buyer discovery. Ask a qualified supplier or veterinarian for verified product-specific guidance.',
    image: 'https://images.unsplash.com/photo-1556316918-880f9e893822?auto=format&fit=crop&w=900&q=82',
    imageAlt: 'Hens in an open farm enclosure',
    format: 'Catalog sample · format varies',
    label: '06 / Poultry',
  },
]

export const solutions = [
  {
    number: '01',
    title: 'Poultry health',
    description: 'A clearer way to browse sample care categories and send a focused product inquiry.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=82',
    alt: 'Poultry in a bright farm setting',
    anchor: '#products',
  },
  {
    number: '02',
    title: 'Livestock care',
    description: 'A practical starting point for livestock suppliers and farm operations.',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=900&q=82',
    alt: 'Cattle in a green pasture',
    anchor: '#industries',
  },
  {
    number: '03',
    title: 'Farm hygiene',
    description: 'Keep facility-care categories easy to find and simple to discuss.',
    image: 'https://images.unsplash.com/photo-1556316918-880f9e893822?auto=format&fit=crop&w=900&q=82',
    alt: 'Hens around a farm shelter',
    anchor: '#products',
  },
  {
    number: '04',
    title: 'Farm nutrition',
    description: 'Present feed and nutrition listings with useful context for business buyers.',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=900&q=82',
    alt: 'A grower tending a cultivated field',
    anchor: '#products',
  },
]

export const industries = [
  {
    id: 'veterinary-pharmacies',
    title: 'Veterinary pharmacies',
    tabLabel: 'Vet pharmacies',
    icon: 'pharmacy',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=86',
    imageAlt: 'Poultry in a bright farm setting, used as illustrative animal-health photography',
    body: 'A digital catalog can help pharmacy teams organize categories and give business buyers a clearer way to ask about a listed item.',
    detail: 'A commissioned version could reflect the pharmacy’s verified range, store information and preferred inquiry route.',
    focus: 'Category clarity · supplier inquiries',
  },
  {
    id: 'poultry-farms',
    title: 'Poultry farms',
    tabLabel: 'Poultry farms',
    icon: 'flock',
    image: 'https://images.unsplash.com/photo-1556316918-880f9e893822?auto=format&fit=crop&w=1200&q=86',
    imageAlt: 'Hens moving around an open farm enclosure',
    body: 'Farm teams can browse sample care and hygiene categories before opening a conversation with a supplier.',
    detail: 'A live site could organize the information farm buyers need while keeping product-specific guidance with qualified professionals.',
    focus: 'Product discovery · clear questions',
  },
  {
    id: 'feed-distributors',
    title: 'Feed distributors',
    tabLabel: 'Feed distribution',
    icon: 'feed',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=86',
    imageAlt: 'Cultivated fields under an open sky',
    body: 'A well-structured range can make it easier for business buyers to find nutrition listings and explain what they are sourcing.',
    detail: 'Verified specifications, pack formats and availability can be added by the business when a production catalog is commissioned.',
    focus: 'Range organization · wholesale requests',
  },
  {
    id: 'livestock-operations',
    title: 'Livestock operations',
    tabLabel: 'Livestock',
    icon: 'herd',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1200&q=86',
    imageAlt: 'Cattle standing together in a grassy pasture',
    body: 'Livestock teams can explore relevant supplier categories and prepare a focused question about sourcing or product details.',
    detail: 'The demonstration does not recommend treatments; animal-specific decisions belong with a veterinarian and verified product information.',
    focus: 'Supplier discovery · sourcing context',
  },
]

export const digitalServices = [
  { number: '01', title: 'Digital product catalogs', body: 'Searchable, filterable product discovery built around a business’s verified range.' },
  { number: '02', title: 'Business websites', body: 'A considered digital front door shaped for the customers and partners a company serves.' },
  { number: '03', title: 'WhatsApp inquiry paths', body: 'A clear handoff to a business-owned WhatsApp number, once one is supplied and configured.' },
  { number: '04', title: 'Customer inquiry management', body: 'Forms and routing designed to collect useful context and reach a chosen inbox or CRM.' },
  { number: '05', title: 'Inventory and reporting', body: 'Potential views for product availability and business reporting, planned around real data sources.' },
  { number: '06', title: 'Workflow automation', body: 'Purposeful connections between tools, scoped around the team’s actual process.' },
]

export const faqs = [
  {
    question: 'Is FARMORA a real supplier or veterinary company?',
    answer: 'No. FARMORA is a fictional demonstration concept. The brand, product names and catalog descriptions are illustrative and do not represent a registered business.',
  },
  {
    question: 'Can I place an order or request product advice here?',
    answer: 'No orders are placed and this site does not provide veterinary advice. The inquiry form only demonstrates a possible front-end flow; nothing is transmitted or stored.',
  },
  {
    question: 'Could this catalog be customized for my business?',
    answer: 'Yes. A commissioned project could use your approved brand, verified catalog information, product photography, buyer categories and preferred inquiry process.',
  },
  {
    question: 'Can the site connect to WhatsApp, inventory or a CRM?',
    answer: 'Those integrations can be scoped for a real project. This demonstration has no connected WhatsApp number, inventory feed, CRM or workflow automation.',
  },
  {
    question: 'Do the photographs need an internet connection?',
    answer: 'Yes. The current farm photographs load from Unsplash. If the images cannot load, a built-in visual fallback appears; a production project should confirm image rights and final selections.',
  },
]
