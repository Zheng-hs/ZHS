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
  getOrderByOrderCode: {
      url:'/pc/order/getOrderByOrderCode',
      method: 'post'
  },
  listOrder: {
      url:'/pc/order/listOrder',
      method: 'post'
  },
  updateOrderState: {
    url:'/pc/order/updateOrderState',
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
