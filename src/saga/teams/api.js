import axios from '../../utils/axios';

export const fetchTeams = () => axios.get('api/v1/teams/list');

export const fetchListMembers = ({ teamId }) => axios.get(`api/v1/teams/${teamId}/members`);
