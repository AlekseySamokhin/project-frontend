import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

export default function AutomationPage() {
  const { enqueueSnackbar } = useSnackbar();

  return <>
    <Button color='success' onClick={() => enqueueSnackbar('success', { variant: 'success' })}>
      success
    </Button>
    <Button color='warning' onClick={() => enqueueSnackbar('warning', { variant: 'warning' })}>
      warning
    </Button>
    <Button color='error' onClick={() => enqueueSnackbar('error', { variant: 'error' })}>
      error
    </Button>
  </>;
}
