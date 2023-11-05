import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

PaymentModalTotalBilling.propTypes = {
  price: PropTypes.number,
  discount: PropTypes.number,
};

export default function PaymentModalTotalBilling({ price, discount }) {
  function priceDiscount(price, discount) {
    const temp = price * discount;
    return temp.toFixed(2);
  }

  function discountPercent(discount) {
    const temp = (1 - discount) * 100;
    return Math.ceil(temp);
  }

  return (
    <>
      <Typography fontWeight={400} variant='h6'>
        Total billed
      </Typography>

      <Box display='flex' justifyContent='flex-end'>
        {price !== 0 && (
          <Box>
            <Typography
              sx={{ fontWeight: 400, textDecoration: 'line-through', mr: '0.5' }}
              color='text.secondary'
              component='span'
              variant='h6'
            >
              ${price}/mo
            </Typography>

            <Typography marginRight={1.5} fontWeight='400' color='text.secondary' variant='h6' component='span'>
              -{discountPercent(discount)}%
            </Typography>
          </Box>
        )}

        {price === 0 ? (
          <Typography variant='h6'>Free</Typography>
        ) : (
          <Typography variant='h6'>${priceDiscount(price, discount)}/mo</Typography>
        )}
      </Box>
    </>
  );
}
