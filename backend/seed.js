require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');
const Itinerary = require('./models/Itinerary');
const User = require('./models/User');

const destinations = [
  {
    name: 'Goa', slug: 'goa', state: 'Goa', category: 'Beach', rating: 4.8,
    blurb: 'Sun-washed shores, Portuguese lanes and easygoing evenings by the sea.',
    description: 'Goa is a perfect first Explore India destination: beaches for slow mornings, heritage neighbourhoods for walks and a food scene that mixes local and global flavours.',
    bestTime: 'November – February', explore: ['Baga', 'Fontainhas', 'Palolem'], budget: '₹18,000 – ₹28,000', duration: '3–5 days',
    gradient: '#176b7a,#f0a35d', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Rajasthan', slug: 'rajasthan', state: 'Rajasthan', category: 'Heritage', rating: 4.9,
    blurb: 'A cinematic land of rose cities, desert skies and royal stories.',
    description: 'Discover Jaipur, Jodhpur and Udaipur through forts, bazaars, rooftop dinners and quiet heritage streets.',
    bestTime: 'October – March', explore: ['Jaipur', 'Jodhpur', 'Udaipur'], budget: '₹25,000 – ₹40,000', duration: '5–7 days',
    gradient: '#8a2e37,#f0ad74', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Kerala', slug: 'kerala', state: 'Kerala', category: 'Nature', rating: 4.9,
    blurb: 'Emerald backwaters, spice hills and warm coastlines built for slow travel.',
    description: 'Move from a houseboat afternoon to Munnar tea gardens and finish with a calm coastal stay.',
    bestTime: 'September – March', explore: ['Alleppey', 'Munnar', 'Kovalam'], budget: '₹28,000 – ₹42,000', duration: '5–7 days',
    gradient: '#0f5f4a,#9bd29f', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Kashmir', slug: 'kashmir', state: 'Jammu & Kashmir', category: 'Mountain', rating: 4.9,
    blurb: 'Alpine lakes, cedar forests and the kind of quiet you remember.',
    description: 'Cruise Dal Lake, take a mountain excursion to Gulmarg and slow down in the green valleys around Pahalgam.',
    bestTime: 'April – October', explore: ['Srinagar', 'Gulmarg', 'Pahalgam'], budget: '₹29,000 – ₹45,000', duration: '5–7 days',
    gradient: '#214b69,#89c5d8', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Himachal Pradesh', slug: 'himachal-pradesh', state: 'Himachal Pradesh', category: 'Adventure', rating: 4.8,
    blurb: 'Pine-scented trails, high mountain towns and campfire evenings.',
    description: 'Pair Manali with a high-altitude escape or a slower stay around the valleys and cafes of Himachal.',
    bestTime: 'March – June', explore: ['Manali', 'Spiti', 'Kasol'], budget: '₹18,000 – ₹32,000', duration: '4–7 days',
    gradient: '#3f2a1c,#d39c65', image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Gujarat', slug: 'gujarat', state: 'Gujarat', category: 'Culture', rating: 4.6,
    blurb: 'Ancient stepwells, salt deserts and a rich textile tradition.',
    description: 'Explore Ahmedabad heritage, the Rann of Kutch landscapes and the region’s crafts and cuisine.',
    bestTime: 'November – February', explore: ['Rann of Kutch', 'Ahmedabad', 'Gir'], budget: '₹14,000 – ₹25,000', duration: '3–5 days',
    gradient: '#7d5a19,#edce84', image: 'https://images.unsplash.com/photo-1598889412930-5f7a2fbe1ab8?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Karnataka', slug: 'karnataka', state: 'Karnataka', category: 'Heritage', rating: 4.7,
    blurb: 'Ruined empires at Hampi, coffee hills and royal Mysuru.',
    description: 'A diverse route with history, coffee-country landscapes and elegant palace architecture.',
    bestTime: 'October – February', explore: ['Hampi', 'Coorg', 'Mysuru'], budget: '₹18,000 – ₹32,000', duration: '4–6 days',
    gradient: '#6c2b76,#e98d8b', image: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Uttarakhand', slug: 'uttarakhand', state: 'Uttarakhand', category: 'Spiritual', rating: 4.7,
    blurb: 'River ghats, Himalayan shrines and yoga by the Ganges.',
    description: 'A grounding combination of Rishikesh riverside time, spiritual centres and Himalayan scenery.',
    bestTime: 'March – June', explore: ['Rishikesh', 'Haridwar', 'Auli'], budget: '₹15,000 – ₹28,000', duration: '3–6 days',
    gradient: '#283d73,#9bb5df', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Tamil Nadu', slug: 'tamil-nadu', state: 'Tamil Nadu', category: 'Culture', rating: 4.6,
    blurb: 'Towering temples, Chettinad kitchens and coastal sunrises.',
    description: 'Follow temple towns, food traditions and breezy southern coastlines in one rich circuit.',
    bestTime: 'November – March', explore: ['Madurai', 'Pondicherry', 'Ooty'], budget: '₹18,000 – ₹30,000', duration: '4–6 days',
    gradient: '#7d3328,#d99c70', image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Ladakh', slug: 'ladakh', state: 'Ladakh', category: 'Adventure', rating: 4.9,
    blurb: 'Moonlit monasteries and high mountain passes at the roof of India.',
    description: 'A dramatic high-altitude journey through Leh, Nubra and Pangong with plenty of room for slow acclimatisation.',
    bestTime: 'June – September', explore: ['Leh', 'Nubra', 'Pangong'], budget: '₹28,000 – ₹45,000', duration: '5–7 days',
    gradient: '#31506b,#c9d6df', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Andaman', slug: 'andaman', state: 'Andaman & Nicobar', category: 'Beach', rating: 4.8,
    blurb: 'Clear lagoons, coral reefs and white-sand island mornings.',
    description: 'For travellers who want turquoise water, reef experiences and unhurried island days.',
    bestTime: 'October – May', explore: ['Havelock', 'Neil Island', 'Port Blair'], budget: '₹30,000 – ₹48,000', duration: '5–7 days',
    gradient: '#0c7180,#8de0dc', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=85'
  },
  {
    name: 'Assam', slug: 'assam', state: 'Assam', category: 'Wildlife', rating: 4.5,
    blurb: 'Rhino grasslands, tea estates and the mighty Brahmaputra.',
    description: 'Combine wildlife in Kaziranga with tea-country stops and the cultural landscape of Majuli.',
    bestTime: 'November – April', explore: ['Kaziranga', 'Majuli', 'Jorhat'], budget: '₹20,000 – ₹35,000', duration: '4–6 days',
    gradient: '#3a6640,#bd7e31', image: 'https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1400&q=85'
  }
];

