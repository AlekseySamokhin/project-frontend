import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  // const { isAuthenticated } = useAuth();
  //
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     push(PATH_BROWSERS.root);
  //   }
  // }, [isAuthenticated]);

  return <>{children}</>;
}
