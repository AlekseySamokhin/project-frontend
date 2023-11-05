import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from '../../redux/store';
import Page from '../../components/Page';
import { TagTableBottom, TagTableFilters, TagTableRow } from '../../sections/browsers/tags';
import { TAGS_TABLE_HEAD } from '../../sections/browsers/tags/TagConfig';
import { tagsRequested } from '../../redux/slices/browsers';
import { BrowsersTable } from '../../sections/browsers';
import { Stack } from '@mui/material';
import useEffectWithoutFirstRender from '../../hooks/useEffectWithoutFirstRender';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function TagsPage() {
  const dispatch = useDispatch();

  const params = useParams();

  const folderId = params.id;

  const { enqueueSnackbar } = useSnackbar();

  const folders = useSelector((state) => state.browsers.folder.collection);

  const {   collection: tags,
    loading: loadingTag,
    error: errorTag,
    total: totalTag} = useSelector((state) => state.browsers.tags);

  useEffect(() => {
    if (folders.find((element) => element.id === folderId)) {
      dispatch(tagsRequested({ folderId }));
    }
  }, [folders, folderId]);


  // Errors
  useEffectWithoutFirstRender(() => {
    enqueueSnackbar(errorTag, { variant: 'error'});
  }, [errorTag]);

  return (
    <Page title={`Browsers Folder - ${folderId}`}>
      <Stack
        direction='column'
        justifyContent='space-between'
        alignItems='stretch'
        height='100%'
      >
        <TagTableFilters />

        <BrowsersTable
          tableData={tags}
          tabsValue='tags'
          tableHead={TAGS_TABLE_HEAD}
          loading={loadingTag}
          total={totalTag}
          tableRow={(row, selected, onSelectRow) => (
            <TagTableRow
              key={row?.id}
              row={row}
              selected={selected.includes(row?.id)}
              onSelectRow={() => onSelectRow(row?.id)}
            />
          )}
          tableBottom={(selected, setSelected) => <TagTableBottom selected={selected} setSelected={setSelected} />}
        />
      </Stack>
    </Page>
  );
}
