import React, { Component } from 'react';
import StationSearchBar from './StationSearchBar';
import StationListByCity from './StationListByCity';
import AllTrainsForStation from './AllTrainsForStation';
import getStationList from '../services/bart/getStationList';
import getIncomingTrainsForStation from '../services/bart/getIncomingTrainsForStation';
import logo from '../assets/logo.png';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchBarText: '',
      allStations: [],
      allTrainsForStation: {},
      trainsVisible: false,
    };
  }

  componentWillMount() {
    getStationList()
      .then(stationList => {
        this.setState({
          allStations: this.processStationList(stationList),
        });
      });
  }

  processStationList(stationList) {
    // formats data from bart's api regarding all bart stations

    if (!stationList || !stationList.root || !stationList.root.stations ||
        !Array.isArray(stationList.root.stations.station))
      throw new Error('stationList not formatted as expected');

    const stations = stationList.root.stations.station;


    return stations.map(station => {
      const { name, abbr, city } = station;

      return {
        name,
        abbr,
        city,
      };
    });
  }

  filterStationsBySearch(query, stations) {
    // returns a list of the stations with a name or city name that includes the query
    query = query.toLowerCase();
    const filteredList = []

    stations.forEach(station => {
      const { name, city, abbr } = station;

      if (city.toLowerCase().includes(query) || name.toLowerCase().includes(query))
        filteredList.push({
          name,
          abbr,
          city,
        });
    });

    return filteredList;
  }

  organizeStationsByCity(stations) {
    // groups stations by the city they are in
    const cityToStationsMap = {};

    stations.forEach(station => {
      const { name, abbr, city } = station;

      if (!(city in cityToStationsMap))
        cityToStationsMap[city] = [];

      cityToStationsMap[city].push({
        name,
        abbr,
      });  
    });
    
    return this.convertCityToStationsMapToList(cityToStationsMap);
  }

  convertCityToStationsMapToList(cityToStationsMap) {
    // creates a list of city objects and sorts them by name
    // city objects have a name property and a list of stations in the city sorted by name
    const stationsByCity = [];

    for (let city in cityToStationsMap) {
      cityToStationsMap[city].sort((a, b) => a.name > b.name ? 1 : -1);

      stationsByCity.push({
        cityName: city,
        stations: cityToStationsMap[city],
      });
    }

    return stationsByCity.sort((a, b) => a.cityName > b.cityName ? 1 : -1);
  }

  showStationList() {
    this.setState({
      trainsVisible: false,
    });
  }

  handleSearchBarTextChange(e) {
    this.setState({
      searchBarText: e.target.value,
    });
  }

  handleCloseTrainScheduleClick() {
    this.showStationList();
  }

  handleStationNameClick(stationAbbreviation) {
    this.getAllTrainsForStation(stationAbbreviation.toLowerCase())
      .then(allTrainsForStation => {
        this.setState({
          allTrainsForStation,
          trainsVisible: true,
        });
      });
  }

  getAllTrainsForStation(stationAbbreviation) {
    return getIncomingTrainsForStation(stationAbbreviation)
      .then(trainData => {
        const allTrainsForStation = {};
        if (!trainData || !trainData.root || !trainData.root.station || !trainData.root.station[0])
          throw new Error('trainData not formatted as expected');

        allTrainsForStation.station = trainData.root.station[0].name;
        allTrainsForStation.trainsByDestination = this.processTrainData(trainData);

        return allTrainsForStation;
      });
  }

  processTrainData(trainData) {
    // formats data from bart's api regarding a station's train schedule
    const trainSchedule = trainData.root.station[0].etd;
    const trainsByDestination = [];

    if (!trainSchedule)
      return trainsByDestination;

    let destinationInfo;
    trainSchedule.forEach(destination => {
      destinationInfo = {
        destination: destination.destination,
        etas: [],
      };

      destination.estimate.forEach(train => {
        destinationInfo.etas.push(train.minutes);
      });
      
      destinationInfo.etas.sort((a, b) => a - b);

      trainsByDestination.push(destinationInfo);
    });
    
    return trainsByDestination.sort((a, b) => a.destination > b.destination ? 1 : -1);
  }

  render() {
    return (
      <div className="App">
      <div className="header">
        <img className="logo" onClick={this.showStationList.bind(this)} src={logo} alt={''}/>
      </div>
        {
          this.state.trainsVisible
          ?
            <AllTrainsForStation allTrains={this.state.allTrainsForStation} handleCloseTrainScheduleClick={this.handleCloseTrainScheduleClick.bind(this)}/>
          :
            <div className="wrapper">
              <StationSearchBar searchBarText={this.state.searchBarText} handleChange={this.handleSearchBarTextChange.bind(this)}/>
              <StationListByCity stationsByCity={this.organizeStationsByCity(this.filterStationsBySearch(this.state.searchBarText, this.state.allStations))}
                                  handleStationNameClick={this.handleStationNameClick.bind(this)}/>
            </div>              
        }
      </div>
    );
  }
}

export default App;