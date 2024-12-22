import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)

const getAllGames = () => http.get('/games');

const getStandings = () => http.get('/standings');

// const getEvent = (id) => http.get(`/events/${id}`);

// const deleteEvent = (id) => http.delete(`/events/${id}`);

export {
  getAllGames,
  getStandings
}