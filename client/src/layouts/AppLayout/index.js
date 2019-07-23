import React from 'react';
import Header from '../../components/Header'
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

      <Header />

      { props.children }

    </div>
  )

}
