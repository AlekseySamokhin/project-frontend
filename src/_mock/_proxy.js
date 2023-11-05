import _mock from './_mock';
import { randomInArray } from './funcs';

// ----------------------------------------------------------------------

export const _proxy = [...Array(100)].map((_, index) => ({
  id: _mock.id(index),
  name: `${_mock.url.fullUrl(index)}:id_ba4841af${index + 1}:78fafc9a`,
  status: {
    value: randomInArray(['active', 'banned']),
    ip: _mock.url.ip(index),
    updatedAt: '21 d. ago',
    continent: _mock.address.continent(index),
    country: _mock.address.country(index),
    iconCountry: '/assets/icons/flags/ic_flag_en.svg',
  },
  profile: index,
  type: _mock.url.type(index),
  host: _mock.url.host(index),
  port: _mock.url.port(index),
  login: `id_ba4841af${index + 1}`,
}));

export const _proxyFilterTypes = [...Array(2)].map((_, index) => ({
  id: _mock.id(index),
  name: ['http', 'https'][index],
}));

export const _proxyFilterStatuses = [...Array(2)].map((_, index) => ({
  id: _mock.id(index),
  name: ['active', 'banned'][index],
}));

export const _proxyFilterLocations = [...Array(7)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.address.continent(index),
}));


export const _proxyTypeHead = [{
  id: 'HTTP',
  size: 4,
}, {
  id: 'SSH',
  size: 3,
}, {
  id: 'SOCKS4',
  size: 6,
}, {
  id: 'SOCKS5',
  size: 6,
}];
