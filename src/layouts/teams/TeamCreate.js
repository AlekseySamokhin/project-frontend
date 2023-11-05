import PropTypes from 'prop-types';
import { Box, Button, Grid, Popover, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { cloneDeep, map, toUpper } from 'lodash';
import truncate from 'lodash/truncate';
import Image from '../../components/Image';
import axios from '../../utils/axios';
import { teamsRequested } from '../../redux/slices/teams';
import { useDispatch, useSelector } from '../../redux/store';
import usePopoverPosition from '../../hooks/usePopoverPosition';
import { personalityRequested } from '../../redux/slices/personality';

// ----------------------------------------------------------------------

TeamCreate.propTypes = {
  event: PropTypes.object,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function TeamCreate({ event, open, onClose, anchorEl }) {
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState('');
  const [image, setImage] = useState();

  const popover = usePopoverPosition(event, 247, 'vertical');
  const initPositions = useSelector((state) => state.personality.data.teams);
  const [teamsPosition, setTeamsPosition] = useState(null);

  useEffect(() => {
    setTeamsPosition(
      map(cloneDeep(initPositions), (item) => {
        item.position = parseInt(item.position, 10);
        return item;
      }),
    );
  }, [initPositions, dispatch]);

  const newPosition = () => {
    const onlyPositionsOfClone = map(teamsPosition, (item) => item.position);
    const biggestPosition = onlyPositionsOfClone.sort((a, b) => b - a);
    return biggestPosition[0] + 1;
  };

  const fileRef = useRef();

  const handleChange = (e) => {
    if (e.target.files) {
      const [file] = e.target.files;
      setImage(URL.createObjectURL(file));
    }
    return null;
  };

  const onSubmit = async () => {
    try {
      await axios
        .post(`api/v1/teams/new`, { name: teamName })
        .then((response) => {
          axios.put(`api/v1/personality/teams`, {
            teams: [...teamsPosition, { id: response.data.id, position: newPosition() }],
          });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });

      cancel();

      dispatch(personalityRequested());
      dispatch(teamsRequested());
    } catch (error) {
      console.error(error);

      cancel();
    }
  };

  const cancel = () => {
    setTeamName('');
    setImage('');
    onClose();
  };

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: popover?.anchorOrVer,
        horizontal: popover?.anchorOrHor,
      }}
      transformOrigin={{
        vertical: popover?.transformOrVer,
        horizontal: popover?.transformOrHor,
      }}
      PaperProps={{
        sx: {
          p: '20px',
          width: '286px',
          borderRadius: '12px',
          ...popover.sx,
        },
      }}
    >
      <Grid container direction='column'>
        <Grid container item direction='column' alignItems='center' justifyContent='space-between' pb={1.75}>
          {image ? (
            <Image
              src={image}
              alt='Team Avatar'
              style={{
                borderRadius: '50%',
                minWidth: 64,
                maxWidth: 64,
                minHeight: 64,
                maxHeight: 64,
              }}
            />
          ) : (
            <Box
              width={64}
              height={64}
              borderRadius='50%'
              alignItems='center'
              justifyContent='center'
              bgcolor='grey.400'
              display='flex'
            >
              <Typography fontSize={14} color='grey.600' fontWeight='600'>
                {toUpper(truncate(teamName, { length: 2, omission: '' }))}
              </Typography>
            </Box>
          )}
        </Grid>
        <Button
          variant='outlined'
          color='inherit'
          sx={{
            borderColor: 'grey.300',
            marginBottom: '4px',
          }}
          onClick={() => fileRef.current.click()}
        >
          <Typography color='text.primary' fontWeight={800} fontSize={14}>
            Browse Image
          </Typography>
        </Button>
        <input
          ref={fileRef}
          onChange={handleChange}
          multiple={false}
          type='file'
          accept='.png, .jpg, .jpeg, .svg'
          hidden
        />
        <TextField
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
          label='Team name'
          inputProps={{ sx: { paddingY: 1 } }}
          InputLabelProps={{
            sx: {
              '&.MuiFormLabel-filled': {
                marginTop: '0',
              },
              '&.Mui-focused': {
                marginTop: '0',
              },
            },
          }}
          sx={{
            label: { marginTop: '-8px' },
            mt: 1,
          }}
        />
        <Stack direction='row' justifyContent='end' spacing={1} mt={1.5}>
          <Button
            variant='outlined'
            color='inherit'
            sx={{
              borderColor: 'grey.300',
            }}
            onClick={() => cancel()}
          >
            <Typography color='text.primary' fontWeight={800} fontSize={14}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant='contained'
            disabled={teamName.length < 3 && true}
            color='primary'
            sx={{ textTransform: 'none' }}
            onClick={() => onSubmit()}
          >
            <Typography color='white' fontWeight={800} fontSize={14}>
              Create team
            </Typography>
          </Button>
        </Stack>
      </Grid>
    </Popover>
  );
}
