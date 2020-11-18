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
  listSlideshow: {
      url:'/pc/slideshow/listSlideshow',
      method: 'post'
  },
  saveSlideshow: {
      url:'/pc/slideshow/saveSlideshow',
      method: 'post'
  },
  deleteSlideshow: {
      url:'/pc/slideshow/deleteSlideshow',
      method: 'post'
  },
  getSlideshowByPhotoCode: {
      url:'/pc/slideshow/getSlideshowByPhotoCode',
      method: 'post'
  },
  updateSlideshowState: {
      url:'/pc/slideshow/updateSlideshowState',
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
