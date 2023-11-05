import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import axios from '../../utils/axios';
import { useDispatch } from '../../redux/store';
import { teamsRequested } from '../../redux/slices/teams';

TeamModalRecovery.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default function TeamModalRecovery({ open, onClose, name, id }) {
  const dispatch = useDispatch();
  const recoveryQuery = () => {
    axios
      .get(`api/v1/teams/${id}/recover`)
      .then(() => {
        // handle success
        dispatch(teamsRequested());
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack>
        <DialogTitle>Recovery</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="span">{'Are you sure you want to restore the '}</Typography>
            <Typography component="span" color="primary" fontWeight={800}>
              {name}
            </Typography>
            <Typography component="span">{' team?'}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            sx={{
              borderColor: 'grey.300',
            }}
          >
            <Typography color="text.primary" fontWeight={800} fontSize={14}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => recoveryQuery()}
            sx={{
              borderColor: 'grey.300',
            }}
          >
            <Typography color="white" fontWeight={800} fontSize={14}>
              Recovery
            </Typography>
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}
