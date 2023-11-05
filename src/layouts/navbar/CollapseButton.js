// @mui
import { Box } from '@mui/material';
// components
import { IconButtonAnimate } from '../../components/animate';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';

// ----------------------------------------------------------------------

CollapseButton.propTypes = {};

export default function CollapseButton() {
  const { collapseClick, onToggleCollapse } = useCollapseDrawer();

  return (
    <IconButtonAnimate onClick={onToggleCollapse}>
      <Box
        sx={{
          lineHeight: 0,
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          // ...(collapseClick && {
          //   transform: 'rotate(180deg)',
          // }),
        }}
      >
        {!collapseClick ? icon : collapseIcon}
      </Box>
    </IconButtonAnimate>
  );
}

// ----------------------------------------------------------------------

const icon = (
  <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
    <g fill='none' fillRule='evenodd'>
      <path d='M0 0h24v24H0z' />
      <g fill='currentColor' fillRule='nonzero'>
        <path
          d='M14.3283 11.4343 18.5126 7.25c.4142-.4142.4142-1.0858 0-1.5-.4142-.4142-1.0858-.4142-1.5 0l-5.543 5.5429c-.3904.3905-.3904 1.0237 0 1.4142l5.543 5.5429c.4142.4142 1.0858.4142 1.5 0 .4142-.4142.4142-1.0858 0-1.5l-4.1843-4.1843a.8.8 0 0 1 0-1.1314Z'
          opacity='.48'
        />
        <path
          d='M8.3283 11.4343 12.5126 7.25c.4142-.4142.4142-1.0858 0-1.5-.4142-.4142-1.0858-.4142-1.5 0l-5.543 5.5429c-.3904.3905-.3904 1.0237 0 1.4142l5.543 5.5429c.4142.4142 1.0858.4142 1.5 0 .4142-.4142.4142-1.0858 0-1.5l-4.1843-4.1843a.8.8 0 0 1 0-1.1314Z' />
      </g>
    </g>
  </svg>
);

const collapseIcon = (
  <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M14.5022 2.49023C14.0952 2.49034 13.729 2.73699 13.5758 3.114C13.4227 3.49102 13.5133 3.92322 13.8049 4.20703L14.4006 4.80274L8.20138 9.77539L7.21896 8.79297C7.03069 8.59944 6.77216 8.49025 6.50216 8.49023C6.09524 8.49034 5.72895 8.73699 5.57583 9.114C5.42271 9.49102 5.51329 9.92322 5.8049 10.207L9.10568 13.5078L3.30099 19.3105C2.91399 19.6975 2.91399 20.3239 3.30099 20.7109C3.68799 21.0979 4.31438 21.0979 4.70138 20.7109L10.5041 14.9063L13.8049 18.207C14.0557 18.4683 14.4282 18.5735 14.7786 18.4822C15.129 18.3908 15.4027 18.1171 15.4941 17.7667C15.5854 17.4162 15.4802 17.0438 15.219 16.793L14.3225 15.8965L19.2268 9.62891L19.8049 10.207C20.0557 10.4683 20.4282 10.5735 20.7786 10.4821C21.129 10.3908 21.4027 10.1171 21.4941 9.76668C21.5854 9.41624 21.4802 9.04379 21.219 8.79297L15.219 2.79297C15.0307 2.59944 14.7722 2.49025 14.5022 2.49023H14.5022Z'
      fill='#637381'
    />
  </svg>
);
