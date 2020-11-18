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
    url:'/pc/goods/listGoods',
    method: 'post'
  },
  selectGoodsClassify: {
      url:'/pc/goods/selectGoodsClassify',
      method: 'post'
  },
  saveGoods: {
        url:'/pc/goods/saveGoods',
        method: 'post'
  },
  deleteGoods: {
        url:'/pc/goods/deleteGoods',
        method: 'post'
  },
  getGoodsByGoodsCode: {
        url:'/pc/goods/getGoodsByGoodsCode',
        method: 'post'
  },
  updateGoods: {
        url:'/pc/goods/updateGoods',
        method: 'post'
  },
  updateGoodsState: {
        url:'/pc/goods/updateGoodsState',
        method: 'post'
  },



}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
