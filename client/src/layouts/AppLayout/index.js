import React from 'react';
import {withRouter} from 'react-router-dom'

//components

//styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    
  },
}))

export default function AppLayout(props) {
  const classes = useStyles();

  return(
    <div className={classes.root}>

      <h1>HEADER</h1>

      { props.children }

    </div>
  )

}
