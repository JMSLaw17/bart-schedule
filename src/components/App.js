import React, { Component } from 'react';
import StationSearchBar from './StationSearchBar';
import StationListByCity from './StationListByCity';
import AllTrainsForStation from './AllTrainsForStation';
import getStationList from '../services/bart/getStationList';
import getIncomingTrains from '../services/bart/getIncomingTrains';
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchBarText: '',
      allStations: [],
      allTrainsForStation: null,
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

  handleSearchBarTextChange(e) {
    this.setState({
      searchBarText: e.target.value,
    });
  }

  handleCloseTrainScheduleClick() {
    this.setState({
      allTrainsForStation: null,
    });
  }

  handleStationNameClick(stationAbbreviation) {
    this.getAllTrainsForStation(stationAbbreviation.toLowerCase())
      .then(allTrainsForStation => {
        this.setState({
          allTrainsForStation,
        });
      });
  }

  getAllTrainsForStation(stationAbbreviation) {
    return Promise.all([getIncomingTrains(stationAbbreviation, 'n'),
                        getIncomingTrains(stationAbbreviation, 's')])
      .then(trainData => {
        const allTrainsForStation = {};
        allTrainsForStation.station = trainData[0].root.station[0].name;
        allTrainsForStation.northbound = this.processTrainData(trainData[0]);
        allTrainsForStation.southbound = this.processTrainData(trainData[1]);

        return allTrainsForStation;
      });
  }

  processTrainData(trainData) {
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
        {
          this.state.allTrainsForStation
          ?
            <AllTrainsForStation allTrains={this.state.allTrainsForStation} handleCloseTrainScheduleClick={this.handleCloseTrainScheduleClick.bind(this)}/>
          :
            <div>
              <p>
                Select a Station
              </p>
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