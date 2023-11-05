import _mock from './_mock';

// ----------------------------------------------------------------------

export const _tagsTable = [...Array(100)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.tags(index),
  profiles: '1',
}));
