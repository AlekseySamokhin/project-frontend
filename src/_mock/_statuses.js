import _mock from './_mock';
import { randomInArray } from './funcs';

// ----------------------------------------------------------------------

export const _statuses = [...Array(100)].map((_, index) => ({
  id: _mock.id(index),
  name: randomInArray(['Status #1', 'Status #2', 'Status #3', 'Status #4', 'Status #5']),
  profiles: '1',
  color: randomInArray(['primary', 'secondary', 'warning', 'error', 'default']),
}));
