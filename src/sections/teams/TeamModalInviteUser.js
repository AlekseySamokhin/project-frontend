import PropTypes from 'prop-types';
import TeamModalForm from './TeamModalForm';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

TeamModalInviteUser.propTypes = {
  team: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

// Этот компонент нужен для разделения формы
// на создания нового приглашения и редактирования участника.

export default function TeamModalInviteUser({ team, open, onClose }) {

  const defaultFormValues = {
    username: '',
    display_name: '',
    position: '',
    permissions: {
      full: true,
      team: {
        read: true,
        write: true,
        delete: true,
      },
      folders: [],
    },
  };

  if (open) {
    return (
      <TeamModalForm
        labelButton='invite'
        team={team}
        defaultFormValues={defaultFormValues}
        open={open}
        onClose={onClose}
        request={(data) => axios.post(`api/v1/teams/${team.id}/members`, data)}
      />
    );
  }

  return null;
}
