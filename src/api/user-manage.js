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
  getTableData: {
      url:'/pc/user/listUsers',
      method: 'post'
  },
  addTableData: {
      url:'/pc/user/saveUser',
      method: 'post'
  },
  getUserByUserCode: {
    url:'/pc/user/getUserByUserCode',
    method: 'post'
},
updateUser: {
    url:'/pc/user/updateUser',
    method: 'post'
},
deleteUser: {
    url:'/pc/user/deleteUser',
    method: 'post'
},
// uploadImage: {
//     url:'/pc/imageUpload/uploadImage',
//     method: 'post'
// },


}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
