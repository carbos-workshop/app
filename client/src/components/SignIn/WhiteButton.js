import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

export const WhiteButton = withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: grey[50],
    },
  },
}))(Button);