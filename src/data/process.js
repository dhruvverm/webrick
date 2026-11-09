/** The start-to-end journey, from the first conversation to a paying customer. */
export const processSteps = [
  {
    number: '01',
    title: 'Plan',
    description: 'We learn your business, your customers and your budget.',
    detail: 'A short call or WhatsApp chat. You get a simple plan: what to build first, where to advertise and what it will cost. The quote is fixed before any work starts.',
    outputs: ['Simple plan', 'Fixed quote', 'Timeline'],
  },
  {
    number: '02',
    title: 'Build',
    description: 'Your website, branding and creatives get made.',
    detail: 'The website goes live in 2–3 days. Logo, post designs and ad creatives are prepared and shown to you before anything is published.',
    outputs: ['Website', 'Creatives', 'Tracking set up'],
  },
  {
    number: '03',
    title: 'Launch',
    description: 'Ads and social media go live.',
    detail: 'Campaigns start on the channels your customers use, with a budget you set. Posts and reels go out on a schedule you have approved.',
    outputs: ['Ad campaigns', 'Content calendar', 'Lead forms'],
  },
  {
    number: '04',
    title: 'Follow up',
    description: 'Every enquiry is answered and tracked.',
    detail: 'Enquiries reach you on WhatsApp and land in a CRM with reminders, so your team calls back on time and nothing is forgotten.',
    outputs: ['WhatsApp alerts', 'CRM', 'Call reminders'],
  },
  {
    number: '05',
    title: 'Improve',
    description: 'We report, stop what fails and grow what works.',
    detail: 'A weekly update on spend, enquiries and results. We pause what is not working and move the budget to what is.',
    outputs: ['Weekly update', 'Monthly report', 'Next steps'],
  },
]