const itineraries = [
  { title: '3 Days in Goa', days: 3, tags: ['Beach', 'Food', 'Nightlife'], includes: ['Baga', 'Fontainhas', 'Palolem'], price: 18000, description: 'A breezy coastal break with beaches, heritage lanes and golden-hour dinners.' },
  { title: '5 Days in Rajasthan', days: 5, tags: ['Heritage', 'Markets', 'Food'], includes: ['Amber Fort', 'Mehrangarh', 'Lake Pichola'], price: 32000, description: 'A royal circuit across Jaipur, Jodhpur and Udaipur.' },
  { title: '6 Days in Kerala', days: 6, tags: ['Backwaters', 'Tea hills', 'Wellness'], includes: ['Alleppey', 'Munnar', 'Kovalam'], price: 38000, description: 'Houseboat mornings, tea gardens and a relaxed southern coast.' },
  { title: '4 Days in Kashmir', days: 4, tags: ['Lakes', 'Gardens', 'Mountains'], includes: ['Dal Lake', 'Gulmarg', 'Pahalgam'], price: 29000, description: 'The highlights of Srinagar and the mountain valleys around it.' }
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/explore_india');
  await Item.deleteMany({});
  await Itinerary.deleteMany({});
  await User.deleteMany({});
  await Item.insertMany(destinations);
  await Itinerary.insertMany(itineraries);
  console.log(`✓ Seeded ${destinations.length} destinations and ${itineraries.length} itineraries.`);
  console.log('✓ Demo data is ready in the explore_india database.');
  await mongoose.disconnect();
})();
