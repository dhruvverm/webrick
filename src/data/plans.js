/** Three ways to start. `formType` must match a chip in the contact form (Contact.jsx). */
export const plans = [
  {
    id: 'website',
    name: 'Just the website',
    price: 'From ₹3,999',
    period: 'one time',
    blurb: 'A fast, mobile-first website so customers can find you and contact you.',
    points: ['Custom design, no template', 'WhatsApp and call buttons', 'SEO basics built in', 'Live in 2–3 days'],
    cta: 'Start with a website',
    formType: 'Website',
  },
  {
    id: 'growth',
    name: 'Website + Ads',
    price: 'Custom quote',
    period: 'monthly',
    highlight: true,
    blurb: 'A website, plus ad campaigns that send the right people to it.',
    points: ['Everything in the website plan', 'Facebook, Instagram or Google ads', 'Ad creatives made for you', 'Weekly update on spend and enquiries'],
    cta: 'Get a quote',
    formType: 'Ads',
  },
  {
    id: 'full',
    name: 'Start to end',
    price: 'Custom quote',
    period: 'monthly',
    blurb: 'We run your whole online presence and hand you the enquiries.',
    points: ['Website, ads and social media', 'Branding and all creatives', 'Leads tracked in a CRM', 'Monthly report and next plan'],
    cta: 'Hand it to us',
    formType: 'Full package',
  },
]

export const planNotes = 'Your ad budget is paid by you directly to Meta or Google. Domain and hosting are in your name and billed separately.'
