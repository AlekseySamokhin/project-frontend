import _mock from './_mock';

// ----------------------------------------------------------------------

export const _tags = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.tags(index),
}));
