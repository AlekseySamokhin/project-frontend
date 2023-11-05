import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, Button, Typography, Box, Stack } from '@mui/material';
import Iconify from '../../components/Iconify';
import SvgIconStyle from '../../components/SvgIconStyle';
import { PaymentModal, PaymentUserInput } from './index';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

PaymentPlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
};
// ----------------------------------------------------------------------

export default function PaymentPlanCard({ card, index }) {
  const [open, setOpen] = useState(false);

  const { subscription, favoriteChoice, subscriptionColor, icon, price, caption, lists, labelAction } = card;

  return (
    <RootStyle>
      {favoriteChoice && (
        <Box
          sx={{
            top: 0,
            right: 15,
            position: 'absolute',
          }}
        >
          <SvgIconStyle src="/assets/subtract.svg" sx={{ width: '40px', height: '40px', color: '#FFCF54' }} />
        </Box>
      )}

      {subscriptionColor === '#47E144' ? (
        <Box backgroundColor={subscriptionColor} sx={{ px: 1.5, pb: 0.4, borderRadius: '20px' }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            {subscription}
          </Typography>
        </Box>
      ) : (
        <Box backgroundColor={subscriptionColor} sx={{ px: 1.5, pb: 0.4, borderRadius: '20px' }}>
          <Typography variant="overline" color="white">
            {subscription}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        {price !== 0 && (
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            $
          </Typography>
        )}

        <Typography variant="h2" sx={{ mx: 1 }}>
          {price === 0 ? 'Free' : price}
        </Typography>

        {price !== 0 && (
          <Typography
            gutterBottom
            component="span"
            variant="subtitle2"
            sx={{
              alignSelf: 'flex-start',
              color: 'text.secondary',
            }}
          >
            /mo
          </Typography>
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize',
        }}
      >
        {caption}
      </Typography>

      <Box sx={{ width: 80, height: 80, mt: 3 }}>{icon}</Box>

      <Stack component="ul" spacing={2} sx={{ mt: 2.5, width: 1 }}>
        {lists.map((item) => (
          <Stack
            key={item.text}
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ typography: 'body2', color: item.isAvailable ? 'text.primary' : 'text.disabled' }}
          >
            <Iconify icon={'eva:checkmark-fill'} sx={{ width: 20, height: 20 }} />

            <Typography variant="body2">{item.text}</Typography>
          </Stack>
        ))}

        <Stack pt={0.6}>
          <PaymentUserInput />

          <Box mt={2.5}>
            <Button onClick={() => setOpen(true)} fullWidth variant="contained">
              {labelAction}
            </Button>
          </Box>

          <PaymentModal
            open={open}
            setOpen={setOpen}
            subscription={subscription}
            subscriptionColor={subscriptionColor}
            price={price}
            index={index}
          />
        </Stack>
      </Stack>
    </RootStyle>
  );
}
