import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PieChart from 'highcharts';
import HighchartsReact from 'highcharts-react-official'


let options = []
let optionsKm = []
let rows = []
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
    table: {
        minWidth: 700,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
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
        metric: 'ALL',
        name: '',
    });
    const [chartMax, setChartMax] = useState({
        chartMax: 5,
        name: '',
    });
    const [disabled, setDisabled] = useState(true);
  const handleChangeContinent = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
      handledata(event.target.value)
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
        handledata(state.continent)
    };

  const getContinents = (data) => {
      let arrayData = data && data.geonames.map((value) => value.continentName)
      let filterData = arrayData.filter((value, index) => arrayData.indexOf(value) === index)
        //console.log('filterData', filterData.sort())
        setContinent(filterData.sort())

  }
    function createData(continentName, CountryName, Population, Area) {
        return { continentName, CountryName, Population, Area };
    }

  const handledata = (continent) => {

      if (continent === 'ALL') {
          let data_filter = data && data.geonames
          let total = 0
          let totalKm = 0
          data_filter && data_filter.map((value)  => {
              total = total + parseInt(value.population)
          })
          data_filter && data_filter.map((value)  => {
              totalKm = totalKm + parseInt(value.areaInSqKm)
          })

          let list = data_filter && data_filter.map((value) => {
              return {
                  name: value.countryName,
                  y: (parseFloat(value.population) / total) * 100
              }
          })
          let listLast = list
          let listId = list && list.slice(0, parseFloat(chartMax.chartMax))
          let LastArray = listLast && listLast.slice(Math.max(listLast.length - parseFloat(chartMax.chartMax), 1))
          let lastElementTotal = 0
          LastArray && LastArray.map( (value) => {
              lastElementTotal = lastElementTotal + value.y
          } )
          parseFloat(chartMax.chartMax) < listLast.length &&  listId && listId.push({name: 'Other', y: lastElementTotal})
            console.log(listId)


          let listArea = data_filter && data_filter.map((value) => {
              return {
                  name: value.countryName,
                  y: (parseFloat(value.areaInSqKm) / totalKm) * 100
              }
          })

          let listLastArea = listArea
          let listAreaId = listArea && listArea.slice(0, parseFloat(chartMax.chartMax))
          let LastArrayArea = listLastArea && listLastArea.slice(Math.max(listLastArea.length - parseFloat(chartMax.chartMax), 1))
          let lastElementTotalArea = 0
          LastArrayArea && LastArrayArea.map( (value) => {
              lastElementTotalArea = lastElementTotalArea + value.y
          } )
          parseFloat(chartMax.chartMax) < listLastArea.length && listAreaId && listAreaId.push({name: 'Other', y: lastElementTotalArea})


          options =   {
              title: {
                  text: 'Population'
              },
              chart: {
                  type: 'pie',
              },
              series: [{
                  data: listId
              }]
          }

          rows = data_filter && data_filter.map((value) => {
              return createData(value.continentName, value.countryName, (parseFloat(value.population) / total) * 100, (parseFloat(value.areaInSqKm) / totalKm) * 100)
          })
          optionsKm =   {
              title: {
                  text: 'Area Square Meter'
              },
              chart: {
                  type: 'pie',
              },
              series: [{
                  data: listAreaId
              }]
          }

      } else {
          let data_filter = data.geonames.filter((value) => value.continentName === continent)
          let total = 0
          let totalKm = 0
          data_filter && data_filter.map((value)  => {
              total = total + parseInt(value.population)
          })
          data_filter && data_filter.map((value)  => {
              totalKm = totalKm + parseInt(value.areaInSqKm)
          })

          let list = data_filter && data_filter.map((value) => {
              return {
                  name: value.countryName,
                  y: (parseFloat(value.population) / total) * 100
              }
          })
          let listLast = list
          let listId = list && list.slice(0, parseFloat(chartMax.chartMax))
          let LastArray = listLast && listLast.slice(Math.max(listLast.length - parseFloat(chartMax.chartMax), 1))
          let lastElementTotal = 0
          LastArray && LastArray.map( (value) => {
              lastElementTotal = lastElementTotal + value.y
          } )
          parseFloat(chartMax.chartMax) < listLast.length &&  listId && listId.push({name: 'Other', y: lastElementTotal})


          let listArea = data_filter && data_filter.map((value) => {
              return {
                  name: value.countryName,
                  y: (parseFloat(value.areaInSqKm) / totalKm) * 100
              }
          })

          let listLastArea = listArea
          let listAreaId = listArea && listArea.slice(0, parseFloat(chartMax.chartMax))
          let LastArrayArea = listLastArea && listLastArea.slice(Math.max(listLastArea.length - parseFloat(chartMax.chartMax), 1))
          let lastElementTotalArea = 0
          LastArrayArea && LastArrayArea.map( (value) => {
              lastElementTotalArea = lastElementTotalArea + value.y
          } )
          parseFloat(chartMax.chartMax) < listLastArea.length &&  listAreaId && listAreaId.push({name: 'Other', y: lastElementTotalArea})


          rows = data_filter && data_filter.map((value) => {
              return createData(value.continentName, value.countryName, (parseFloat(value.population) / total) * 100, (parseFloat(value.areaInSqKm) / totalKm) * 100)
          })
          options =   {
              title: {
                  text: 'Population'
              },
              chart: {
                  type: 'pie',
              },
              series: [{
                  data: listId
              }]
          }
          optionsKm =   {
              title: {
                  text: 'Area Square Meter'
              },
              chart: {
                  type: 'pie',
              },
              series: [{
                  data: listAreaId
              }]
          }
      }

    }

  async function fetchData() {
        const api_call = await fetch(Link);
        const data = await api_call.json();
        setData(data)
      getContinents(data);
    }

  const onPressGo = () => {
      fetchData()
      setDisabled(false)
  }

  useEffect( () => {
    document.title = "Frontend Dev CS"
    fetchData();
    handledata('ALL')
  }, []);
  return (
      <div className={classes.root}>
          {console.log(chartMax)}
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
                name: 'chartMax',
                id: 'chart-max-native-simple',
              }}
          >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
          </Select>
        </FormControl>
          {(metric.metric === 'ALL' || metric.metric === 'population') && <HighchartsReact highcharts={PieChart} options={options} />}
          {(metric.metric === 'ALL' || metric.metric === 'areaInSqKm') && <HighchartsReact highcharts={PieChart} options={optionsKm} />}

          <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                          <StyledTableCell>Continent</StyledTableCell>
                          <StyledTableCell align="right">Country</StyledTableCell>
                          {(metric.metric === 'ALL' || metric.metric === 'population') &&  <StyledTableCell align="right">Population</StyledTableCell>}
                          {(metric.metric === 'ALL' || metric.metric === 'areaInSqKm') && <StyledTableCell align="right">Area</StyledTableCell>}
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {rows && rows.map((row) => (
                          <StyledTableRow key={row.name}>
                              <StyledTableCell component="th" scope="row">
                                  {row.continentName}
                              </StyledTableCell>
                              <StyledTableCell align="right">{row.CountryName}</StyledTableCell>
                              {(metric.metric === 'ALL' || metric.metric === 'population') && <StyledTableCell align="right">{row.Population}</StyledTableCell>}
                              {(metric.metric === 'ALL' || metric.metric === 'areaInSqKm') &&  <StyledTableCell align="right">{row.Area}</StyledTableCell>}
                          </StyledTableRow>
                      ))}
                      <StyledTableRow>
                          <StyledTableCell component="th" scope="row">

                          </StyledTableCell>
                          <StyledTableCell align="right">Total</StyledTableCell>
                          {(metric.metric === 'ALL' || metric.metric === 'population') && <StyledTableCell align="right">100</StyledTableCell>}
                          {(metric.metric === 'ALL' || metric.metric === 'areaInSqKm') &&  <StyledTableCell align="right">100</StyledTableCell>}
                      </StyledTableRow>

                  </TableBody>
              </Table>
          </TableContainer>
      </div>
  );
}

