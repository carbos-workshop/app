import React from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { UserContext } from '../../contexts/user.context'
import { authService } from '../../services/auth.service'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  title: {
    flexGrow: 1,
  },
  links: {
    flexGrow: 2,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  accountButton: {
    marginLeft: 'auto'
  }
}));

const TextButton = withStyles(theme => ({
  root: {
    color: 'white',
  },
}))(Button);

const links = [
  {
    name: 'Browse',
    redirectUrl: 'explore'
  },
  {
    name: 'Register',
    redirectUrl: 'create'
  },
  {
    name: 'Buy',
    redirectUrl: ''
  }
]

function Header(props) {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = React.useState(null);
  
  const menuOpen = Boolean(menuAnchorEl);
  const accountOpen = Boolean(accountAnchorEl);

  function sendWarning(message) {
    props.enqueueSnackbar(message, {
      anchorOrigin: {
       vertical: 'top',
       horizontal: 'center',
       },
       autoHideDuration: 5000,
       variant: 'warning',
     })
  }

  function handleMenu(event) {
    setMenuAnchorEl(event.currentTarget);
  }

  function handleAccount(event) {
    setAccountAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setMenuAnchorEl(null);
    setAccountAnchorEl(null);

  }

  function logout(user){
    authService.logout(user)
      .then(()=>{
        props.history.push('/login')
      })
      .catch(() => {
        sendWarning('An unexpected problem occured')
      })
  }

  return (
    <UserContext.Consumer>
    {(user)=>(
       <div className={classes.root}>
       <AppBar position="static">
         <Toolbar>
           <IconButton 
              edge="start" 
              className={classes.menuButton} 
              color="inherit"
              aria-label="Menu"
              aria-controls="menu-appbar-2"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit">
             <MenuIcon />
           </IconButton>
           <Menu
              id="menu-appbar-2"
              anchorEl={menuAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menuOpen}
              onClose={handleClose}
            >
              {
              links.map((link, index)=>(
              <MenuItem 
                key={index} 
                onClick={ () => {props.history.push(link.redirectUrl)} }>
                <Typography variant="button">{link.name}</Typography>
              </MenuItem>
              ))
            }
            </Menu>
           <div className={classes.links}>
            {
              links.map((link, index)=>(
              <TextButton 
                key={index} 
                onClick={ () => {props.history.push(link.redirectUrl)} }>
                {link.name}
              </TextButton>
              ))
            }
           </div>
           {user.loggedIn && (
             <div className={classes.accountButton}>
               <IconButton
                 aria-label="Account of current user"
                 aria-controls="menu-appbar"
                 aria-haspopup="true"
                 onClick={handleAccount}
                 color="inherit"
               >
                 <AccountCircle />
               </IconButton>
               <Menu
                 id="menu-appbar"
                 anchorEl={accountAnchorEl}
                 anchorOrigin={{
                   vertical: 'top',
                   horizontal: 'right',
                 }}
                 keepMounted
                 transformOrigin={{
                   vertical: 'top',
                   horizontal: 'right',
                 }}
                 open={accountOpen}
                 onClose={handleClose}
               >
                  <MenuItem onClick={()=>{ props.history.push('/dashboard') }}>
                    <Typography variant="button">Home</Typography>
                  </MenuItem>
                  <MenuItem onClick={()=>{logout(user)}}>
                    <Typography variant="button" color="primary">Logout</Typography>
                  </MenuItem>
               </Menu>
             </div>
           )}
         </Toolbar>
       </AppBar>
     </div>
    )}
    </UserContext.Consumer>
  );
}

export default withRouter(withSnackbar(Header))