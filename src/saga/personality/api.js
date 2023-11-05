import axios from '../../utils/axios';

export const fetchPersonality = () => axios.get('api/v1/personality/list');
