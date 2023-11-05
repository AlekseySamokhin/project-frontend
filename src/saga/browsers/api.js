import axios from '../../utils/axxios';

export const fetchFolder = () => axios.get('api/v1/folders');

export const fetchProxy = ({ folderId, params }) => {

  const { name, country, proxy_type, status } = params;
  let api = '';

  if (name) {
    api += `&name=${name}`;
  }

  if (proxy_type) {
    api += `&proxy_type=${proxy_type}`;
  }

  if (country) {
    api += `&country=${country}`
  }

  if (status) {
    api += `&&proxy_type=${status}`
  }

  if (name || country || proxy_type || status) {
    return axios.get(`api/v1/folders/${folderId}/proxies?${api}`);
  }

  return axios.get(`api/v1/folders/${folderId}/proxies`);
}

export const fetchProfile = ({ folderId, params}) => {

  const { pn, ps, name, profile_user, tag, status, main_website, proxy } = params;

  let api = `?pn=${pn}&ps=${ps}`;

  if (name) {
    api += `&name=${name}`;
  }

  if (profile_user) {
    api += `&profile_user=${profile_user}`;
  }

  if (tag) {
    api += `&tags=${tag}`;
  }

  if (status) {
    api += `&status=${status}`;
  }

  if (main_website) {
    api += `&main_website=${main_website}`;
  }

  if (proxy) {
    api += `&proxy=${proxy}`;
  }
console.log(api, "aoi")
  return axios.get(`api/v1/folders/${folderId}/profiles${api}`);
};


export const fetchProxyFilterData = ({ folderId }) => axios.get(`api/v1/folders/${folderId}/proxies/filters`);

export const fetchProfileFilterData = ({ folderId }) => axios.get(`api/v1/folders/${folderId}/profiles/filters`);

export const updateProfile = ({ folder_id, id, data }) => axios.put(`api/v1/folders/${folder_id}/profiles/${id}`, data);

export const fetchProfileProxyUpdate = ({ profileId }) => {
  console.log('profileProxyUpdateRequest', 'id - ', profileId);
  const ip = '117.242.23.73';
  const id = profileId;
  return { data: { id, ip } };
};

export const fetchProfileStart = ({ profileId }) => {
  return { data: profileId };
};

export const fetchProfileStop = ({ profileId }) => {
  return { data: profileId };
};

export const fetchStatuses = ({ folderId }) => axios.get(`/api/v1/folders/${folderId}/statuses`);

export const fetchStatusesSimple = ({ folderId }) => axios.get(`/api/v1/folders/${folderId}/statuses/simple`);

export const fetchTags = ({ folderId }) => axios.get(`/api/v1/folders/${folderId}/tags`);

export const fetchTagsSimple = ({ folderId }) => axios.get(`/api/v1/folders/${folderId}/tags/simple`);

export const fetchFingerprints = (device) => axios.post(`api/v1/fingerprints/${device.toLowerCase()}/variations`, {
  fields: ['webgl', 'timezone', 'language', 'hardware_concurrency', 'device_memory', 'resolution'],
});
