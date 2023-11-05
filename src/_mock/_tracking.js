import _mock from './_mock';
import { randomInArray } from './funcs';

// ----------------------------------------------------------------------

export const _tracking1 = [...Array(100)].map((_, index) => ({
  id: _mock.id(index),
  profile_name: 'Test',
  initiator: 'Denis Kovalev',
  last_message: randomInArray([
    { title: 'Folder', text: 'Moved form [Folder] to [Unavailable]' },
    { title: 'Status', text: 'New → In work' },
    { title: 'Proxy', text: 'Moved form [Folder] to [Unavailable]' },
  ]),
  date: '18.05.2022',
}));
export const _tracking2 = [...Array(100)].map((_, index) => ({
  id: _mock.id(index),
  profile_name: 'Test2',
  initiator: 'Artem Ivanov',
  last_message: randomInArray([
    { title: 'Folder', text: 'Moved form [Folder] to [Unavailable]' },
    { title: 'Status', text: 'New → In work' },
    { title: 'Proxy', text: 'Moved form [Folder] to [Unavailable]' },
  ]),
  date: '18.05.2022',
}));
export const _tracking3 = [...Array(100)].map((_, index) => ({
  id: _mock.id(index),
  profile_name: 'Test3',
  initiator: 'Stepan Petrov',
  last_message: randomInArray([
    { title: 'Folder', text: 'Moved form [Folder] to [Unavailable]' },
    { title: 'Status', text: 'New → In work' },
    { title: 'Proxy', text: 'Moved form [Folder] to [Unavailable]' },
  ]),
  date: '18.05.2022',
}));
export const _tracking4 = [...Array(100)].map((_, index) => ({
  id: _mock.id(index),
  profile_name: 'Test4',
  initiator: 'Ivan Orlov',
  last_message: randomInArray([
    { title: 'Folder', text: 'Moved form [Folder] to [Unavailable]' },
    { title: 'Status', text: 'New → In work' },
    { title: 'Proxy', text: 'Moved form [Folder] to [Unavailable]' },
  ]),
  date: '18.05.2022',
}));
