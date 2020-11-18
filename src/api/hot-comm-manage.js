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
  listGoods: {
    url:'/pc/slideshow/listGoods',
    method: 'post'
},
  listHotGoods: {
      url:'/pc/hotGoods/listHotGoods',
      method: 'post'
  },
  saveHotGoods: {
      url:'/pc/hotGoods/saveHotGoods',
      method: 'post'
  },
  updateHotGoods: {
    url:'/pc/hotGoods/updateHotGoods',
    method: 'post'
},
    getHotGoodsByHotGoodsCode: {
        url:'/pc/hotGoods/getHotGoodsByHotGoodsCode',
        method: 'post'
    },
    deleteHotGoods: {
        url:'/pc/hotGoods/deleteHotGoods',
        method: 'post'
    },
    getShowCount: {
        url:'/pc/hotGoods/getShowCount',
        method: 'post'
    },
    updateShowCount: {
        url:'/pc/hotGoods/updateShowCount',
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
