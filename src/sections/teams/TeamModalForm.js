import { useEffect, useRef, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import map from 'lodash/map';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { ModalTabs } from '../index';
import CreateDrawer from '../../components/browsers/CreateDrawer';
import SvgIconStyle from '../../components/SvgIconStyle';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import Scrollbar from '../../components/Scrollbar';
import useWindowSize from '../../hooks/useWindowSize';
import TeamModalInviteUserCollapse from './TeamModalInviteUserCollapse';
import { useDispatch } from '../../redux/store';
import { teamListMembersRequested } from '../../redux/slices/teams';

// ----------------------------------------------------------------------

const TABLE_HEADS = [
  {
    id: 'userSettings',
    label: 'User settings',
    src: '/assets/icons/main/ic_settings.svg',
    iconWidth: 19.66,
    iconHeight: 20,
  },
  {
    id: 'permissions',
    label: 'Permissions',
    src: '/assets/icons/login-unprotected/ic_password.svg',
    iconWidth: 16,
    iconHeight: 22,
  },
];

const TEXT_FIELDS = [
  {
    id: '1',
    label: 'Email',
    name: 'username',
  },
  {
    id: '2',
    label: 'Displayed name',
    name: 'display_name',
  },
  {
    id: '3',
    label: 'Position',
    name: 'position',
  },
];

// ----------------------------------------------------------------------

TeamModalForm.propTypes = {
  team: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  defaultFormValues: PropTypes.object.isRequired,
  labelButton: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};

// ----------------------------------------------------------------------

export default function TeamModalForm({ team, defaultFormValues, open, onClose, labelButton, request, edit = false }) {
  const dispatch = useDispatch();

  const isMountedRef = useIsMountedRef();

  const [, windowHeight] = useWindowSize();

  const { enqueueSnackbar } = useSnackbar();

  const refListFolders = useRef();

  const [isFolderHeightEnough, setIsFolderHeightEnough] = useState(true);

  const [permissions, setPermissions] = useState(defaultFormValues.permissions);

  const [tab, setTab] = useState(TABLE_HEADS[0].id);

  const [folderCollapse, setFolderCollapse] = useState(map(defaultFormValues.permissions.folders, () => false));

  const [teamsCollapse, setTeamsCollapse] = useState(false);

  const [buttonAll, setButtonAll] = useState({
    collapse: false,
    permissionsFolders: {
      show: false,
      read: false,
      write: false,
      delete: false,
    },
  });

  const schema = Yup.object().shape({
    username: Yup.string().email('Email must be a valid email address').required('Field is required'),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultFormValues,
  });

  const { reset, setError, handleSubmit, setValue, getValues } = methods;

  const onSubmit = async (data) => {
    try {
      await request(data);

      dispatch(teamListMembersRequested({ teamId: team.id }));

      handleCloseModal();

    } catch (response) {

      enqueueSnackbar(response.error, { variant: 'error'});

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...response.error, message: response.error });
      }
    }
  };

  const handleCheckTeam = (event, keyTeam, item) => {
    const isOtherValuesTrue = [];

    map(Object.entries(item), ([key, value]) => {
      if (key !== keyTeam) {
        isOtherValuesTrue.push(value);
      }
    });

    setPermissions((prevState) => ({
      ...prevState,
      full: isOtherValuesTrue[0] && isOtherValuesTrue[1] && event.target.checked,
      team: {
        ...prevState.team,
        [keyTeam]: event.target.checked,
      },
    }));
  };

  const handleAllCheckTeams = (event) => {
    setPermissions((prevState) => ({
      ...prevState,
      full: event.target.checked,
      team: {
        read: event.target.checked,
        write: event.target.checked,
        delete: event.target.checked,
      },
    }));
  };

  const handleCollapseFolder = (index) => {
    setFolderCollapse(
      map(folderCollapse, (value, indexValue) => {
        if (indexValue === index) {
          return !value;
        }
        return value;
      })
    );
  };

  const handleAllCheckFolders = (event, item) => {
    const newFolders = map(permissions.folders, (folder) => {
      if (folder?.fid === item?.fid) {
        return {
          ...folder,
          show: event.target.checked,
          read: event.target.checked,
          write: event.target.checked,
          delete: event.target.checked,
        };
      }
      return folder;
    });

    setPermissions((prevState) => ({
      ...prevState,
      folders: newFolders,
    }));
  };

  const handleCheckFolder = (event, keyFolder, item) => {

    const newFolders = map(permissions.folders, (folder) => {
      if (folder?.fid === item?.fid) {
        return {
          ...folder,
          [keyFolder]: event.target.checked,
        };
      }
      return folder;
    });

    setPermissions((prevState) => ({
      ...prevState,
      folders: newFolders,
    }));
  };

  const handleAllCheckButtonAll = (event) => {
    // Обрабатываем ВСЕ значения, и создаем объект для всех папок
    const newButtonAllValues = {
      collapse: event.target.checked,
      permissionsFolders: {
        show: event.target.checked,
        read: event.target.checked,
        write: event.target.checked,
        delete: event.target.checked,
      },
    };

    setButtonAll(newButtonAllValues);

    setNewValuesForPermissionsAndRHF(newButtonAllValues.permissionsFolders);
  };

  const handleCheckButtonAll = (event, keyFolder) => {

    const newButtonAllValues = {
      collapse: buttonAll.collapse,
      permissionsFolders: {
        ...buttonAll.permissionsFolders,
        [keyFolder]: event.target.checked,
      },
    };


    setButtonAll(newButtonAllValues);

    setNewValuesForPermissionsAndRHF(newButtonAllValues.permissionsFolders);
  };

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  const setNewValuesForPermissionsAndRHF = (newValues) => {
    // Создаем новые значения всем папкам сразу
    const newPermissionsFoldersValue = map(getValues('permissions.folders'), (folder) => ({
      ...folder,
      ...newValues,
    }));

    // Записываем их в react hook form и state для render'а
    setPermissions((prevState) => ({ ...prevState, folders: newPermissionsFoldersValue }));

    setValue('permissions.folders', newPermissionsFoldersValue);
  };

  useEffect(() => {
    // Проверяем, нужно ли устанавливать скроллбар для папок
    if (tab === 'permissions') {
      setIsFolderHeightEnough(refListFolders.current?.offsetHeight < windowHeight - 135);
    }
  }, [tab, defaultFormValues.permissions.folders, folderCollapse, teamsCollapse, windowHeight]);

  return (
    <CreateDrawer open={open} toggleDrawer={handleCloseModal} sx={{ width: 400 }}>
      <ModalTabs
        onCloseModal={handleCloseModal}
        tabValue={tab}
        tableHeads={TABLE_HEADS}
        handleChange={(newValue) => setTab(newValue)}
      />

      <Stack sx={{ p: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {tab === 'userSettings' && (
            <>
              <Stack>
                {map(TEXT_FIELDS, (textField) => (
                  <RHFTextField
                    name={textField.name}
                    key={textField.id}
                    label={textField.label}
                    size="small"
                    sx={{ mb: 2 }}
                    disabled={textField.name === 'username' && edit}
                  />
                ))}

                <Button variant="contained" fullWidth type="submit" sx={{ mt: 1 }}>
                  <Typography fontWeight="700">{labelButton}</Typography>
                </Button>
              </Stack>
            </>
          )}

          {tab === 'permissions' && (
            <Stack>
              <Stack
                ref={refListFolders}
                height={isFolderHeightEnough ? '100%' : windowHeight - 135}
                sx={{ position: 'relative' }}
              >
                <Scrollbar>
                  <Stack direction="row" color="grey.600" mb={1}>
                    <SvgIconStyle
                      src={`/assets/icons/main/ic_team_permissions.svg`}
                      sx={{ width: 24, height: 24, mr: 1.5 }}
                    />

                    <Typography fontWeight={500} fontSize={18}>
                      Team permissions
                    </Typography>
                  </Stack>

                  <TeamModalInviteUserCollapse
                    item={permissions.team}
                    index={0}
                    name={team.name}
                    isCollapse={teamsCollapse}
                    handleCollapse={() => setTeamsCollapse((prevState) => !prevState)}
                    handleCheck={handleCheckTeam}
                    handleAllCheck={handleAllCheckTeams}
                  />

                  <Stack direction="row" color="grey.600" my={1}>
                    <SvgIconStyle src={`/assets/icons/main/ic_folders.svg`} sx={{ width: 24, height: 24, mr: 1.5 }} />

                    <Typography fontWeight={500} fontSize={18}>
                      Folder permissions
                    </Typography>
                  </Stack>

                    <TeamModalInviteUserCollapse
                      item={buttonAll.permissionsFolders}
                      index={0}
                      name="All"
                      isCollapse={buttonAll.collapse}
                      handleCollapse={() =>
                        setButtonAll((prevState) => ({
                          ...buttonAll,
                          collapse: !prevState.collapse,
                        }))
                      }
                      handleCheck={handleCheckButtonAll}
                      handleAllCheck={handleAllCheckButtonAll}
                    />

                  {map(permissions.folders, (folder, index) => (
                    <TeamModalInviteUserCollapse
                      item={folder}
                      index={index}
                      name={folder.fid}
                      isCollapse={folderCollapse[index]}
                      handleCollapse={handleCollapseFolder}
                      handleCheck={handleCheckFolder}
                      handleAllCheck={handleAllCheckFolders}
                    />
                  ))}
                </Scrollbar>
              </Stack>

              <Button variant="contained" fullWidth type="submit" sx={{ mt: 1.75 }}>
                <Typography fontWeight="700">{labelButton}</Typography>
              </Button>
            </Stack>
          )}
        </FormProvider>
      </Stack>
    </CreateDrawer>
  );
}
