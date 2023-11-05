import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography, Box } from '@mui/material';

// ----------------------------------------------------------------------

MenuHotProducts.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default function MenuHotProducts({ tags, ...other }) {
  return (
    <Box {...other}>
      <Typography variant="caption" fontWeight="fontWeightBold">
        Hot Products:
      </Typography>
      &nbsp;
      {tags.map((tag, index) => (
        <RouterLink key={tag.name} href={tag.path}>
          <Link
            underline="none"
            variant="caption"
            sx={{
              color: 'text.secondary',
              transition: (theme) => theme.transitions.create('all'),
              '&:hover': { color: 'primary.main' },
            }}
          >
            {index === 0 ? tag.name : `, ${tag.name} `}
          </Link>
        </RouterLink>
      ))}
    </Box>
  );
}
