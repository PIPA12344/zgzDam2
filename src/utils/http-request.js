import axios from 'axios'

export default function request(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 120000
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
