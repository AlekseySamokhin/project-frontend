import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Page from '../../components/Page';
import { useDispatch } from '../../redux/store';
import { PROXY_TABLE_HEAD } from '../../sections/browsers/proxies/ProxyConfig';
import { ProxyTableBottom, ProxyTableFilters, ProxyTableRow } from '../../sections/browsers/proxies';
import { BrowsersTable } from '../../sections/browsers';
import { proxyFilterDataRequested, proxyRequested } from '../../redux/slices/browsers';
import useEffectWithoutFirstRender from '../../hooks/useEffectWithoutFirstRender';
import { useSnackbar } from 'notistack';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function ProxiesPage() {

  const dispatch = useDispatch();

  const params  = useParams();

  const folderId = params.id;

  const { enqueueSnackbar } = useSnackbar();

  const folders = useSelector((state) => state.browsers.folder.collection);

  const {
    collection: proxies,
    loading: loadingProxy,
    error: errorProxy,
    total: totalProxy,
  } = useSelector((state) => state.browsers.proxy);

  const [openFilters, setOpenFilters] = useState(false);

  // Proxy Request
  useEffect(() => {
    if (folders.find((element) => element.id === folderId)) {
      dispatch(proxyRequested({ folderId }));
      dispatch(proxyFilterDataRequested({ folderId }));
    }
  }, [folders]);

  // Errors
  useEffectWithoutFirstRender(() => {
    enqueueSnackbar(errorProxy, { variant: 'error'});
  }, [errorProxy]);

  return (
    <Page title={`Browsers Folder - ${folderId}`}>
      <Stack
        direction='column'
        justifyContent='space-between'
        alignItems='stretch'
        height='100%'
      >
        <ProxyTableFilters folderId={folderId} open={openFilters} setOpen={setOpenFilters} />

        <BrowsersTable
          tableData={proxies}
          tabsValue='proxies'
          loading={loadingProxy}
          pagination={(pn, ps) => dispatch(proxyRequested({ folderId, pn, ps }))}
          total={totalProxy}
          dragActive
          tableHead={PROXY_TABLE_HEAD}
        isFilterOpen={openFilters}
        tableRow={(row, selected, onSelectRow) => (
          <ProxyTableRow
            key={row?.id}
            row={row}
            selected={selected.includes(row?.id)}
            onSelectRow={() => onSelectRow(row?.id)}
          />
        )}
          tableBottom={(selected, onSelectRow) =>
            <ProxyTableBottom selected={selected} onSelectRow={onSelectRow} />
          }
        />
      </Stack>
    </Page>
  );
}
