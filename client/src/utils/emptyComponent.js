import React from 'react';

//components

//styles
import { useStyles } from './styles'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    
  },
}))

export default function Component(props) {
  const classes = useStyles();

  return(
    <div className={classes.root}>

    </div>
  )

}
