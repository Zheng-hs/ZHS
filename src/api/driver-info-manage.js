import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  getPlace: {
      url:'/pc/driver/getPlace',
      method: 'post'
  },
  listDriver: {
      url:'/pc/driver/listDriver',
      method: 'post'
  },
  saveDriver: {
    url:'/pc/driver/saveDriver',
    method: 'post'
},
getDriverByDriverCode: {
    url:'/pc/driver/getDriverByDriverCode',
    method: 'post'
},
updateDriver: {
    url:'/pc/driver/updateDriver',
    method: 'post'
},
deleteDriver: {
    url:'/pc/driver/deleteDriver',
    method: 'post'
},


}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
