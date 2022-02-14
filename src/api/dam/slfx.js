import request from '@/utils/http-request'

export function listByType(data) {
  return request({
    url: '/dam/listByType',
    method: 'post',
    params: data
  })
}

export function upliftedPressure(data) {
  return request({
    url: '/dam/upliftedPressure',
    method: 'post',
    data
  })
}
export function upliftedDistrubution(data) {
  return request({
    url: '/dam/upliftedDistribution',
    method: 'post',
    data
  })
}
export function upliftedRelevance(data) {
  return request({
    url: '/dam/upliftedRelevance',
    method: 'post',
    data
  })
}
export function upliftedHysteresis(data) {
  return request({
    url: '/dam/upliftedHysteresis',
    method: 'post',
    data
  })
}
export function waterWeekCharts(data) {
  return request({
    url: '/dam/waterWeekCharts',
    method: 'post',
    data
  })
}
export function waterMonthCharts(data) {
  return request({
    url: '/dam/waterMonthCharts',
    method: 'post',
    data
  })
}
export function waterCharacteristicValue(data) {
  return request({
    url: '/dam/waterCharacteristicValue',
    method: 'post',
    data
  })
}
export function raoBaSeepPotential(data) {
  return request({
    url: '/dam/raoBaSeepPotential',
    method: 'post',
    data
  })
}
export function raoBaSeepRelevance(data) {
  return request({
    url: '/dam/raoBaSeepRelevance',
    method: 'post',
    data
  })
}
export function raoBaSeepHysteresis(data) {
  return request({
    url: '/dam/raoBaSeepHysteresis',
    method: 'post',
    data
  })
}
export function shenLiuAnalysis(data) {
  return request({
    url: '/dam/shenLiuAnalysis',
    method: 'post',
    data
  })
}
export function shenLiuRelevance(data) {
  return request({
    url: '/dam/shenLiuRelevance',
    method: 'post',
    data
  })
}
export function ceFengStageRelevance(data) {
  return request({
    url: '/dam/ceFengStageRelevance',
    method: 'post',
    data
  })
}
export function ceFengTemperatureRelevance(data) {
  return request({
    url: '/dam/ceFengTemperatureRelevance',
    method: 'post',
    data
  })
}
export function  naoDuDistribution(data) {
  return request({
    url: '/dam/naoDuDistribution',
    method: 'post',
    data
  })
}
export function yingBianStageRelevance(data) {
  return request({
    url: '/dam/yingBianStageRelevance',
    method: 'post',
    data
  })
}
export function yingBianTemperatureRelevance(data) {
  return request({
    url: '/dam/yingBianTemperatureRelevance',
    method: 'post',
    data
  })
}
export function getRedCountList(data) {
  return request({
    url: '/dam/getredcountList',
    method: 'post',
    params: data
  })
}
export function chartByTimeDeviceRescd(data) {
  return request({
    url: '/dam/chartByTimeDeviceRescd',
    method: 'post',
    params: data
  })
}
export function getpointernew(data) {
  return request({
    url: '/dam/getpointernew',
    method: 'post',
    params: data
  })
}
export function setMaxmin(data) {
  return request({
    url: '/dam/setMaxmin',
    method: 'post',
    params: data
  })
}
