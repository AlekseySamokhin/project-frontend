import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page';
import { useSelector } from '../../redux/store';
import { PATH_BROWSERS } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function BrowsersPage() {

  const navigate = useNavigate();

  const folders = useSelector((state) => state.browsers.folder.collection);

  useEffect(() => {
    if (folders.length) {
      navigate(PATH_BROWSERS.profiles(folders[0].id));
    }
  }, [folders]);

  return (
    <Page title='Browsers' />
  );
}
