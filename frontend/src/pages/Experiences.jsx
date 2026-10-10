import { Link } from 'react-router-dom';

const experiences = [
  { title: 'Heritage & Stories', text: 'Walk through forts, old cities, temples and living craft traditions.', icon: '◒' },
  { title: 'Mountains & Quiet', text: 'Trade traffic for cedar forests, high valleys and long pauses.', icon: '△' },
  { title: 'Beach & Slow Days', text: 'Swim, eat, read and let the coast decide the pace.', icon: '◐' },
  { title: 'Food & Markets', text: 'Build your trip around street food, regional kitchens and local markets.', icon: '◉' },
  { title: 'Wildlife & Nature', text: 'See forests, grasslands, tea estates and remarkable wildlife landscapes.', icon: '♧' },
  { title: 'Spiritual Reset', text: 'Riverside mornings, mountain air and spaces for stillness.', icon: '✧' }
];

export default function Experiences() {
  return <div className="page-shell"><div className="container page-intro"><span className="eyebrow">TRAVEL BY FEELING</span><h1>Choose a <em>mood.</em></h1><p>Start with what you want the trip to feel like. The destination can come second.</p></div><section className="container section-pad experience-grid">{experiences.map((item) => <article className="experience-card" key={item.title}><span className="experience-icon">{item.icon}</span><h2>{item.title}</h2><p>{item.text}</p><Link to={`/destinations?category=${encodeURIComponent(item.title.split(' ')[0] === 'Heritage' ? 'Heritage' : item.title.startsWith('Mountains') ? 'Mountain' : item.title.startsWith('Beach') ? 'Beach' : item.title.startsWith('Wildlife') ? 'Wildlife' : item.title.startsWith('Spiritual') ? 'Spiritual' : 'Culture')}`}>Explore related places →</Link></article>)}</section><section className="section-tint section-pad"><div className="container quote-block"><span className="eyebrow">A BETTER STARTING QUESTION</span><blockquote>“What do I want to <em>remember</em> about this trip?”</blockquote><p>That answer usually points to the right region faster than a list of tourist attractions.</p></div></section></div>;
}
