import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Link = "http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane"

export default function ButtonAppBar() {
  const classes = useStyles();
  const [data, setData] = useState(0);
  useEffect( () => {
    document.title = "Frontend Dev CS"
    async function fetchData() {
      const api_call = await fetch(Link);
      const data = await api_call.json();
      setData(data)
    }
    fetchData();
  }, []);
  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Frontend Dev CS
            </Typography>
            <Button color="inherit">Go</Button>
          </Toolbar>
        </AppBar>
      </div>
  );
}

