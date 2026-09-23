import React, { useEffect, useState } from 'react'

const articles = [
  {
    id: 'art-layering',
    title: 'The Art of Layering: How to Create a Signature Blend',
    excerpt:
      'Master the technique of combining two or more fragrances to craft a scent that is uniquely yours. We break down the notes that pair best together.',
    date: 'July 25, 2026',
    category: 'Guide',
    image: '/products/miss-dior.svg',
    body: [
      'Fragrance layering is the practice of wearing two or more scents together to create something entirely your own. The goal is not to overwhelm, but to build depth — a base that grounds, a heart that lingers, and a top note that greets the room.',
      'Start simple. Pair a musky or woody base with a brighter citrus or floral on top. Spray the heavier scent first, closer to the skin, then the lighter one over it. Let each settle for a few seconds before the next.',
      'The safest pairings share a common note. A vanilla-forward oriental sits beautifully beside a rose, because sweetness bridges them. Oud and saffron, amber and citrus, sandalwood and iris — these are classic combinations that rarely fail.',
      'Above all, test on skin, not paper. Body chemistry changes everything, and the blend that defines you is the one only you can wear.',
    ],
  },
  {
    id: 'art-summer',
    title: 'Summer Scents: 10 Fragrances That Beat the Heat',
    excerpt:
      'From citrus-forward colognes to aquatic florals, these are the perfumes that stay fresh even in peak Indian summers.',
    date: 'July 18, 2026',
    category: 'Seasonal',
    image: '/products/acqua.svg',
    body: [
      'When temperatures climb, heavy orientals can feel suffocating. Summer calls for fragrances that feel like a cool breeze — light, bright, and effortless.',
      'Look for citrus (bergamot, lemon, grapefruit), aquatic accords, and green notes like vetiver and mint. These read as clean and refreshing, and they project without becoming cloying in the heat.',
      'Apply to pulse points and reapply midday if needed — lighter compositions fade faster, which is a fair trade for that crisp, weightless feel.',
    ],
  },
  {
    id: 'art-oud',
    title: 'Oud Decoded: Understanding the King of Ingredients',
    excerpt:
      'A deep dive into oud — where it comes from, why it costs more than gold, and the difference between Indian, Cambodi, and synthetic oud.',
    date: 'July 11, 2026',
    category: 'Education',
    image: '/products/tf-oud-wood.svg',
    body: [
      'Oud, or agarwood, forms when the Aquilaria tree responds to a specific mould infection by producing a dark, fragrant resin. Because that process is rare and slow, genuine oud can cost more per gram than gold.',
      'Regional character matters. Indian oud tends to be animalic and barnyard-rich; Cambodi oud leans sweeter and fruitier; and modern synthetic ouds offer a cleaner, more consistent profile at a fraction of the price.',
      'In a fragrance, oud provides an unmistakable depth and longevity. Paired with rose it becomes regal; with saffron, warm and spiced; with amber, plush and enveloping.',
    ],
  },
  {
    id: 'art-interview',
    title: 'Behind the Bottle: A Conversation with a Master Perfumer',
    excerpt:
      'An exclusive conversation about creativity, raw materials, and the future of niche perfumery.',
    date: 'July 4, 2026',
    category: 'Interview',
    image: '/products/amber-aoud.svg',
    body: [
      'We sat down with a veteran perfumer to talk about the craft behind the bottle. For them, a fragrance begins not with a formula but with a memory — a place, a season, a feeling to translate into scent.',
      'Raw materials are the palette. A single natural like jasmine can contain hundreds of molecules, and learning how each behaves takes years. The art is in restraint: knowing what to leave out.',
      'On the future, they are optimistic. Sustainable sourcing and new captive molecules are expanding what is possible, while a new generation of wearers is more curious and adventurous than ever.',
    ],
  },
  {
    id: 'art-storage',
    title: 'How to Store Your Perfumes: A Complete Guide',
    excerpt:
      "Light, heat, and humidity are your fragrance's worst enemies. Learn the science-backed way to keep your collection pristine.",
    date: 'June 27, 2026',
    category: 'Guide',
    image: '/products/black-afgano.svg',
    body: [
      'Perfume is a delicate solution of aromatic compounds in alcohol, and three things degrade it: light, heat, and oxygen. Manage those and a bottle can stay true for years.',
      'Keep bottles in their boxes, away from windows and radiators. A cool, dark drawer or cupboard is ideal — the bathroom, with its heat and humidity swings, is the worst place.',
      'Once opened, oxygen slowly alters the scent. Buying sizes you will actually finish, and keeping caps tight, does more for longevity than any gadget.',
    ],
  },
  {
    id: 'art-middle-east',
    title: 'The Rise of Middle Eastern Fragrance Houses',
    excerpt:
      'From Amouage to Xerjoff, why enthusiasts are increasingly turning to Arabian and Middle Eastern niche brands.',
    date: 'June 20, 2026',
    category: 'Trend',
    image: '/products/oud-satin.svg',
    body: [
      'Middle Eastern perfumery is one of the oldest continuous traditions in the world, built on oud, amber, rose, and saffron — ingredients prized for centuries across the Arabian peninsula.',
      'Today houses like Amouage, Xerjoff, and the newer wave of niche brands are winning global audiences with rich, long-lasting compositions that feel unlike anything on the mainstream shelf.',
      'For collectors, the appeal is character. These are fragrances with presence and story — a welcome contrast to the safe, crowd-pleasing profiles that dominate department stores.',
    ],
  },
]

export default function WeeklyEditPage() {
  const [active, setActive] = useState(null)

  // Lock scroll + Escape-to-close while the modal is open.
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    if (active) window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
    <>
      <section className="page-hero">
        <p className="page-hero__eyebrow">Stories &amp; Guides</p>
        <h1 className="page-hero__title">Weekly Edit</h1>
        <p className="page-hero__subtitle">
          Discover the world behind every bottle &mdash; perfumery guides, brand stories,
          expert interviews, and curated seasonal recommendations.
        </p>
        <div className="page-hero__line" />
      </section>

      <section className="page-content">
        <div className="blog-grid">
          {articles.map((article) => (
            <article key={article.id} className="blog-card">
              <div className="blog-card__image">
                <img src={article.image} alt={article.title} loading="lazy" />
                <span className="blog-card__category">{article.category}</span>
              </div>
              <div className="blog-card__body">
                <p className="blog-card__date">{article.date}</p>
                <h3 className="blog-card__title">{article.title}</h3>
                <p className="blog-card__excerpt">{article.excerpt}</p>
                <button
                  className="blog-card__read-more"
                  onClick={() => setActive(article)}
                >
                  Read Article
                  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Read-article modal */}
      {active && (
        <div className="article-modal" onClick={() => setActive(null)}>
          <div
            className="article-modal__panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button
              className="article-modal__close"
              onClick={() => setActive(null)}
              aria-label="Close article"
            >
              <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="article-modal__hero">
              <img src={active.image} alt={active.title} />
              <span className="article-modal__category">{active.category}</span>
            </div>
            <div className="article-modal__content">
              <p className="article-modal__date">{active.date}</p>
              <h2 className="article-modal__title">{active.title}</h2>
              {active.body.map((para, i) => (
                <p key={i} className="article-modal__para">{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
