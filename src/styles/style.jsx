import styled from "@emotion/styled";
import ButtonMUI from "@mui/material/Button";
import TextFieldMUI from "@mui/material/TextField";
import SnackBarMUI from "@mui/material/Snackbar";
import AlertMUI from "@mui/material/Alert";
import TypographyMUI from "@mui/material/Typography";
import FormControlMUI from "@mui/material/FormControl";
import InputLabelMUI from "@mui/material/InputLabel";
import SelectMUI from "@mui/material/Select";
import MenuItemMUI from "@mui/material/MenuItem";
import OutlinedInputMUI from "@mui/material/OutlinedInput";
import IconButtonMUI from "@mui/material/IconButton";
import VisibilityMUI from "@mui/icons-material/Visibility";
import VisibilityOffMUI from "@mui/icons-material/VisibilityOff";
import BoxMUI from "@mui/material/Box";

export const Button = styled(ButtonMUI)``;
export const TextField = styled(TextFieldMUI)`
  margin-bottom: 10px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 270px;
  text-align: center;
  margin-bottom: 20px;
`;
export const SnackBar = styled(SnackBarMUI)``;
export const Alert = styled(AlertMUI)``;
export const Typography = styled(TypographyMUI)``;
export const FormControl = styled(FormControlMUI)``;
export const InputLabel = styled(InputLabelMUI)``;
export const Select = styled(SelectMUI)`
margin-bottom: 10px;
`;
export const MenuItem = styled(MenuItemMUI)``;
export const OutlinedInput = styled(OutlinedInputMUI)`
  margin-bottom: 20px;
`;
export const IconButton = styled(IconButtonMUI)``;
export const Visibility = styled(VisibilityMUI)``;
export const VisibilityOff = styled(VisibilityOffMUI)``;
export const ModalBox = styled(BoxMUI)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white; 
  border-radius: 0.5rem;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.5);
  padding: 16px;
  display: flex;
  justify-content: center;
`;
export const ModalButtonBox = styled(BoxMUI)`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const CardContainer = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 24px 28px;
  border-radius: 10px;
  margin: auto;
  margin-bottom: 40px;
  max-width: 600px;
`
export const IconContainer = styled.div`
  padding: 12px 13px;
  background-color: #299D91;
  border-radius: 8px;
  color: #fff;
  display: flex;
`

export const TextContainer = styled.div`
  width: 100%;
  text-align: center;
`

