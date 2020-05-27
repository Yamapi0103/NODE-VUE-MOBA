import axios from 'axios'

const http = axios.create({
  baseURL: 'http://192.168.100.5:8080/admin/api'
})

export default http
