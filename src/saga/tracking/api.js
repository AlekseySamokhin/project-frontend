import { _tracking1, _tracking2, _tracking3, _tracking4 } from '../../_mock/_tracking';
import _folderTracking from '../../_mock/_folder_tracking';
import { _changelog } from '../../_mock/_changelog';

const getDate = (folderId) => {
  switch (folderId) {
    case 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1':
      return _tracking1;
    case 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2':
      return _tracking2;
    case 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3':
      return _tracking3;
    default:
      return _tracking4;
  }
};

export const fetchFolderTracking = () => {
  console.log('fetchFolderTracking');
  return { data: _folderTracking };
};

export const fetchTracking = ({ folderId }) => {
  console.log('trackingRequest', `folder_id - ${folderId}`);
  return { data: getDate(folderId) };
};

export const fetchChangelog = () => {
  console.log('fetchChangelog', 'folder_id - ');
  return { data: _changelog };
};


