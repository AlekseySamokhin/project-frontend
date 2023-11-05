import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const RootStack = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  zIndex: 999,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.customShadows.dropdown,
  borderRadius: Number(theme.shape.borderRadius) * 1.3,
}));

// ----------------------------------------------------------------------

NonBlockPopover.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  anchorOrigin: PropTypes.object,
  transformOrigin: PropTypes.object,
  anchor: PropTypes.node,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

export default function NonBlockPopover({ children, open, anchor, anchorOrigin, transformOrigin, sx }) {
  const [positionValue, setPositionValue] = useState({
    top: 0,
    bottom: 'none',
    right: 0,
    left: 0,
  });

  useEffect(() => {
    setPositionValue((prevState) => position(anchorOrigin, transformOrigin, prevState, anchor));
  }, [anchor]);

  return (
    <>
      {open && (
        <RootStack {...positionValue} sx={sx}>
          {children}
          {console.log(anchor.offsetHeight, anchor.offsetWidth)}
        </RootStack>
      )}
    </>
  );
}

const position = (anchorOrigin, transformOrigin, positionValue, anchor) => {
  const height = anchor?.offsetHeight;
  const width = anchor?.offsetWidth;

  if (anchorOrigin.vertical === 'top' && anchorOrigin.horizontal === 'center') {
    positionValue.bottom = height;
    positionValue.top = 'none';
    positionValue.right = 'none';
    positionValue.left = width / 2;
  }

  console.log(positionValue);
  return positionValue;
};

/*
## Example Dropdown

<ClickAwayListener onClickAway={() => setOpen(false)}>

  <Stack sx={{ position: 'relative' }}>

    <Button type="button" onClick={() => setOpen(prevState => !prevState)}>
      Open menu dropdown
    </Button>

    <Dropdown open={open} >
      <Button onClick={() => console.log('Click')}>Button </Button>
      <Button onClick={() => console.log('Click')}>Button </Button>
      <Button onClick={() => console.log('Click')}>Button </Button>
    </Dropdown>

  </Stack>

</ClickAwayListener>
*/

/*

import { Button, ClickAwayListener, IconButton, Stack, Typography } from '@mui/material';
import SvgIconStyle from '../../../components/SvgIconStyle';
import NonBlockPopover from '../../../components/NonBlockPopover';
import { useState } from 'react';
import ProxyPropertiesForm from './ProxyPropertiesForm';
import * as Yup from 'yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { FormProvider } from '../../../components/hook-form';

// ----------------------------------------------------------------------

ProxyButtonEditRow.propTypes = {

};

// ----------------------------------------------------------------------

export default function ProxyButtonEditRow() {

  const LoginSchema = Yup.object().shape({
    'new-browsers': Yup.array().of(
      Yup.object().shape({
        browsers: Yup.object().shape({
          value: Yup.string().required('Proxy is required'),
        }),
        type: Yup.object().shape({
          value: Yup.string().required('Proxy is required'),
        }),
      }),
    ),
  });

  const defaultValues = {
    'new-browsers': [
      {
        name: { value: '' },
        browsers: { value: '' },
        ipUrl: { value: '' },
        type: { value: 'http' },
      },
    ],
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, control, formState: { errors } } = methods;

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'new-browsers',
  });

  const isMountedRef = useIsMountedRef();

  const [openEditRow, setOpenEditRow] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const handleClick = (event) => {
    setOpenEditRow(prevState => !prevState);
    setAnchor(event.currentTarget);
  };

  const onSubmit = async (data) => {
    try {
      await console.log(data); // post request

    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenEditRow(false)}>
      <Stack sx={{ position: 'relative' }}>

        <IconButton onClick={handleClick}>
          <SvgIconStyle src={`/assets/icons/main/ic_edit_row.svg`} sx={{ width: 18, height: 18 }} />
        </IconButton>

        <NonBlockPopover
          open={openEditRow}
          anchor={anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{ p: 3, width: 420}}
        >

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center">
            <Typography>Proxy Editing</Typography>
            <IconButton onClick={handleClick}>
              <SvgIconStyle src={`/assets/icons/main/ic_close.svg`} sx={{ width: 24, height: 24 }} />
            </IconButton>
          </Stack>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <ProxyPropertiesForm number={index} update={update} fields={fields} control={control} errors={errors} />

<Button
  fullWidth
  variant="contained"
  type="submit"
  sx={{ py: 1 }}
  startIcon={<SvgIconStyle src={'/assets/icons/main/ic_add.svg'} sx={{ width: 15, height: 15 }} />}
>
  Create
</Button>
</FormProvider>

</NonBlockPopover>
</Stack>
</ClickAwayListener>
);
};
*/
