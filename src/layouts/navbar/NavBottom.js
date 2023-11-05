import { useState } from 'react';
import {
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import map from 'lodash/map';
import { styled } from '@mui/material/styles';
import SvgIconStyle from '../../components/SvgIconStyle';
import useSettings from '../../hooks/useSettings';
import NavLanguagePopover from './NavLanguagePopover';
import CustomIcon from '../../components/CustomIcon';
import Avatar from '../../components/Avatar';

// ----------------------------------------------------------------------

const LANGUAGES = [
  { id: 'pt', label: 'Portuguese', icon: '/assets/icons/flags/ic_flag_pt.png' },
  { id: 'cn', label: 'Chinese', icon: '/assets/icons/flags/ic_flag_cn.png' },
  { id: 'ru', label: 'Russian', icon: '/assets/icons/flags/ic_flag_ru.png' },
  { id: 'en', label: 'English', icon: '/assets/icons/flags/ic_flag_en.png' },
];

export const LanguageImg = styled('img')({
  borderRadius: 4,
});

// ----------------------------------------------------------------------

export default function NavBottom() {
  const { themeMode, onChangeMode } = useSettings();

  const [radioValue, setRadioValue] = useState('Personal');

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [popoverLanguage, setPopoverLanguage] = useState({ open: false, anchorEl: null });

  const [isCollapseOpen, setIsCollapseOpen] = useState(true);

  const [event, setEvent] = useState(null);

  return (
    <Stack alignItems='center' p={2}>
      <Stack bgcolor='rgba(51, 102, 255, 0.08)' width='100%' borderRadius='12px' p={1.5}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
              <Typography variant='subtitle2' align='center' sx={{ textTransform: 'uppercase' }}>
                AY
              </Typography>
            </Avatar>

            <Stack direction='column'>
              <Typography variant='subtitle2'>Anton Yeva</Typography>

              <Typography variant='body2' color='text.secondary'>
                Trial
              </Typography>
            </Stack>
          </Stack>

          <IconButton onClick={() => setIsCollapseOpen((prevState) => !prevState)}>
            <SvgIconStyle
              src={isCollapseOpen ? '/assets/icons/main/ic_minus.svg' : '/assets/icons/main/ic_drop.svg'}
              sx={{ width: 18, height: 18 }}
            />
          </IconButton>
        </Stack>

        <Collapse in={isCollapseOpen} timeout='auto' unmountOnExit>
          <Divider sx={{ my: 2 }} />

          <Stack>
            <RadioGroup
              name='controlled-radio-buttons-group'
              value={radioValue}
              onChange={(event, value) => setRadioValue(value)}
            >
              <FormControlLabel value='Personal' control={<Radio size='small' />} label='Personal' sx={{ m: 0 }} />

              <FormControlLabel value='Team' control={<Radio size='small' />} label='Team' sx={{ m: 0 }} />
            </RadioGroup>
          </Stack>
        </Collapse>
      </Stack>

      <Stack alignItems='center' justifyContent='space-between' direction='row' mt={1.5} width='100%'>
        <Button
          variant='outlined'
          color='inherit'
          fullWidth
          onClick={() => onChangeMode({ target: { value: themeMode === 'light' ? 'dark' : 'light' } })}
          startIcon={
            <CustomIcon
              src={themeMode === 'light' ? '/assets/icons/main/ic_moon.svg' : '/assets/icons/main/ic_sun.svg'}
              width={16}
              height={16}
            />
          }
          sx={{ whiteSpace: 'nowrap' }}
        >
          {themeMode === 'light' ? 'Dark mode' : 'Light mode'}
        </Button>

        <Button
          variant='outlined'
          color='inherit'
          onClick={(event) => {
            setPopoverLanguage({ open: true, anchorEl: event.currentTarget });
            setEvent(event);
          }}
          sx={{
            minWidth: 55,
            minHeight: 36,
            ml: 1.5,
            p: 0,
          }}
        >
          {map(LANGUAGES, (language, key) => language.id === currentLanguage &&
            <LanguageImg key={key} src={language.icon} width={24} height={19} />,
          )}

        </Button>

        <NavLanguagePopover
          open={popoverLanguage.open}
          event={event}
          orientation='vertical'
          anchorEl={popoverLanguage.anchorEl}
          onClose={() => setPopoverLanguage({ open: false, anchorEl: null })}
          currentLanguage={currentLanguage}
          LANGUAGES={LANGUAGES}
          changeLanguage={(newLanguage) => setCurrentLanguage(newLanguage)}
        />
      </Stack>
    </Stack>
  );
}
