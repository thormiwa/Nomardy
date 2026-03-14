export type DestinationEntry = {
  slug: string;
  queryValue: string;
  emoji: string;
  name: string;
  visaStatus: string;
  fromPrice: string;
  note: string;
  featured?: boolean;
  rhythm: string;
  bestFor: string;
  budgetBand: string;
  stay: string;
  routeMood: string;
};

export const homepageExamples: DestinationEntry[] = [
  {
    slug: "ghana",
    queryValue: "Ghana",
    emoji: "🇬🇭",
    name: "Ghana",
    visaStatus: "Visa-free",
    fromPrice: "USD 650",
    note: "Close, familiar, and usually free of the long visa detour.",
    rhythm: "Easy regional reset",
    bestFor: "First international trip from Nigeria",
    budgetBand: "Budget to mid-range",
    stay: "Short city breaks to one week",
    routeMood: "Low-friction, familiar, warm"
  },
  {
    slug: "rwanda",
    queryValue: "Rwanda",
    emoji: "🇷🇼",
    name: "Rwanda",
    visaStatus: "Visa on arrival",
    fromPrice: "USD 700",
    note: "A calm East Africa choice when you want a cleaner first trip without heavy paperwork drama.",
    rhythm: "Polished short trip",
    bestFor: "Travelers who want structure and ease",
    budgetBand: "Budget to mid-range",
    stay: "Three to five days",
    routeMood: "Clear, contained, city-first"
  },
  {
    slug: "united-arab-emirates",
    queryValue: "United Arab Emirates",
    emoji: "🇦🇪",
    name: "United Arab Emirates",
    visaStatus: "E-visa",
    fromPrice: "USD 1,300",
    note: "A polished city break once the entry path is clear and your travel partner or sponsor is set.",
    rhythm: "Fast city energy",
    bestFor: "Short premium leisure trips",
    budgetBand: "Mid-range to luxury",
    stay: "Four to five days",
    routeMood: "Efficient, glossy, urban"
  },
  {
    slug: "japan",
    queryValue: "Japan",
    emoji: "🇯🇵",
    name: "Japan",
    visaStatus: "Embassy visa",
    fromPrice: "USD 1,900",
    note: "A route that rewards travelers who already know they want it and are ready to plan properly.",
    featured: true,
    rhythm: "High-intent long-haul trip",
    bestFor: "Travelers ready to plan early and deeply",
    budgetBand: "Mid-range to luxury",
    stay: "One week or longer",
    routeMood: "Precise, rewarding, commitment-heavy"
  }
];

