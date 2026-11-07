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
