import _mock from './_mock';

// ----------------------------------------------------------------------

export const _changelog = [...Array(25)].map((_, index) => ({
  id: _mock.id(index),
  message: 'New → In work',
  date: '18.05.2022',
}));
