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
  saveMenu: {
      url:'/pc/menu/saveMenu',
      method: 'post'
  },
  listMenu: {
      url:'/pc/menu/listMenu',
      method: 'post'
  },
  getMenuByMenuCode: {
    url:'/pc/menu/getMenuByMenuCode',
    method: 'post'
  },
  updateMenu: {
    url:'/pc/menu/updateMenu',
    method: 'post'
  },
  deleteMenu: {
    url:'/pc/menu/deleteMenu',
    method: 'post'
  },


}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
