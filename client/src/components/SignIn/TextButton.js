import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const TextButton = withStyles(theme => ({
  root: {
    color: 'white',
  },
}))(Button);