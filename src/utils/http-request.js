import axios from 'axios'

export default function request(config) {
  const instance = axios.create({
    baseURL: 'http://127.27.0.2:3000',
    timeout: 5000
  })
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    console.log(error);
  })
  instance.interceptors.response.use(res => {
    return res.data
  }, error => {
    console.log(error);
  })
  return instance(config)
}

export function request2(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000
  })
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    console.log(error);
  })
  instance.interceptors.response.use(res => {
    return res.data
  }, error => {
    console.log(error);
  })
  return instance(config)
}
