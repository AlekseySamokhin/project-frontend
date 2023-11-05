// import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon, PlanTurboPremium } from '../assets';

// ----------------------------------------------------------------------

const LICENSES = ['Standard', 'Standard Plus', 'Extended'];

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: ['JavaScript version', 'TypeScript version', 'Design Resources', 'Commercial applications'],
  icons: [
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_sketch.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_figma.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_js.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_ts.svg',
  ],
}));

// export const _pricingPlans = [
//   {
//     subscription: 'basic',
//     subscriptionColor: '#47E144',
//     icon: <PlanFreeIcon />,
//     price: 0,
//     caption: 'forever',
//     lists: [
//       { text: '3 prototypes', isAvailable: true },
//       { text: '3 boards', isAvailable: true },
//       { text: 'Up to 5 team members', isAvailable: false },
//       { text: 'Advanced security', isAvailable: false },
//       { text: 'Permissions & workflows', isAvailable: false },
//     ],
//     labelAction: 'choose starter',
//   },
//   {
//     subscription: 'basic',
//     subscriptionColor: '#A259FF',
//     icon: <PlanStarterIcon />,
//     price: 0,
//     caption: 'forever',
//     lists: [
//       { text: '3 prototypes', isAvailable: true },
//       { text: '3 boards', isAvailable: true },
//       { text: 'Up to 5 team members', isAvailable: false },
//       { text: 'Advanced security', isAvailable: false },
//       { text: 'Permissions & workflows', isAvailable: false },
//     ],
//     labelAction: 'choose starter',
//   },
//   {
//     subscription: 'basic',
//     subscriptionColor: '#3366FF',
//     icon: <PlanPremiumIcon />,
//     price: 0,
//     caption: 'forever',
//     lists: [
//       { text: '3 prototypes', isAvailable: true },
//       { text: '3 boards', isAvailable: true },
//       { text: 'Up to 5 team members', isAvailable: false },
//       { text: 'Advanced security', isAvailable: false },
//       { text: 'Permissions & workflows', isAvailable: false },
//     ],
//     labelAction: 'choose premium',
//   },
//   {
//     subscription: 'Premium',
//     subscriptionColor: '#FFBF00',
//     icon: <PlanTurboPremium />,
//     price: 9.99,
//     caption: 'saving $124 a year',
//     lists: [
//       { text: '3 prototypes', isAvailable: true },
//       { text: '3 boards', isAvailable: true },
//       { text: 'Up to 5 team members', isAvailable: true },
//       { text: 'Advanced security', isAvailable: true },
//       { text: 'Permissions & workflows', isAvailable: true },
//     ],
//     labelAction: 'choose premium',
//   },
// ];
