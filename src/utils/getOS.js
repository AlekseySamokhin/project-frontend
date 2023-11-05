export default function getOS() {
  if (navigator.userAgent.indexOf('Win') !== -1) {
    return 'Windows';
  }
  if (navigator.userAgent.indexOf('Mac') !== -1) {
    return 'MacOs';
  }
  return 'Linux';
}
