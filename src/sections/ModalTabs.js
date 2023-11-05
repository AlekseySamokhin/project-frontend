import { IconButton, Stack, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import SvgIconStyle from '../components/SvgIconStyle';
import CustomIcon from '../components/CustomIcon';

// ----------------------------------------------------------------------

ModalTabs.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  tabValue: PropTypes.string.isRequired,
  tableHeads: PropTypes.array.isRequired,
  handleChange: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ModalTabs({ tabValue, onCloseModal, tableHeads, handleChange }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ borderBottom: 1, borderColor: 'divider', pr: 1.5, pl: 3 }}
    >
      <Tabs
        allowScrollButtonsMobile
        value={tabValue}
        variant="scrollable"
        onChange={(event, newValue) => handleChange(newValue)}
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: 'space-between',
          },
        }}
      >
        {tableHeads.map((tab) => (
          <Tab
            disableRipple
            label={tab.label}
            value={tab.id}
            key={tab.id}
            icon={
              <CustomIcon
                src={tab.src}
                width={tab.iconWidth}
                height={tab.iconHeight}
                boxHeight={24}
                boxWidth={24}
                sx={{ bgcolor: tab.id === tabValue ? 'primary.main' : 'text.secondary' }}
              />
            }
          />
        ))}
      </Tabs>

      <IconButton disableRipple onClick={onCloseModal} sx={{ p: 0 }}>
        <SvgIconStyle src={`/assets/icons/main/ic_close.svg`} sx={{ width: 24, height: 24 }} />
      </IconButton>
    </Stack>
  );
}
