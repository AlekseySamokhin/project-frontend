import _mock from './_mock';
import { randomInArray } from './funcs';

// ----------------------------------------------------------------------

export const _profile1 = [...Array(100)].map((_, index) => ({
  id: _mock.id(index),
  name: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  work: randomInArray(['start', 'stop']),
  note: randomInArray(['', 'Test note']),
  tags: randomInArray([
    [
      {
        id: _mock.id(index),
        name: _mock.tags(index),
      },
      {
        id: _mock.id(index + 1),
        name: _mock.tags(index + 1),
      },
    ],
    [],
  ]),
  proxy: randomInArray([
    {},
    {
      ip: '117.242.23.73',
      iconCountry: '/assets/icons/flags/ic_flag_en.svg',
      name: _mock.url.fullUrl(index),
    },
  ]),
}));

export const _profile2 = [...Array(25)].map((_, index) => ({
  id: _mock.id(index),
  name: 'Test 2',
  work: randomInArray(['start', 'stop']),
  note: randomInArray(['', 'Test Note']),
  tags: randomInArray([
    [
      {
        id: _mock.id(index),
        name: _mock.tags(index),
      },
      {
        id: _mock.id(index + 1),
        name: _mock.tags(index + 1),
      },
    ],
    [],
  ]),
  proxy: randomInArray([
    {},
    {
      ip: '117.242.23.73',
      iconCountry: '/assets/icons/flags/ic_flag_en.svg',
      name: _mock.url.fullUrl(index),
    },
  ]),
}));

export const _profile3 = [...Array(25)].map((_, index) => ({
  id: _mock.id(index),
  name: 'Test 3',
  work: randomInArray(['start', 'stop']),
  note: randomInArray(['', 'Test Note']),
  tags: randomInArray([
    [
      {
        id: _mock.id(index),
        name: _mock.tags(index),
      },
      {
        id: _mock.id(index + 1),
        name: _mock.tags(index + 1),
      },
    ],
    [],
  ]),
  proxy: randomInArray([
    {},
    {
      ip: '117.242.23.73',
      iconCountry: '/assets/icons/flags/ic_flag_en.svg',
      name: _mock.url.fullUrl(index),
    },
  ]),
}));

export const _profileFilterUsers = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: 'test',
}));

export const _profileFilterStatuses = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: 'test',
}));

export const _profileFilterMainWebsites = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: 'test',
}));

export const _profileFilterProxies = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: 'test',
}));
