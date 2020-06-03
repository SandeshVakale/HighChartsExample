import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Link = "http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane"

export default function ButtonAppBar() {
  const classes = useStyles();
  const [data, setData] = useState(0);
  const [continent, setContinent] = useState(0);
  const [state, setState] = useState({
    continent: '',
    name: '',
  });
    const [metric, setMetric] = useState({
        metric: '',
        name: '',
    });
    const [chartMax, setChartMax] = useState({
        chartMax: '',
        name: '',
    });
    const [disabled, setDisabled] = useState(true);
  const handleChangeContinent = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

   const handleChangeMetric = (event) => {
        const name = event.target.name;
       setMetric({
            ...metric,
            [name]: event.target.value,
        });
    };

    const handleChangeChartMax = (event) => {
        const name = event.target.name;
        setChartMax({
            ...chartMax,
            [name]: event.target.value,
        });
    };

  const getContinets = (data) => {
      let arrayData = data && data.geonames.map((value) => value.continentName)
      let filterData = arrayData.filter((value, index) => arrayData.indexOf(value) === index)
        //console.log('filterData', filterData.sort())
    setContinent(filterData.sort())

  }
  async function fetchData() {
        const api_call = await fetch(Link);
        const data = await api_call.json();
        setData(data)
        getContinets(data);
    }

  const onPressGo = () => {
      fetchData()
      setDisabled(false)
  }

  useEffect( () => {
    document.title = "Frontend Dev CS"
    fetchData();
  }, []);
  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h1" className={classes.title}>
              Frontend Dev CS
            </Typography>
            <Button color="inherit" onClick={onPressGo}>Go</Button>
          </Toolbar>
        </AppBar>
        <FormControl className={classes.formControl} disabled={disabled}>
          <InputLabel htmlFor="age-native-simple">Continent</InputLabel>
          <Select
              native
              value={state.age}
              onChange={handleChangeContinent}
              inputProps={{
                name: 'continent',
                id: 'continent-native-simple',
              }}
          >
            <option value={'ALL'}>ALL</option>
            {continent && continent.map((value, i) =>  <option key={i} value={value}>{value}</option>)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} disabled={disabled}>
          <InputLabel htmlFor="age-native-simple">Metric</InputLabel>
          <Select
              native
              value={state.age}
              onChange={handleChangeMetric}
              inputProps={{
                name: 'metric',
                id: 'metric-native-simple',
              }}
          >
              <option value={'ALL'}>ALL</option>
              <option value={'areaInSqKm'}>areaInSqKm</option>
              <option value={'population'}>population</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} disabled={disabled}>
          <InputLabel htmlFor="age-native-simple">chart max</InputLabel>
          <Select
              native
              value={state.age}
              onChange={handleChangeChartMax}
              inputProps={{
                name: 'chart max',
                id: 'chart-max-native-simple',
              }}
          >
            <option value={'5'}>5</option>
              <option value={'10'}>10</option>
              <option value={'15'}>15</option>
              <option value={'20'}>20</option>
          </Select>
        </FormControl>
      </div>
  );
}

