import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../redux/store';
import { helpRequested } from '../redux/slices/help';

// ----------------------------------------------------------------------

export default function HelpLayout() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(helpRequested());
  }, [])

  return <Outlet />;
}