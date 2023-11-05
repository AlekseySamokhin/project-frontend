import { Button, Card, CardContent, CardHeader, Divider, LinearProgress, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import SvgIconStyle from '../../../components/SvgIconStyle';
import CustomAccordion from '../../../components/CustomAccordion';
import Image from '../../../components/Image';
import { EXTRAS_EXTENSIONS_ACCORDION, EXTRAS_EXTENSIONS_HEAD } from './ExtrasConfig';
import CustomTextField from '../../../components/CustomTextField';

// ----------------------------------------------------------------------

export default function ExtrasExtensions() {

  const [progress, setProgress] = useState(0);

  const [progressLoading, setProgressLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadstart = () => setProgressLoading(true);
      reader.onprogress = (e) => setProgress((e.loaded * 100) / e.total);
      reader.onloadend = () => {
        setProgressLoading(false);
        setProgress(0);
      };

      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop, noClick: true });

  return (
    <Card {...getRootProps()} sx={{ px: 2, py: 1.5}}>
      {isDragActive && (
        <Stack
          display='flex'
          position='absolute'
          width={1}
          height={1}
          justifyContent='center'
          alignItems='center'
          zIndex={1}
          border='3px dashed #3366FF'
          borderRadius='16px'
          bgcolor='#ffffffb3'
        >
          <Stack alignItems='center' sx={{ pointerEvents: 'none' }}>
            <SvgIconStyle
              src={'/assets/icons/main/ic_cloud.svg'}
              sx={{ width: 172, height: 132, mb: 2, color: 'grey.600' }}
            />
            <Typography color='grey.600' variant='h4' textAlign='center'>
              Drop your files right here
            </Typography>
            <Typography color='grey.600' textAlign='center' variant='h4'>
              to upload from file
            </Typography>
          </Stack>
        </Stack>
      )}
      <CardHeader
        sx={{ p: 0 }}
        title={
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row'>
              <Image src='/assets/icons/main/ic_extensions.svg' sx={{ width: 21, height: 21, mr: 1.5 }} />
              <Typography variant='subtitle1' fontWeight={500} fontSize={18}>Extensions</Typography>
            </Stack>
            <Stack
              sx={{
                position: 'relative',
              }}
            >
              <Button size='small' sx={{ zIndex: 5 }} color='inherit' variant='outlined' onClick={open}>
                {progressLoading ? 'Uploading...' : 'Upload file'}
              </Button>
              {progressLoading && (
                <LinearProgress
                  variant='determinate'
                  value={progress}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.4,
                    borderRadius: '8px',
                  }}
                />
              )}
            </Stack>
          </Stack>
        }
      />
      <CardContent sx={{ p: '0 !important', mt: 1.75 }}>

        <input {...getInputProps()} />

        {EXTRAS_EXTENSIONS_HEAD.map((items, key) => (
          <Stack key={key}>
            <CustomTextField item={items.label} icon={items.img} del={key !== 0} />
            <Divider />
          </Stack>
        ))}

        <Stack mt={1.5}>

          {EXTRAS_EXTENSIONS_ACCORDION.map((items, key) => (
            <CustomAccordion key={key} name={items.name} search>
              {items.accordion.map((item, key) => (
                <Stack key={key}>
                  <CustomTextField item={item.label} icon={item.img} plus />
                  <Divider />
                </Stack>
              ))}
            </CustomAccordion>
          ))}

        </Stack>

      </CardContent>
    </Card>
  );
}
