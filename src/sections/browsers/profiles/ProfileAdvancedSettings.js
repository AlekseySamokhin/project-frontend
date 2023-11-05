import PropTypes from 'prop-types';
import { Box, Divider, Stack, ToggleButton, Typography } from '@mui/material';
import map from 'lodash/map';
import random from 'lodash/random';
import filter from 'lodash/filter';
import size from 'lodash/size';
import { useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import RHFTextField from '../../../components/hook-form/RHFTextField';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { OPTION_1, OPTION_2, OPTION_3, OPTION_4, OPTION_5, OPTION_6 } from './ProfileConfig';
import RHFSwitch from '../../../components/hook-form/RHFSwitch';
import RHFTextFieldNumber from '../../../components/hook-form/RHFTextFieldNumber';
import RHFAutocomplete from '../../../components/hook-form/RHFAutocomplete';
import RHFAutocompleteMultiple from '../../../components/hook-form/RHFAutocompleteMultiple';
import { useSelector } from '../../../redux/store';
import RHFSelect from '../../../components/hook-form/RHFSelect';
import axios from '../../../utils/axios';
import { IPMaskInput, TextMaskCustom } from '../../../components/hook-form/MaskInput';
// ----------------------------------------------------------------------

ProfileAdvancedSettings.propTypes = {
  control: PropTypes.object,
  setValue: PropTypes.func,
  watch: PropTypes.func,
  errors: PropTypes.object,
};

export default function ProfileAdvancedSettings({ control, setValue, watch, errors }) {
  const [platform, vendor, renderer] = useWatch({
    name: ['platform', 'vendor', 'renderer'],
    control,
  });
  const [renderValues, setRenderValues] = useState([]);
  const deviceMemory = useSelector((state) => state.browsers.profile.fingerprints.device_memory);
  const hardwareConcurrency = useSelector(
    (state) => state.browsers.profile.fingerprints.hardware_concurrency,
  );
  const timezone = useSelector((state) => state.browsers.profile.fingerprints.timezone);
  const language = useSelector((state) =>
    map(state.browsers.profile.fingerprints.language, (value) => value[1]),
  );
  const resolution = useSelector((state) => state.browsers.profile.fingerprints.resolution);
  const webGLInfoOption1 = useSelector((state) =>
    map(state.browsers.profile.fingerprints.webgl, (value) => value[1]),
  );
  const webGLInfoOption2 = useSelector((state) => state.browsers.profile.fingerprints.webgl);

  const handleVendor = () => {
    axios
      .get(`api/v1/fingerprints/${platform.toLowerCase()}/101`)
      .then((response) => {
        console.log(response);
        // handle success
        setValue('vendor', response.data.data.fingerprint.webgl.unmasked_vendor);
        setValue('renderer', response.data.data.fingerprint.webgl.unmasked_renderer);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  const handleRenderer = () => {
    const randomValue = random(1, size(renderValues));
    setValue('renderer', renderValues[randomValue - 1]);
  };

  const handleAccuracy = (e) => {
    if (e.target.value >= 0 && e.target.value <= 100) {
      setValue('accuracy', e.target.value);
    }
  };

  const handleUserAgentValue = async () => {
    axios
      .get(`api/v1/fingerprints/${platform.toLowerCase()}/101`)
      .then((response) => {
        // handle success
        setValue('useragent', response.data.data.fingerprint.navigator.user_agent);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  useEffect(() => {
    const sort = filter(webGLInfoOption2, (o) => o[1] === vendor);
    setRenderValues(map(sort, (item) => item[0]));
  }, [vendor, renderer, webGLInfoOption2]);

  // TODO: языки и timezone нужно реализовать поиск в поле. Latitude, Longitude - только числа любые, Accuracy - только положительные
  return (
    <>
      <Stack direction='column' spacing={2}>
        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
          <RHFTextField name='useragent' control={control} label='Useragent' size='small' variant='outlined' />

          <ToggleButton value={false} sx={{ p: 1 }} onClick={() => handleUserAgentValue()}>
            <SvgIconStyle src={`/assets/icons/main/ic_random.svg`} sx={{ width: 24, height: 24 }} />
          </ToggleButton>
        </Stack>

        <Stack direction='row' justifyContent='space-between' spacing={2}>
          <RHFSelect name='webRTC' label='WebRTC' selectData={OPTION_2} />

          <RHFTextField
            id='formatted-text-mask-input-id'
            name='ip'
            control={control}
            label='IP Address'
            size='small'
            InputProps={{
              inputComponent: IPMaskInput,
            }}
            variant='outlined'
            disabled={watch('webRTC') !== 'Manual'}
          />
        </Stack>

        <Stack direction='row' justifyContent='space-between' spacing={2}>
          <RHFSelect name='canvas' label='Canvas' selectData={OPTION_3} />

          <RHFSelect name='webGL' label='WebGL' selectData={OPTION_3} />

          <RHFSelect name='webGLInfo' label='WebGL Info' selectData={OPTION_6} />
        </Stack>

        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
          <RHFSelect
            name="vendor"
            label="Vendor"
            disabled={watch('webGLInfo') !== 'Manual'}
            selectData={webGLInfoOption1}
          />
          <ToggleButton
            value={false}
            disabled={watch('webGLInfo') !== 'Manual'}
            sx={{ p: 1, mb: errors?.vendor?.type ? '24px!important' : 0 }}
            onClick={handleVendor}
          >
            <SvgIconStyle src={`/assets/icons/main/ic_random.svg`} sx={{ width: 24, height: 24 }} />
          </ToggleButton>
        </Stack>

        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
          <RHFSelect
            name='renderer'
            label='Renderer'
            disabled={watch('webGLInfo') !== 'Manual'}
            selectData={renderValues}
          />

          <ToggleButton
            value={false}
            disabled={watch('webGLInfo') !== 'Manual'}
            sx={{ p: 1, mb: errors?.renderer?.type ? '24px!important' : 0 }}
            onClick={handleRenderer}
          >
            <SvgIconStyle src={`/assets/icons/main/ic_random.svg`} sx={{ width: 24, height: 24 }} />
          </ToggleButton>
        </Stack>

        <RHFSelect name='clientRects' label='Client Rects' selectData={OPTION_4} />

        <Stack direction='row' justifyContent='space-between' spacing={2}>
          <RHFAutocomplete name='timezone' label='Timezone' size='small' options={timezone} />

          <RHFAutocomplete name='language' label='Language' size='small' options={language} />
        </Stack>

        <Divider color='primary' />

        <RHFSelect name='geolocation' label='Geolocation' selectData={OPTION_1} />
        {watch('geolocation') === 'Manual' &&
        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
          <RHFTextField
            name='latitude'
            control={control}
            label='Latitude'
            variant='outlined'
            InputProps={{
              inputComponent: TextMaskCustom,
            }}
            disabled={watch('geolocation') !== 'Manual'}
            size='small'
          />

          <RHFTextField
            name='longitude'
            control={control}
            label='Longitude'
            variant='outlined'
            InputProps={{
              inputComponent: TextMaskCustom,
            }}
            disabled={watch('geolocation') !== 'Manual'}
            size='small'
          />

          <RHFTextField
            name='accuracy'
            control={control}
            type='number'
            label='Accuracy'
            variant='outlined'
            onChange={handleAccuracy}
            disabled={watch('geolocation') !== 'Manual'}
            size='small'
          />
        </Stack>}

        <Stack direction='row' justifyContent='space-between' spacing={2}>
          <RHFSelect name='cpu' label='CPU' selectData={hardwareConcurrency} />

          <RHFSelect name='memory' label='Memory' selectData={deviceMemory} />
        </Stack>

        <Divider color='primary' />

        <Stack direction='row' justifyContent='space-between' spacing={2}>
          <RHFSelect name='screen' label='Screen' selectData={OPTION_6} />

          <RHFSelect
            name='resolution'
            label='Resolution'
            selectData={resolution}
            disabled={watch('screen') !== 'Manual'}
          />
        </Stack>

        <RHFSelect name='mediaDevice' label='Media devices' selectData={OPTION_6} />

        <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
          <RHFTextFieldNumber
            type='number'
            name='audioInput'
            variant='outlined'
            size='small'
            label='Audio inputs'
            setValue={setValue}
            disabled={watch('mediaDevice') !== 'Manual'}
            control={control}
          />

          <RHFTextFieldNumber
            type='number'
            name='audioOutputs'
            variant='outlined'
            size='small'
            label='Audio outputs'
            setValue={setValue}
            disabled={watch('mediaDevice') !== 'Manual'}
            control={control}
          />

          <RHFTextFieldNumber
            type='number'
            name='videoInputs'
            variant='outlined'
            size='small'
            label='Video inputs'
            setValue={setValue}
            disabled={watch('mediaDevice') !== 'Manual'}
            control={control}
          />
        </Stack>

        <RHFSelect name='ports' label='Ports' selectData={OPTION_5} />

        <RHFAutocompleteMultiple
          name='port'
          type='number'
          control={control}
          label='Ports to protect'
          disabled={watch('ports') === 'Real'}
          data={['3389', '5900', '5800', '7070', '6568', '5938']}
        />
      </Stack>

      <Divider sx={{ mt: 2, mb: 1 }} />

      <Stack direction='row' alignItems='center'>
        <Stack direction='row' alignItems='center'>
          <RHFSwitch name='track' sx={{ m: '0!important' }} />

          <Typography variant='body2' sx={{ m: 0 }}>
            Do not track
          </Typography>
        </Stack>

        <Stack direction='row' alignItems='center' ml={1}>
          <RHFSwitch name='line' sx={{ m: '0!important' }} />

          <Typography variant='body2'>Command line switches</Typography>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 2, mt: 1 }} />

      <Box mb={2}>
        {watch('line') === true && (
          <RHFTextField
            name='command'
            control={control}
            label='Command line switches'
            variant='outlined'
            size='small'
          />
        )}
      </Box>
    </>
  );
}
