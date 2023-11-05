import { Controller, useFormContext } from 'react-hook-form';

import React, { useEffect, useState } from 'react';

import Dropzone from 'react-dropzone';

import map from 'lodash/map';

import PropTypes from 'prop-types';

//---------------------------------------------
RHFAddAvatar.propTypes = {
  name: PropTypes.string,
  setAvatarFile: PropTypes.func,
  dropzoneRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};
//---------------------------------------------
export default function RHFAddAvatar({ name, setAvatarFile, dropzoneRef }) {
  const [image, setImage] = useState('');
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setAvatarFile(image);
  }, [image]);

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <Dropzone name={name} ref={dropzoneRef} noClick noKeyboard>
          {({ getRootProps, getInputProps, acceptedFiles }) => (
            <div className="container">
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {map(acceptedFiles, (file) => {
                  setImage(Object.assign(file, { preview: URL.createObjectURL(file) }));
                  file && setValue('avatar', file);
                })}
              </div>
            </div>
          )}
        </Dropzone>
      )}
    />
  );
}