export const destinationsCatalog: DestinationEntry[] = [
  ...homepageExamples,
  {
    slug: "morocco",
    queryValue: "Morocco",
    emoji: "🇲🇦",
    name: "Morocco",
    visaStatus: "Embassy visa",
    fromPrice: "USD 1,200",
    note: "Rich and atmospheric, but still a route where the paperwork comes before the feeling.",
    rhythm: "Culture-rich city journey",
    bestFor: "Travelers wanting atmosphere and contrast",
    budgetBand: "Budget to mid-range",
    stay: "Five to seven days",
    routeMood: "Textured, expressive, document-heavy"
  },
  {
    slug: "canada",
    queryValue: "Canada",
    emoji: "🇨🇦",
    name: "Canada",
    visaStatus: "Embassy visa",
    fromPrice: "USD 2,100",
    note: "A bigger-commitment trip that makes more sense when the purpose is strong enough to justify the wait.",
    rhythm: "High-friction long-haul",
    bestFor: "Family visits, milestone trips, longer stays",
    budgetBand: "Mid-range to luxury",
    stay: "One week or more",
    routeMood: "Measured, expensive, commitment-first"
  },
  {
    slug: "south-africa",
    queryValue: "South Africa",
    emoji: "🇿🇦",
    name: "South Africa",
    visaStatus: "Embassy visa",
    fromPrice: "USD 950",
    note: "Closer emotionally and geographically, but still one that asks for a proper pre-travel visa process.",
    rhythm: "Closer regional stretch",
    bestFor: "Travelers who want variety without extreme distance",
    budgetBand: "Budget to mid-range",
    stay: "Five to six days",
    routeMood: "Familiar, scenic, admin-first"
  },
  {
    slug: "schengen",
    queryValue: "Schengen",
    emoji: "🇪🇺",
    name: "Schengen Area",
    visaStatus: "Embassy visa",
    fromPrice: "USD 1,750",
    note: "An aspirational route that pays off when you are ready for a more disciplined documentation process.",
    rhythm: "Classic aspirational route",
    bestFor: "Travelers with a clear timeline and paperwork patience",
    budgetBand: "Mid-range to luxury",
    stay: "One week",
    routeMood: "Prestige-heavy, slower to secure"
  },
  {
    slug: "kenya",
    queryValue: "Kenya",
    emoji: "🇰🇪",
    name: "Kenya",
    visaStatus: "E-visa",
    fromPrice: "USD 850",
    note: "One of the smoother East Africa routes now that the authorization path is digital and easier to understand.",
    rhythm: "Flexible regional move",
    bestFor: "Travelers wanting easier planning and city access",
    budgetBand: "Budget to mid-range",
    stay: "Four to five days",
    routeMood: "Lighter, digital, practical"
  },
  {
    slug: "namibia",
    queryValue: "Namibia",
    emoji: "🇳🇦",
    name: "Namibia",
    visaStatus: "Embassy visa",
    fromPrice: "USD 1,250",
    note: "A scenic, slower-paced route that still starts with a more deliberate visa process.",
    rhythm: "Scenic commitment trip",
    bestFor: "Travelers choosing landscapes over convenience",
    budgetBand: "Mid-range",
    stay: "Five to six days",
    routeMood: "Expansive, slow, more deliberate"
  },
  {
    slug: "ivory-coast",
    queryValue: "Ivory Coast",
    emoji: "🇨🇮",
    name: "Ivory Coast",
    visaStatus: "Visa-free",
    fromPrice: "USD 700",
    note: "A simpler regional move when you want a city trip without adding visa stress to the decision.",
    rhythm: "Low-friction city trip",
    bestFor: "Regional weekends and short resets",
    budgetBand: "Budget to mid-range",
    stay: "Three to five days",
    routeMood: "Quick, warm, straightforward"
  },
  {
    slug: "egypt",
    queryValue: "Egypt",
    emoji: "🇪🇬",
    name: "Egypt",
    visaStatus: "Embassy visa",
    fromPrice: "USD 1,100",
    note: "Iconic and easy to imagine, but still a route where the embassy stage comes before the excitement.",
    rhythm: "History-heavy city route",
    bestFor: "Travelers chasing iconic places",
    budgetBand: "Budget to mid-range",
    stay: "Five to six days",
    routeMood: "Classic, busy, preplanned"
  },
  {
    slug: "senegal",
    queryValue: "Senegal",
    emoji: "🇸🇳",
    name: "Senegal",
    visaStatus: "Visa-free",
    fromPrice: "USD 680",
    note: "A quick regional answer when you want a trip that feels possible without much administrative drag.",
    rhythm: "Easy regional city break",
    bestFor: "Quick travel decisions",
    budgetBand: "Budget to mid-range",
    stay: "Three to five days",
    routeMood: "Fast, grounded, manageable"
  },
  {
    slug: "mauritius",
    queryValue: "Mauritius",
    emoji: "🇲🇺",
    name: "Mauritius",
    visaStatus: "Visa-free",
    fromPrice: "USD 1,250",
    note: "A softer island option with less visa friction and more rest-first energy once the basics are lined up.",
    rhythm: "Warm island escape",
    bestFor: "Rest-first travelers and couples",
    budgetBand: "Mid-range to luxury",
    stay: "Four to five days",
    routeMood: "Quiet, resort-ready, restorative"
  },
  {
    slug: "uganda",
    queryValue: "Uganda",
    emoji: "🇺🇬",
    name: "Uganda",
    visaStatus: "E-visa",
    fromPrice: "USD 820",
    note: "A strong East Africa pick when you want a trip that feels reachable, practical, and easier to process digitally.",
    rhythm: "Practical East Africa route",
    bestFor: "Travelers seeking easier admin and moderate spend",
    budgetBand: "Budget to mid-range",
    stay: "Four to five days",
    routeMood: "Simple, digital, direct"
  },
  {
    slug: "thailand",
    queryValue: "Thailand",
    emoji: "🇹🇭",
    name: "Thailand",
    visaStatus: "Embassy visa",
    fromPrice: "USD 1,400",
    note: "A route full of movement, food, and nightlife, but one that still asks you to do the visa work upfront.",
    rhythm: "Aspirational leisure route",
    bestFor: "Travelers wanting nightlife, food, and movement",
    budgetBand: "Budget to mid-range",
    stay: "One week",
    routeMood: "Lively, distant, prep-heavy"
  },
  {
    slug: "vietnam",
    queryValue: "Vietnam",
    emoji: "🇻🇳",
    name: "Vietnam",
    visaStatus: "E-visa",
    fromPrice: "USD 1,150",
    note: "A lighter-feeling Asia route because the digital path is clearer and easier to move from idea to plan.",
    rhythm: "Efficient Asia route",
    bestFor: "Travelers who want lower admin friction in Asia",
    budgetBand: "Budget to mid-range",
    stay: "One week",
    routeMood: "Clean, digital, value-led"
  },
  {
    slug: "seychelles",
    queryValue: "Seychelles",
    emoji: "🇸🇨",
    name: "Seychelles",
    visaStatus: "Visa-free",
    fromPrice: "USD 1,500",
    note: "Sunlit and easy on the visa side, as long as your travel details and lodging are properly in place.",
    rhythm: "Luxury-leaning island trip",
    bestFor: "Travelers prioritizing beauty and atmosphere",
    budgetBand: "Mid-range to luxury",
    stay: "Four to five days",
    routeMood: "Sunlit, soft, expensive"
  },
  {
    slug: "philippines",
    queryValue: "Philippines",
    emoji: "🇵🇭",
    name: "Philippines",
    visaStatus: "Embassy visa",
    fromPrice: "USD 1,350",
    note: "A leisure-first route, though it still belongs in the category where the consular process comes before the fun.",
    rhythm: "Long-haul leisure route",
    bestFor: "Travelers choosing islands and downtime",
    budgetBand: "Mid-range",
    stay: "One week",
    routeMood: "Leisure-first, farther, slower"
  },
  {
    slug: "qatar",
    queryValue: "Qatar",
    emoji: "🇶🇦",
    name: "Qatar",
    visaStatus: "E-visa",
    fromPrice: "USD 1,200",
    note: "A polished short break when you want a city route that feels premium without becoming too complex.",
    rhythm: "Short premium stop",
    bestFor: "Travelers wanting a polished quick escape",
    budgetBand: "Mid-range to luxury",
    stay: "Three to four days",
    routeMood: "Glossy, compact, efficient"
  },
  {
    slug: "maldives",
    queryValue: "Maldives",
    emoji: "🇲🇻",
    name: "Maldives",
    visaStatus: "Visa on arrival",
    fromPrice: "USD 1,700",
    note: "Emotionally easy to want, with a relatively light arrival process if your lodging and return plans are solid.",
    rhythm: "High-feel island trip",
    bestFor: "Couples and reset trips",
    budgetBand: "Mid-range to luxury",
    stay: "Four to five days",
    routeMood: "Dreamy, expensive, lighter admin"
  },
  {
    slug: "singapore",
    queryValue: "Singapore",
    emoji: "🇸🇬",
    name: "Singapore",
    visaStatus: "Embassy visa",
    fromPrice: "USD 1,450",
    note: "Efficient and premium, but still a structured route where a clean application matters.",
    rhythm: "Premium city precision",
    bestFor: "Travelers who want a clean urban trip",
    budgetBand: "Mid-range to luxury",
    stay: "Four to five days",
    routeMood: "Precise, premium, controlled"
  },
  {
    slug: "united-kingdom",
    queryValue: "United Kingdom",
    emoji: "🇬🇧",
    name: "United Kingdom",
    visaStatus: "Embassy visa",
    fromPrice: "USD 1,800",
    note: "Familiar and highly desired for many Nigerian travelers, but still a paperwork-first route that rewards early planning.",
    rhythm: "High-familiarity route",
    bestFor: "Family visits, short city trips, familiar travel patterns",
    budgetBand: "Mid-range to luxury",
    stay: "One week",
    routeMood: "Familiar, serious, document-led"
  },
  {
    slug: "united-states",
    queryValue: "United States",
    emoji: "🇺🇸",
    name: "United States",
    visaStatus: "Embassy visa",
    fromPrice: "USD 2,200",
    note: "Usually a milestone trip, so the long lead time and interview process make more sense when the purpose is clear.",
    rhythm: "High-stakes long-haul",
    bestFor: "Milestone travel and family visits",
    budgetBand: "Mid-range to luxury",
    stay: "One week or more",
    routeMood: "Ambitious, slower, high-commitment"
  }
];

export const destinationMap = new Map(destinationsCatalog.map((entry) => [entry.slug, entry]));
