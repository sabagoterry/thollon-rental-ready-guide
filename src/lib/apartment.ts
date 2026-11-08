export const balconies = [
  { position: 'front', facing: 'south' },
  { position: 'rear', facing: 'north' },
] as const;
export const washingFacilities = {
  fullSizeBathrooms: 1,
  showerEnsuites: 1,
  description: '1 full-size bathroom and 1 shower ensuite',
  descriptionFr: '1 salle de bains complète et 1 salle d’eau attenante',
} as const;
/** Owner-confirmed house rules; price is not yet confirmed. */
export const houseRules = {
  checkIn: '4pm',
  checkOut: '10am',
  pets: 'No pets.',
  smoking: 'Strictly no smoking anywhere, including on the balconies.',
  cleaning: 'Cleaning can be arranged.',
  linen: 'Bed linen can be provided at an extra cost.',
  cancellation: 'Free cancellation up to 45 days before arrival; after that a scaled cancellation charge applies.',
} as const;

export const apartmentAmenities = {
  parkingFree: true,
  towelsOnRequest: true,
  skiingMinutes: 5,
  hikingAtDoorstep: true,
} as const;
/** Owner-confirmed amenities, bilingual; shared by the page and the guest assistant. */
export const amenityList = [
  { en: 'Fibre Wifi', fr: 'Wifi fibre' },
  { en: 'Smart TV', fr: 'Smart TV' },
  { en: 'Fire TV', fr: 'Fire TV' },
  { en: 'Coffee machine', fr: 'Machine à café' },
  { en: 'Coffee maker', fr: 'Cafetière' },
  { en: 'Kettle', fr: 'Bouilloire' },
  { en: 'Toaster', fr: 'Grille-pain' },
  { en: 'Microwave', fr: 'Micro-ondes' },
  { en: '2 x Fridge Freezer', fr: '2 réfrigérateurs-congélateurs' },
  { en: 'Slow cooker', fr: 'Mijoteuse' },
  { en: 'Fondue', fr: 'Fondue' },
  { en: 'Hairdryer', fr: 'Sèche-cheveux' },
  { en: 'Iron', fr: 'Fer à repasser' },
  { en: 'Travel cot (Available on Request)', fr: 'Lit parapluie (disponible sur demande)', onRequest: true },
  { en: 'High chair (Available on Request)', fr: 'Chaise haute (disponible sur demande)', onRequest: true },
  { en: 'Outdoor furniture', fr: 'Mobilier d’extérieur' },
  { en: 'Launderette nearby', fr: 'Laverie à proximité' },
  { en: 'Smoke alarm', fr: 'Détecteur de fumée' },
  { en: 'Carbon monoxide alarm', fr: 'Détecteur de monoxyde de carbone' },
  { en: 'Fire extinguisher', fr: 'Extincteur' },
  { en: 'First aid kit', fr: 'Trousse de premiers secours' },
] as const;

export const sleepingCapacity = {
  comfortableGuests: 4,
  sofaBed: true,
  answer: 'The apartment comfortably sleeps 4, but we also have a sofa bed, so it depends on the size of the party, please just ask.',
  answerFr: 'L’appartement accueille confortablement 4 personnes, mais nous avons aussi un canapé-lit ; cela dépend donc de la taille du groupe, n’hésitez pas à nous demander.',
} as const;
