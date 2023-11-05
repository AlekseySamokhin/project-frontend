import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../redux/store';
import { PATH_TRACKING } from '../../routes/paths';
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default function TrackingPage() {

  const navigate = useNavigate();

  const folders = useSelector((state) => state.tracking.folder.collection);

  useEffect(() => {
    if (folders.length) {
      navigate(PATH_TRACKING.folder(folders[0].id));
    }
  }, [folders]);

  return (
    <Page title="Tracking" />
  );
}
