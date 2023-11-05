import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '../../components/hook-form';
import UserSettingsForm from './SettingsUserForm';

//---------------------------------------

export default function SettingUser() {
  const UserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    updateAuto: Yup.boolean(),
    changeScreen: Yup.boolean(),
    avatar: Yup.string(),
    localStorage: Yup.string().required('local Storage is required'),
  });

  const defaultValues = {
    name: 'Denis Kovalev',
    password: 'abcd1234',
    confirmPassword: 'abcd1234',
    updateAuto: false,
    changeScreen: false,
    localStorage: 'User\\code\\AppData\\Roaming\\vision\\data',
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);

      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <UserSettingsForm />
    </FormProvider>
  );
}
