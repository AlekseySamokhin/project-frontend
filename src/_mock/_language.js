import _mock from './_mock';

// ----------------------------------------------------------------------

export const _language = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  title: ['English', 'Russian', 'Portuguese', 'French'][index],
  icon: `/assets/icons/flags/${['en', 'ru', 'pt', 'fr'][index]}.svg`,
}));
