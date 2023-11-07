import axios from 'axios';

const TEST_URL = 'http://localhost:3004';

export const fetchTest = (params) => axios.post(`${TEST_URL}/users`, params);
