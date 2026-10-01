// Central store for all app data using localStorage
// Properties, Leads, and utility helpers

// --- PROPERTY STORE ---
const PROPS_KEY = 'leovin_properties';

const defaultProperties = [
  {
    id: 1,
    title: 'Ocean View Villa',
    category: 'Villas',
    location: 'Lekki Phase 1, Lagos',
    price: '₦350,000,000',
    specs: { beds: 5, baths: 6, area: '750 sqm' },
    image: '/pexels-expect-best-79873-323780.jpg',
    badge: 'Featured',
    sold: false,
    description: 'A stunning ocean-facing villa with panoramic views, modern interiors, and a private pool.',
  },
  {
    id: 2,
    title: 'Lakeside Luxury Retreat',
    category: 'Duplexes',
    location: 'Maitama, Abuja',
    price: '₦480,000,000',
    specs: { beds: 6, baths: 7, area: '920 sqm' },
    image: '/pexels-julia-kuzenkov-442028-1974596.jpg',
    badge: 'New Listing',
    sold: false,
    description: 'A lavish duplex retreat nestled by the lake in Maitama, with expansive gardens and a chef\'s kitchen.',
  },
  {
    id: 3,
    title: 'Beachfront Paradise Residence',
    category: 'Villas',
    location: 'Banana Island, Lagos',
    price: '₦850,000,000',
    specs: { beds: 6, baths: 8, area: '1,200 sqm' },
    image: '/pexels-robertkso-20296321.jpg',
    badge: 'Hot Deal',
    sold: false,
    description: 'Rare beachfront masterpiece on Banana Island, with direct ocean access and resort-level amenities.',
  },
  {
    id: 4,
    title: 'Metro Skyline Penthouse',
    category: 'Penthouses',
    location: 'Victoria Island, Lagos',
    price: '₦290,000,000',
    specs: { beds: 3, baths: 4, area: '450 sqm' },
    image: '/pexels-vitaliy-haiduk-326720599-19760997.jpg',
    badge: 'Verified',
    sold: false,
    description: 'An exclusive penthouse atop a VI tower with floor-to-ceiling windows and city skyline views.',
  },
  {
    id: 5,
    title: 'Contemporary Golf Estate',
    category: 'Villas',
    location: 'Jabi, Abuja',
    price: '₦410,000,000',
    specs: { beds: 5, baths: 5, area: '800 sqm' },
    image: '/pexels-artbovich-7031581.jpg',
    badge: 'Exclusive',
    sold: false,
    description: 'A prestigious estate adjoining a golf course, featuring smart-home technology and a spa.',
  },
  {
    id: 6,
    title: 'Cliffside Modern Smart Home',
    category: 'Apartments',
    location: 'Ikoyi, Lagos',
    price: '₦320,000,000',
    specs: { beds: 4, baths: 4, area: '520 sqm' },
    image: '/pexels-dextarstudio-15422346.jpg',
    badge: 'Premium',
    sold: false,
    description: 'A sleek Ikoyi smart apartment with integrated automation, rooftop lounge, and concierge.',
  },
];

export function getProperties() {
  try {
    const stored = localStorage.getItem(PROPS_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  saveProperties(defaultProperties);
  return defaultProperties;
}

export function saveProperties(properties) {
  localStorage.setItem(PROPS_KEY, JSON.stringify(properties));
}

export function addProperty(property) {
  const props = getProperties();
  const newProp = { ...property, id: Date.now(), sold: false };
  saveProperties([...props, newProp]);
  return newProp;
}

export function updateProperty(id, updates) {
  const props = getProperties().map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveProperties(props);
}

export function deleteProperty(id) {
  saveProperties(getProperties().filter((p) => p.id !== id));
}

// --- LEADS STORE ---
const LEADS_KEY = 'leovin_leads';

export function getLeads() {
  try {
    const stored = localStorage.getItem(LEADS_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return [];
}

export function saveLead(lead) {
  const leads = getLeads();
  const exists = leads.findIndex((l) => l.phone === lead.phone || l.email === lead.email);
  if (exists !== -1) {
    // Update existing lead
    leads[exists] = { ...leads[exists], ...lead, updatedAt: new Date().toISOString() };
  } else {
    leads.push({
      ...lead,
      id: Date.now(),
      booked: false,
      inspectionDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function updateLead(id, updates) {
  const leads = getLeads().map((l) =>
    l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l
  );
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
}

export function deleteLead(id) {
  localStorage.setItem(LEADS_KEY, JSON.stringify(getLeads().filter((l) => l.id !== id)));
}
