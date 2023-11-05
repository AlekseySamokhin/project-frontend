import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

export default function PaymentModalAutocomplete() {
  const userCard = [
    { label: '23424234234523352', cardHolder: 'jim' },
    { label: '23423423423423423', cardHolder: 'jim' },
    { label: '234234234234235435', cardHolder: 'jim' },
  ];

  return (
    <Autocomplete
      size="small"
      fullWidth
      disablePortal
      id="combo-box-demo"
      options={userCard}
      renderInput={(params) => <TextField {...params} label="Card" />}
    />
  );
}
