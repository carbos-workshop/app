import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const WhiteTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.55)',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiFormLabel-root':{
      color: 'rgba(255,255,255,0.55)'
    },
    '& .MuiInputBase-input':{
      color: 'white'
    },
  },
})(TextField);