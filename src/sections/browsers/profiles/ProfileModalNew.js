import { ProfileModalForm } from './index';
import getOS from '../../../utils/getOS';

export default function ProfileModalNew({ open, closeModal }) {

  const defaultValues = {
    name: '',
    status: '',
    tags: [],
    platform: getOS(),
    proxy: 'No proxy',
    selectDataProxy: '',

    cookies: '',
    note: 'Rule YouTube When you browse through videos at YouTube, which do you usually click first',
    useragent: '',

    type: 'HTTP',
    webRTC: 'Altered',
    ip: '',
    canvas: 'Real',
    webGL: 'Real',
    webGLInfo: 'Manual',
    clientRects: 'Real',
    timezone: 'Auto',
    language: 'Auto',
    geolocation: 'Auto',
    latitude: '',
    longitude: '',
    accuracy: '',
    cpu: 'Real',
    memory: 'Real',
    screen: 'Real',
    resolution: '',
    mediaDevice: 'Real',
    audioInput: '1',
    audioOutputs: '1',
    videoInputs: '1',
    ports: 'Real',
    port: [],
    track: false,
    line: false,

    vendor: '',
    renderer: '',
    cores: '',
    gb: '',

    command: '',
  };

  // if (open) {
    return (
      <ProfileModalForm
        open={open}
        closeModal={closeModal}
        defaultValues={defaultValues}
      />
    );
  // }

  // return null;
}
