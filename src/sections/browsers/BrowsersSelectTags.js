import PropTypes from 'prop-types';

import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { filter, map } from 'lodash';
import { useParams } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from '../../redux/store';
import axios from '../../utils/axios';
import RHFAutocompleteMultiple from '../../components/hook-form/RHFAutocompleteMultiple';
import { FormProvider } from '../../components/hook-form';
import { profileRequested, tagsSimpleRequested } from '../../redux/slices/browsers';

// ----------------------------------------------------------------------

BrowsersSelectTags.propTypes = {
  selectTagsDefault: PropTypes.array,
  onClose: PropTypes.func,
  id: PropTypes.string,
};

// ----------------------------------------------------------------------

export default function BrowsersSelectTags({ selectTagsDefault, onClose, id }) {

  const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const tags = useSelector((state) => state.browsers.tagsSimple.collection);

  const [selectTags, setSelectTags] = useState(selectTagsDefault);

  const [tagData, setTagData] = useState([]);

  const [allTagNames, setAllTagNames] = useState([]);

  const defaultValues = {
    profile_tags: [],
  };


  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
  } = methods;

  const handleChange = (event) => {
    const { target: { value } } = event;
    setTagData(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    if (selectTags) {
      const arr = [];
      // eslint-disable-next-line array-callback-return
      selectTags.map((tag) => {
        map(filter(tags, { id: tag }), (mapFilteredTag) => {
          arr.push(mapFilteredTag.tag_name);
        });
      });
      setValue('profile_tags', arr);
      setTagData(arr);
    }
    if (tags) {
      const arr = [];
      map(tags, (item) => {
        arr.push(item.tag_name);
      });
      setAllTagNames(arr);
    }
  }, [selectTags]);

  const onSubmit = async (dataValue) => {

    const resultData = [];

    const preparedNewTags = dataValue.profile_tags.filter(x => !allTagNames.includes(x));
    const externalSelectedTags = dataValue.profile_tags.filter(x => allTagNames.includes(x));

    map(externalSelectedTags, (item) => {
      const filteredId = filter(tags, { tag_name: item })[0].id;
      resultData.push(filteredId);
    });

    try {
      if (!isEmpty(preparedNewTags)) {
        await axios.post(
          `api/v1/folders/${folderId}/tags`, { tags: preparedNewTags },
        ).then((res) => {
          map(res.data.data, (item) => {
            resultData.push(item.id);
          });
          axios.put(
            `api/v1/folders/${folderId}/profiles/${id}/tags`,
            { tags: resultData },
          ).then(() => {
            dispatch(profileRequested({ folderId }))
            dispatch(tagsSimpleRequested({ folderId }))
          });
        });
      } else {
        axios.put(
          `api/v1/folders/${folderId}/profiles/${id}/tags`,
          { tags: resultData },
        ).then(() => {
          dispatch(profileRequested({ folderId }));
        });
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFAutocompleteMultiple size='large' tag name='profile_tags' label='Tags' data={allTagNames} />
        <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={1.5} sx={{ py: '14px' }}>
          <Button variant='outlined' color='inherit' onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant='contained'
            type='submit'
            onClick={onSubmit}
          >
            Save
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
