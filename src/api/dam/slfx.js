import request from '@/utils/http-request'
import {request2} from "../../utils/http-request";
export function listByType(data) {
  return request({
    url: '/dam/listByType',
    method: 'get',
    params: data
  })
}

export function upliftedPressure(data) {
  return request({
    url: '/dam/upliftedPressure',
    method: 'get',
    data
  })
}
export function upliftedDistrubution(data) {
  return request({
    url: '/dam/upliftedDistribution',
    method: 'get',
    data
  })
}
export function upliftedRelevance(data) {
  return request({
    url: '/dam/upliftedRelevance',
    method: 'get',
    data
  })
}
export function upliftedHysteresis(data) {
  return request({
    url: '/dam/upliftedHysteresis',
    method: 'get',
    data
  })
}
export function waterWeekCharts(data) {
  return request({
    url: '/dam/waterWeekCharts',
    method: 'get',
    data
  })
}
export function waterMonthCharts(data) {
  return request({
    url: '/dam/waterMonthCharts',
    method: 'get',
    data
  })
}
export function waterCharacteristicValue(data) {
  return request({
    url: '/dam/waterCharacteristicValue',
    method: 'get',
    data
  })
}
export function raoBaSeepPotential(data) {
  return request({
    url: '/dam/raoBaSeepPotential',
    method: 'get',
    data
  })
}
export function raoBaSeepRelevance(data) {
  return request({
    url: '/dam/raoBaSeepRelevance',
    method: 'get',
    data
  })
}
export function raoBaSeepHysteresis(data) {
  return request({
    url: '/dam/raoBaSeepHysteresis',
    method: 'get',
    data
  })
}
export function shenLiuAnalysis(data) {
  return request({
    url: '/dam/shenLiuAnalysis',
    method: 'get',
    data
  })
}
export function shenLiuRelevance(data) {
  return request({
    url: '/dam/shenLiuRelevance',
    method: 'get',
    data
  })
}
export function ceFengStageRelevance(data) {
  return request({
    url: '/dam/ceFengStageRelevance',
    method: 'get',
    data
  })
}
export function ceFengTemperatureRelevance(data) {
  return request({
    url: '/dam/ceFengTemperatureRelevance',
    method: 'get',
    data
  })
}
export function  naoDuDistribution(data) {
  return request({
    url: '/dam/naoDuDistribution',
    method: 'get',
    data
  })
}
export function yingBianStageRelevance(data) {
  return request({
    url: '/dam/yingBianStageRelevance',
    method: 'get',
    data
  })
}
export function yingBianTemperatureRelevance(data) {
  return request({
    url: '/dam/yingBianTemperatureRelevance',
    method: 'get',
    data
  })
}
export function getRedCountList(data) {
  return request({
    url: '/dam/getredcountList',
    method: 'get',
    params: data
  })
}
export function chartByTimeDeviceRescd(data) {
  return request({
    url: '/dam/chartByTimeDeviceRescd',
    method: 'get',
    params: data
  })
}
export function getpointernew(data) {
  return request({
    url: '/dam/getPointerNew',
    method: 'get',
    params: data
  })
}
export function setMaxmin(data) {
  return request({
    url: '/dam/setMaxmin',
    method: 'get',
    params: data
  })
}

export function testProxy(tm,rescds) {
  return request2({
    url: '/resos/apps/boss/chenghong/getChenghongState!chenghong',
    method: 'get',
    params: {
      tm,
      rescds
    }
  })
}
