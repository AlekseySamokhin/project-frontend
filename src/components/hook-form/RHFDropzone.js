import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
//
import Image from '../Image';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(3, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
  '&:focus': { border: `1px dashed green` },
}));

// ----------------------------------------------------------------------

RHFDropzone.propTypes = {
  error: PropTypes.bool,
  setChecked: PropTypes.func,
  onDrop: PropTypes.func,
  loading: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sx: PropTypes.object,
};

export default function RHFDropzone({
  error = false,
  setChecked,
  onDrop,
  loading = false,
  file,
  sx,
}) {
  const { fileRejections, getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    accept: {
      'text/html': ['.txt'],
    },
    multiple: false,
    noClick: true,
    onDrop,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <Stack mt={2} alignItems="center" justifyContent="center" key={file.path}>
      {errors.map((e) => (
        <Typography sx={{ color: (theme) => theme.palette.error.main }} key={e.code}>
          {e.message}
        </Typography>
      ))}
    </Stack>
  ));

  const handleOpenDropzone = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      setChecked(true);
    }
  };

  return (
    <Box sx={{ width: '100%', ...sx }} onClick={handleOpenDropzone}>
      <DropZoneStyle
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
          ...(file && {
            padding: '12% 0',
          }),
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ width: 1, textAlign: 'center' }}>
          <Box sx={{ width: 48, height: 31 }}>
            <Image src="/assets/icons/main/ic_dropZone.svg" />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Paste your cookies or drag and drop your file
            </Typography>
          </Box>

          <Button variant="contained" size="small" onClick={open}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Browse file'}
          </Button>
        </Stack>
        {fileRejectionItems}
      </DropZoneStyle>
    </Box>
  );
}
