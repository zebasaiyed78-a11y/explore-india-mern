export const money = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export const imageWithFallback = (url, gradient = '#16324f,#2d6a4f') =>
  url || `https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80`;

export const slugify = (value = '') =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
