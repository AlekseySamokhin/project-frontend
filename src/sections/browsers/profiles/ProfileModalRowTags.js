import { Dialog, DialogContent } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import BrowsersSelectTags from '../BrowsersSelectTags';
import { useSelector } from '../../../redux/store';

// ----------------------------------------------------------------------

ProfileModalRowTags.propTypes = {
  selected: PropTypes.array,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function ProfileModalRowTags({ selected, open, onClose }) {
  const [selectTagsDefault, setSelectTagsDefault] = useState([]);

  const tagsInSelectedRow = useSelector((state) => state.browsers.profile.collection).filter((element) =>
    selected.includes(element.id)
  );

  useEffect(() => {
    if (open) {
      const newArray = [];

      tagsInSelectedRow.forEach((element) => {
        newArray.push(...element.tags);
      });

      setSelectTagsDefault(Array.from(new Set(newArray.map((element) => element.name))));
    }
  }, [open, tagsInSelectedRow]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ p: 2, pb: 0, width: 351 }}>
        <BrowsersSelectTags selectTagsDefault={selectTagsDefault} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
