import _mock from './_mock';
import { randomNumber } from './funcs';

const _folderTracking = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  folder_name: ['Arbitrageurs', 'Beginners', 'Verified', 'Verified'][index],
  locked: [false, false, false, true][index],
  folder_color: _mock.color(randomNumber(5)),
  order: index.toString(),
  folder_icon: index === 3 ? 'folder_locked' : 'folders',
}));

export default _folderTracking;
