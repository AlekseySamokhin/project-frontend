import { PlanFreeIcon, PlanPremiumIcon, PlanStarterIcon, PlanTurboPremium } from '../../assets';

export const fetchPayment = () => ({
  data: [
    {
      subscription: 'basic',
      favoriteChoice: false,
      subscriptionColor: '#47E144',
      icon: <PlanFreeIcon />,
      price: 0,
      caption: 'forever',
      lists: [
        { text: '3 prototypes', isAvailable: true },
        { text: '3 boards', isAvailable: true },
        { text: 'Up to 5 team members', isAvailable: false },
        { text: 'Advanced security', isAvailable: false },
        { text: 'Permissions & workflows', isAvailable: false },
      ],
      labelAction: 'choose starter',
    },
    {
      subscription: 'basic',
      favoriteChoice: false,
      subscriptionColor: '#A259FF',
      icon: <PlanStarterIcon />,
      price: 0,
      caption: 'forever',
      lists: [
        { text: '3 prototypes', isAvailable: true },
        { text: '3 boards', isAvailable: true },
        { text: 'Up to 5 team members', isAvailable: false },
        { text: 'Advanced security', isAvailable: false },
        { text: 'Permissions & workflows', isAvailable: false },
      ],
      labelAction: 'choose starter',
    },
    {
      subscription: 'basic',
      favoriteChoice: true,
      subscriptionColor: '#3366FF',
      icon: <PlanPremiumIcon />,
      price: 0,
      caption: 'forever',
      lists: [
        { text: '3 prototypes', isAvailable: true },
        { text: '3 boards', isAvailable: true },
        { text: 'Up to 5 team members', isAvailable: false },
        { text: 'Advanced security', isAvailable: false },
        { text: 'Permissions & workflows', isAvailable: false },
      ],
      labelAction: 'choose premium',
    },
    {
      subscription: 'Premium',
      favoriteChoice: false,
      subscriptionColor: '#FFBF00',
      icon: <PlanTurboPremium />,
      price: 9.99,
      caption: 'saving $124 a year',
      lists: [
        { text: '3 prototypes', isAvailable: true },
        { text: '3 boards', isAvailable: true },
        { text: 'Up to 5 team members', isAvailable: true },
        { text: 'Advanced security', isAvailable: true },
        { text: 'Permissions & workflows', isAvailable: true },
      ],
      labelAction: 'choose premium',
    },
  ],
});