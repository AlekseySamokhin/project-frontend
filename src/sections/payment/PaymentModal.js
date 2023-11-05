import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import {
  Alert,
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import SvgIconStyle from '../../components/SvgIconStyle';
import { _promoCodes } from '../../_mock/_promoCodes';
import promoValidation from '../../utils/promoValidation';
import { PaymentModalAutocomplete, PaymentModalTotalBilling } from '.';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  backgroundColor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
};

// ----------------------------------------------------------------------


PaymentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func,
  subscription: PropTypes.string,
  index: PropTypes.number,
  subscriptionColor: PropTypes.string,
  price: PropTypes.number,
};


export default function PaymentModal({ open, setOpen, subscription, index, subscriptionColor, price }) {
  const discount = 0.9;

  const [value, setValue] = useState('CreditCard');

  const [promoCode, setPromoCode] = useState(null);

  const [promoValid, setPromoValid] = useState(null);

  const handleCloseModal = () => {
    setOpen(false);
    setPromoCode(null);
    setPromoValid(null);
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={style}>
        <Stack
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={3}
          px={1.5}
          ml={1.5}
          direction="row"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Checkout
          </Typography>

          <IconButton onClick={handleCloseModal}>
            <SvgIconStyle
              src="/assets/icons/main/ic_close.svg"
              sx={{ width: '22px', height: '22px', color: 'grey.600' }}
            />
          </IconButton>
        </Stack>

        <Divider />

        <Box mx={3} py={2.5}>
          <Box pl={1} pb={1.5}>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            >
              <Stack direction="row" spacing={0.2}>
                <FormControlLabel value="Paypal" control={<Radio size="small" />} label="Paypal" />

                <FormControlLabel value="CreditCard" control={<Radio size="small" />} label="Debit/Credit card" />
              </Stack>
            </RadioGroup>
          </Box>

          <PaymentModalAutocomplete />

          <Stack ml={1} my={2} direction="row" display="flex" alignItems="center">
            <IconButton>
              <SvgIconStyle src="/assets/icons/main/ic_plus.svg" sx={{ width: 14, height: 14, color: 'grey.600' }} />
            </IconButton>

            <Typography variant="subtitle2"> Add New Card</Typography>
          </Stack>

          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="body2">Subscription</Typography>

            <Box paddingX={1.5} paddingBottom={0.4} backgroundColor={subscriptionColor} borderRadius="20px">
              <Typography variant="overline" color="white">
                {subscription}
              </Typography>
            </Box>
          </Stack>

          <Stack my={1} mb={1.5} direction="row" display="flex" justifyContent="space-between">
            <Stack direction="row">
              <Typography variant="body2">Billed Monthly</Typography>

              <Switch defaultChecked size="small" />
            </Stack>

            <Box display="flex" justifyContent="flex-end">
              {price !== 0 ? (
                <Typography variant="button">${price}/mo</Typography>
              ) : (
                <Typography variant="button">Free</Typography>
              )}
            </Box>
          </Stack>

          <Divider />

          <Stack mt={1} mb={1} direction="row" display="flex" justifyContent="space-between">
            <PaymentModalTotalBilling price={price} discount={discount} index={index} />
          </Stack>

          <Typography color="text.secondary" variant="body2">
            * Plus applicable taxes
          </Typography>

          <Stack mt={1.6} mb={0.4} direction="column" spacing={1.4}>
            <TextField
              onChange={(event) => setPromoCode(event.target.value)}
              size="small"
              fullWidth
              variant="outlined"
              label="Promo code"
            />

            {promoValid && (
              <Alert variant="outlined" severity="success">
                Promo code successfully applied
              </Alert>
            )}

            {promoValid === false && (
              <Alert variant="outlined" severity="error">
                Promo code is not valid
              </Alert>
            )}
          </Stack>
        </Box>

        <Divider />

        <Box m={3} mt={2.5} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => {
              setOpen(false);
              setPromoCode(null);
              setPromoValid(null);
            }}
            sx={{ border: '1px solid #C4CDD5', mr: 1.4 }}
            variant="default"
          >
            Cancel
          </Button>

            <Button
              onClick={() => {
                setPromoValid(promoValidation(_promoCodes, promoCode));
              }}
              variant="contained"
            >
              Upgrade my plan
            </Button>

          </Box>

      </Box>
    </Modal>
  );
}
