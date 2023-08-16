/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormikProps } from 'formik';

type Props = {
  formik: FormikProps<any>,
  label: string,
  name: string,
  options: string[],
};

export default function BasicSelect({
  formik,
  name,
  label,
  options,
}: Props): JSX.Element {
  const SelectProps = {
    onChange: formik.handleChange,
    value: formik.values[name],
    name,
    label,
    options,
  };

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          slotProps={{ input: { } }}
          {...SelectProps}
        >
          {options.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {' '}
                {item}{' '}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
