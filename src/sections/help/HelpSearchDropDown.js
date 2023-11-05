import { Menu, MenuItem } from '@mui/material';
import map from 'lodash/map';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useSelector } from '../../redux/store';

// ----------------------------------------------------------------------

HelpSearchDropDown.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  anchorEl: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function HelpSearchDropDown({ open, onClose, anchorEl }) {
  // const { push } = useRouter();

  const helpCards = useSelector((state) => state.help.collection);

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{ top: '45px' }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {map(helpCards, (card) => (
        <MenuItem
          // onClick={() => push(PATH_HELP.articlesCardId(card?.id))}
          key={card?.id}
        >
          {card?.title}
        </MenuItem>
      ))}
    </Menu>
  );
}
