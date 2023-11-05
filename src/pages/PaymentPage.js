import { useEffect } from 'react';
import { Grid } from '@mui/material';
import Page from '../components/Page';
import { PaymentPlanCard } from '../sections/payment';
import { useDispatch, useSelector } from '../redux/store';
import { paymentRequested } from '../redux/slices/payment';
import Loading from '../components/Loading';

// ----------------------------------------------------------------------

export default function PaymentPage() {
  const dispatch = useDispatch();

  const {
    collection: payments,
    loading: loadingPayments,
  } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(paymentRequested(true));
  }, []);

  if (loadingPayments) {
    return (
      <Page title="Payment">
        <Loading height="70vh" />
      </Page>
    );
  }

  return (
    <Page title="Payment">
      <Grid p={1} pt={2} container>
        {payments.map((card, index) => (
          <Grid px={1} item xs={12} md={3} key={index}>
            <PaymentPlanCard card={card} index={index} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
