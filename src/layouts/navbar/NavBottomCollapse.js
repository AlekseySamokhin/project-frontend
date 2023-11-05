import { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import map from 'lodash/map';
import useSettings from '../../hooks/useSettings';
import NavLanguagePopover from './NavLanguagePopover';
import CustomIcon from '../../components/CustomIcon';
import Avatar from '../../components/Avatar';
import { LanguageImg } from './NavBottom';


const LANGUAGES = [
  { id: 'pt', label: 'Portuguese', icon: '/assets/icons/flags/ic_flag_pt.png' },
  { id: 'cn', label: 'Chinese', icon: '/assets/icons/flags/ic_flag_cn.png' },
  { id: 'ru', label: 'Russian', icon: '/assets/icons/flags/ic_flag_ru.png' },
  { id: 'en', label: 'English', icon: '/assets/icons/flags/ic_flag_en.png' },
];

// ----------------------------------------------------------------------

export default function NavBottomCollapse() {
  const { themeMode, onChangeMode } = useSettings();


  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [popoverLanguage, setPopoverLanguage] = useState({ open: false, anchorEl: null });


  const [event, setEvent] = useState(null);

  return (
    <Stack px={1.5} py={2}>
      <Stack justifyContent='center' alignItems='center' borderRadius='12px' bgcolor='rgba(51, 102, 255, 0.08)' p='9px'>
        <Avatar sx={{ width: 32, height: 32 }}>
          <Typography variant='subtitle2' align='center' sx={{ textTransform: 'uppercase' }}>
            AY
          </Typography>
        </Avatar>
      </Stack>

      <Button
        variant='outlined'
        color='inherit'
        onClick={(event) => {
          setPopoverLanguage({ open: true, anchorEl: event.currentTarget });
          setEvent(event);
        }}
        sx={{
          minWidth: 50,
          minHeight: 36,
          my: 1.25,
          p: 0,
        }}
      >
        {map(LANGUAGES, (language, key) => language.id === currentLanguage &&
          <LanguageImg key={key} width={24} height={19} src={language.icon} alt='language' />,
        )}
      </Button>

      <NavLanguagePopover
        open={popoverLanguage.open}
        event={event}
        orientation='left'
        anchorEl={popoverLanguage.anchorEl}
        onClose={() => setPopoverLanguage({ open: false, anchorEl: null })}
        currentLanguage={currentLanguage}
        LANGUAGES={LANGUAGES}
        changeLanguage={(newLanguage) => setCurrentLanguage(newLanguage)}
      />

      <Button
        variant='outlined'
        color='inherit'
        onClick={() => onChangeMode({ target: { value: themeMode === 'light' ? 'dark' : 'light' } })}
        sx={{
          minWidth: 50,
          minHeight: 36,
        }}
      >
        <CustomIcon
          src={themeMode === 'light' ? '/assets/icons/main/ic_moon.svg' : '/assets/icons/main/ic_sun.svg'}
          width={16}
          height={16}
        />
      </Button>
    </Stack>
  );
}
