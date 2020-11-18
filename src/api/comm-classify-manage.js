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
  saveGoodsClassify: {
      url:'/pc/goodsClassify/saveGoodsClassify',
      method: 'post'
  },
  listAllGoodsClassify: {
      url:'/pc/goodsClassify/listGoodsClassify',
      method: 'post'
  },
  getGoodsClassifyByCateCode: {
    url:'/pc/goodsClassify/getGoodsClassifyByCateCode',
    method: 'post'
  },
  updateGoodsClassify: {
    url:'/pc/goodsClassify/updateGoodsClassify',
    method: 'post'
  },
  deleteGoodsClassify: {
    url:'/pc/goodsClassify/deleteGoodsClassify',
    method: 'post'
  },


}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
