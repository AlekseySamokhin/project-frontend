import { Button, Popover, Stack, Typography } from '@mui/material';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import { LanguageImg } from './NavBottom';
import usePopoverPosition from '../../hooks/usePopoverPosition';

NavLanguagePopover.propTypes = {
  open: PropTypes.bool,
  event: PropTypes.object,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func,
  LANGUAGES: PropTypes.array,
  changeLanguage: PropTypes.func,
  currentLanguage: PropTypes.string,
  orientation: PropTypes.string,
};

export default function NavLanguagePopover({
                                             open,
                                             event,
                                             anchorEl,
                                             onClose,
                                             LANGUAGES,
                                             changeLanguage,
                                             currentLanguage,
                                             orientation,
                                           }) {

  const popover = usePopoverPosition(event, 136, orientation, 266);


  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: popover.anchorOrVer,
        horizontal: popover.anchorOrHor,
      }}
      transformOrigin={{
        vertical: popover.transformOrVer,
        horizontal: popover.transformOrHor,
      }}
      PaperProps={{
        sx: { p: '6px', width: 216, ...popover.sx },
      }}
    >
      <Stack>

        {map(LANGUAGES, (language) => language.id !== currentLanguage &&
          <Button
            fullWidth
            key={language.id}
            size='medium'
            variant='text'
            sx={{
              justifyContent: 'start',
              p: '8px 16px',
              mb: '2px',
              color: 'text.primary',
            }}
            startIcon={<LanguageImg width={24} height={19} src={language.icon} />}
            onClick={() => {
              changeLanguage(language.id);
              onClose();
            }}
          >
            <Typography variant='body2'>{language.label}</Typography>
          </Button>,
        )}

      </Stack>
    </Popover>
  );
}
