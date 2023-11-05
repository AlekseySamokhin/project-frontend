// const rootUrl = https://${process.env.ROOT_PATH};
// const serverUrl = https://${process.env.SERVER_PATH};
import axios from 'axios';

const serverUrl = 'http://localhost:3031/';

export const axiosClient = () =>
  axios.create({
    // responseType: 'JSON',
    baseURL: serverUrl,
    headers: headers(),
  });

const headers = () => ({
  'access-token': typeof localStorage !== 'undefined' ? localStorage.getItem('access-token') : '',
  'token-type': typeof localStorage !== 'undefined' ? localStorage.getItem('token-type') : '',
  client: typeof localStorage !== 'undefined' ? localStorage.getItem('client') : '',
  expiry: typeof localStorage !== 'undefined' ? localStorage.getItem('expiry') : '',
  uid: typeof localStorage !== 'undefined' ? localStorage.getItem('uid') : '',
  'Content-Type': 'application/json',
});
