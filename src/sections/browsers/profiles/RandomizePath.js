import React from 'react';
import { useWatch } from 'react-hook-form';
import map from 'lodash/map';
import size from 'lodash/size';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

// ----------------------------------------------------------------------

RandomizePath.propTypes = {
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  control: PropTypes.object,
};

// ----------------------------------------------------------------------

const TypographyStyled = styled(Typography)({
  minHeight: 18,
});

export default function RandomizePath({ item, control }) {
  const value = useWatch({
    name: item.path,
    control,
  });

  const params = useWatch({
    name: item.key,
    control,
  });

  switch (item.displayMethod) {
    case 'text':
      if (item.key === 'cpu' && value !== 'Real') {
        return <TypographyStyled variant='caption'>{value} Cores</TypographyStyled>;
      }
      if (item.key === 'memory' && value !== 'Real') {
        return <Typography variant='caption'>{value} GB</Typography>;
      }
      if (item.key === 'language') {
        return <TypographyStyled variant='caption'>{value}</TypographyStyled>;
      }
      if (item.key === 'screen' && params === 'Real') {
        return <TypographyStyled variant='caption'>{params}</TypographyStyled>;
      }
      if (item.key === 'webRTC' && params !== 'Manual') {
        return <TypographyStyled variant='caption'>{params}</TypographyStyled>;
      }
      return <TypographyStyled variant='caption'>{value}</TypographyStyled>;
    case 'array':
      if (item.key === 'webGLInfo') {
        if (params === 'Manual') {
          return map(value, (item, key) => (
            <TypographyStyled key={key} variant='caption'>
              {item}
              <br />
            </TypographyStyled>
          ));
        }
        return <TypographyStyled variant='caption'>{params}</TypographyStyled>;
      }
      if (item.key === 'geolocation') {
        if (params === 'Manual') {
          return (
            <Stack direction='row' alignItems='center' spacing={1}>
              {map(value, (item, key) => (
                <Stack sx={{ minHeight: 18 }} key={key}>
                  {item !== '' && (
                    <TypographyStyled variant='caption'>
                      {item}
                    </TypographyStyled>
                  )}
                </Stack>
              ))}
            </Stack>
          );
        }
        return <TypographyStyled variant='caption'>{params}</TypographyStyled>;
      }
      if (item.key === 'mediaDevice' && params === 'Manual') {
        return (
          <Stack direction='row' alignItems='center'>
            {map(value, (item, key) => (
              <TypographyStyled variant='caption' key={key}>
                {' '}
                {item}
                {key !== size(value) - 1 && '/'}
              </TypographyStyled>
            ))}
          </Stack>
        );
      }
      if (item.key === 'mediaDevice') {
        return <TypographyStyled variant='caption'>{params}</TypographyStyled>;
      }
      return (
        <Stack direction='row' alignItems='center' sx={{ minHeight: 18 }} spacing={1}>
          {map(value, (item, index) => (
            <TypographyStyled key={index} variant='caption'>
              {item}{' '}
            </TypographyStyled>
          ))}
        </Stack>
      );
    case 'object':
      return (
        <TypographyStyled variant='caption'>
          value?.label
        </TypographyStyled>
      );
    case 'collection':
      return map(value, (item, index) => (
        <TypographyStyled variant='caption' key={index}>
          {item?.label}
        </TypographyStyled>
      ));
    case 'boolean':
      if (value) {
        return <TypographyStyled variant='caption'>On</TypographyStyled>;
      }
      return <TypographyStyled variant='caption'>Off</TypographyStyled>;
    default:
      return null;
  }
}
