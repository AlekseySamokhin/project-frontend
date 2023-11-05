import _mock from './_mock';
import { randomNumber } from './funcs';

// ----------------------------------------------------------------------

export const _folder = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  title: ['Arbitrageurs', 'Beginners', 'Verified', 'Verified'][index],
  color: _mock.color(randomNumber(5)),
  order: index.toString(),
  icon: '/assets/icons/main/ic_folders.svg',
  locked: index === 3,
}));
