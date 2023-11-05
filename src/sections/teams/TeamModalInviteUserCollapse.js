import { Checkbox, Collapse, Divider, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import map from 'lodash/map';
import { isEmpty, keys, values } from 'lodash';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

TeamModalInviteUserCollapse.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  isCollapse: PropTypes.bool.isRequired,
  handleCollapse: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleAllCheck: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function TeamModalInviteUserCollapse({
  item,
  index,
  name,
  isCollapse,
  handleCollapse,
  handleCheck,
  handleAllCheck,
}) {
  const indeterminate = (group) => {
    const groupValues = values(group);

    return groupValues.includes(true) && groupValues.includes(false);
  };

  const foundOn = (group) => {
    const groupValues = values(group);

    const notShowingItems = groupValues.filter((item) => item === false);

    return isEmpty(notShowingItems);
  };

  return (
    <Stack color="grey.600" border="1px solid rgba(145, 158, 171, 0.16)" borderRadius="8px" mb={1.25}>
      <Stack direction="row" px={1.5} py={0.625} alignItems="center">
        {!isCollapse ? (
          <ChevronRightIcon onClick={() => handleCollapse(index)} />
        ) : (
          <ExpandMoreIcon onClick={() => handleCollapse(index)} />
        )}

        <Checkbox
          checked={foundOn(item)}
          indeterminate={indeterminate(item)}
          onClick={(event) => handleAllCheck(event, item)}
          size="small"
        />

        <Typography variant="button" sx={{ ml: 1 }}>
          {name}
        </Typography>
      </Stack>

      <Collapse in={isCollapse}>
        <Divider sx={{ marginX: 1.5 }} />

        <Stack spacing={0.5} px={1.5} py={0.625}>
          {map(
            keys(item),
            (keyItem, index2) =>
              keyItem !== 'fid' && (
                <Stack direction="row" alignItems="center" key={index2}>
                  <Checkbox
                    size="small"
                    checked={item[keyItem]}
                    onClick={(event) => handleCheck(event, keyItem, item)}
                    sx={{ mr: 0.2 }}
                  />

                  <Typography variant='button'>
                    {keyItem === 'read'
                      ? 'View'
                      : keyItem === 'write'
                      ? 'Start/Stop'
                      : keyItem === 'delete'
                      ? 'Deleting'
                      : keyItem === 'show'
                      ? 'Show'
                      : ''}
                  </Typography>
                </Stack>
              )
          )}
        </Stack>
      </Collapse>
    </Stack>
  );
}
