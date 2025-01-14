import axios from 'axios';
import  {api_headers} from '../apiconfig';

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)


async function getAllGames() {

  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: {season: '2024'},
    headers: api_headers
  };

  const response = await axios.request(options);

  return response.data.response;
};


async function getStandings() {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/standings',
    params: {
      league: 'standard',
      season: '2024'
    },
    headers: api_headers
  };

  const response = await axios.request(options);
  
  return response.data.response;
};

async function getGameById(gameId) {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games',
    params: {id: gameId},
    headers: {
      'x-rapidapi-key': '42cfe38bbcmshd5c805157df8d2bp1bbd32jsnc2f7b6b7360d',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };
  const response = await axios.request(options);

  return response.data.response;
}

async function getGameStats(gameId) {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games/statistics',
    params: {id: gameId},
    headers: api_headers
  };

  const response = await axios.request(options);

  return response.data.response;
}

async function getTeamStats(teamId) {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/statistics',
    params: {
      id: teamId,
      season: '2024'
    },
    headers: api_headers
  };

  const response = await axios.request(options);

  return response.data.response;
}

async function getPlayerByTeam(teamId) {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players',
    params: {
      team: teamId,
      season: '2024'
    },
    headers: api_headers
  };
  
  const response = await axios.request(options);

  return response.data.response;
}

async function getPlayersStatsPerGame(gameId) {
  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
    params: {
      game: gameId
    },
    headers: api_headers
  };
  
  const response = await axios.request(options);

  return response.data.response;
}

// const getAllGames = () => http.get('/games');

// const getStandings = () => http.get('/standings');

// const getEvent = (id) => http.get(`/events/${id}`);

// const deleteEvent = (id) => http.delete(`/events/${id}`);

export {
  getAllGames,
  getStandings,
  getGameById,
  getGameStats,
  getTeamStats,
  getPlayerByTeam,
  getPlayersStatsPerGame
}