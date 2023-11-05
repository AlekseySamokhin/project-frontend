import _mock from './_mock';
import { randomInArray } from './funcs';

// ----------------------------------------------------------------------

export const _folderColorSettings = [...Array(6)].map((_, index) => ({
  id: index,
  color: _mock.color(index),
  is_selected: false,
}));

export const _folderIconSettings = [...Array(12)].map((_, index) => ({
  id: index,
  icon: randomInArray([
    'Moon',
    'Key',
    'Social',
  ]),
  is_selected: false,
}));

