import React from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Scrollbar from '../../../components/Scrollbar';
import { PROFILE_RANDOMIZE } from './ProfileConfig';
import axios from '../../../utils/axios';
import RandomizePath from './RandomizePath';


ProfileModalRandomize.propTypes = {
  setValue: PropTypes.func,
  control: PropTypes.object,
};

function ProfileModalRandomize({ setValue, control }) {
  const platform = useWatch({
    name: 'platform',
    control,
  });

  const handleRandomizeValue = async () => {
    axios
      .get(`api/v1/fingerprints/${platform.toLowerCase()}/101`)
      .then((response) => {
        console.log(response)
        // handle success
        setValue('useragent', response.data.data.fingerprint.navigator.user_agent);
        setValue('vendor', response.data.data.fingerprint.webgl.unmasked_vendor);
        setValue('renderer', response.data.data.fingerprint.webgl.unmasked_renderer);
        setValue('cpu', response.data.data.fingerprint.navigator.hardware_concurrency);
        setValue('memory', response.data.data.fingerprint.navigator.device_memory);
        setValue('resolution', `${response.data.data.fingerprint.screen.width}x${response.data.data.fingerprint.screen.height}`);
        setValue('screen', 'Manual');
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
    <>
      <Button
        fullWidth
        variant="contained"
        color="inherit"
        sx={{ mb: 2 }}
        onClick={() => handleRandomizeValue()}
        startIcon={<SvgIconStyle src={'/assets/icons/main/ic_random.svg'} sx={{ width: 20, height: 20 }} />}
      >
        Randomize
      </Button>

      <Scrollbar>
        <Stack sx={{ bgcolor: 'background.neutral', borderRadius: '8px', p: 2 }}>
          {PROFILE_RANDOMIZE.map((item, index) => (
            <Stack key={index}>
              <Typography variant="overline2" sx={{ color: 'grey.600' }}>
                {item.label}
              </Typography>

              <RandomizePath item={item} control={control} />

              <Divider
                light
                sx={{
                  mt: '3px',
                  mb: '3px',
                  display: index === PROFILE_RANDOMIZE.length - 1 ? 'none' : 'block',
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Scrollbar>
    </>
  );
}

export default ProfileModalRandomize;
