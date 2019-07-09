import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: '0',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 32px'
  },
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(8),
    fontWeight: '700', 
   },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

  changeViewModeButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  hide: {
    [theme.breakpoints.down('sm')]: {
      opacity: '0',
      width: '0',
      display: 'none',
    }
  }
}));