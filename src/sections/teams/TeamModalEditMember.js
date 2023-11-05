import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash/lang';
import PropTypes from 'prop-types';
import axios from '../../utils/axios';
import TeamModalForm from './TeamModalForm';

// ----------------------------------------------------------------------

TeamModalEditMember.propTypes = {
  team: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  memberId: PropTypes.string.isRequired,
};

// ----------------------------------------------------------------------

export default function TeamModalEditMember({ team, memberId, open, onClose }) {
  const [defaultFormValues, setDefaultFormValues] = useState({});

  useEffect(async () => {
    if (open) {
      try {
        const response = await axios.get(`api/v1/teams/${team.id}/members/${memberId}`);

        setDefaultFormValues(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [open]);

  if (open && !isEmpty(defaultFormValues)) {
    return (
      <TeamModalForm
        labelButton="save"
        team={team}
        defaultFormValues={defaultFormValues}
        open={open}
        onClose={onClose}
        request={(data) => axios.put(`api/v1/teams/${team.id}/members/${memberId}`, data)}
        edit
      />
    );
  }

  return null;
}
