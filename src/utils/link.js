import { matchPath } from 'react-router-dom';

export function isExternalLink(path) {
  return path.includes('http');
}

// export function getActive(path, pathname) {
//   const checkPath = path.startsWith('#');
//
//   return (!checkPath && pathname.includes(path));
// }

export function getActive(path, pathname) {
  return path ? !!matchPath({ path, end: false }, pathname) : false;
}
