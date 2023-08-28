/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as Mui from '@mui/x-date-pickers';
import { FormikProps } from 'formik';

type Props = {
  formik: FormikProps<any>,
  label: string,
  name: string,
};

export default function BasicDateTimePicker({
  formik,
  label,
  name,
}: Props): JSX.Element {
  const handleDateChange = (newDate: Date | null) => {
    formik.setFieldValue('date', newDate);
  };
  const dateTimePickerProps = {
    onChange: handleDateChange,
    onBlur: formik.handleBlur,
    label,
    name,
    value: formik.values[name],
  };

  return (
    <Mui.DateTimePicker
      slotProps={{
        textField: {
          error: false,
        },
      }}
      sx={{ border: 'none' }}
      {...dateTimePickerProps}
    />
  );
}
