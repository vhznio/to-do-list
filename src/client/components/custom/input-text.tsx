/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import * as Mui from '@mui/material';
import { FormikProps } from 'formik';
import { useId } from 'react';

type Props = Mui.TextFieldProps & {
  formik: FormikProps<any>,
  label: string,
  name: string,
  type?: 'text' | 'email',
};

export default function InputText({
  formik,
  label,
  name,
  type,
}: Props): JSX.Element {
  const id = useId();
  const inputTextProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    id,
    label,
    name,
    type,
    value: formik.values[name],
  };
  return (
    <Mui.FormControl
      error={formik.touched[name] && !!formik.errors[name]}
      sx={{ width: '100%' }}
    >
      <Mui.InputLabel>{label}</Mui.InputLabel>
      <Mui.OutlinedInput {...inputTextProps} />
      <Mui.FormHelperText>
        {formik.touched[name] && formik.errors[name] ? (
          <>{formik.touched[name] && formik.errors[name]}</>
        ) : (
          ' '
        )}
      </Mui.FormHelperText>
    </Mui.FormControl>
  );
}
