import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { useDispatch } from 'react-redux';
import { testRequested } from '../../../redux/slices/test';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();

  const dispatch = useDispatch();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'dev@gg.dev',
    password: 'abcdef123',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const userData = { email: data.email, password: data.password }
  
      dispatch(testRequested(userData));

      await login(data.email, data.password);
    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name="email"
          placeholder="Login"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIconStyle
                  src={'/assets/icons/login-unprotected/ic_login.svg'}
                  sx={{ width: 18, height: 18 }}
                />
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="password"
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          sx={{ mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIconStyle
                  src={`/assets/icons/login-unprotected/ic_password.svg`}
                  sx={{ width: 18, height: 18 }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 2 }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
