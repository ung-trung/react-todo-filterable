import axios from 'axios'

export default axios.create({
  baseURL: 'https://trinhtodo-new-api.herokuapp.com/api',
  headers: {
    common: { 'Content-Type': 'application/json' }
  }
})
