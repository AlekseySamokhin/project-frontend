export const PROFILE_BUTTONGROUP_TYPE = ['Windows', 'MacOs', 'Linux'];

export const PROFILE_PROXY = ['No proxy', 'Select proxy', 'Add proxy'];

export const OPTION_1 = ['Auto', 'Manual'];

export const OPTION_2 = ['Off', 'Real', 'Altered', 'Manual'];

export const OPTION_3 = ['Off', 'Real', 'Noise'];

export const OPTION_4 = ['Real', 'Noise'];

export const OPTION_5 = ['Real', 'Protect'];

export const OPTION_6 = ['Real', 'Manual'];

export const PROFILE_RANDOMIZE = [
  { label: 'Name', key: 'name', displayMethod: 'text', path: 'name' },
  { label: 'Status', key: 'status', displayMethod: 'text', path: 'status' },
  { label: 'tags', key: 'tags', displayMethod: 'array', path: 'tags' },
  { label: 'platform', key: 'platform', displayMethod: 'text', path: 'platform' },
  { label: 'Useragent', key: 'useragent', displayMethod: 'text', path: 'useragent' },
  { label: 'Proxy', key: 'proxy', displayMethod: 'text', path: 'proxy' },
  {
    label: 'webRTC',
    key: 'webRTC',
    displayMethod: 'text',
    displayMethodActive: 'text',
    path: 'ip',
  },
  { label: 'canvas', key: 'canvas', displayMethod: 'text', path: 'canvas' },
  { label: 'webGL', key: 'webGL', displayMethod: 'text', path: 'webGL' },
  {
    label: 'Webgl info',
    key: 'webGLInfo',
    displayMethod: 'array',
    path: ['vendor', 'renderer'],
  },
  { label: 'client reacts', key: 'clientRects', displayMethod: 'text', path: 'clientRects' },
  { label: 'Timezone', key: 'timezone', displayMethod: 'text', path: 'timezone' },
  { label: 'Language', key: 'language', displayMethod: 'text', path: 'language' },
  { label: 'geolocation', key: 'geolocation', displayMethod: 'array', path: ['latitude', 'longitude', 'accuracy'] },
  { label: 'CPU', key: 'cpu', displayMethod: 'text', path: 'cpu' },
  { label: 'Memory', key: 'memory', displayMethod: 'text', path: 'memory' },
  {
    label: 'Screen',
    key: 'screen',
    displayMethod: 'text',
    path: 'resolution',
  },
  {
    label: 'Media devices',
    key: 'mediaDevice',
    displayMethod: 'array',
    path: ['audioInput', 'audioOutputs', 'videoInputs'],
  },
  { label: 'do not track', key: 'track', displayMethod: 'boolean', path: 'track' },
];
