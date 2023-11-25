import styled from "@emotion/styled";
import ButtonMUI from "@mui/material/Button";
import TextFieldMUI from "@mui/material/TextField";
import SnackBarMUI from '@mui/material/Snackbar'
import AlertMUI from '@mui/material/Alert'
import FormControlMUI from "@mui/material/FormControl";
import InputLabelMUI from "@mui/material/InputLabel";
import SelectMUI from "@mui/material/Select";
import MenuItemMUI from "@mui/material/MenuItem";

export const Button = styled(ButtonMUI)``
export const TextField = styled(TextFieldMUI)``
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 270px;
  text-align: center;
`

export const SnackBar = styled(SnackBarMUI)``

export const Alert = styled(AlertMUI)``

export const FormControl = styled(FormControlMUI)``
export const InputLabel  = styled(InputLabelMUI)``
export const Select = styled(SelectMUI)``
export const MenuItem = styled(MenuItemMUI)``