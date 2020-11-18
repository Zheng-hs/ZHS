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
  listShop: {
      url:'/pc/shop/listShop',
      method: 'post'
  },
  saveShop: {
    url:'/pc/shop/saveShop',
    method: 'post'
},
getShopByShopCode: {
    url:'/pc/shop/getShopByShopCode',
    method: 'post'
},
updateShop: {
    url:'/pc/shop/updateShop',
    method: 'post'
},
deleteShop: {
    url:'/pc/shop/deleteShop',
    method: 'post'
},


}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
