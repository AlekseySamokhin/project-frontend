import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import map from 'lodash/map';
import SvgIconStyle from '../../components/SvgIconStyle';
import { useSelector } from '../../redux/store';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

TeamKey.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function TeamKey({ open, onClose }) {
  const { collection: teams } = useSelector((state) => state.teams);
  const [teamName, setTeamName] = useState('');
  const [teamKey, setTeamKey] = useState('');

  const handleChange = (event) => {
    setTeamName(event.target.value);
  };

  const queryToGetKey = (id) => {
    axios
      .get(`api/v1/teams/${id}/key`)
      .then((response) => {
        // handle success
        setTeamKey(response.data.key);
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
      <Stack direction='column' width={420}>
        <Stack direction='row' justifyContent='space-between' py={4} px={3}>
          <Typography variant='h6'>Transfer key</Typography>
          <Stack onClick={onClose}>
            <SvgIconStyle src={`/assets/icons/main/ic_close.svg`} sx={{ width: 22, height: 22 }} />
          </Stack>
        </Stack>
        <Divider sx={{ marginBottom: '20px' }} />
        <Stack px={3} spacing='20px'>
          <FormControl fullWidth sx={{ label: { marginTop: '-6px' } }}>
            <InputLabel
              sx={{
                '&.Mui-focused': {
                  marginTop: '0',
                },
                '&.MuiFormLabel-filled': {
                  marginTop: '0',
                },
              }}
            >
              Team
            </InputLabel>
            <Select label='Team' value={teamName} onChange={handleChange} inputProps={{ sx: { paddingY: 1.25 } }}>
              {map(
                teams,
                (item) =>
                  item?.role !== 'Member' && (
                    <MenuItem key={item.id} value={item.name} onClick={() => queryToGetKey(item.id)}>
                      {item.name}
                    </MenuItem>
                  ),
              )}
            </Select>
          </FormControl>
          <TextField
            sx={{
              label: { marginTop: '-6px' },
              pointerEvents: 'none',
            }}
            InputLabelProps={{
              sx: {
                '&.MuiFormLabel-filled': {
                  marginTop: '0',
                },
                pointerEvents: 'none',
              },
            }}
            inputProps={{ sx: { paddingY: 1.25 }, pointerEvents: 'none' }}
            label='Transfer key'
            value={teamKey}

          />
        </Stack>
        <Divider sx={{ marginTop: '20px' }} />
        <Stack direction='row' justifyContent='end' p={3} spacing={1}>
          <Button
            variant='outlined'
            color='inherit'
            onClick={onClose}
            sx={{
              borderColor: 'grey.300',
            }}
          >
            <Typography color='text.primary' fontWeight={800} fontSize={14}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant='contained'
            color='primary'
            sx={{ textTransform: 'none' }}
            onClick={() =>
              navigator.clipboard.writeText(teamKey).then(() => {
                onClose();
                setTimeout(() => {
                  setTeamKey('');
                  setTeamName('');
                }, 500);
              })
            }
          >
            <Typography color='white' fontWeight={800} fontSize={14}>
              Copy to clipboard
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}
