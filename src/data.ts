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
  { title: 'Poultry farms', body: 'Browse relevant categories, then direct questions to a supplier who can confirm availability and product details.', icon: 'flock' },
  { title: 'Veterinary pharmacies', body: 'A structured catalog can help customers discover a range before they get in touch with your team.', icon: 'pharmacy' },
  { title: 'Feed distributors', body: 'Give buyers one clear place to explore sample nutrition listings and start a wholesale conversation.', icon: 'feed' },
  { title: 'Livestock operations', body: 'Make it easier to find the right supplier contact for product and sourcing questions.', icon: 'herd' },
]
