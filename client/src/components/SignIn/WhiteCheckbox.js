import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

export const WhiteCheckbox = withStyles({
  root: {
    color: 'white',
    '&$checked': {
      color: 'white',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);