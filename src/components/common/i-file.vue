<template>
  <div class="container" v-loading="loading">
    <div class="file-box">
      <el-button class="add-btn" @click="addImg" type="primary" icon="el-icon-plus"></el-button>
      <span v-show="imagePath" @click="openImg">{{imagePath}}</span>
      <el-button v-show="imagePath" @click="deleteImg" class="delete-btn" type="danger" icon="el-icon-delete"></el-button>
    </div>
    <input style="display:none" id="file" ref="file" type="file" value="" name="imageFile" @change="fileChange($event)"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'i-file',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imagePath: '',
      loading: false
    }
  },
  watch: {
    value: {
      handler (value) {
        this.imagePath = value

        if (!value) {
          document.getElementById('file').value = ''
        }
      },
      deep: true
    }
  },
  methods: {
    openImg () {
      window.open(this.imagePath)
    },
    addImg () {
      this.$refs.file.click()
    },
    deleteImg () {
      this.imagePath = ''
      this.$emit('input', this.imagePath)
    },
    fileChange (event) {
      if (event.target.files.length) {
        this.loading = true
        const form = new FormData()
        const imageFile = document.getElementById('file').files[0]
        form.append('imageFile', imageFile, imageFile.name) // 通过append向form对象添加数据
        form.append('access_token', JSON.parse(sessionStorage.getItem('userInfo')).access_token) // 通过append向form对象添加数据

        axios({
          method: 'post',
          url: 'http://3t059459r5.wicp.vip/pc/imageUpload/uploadImage',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(data => {
          this.loading = false
          this.imagePath = data.data.data
          this.$emit('input', this.imagePath)
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.imagePath = ''
        this.$emit('input', this.imagePath)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .file-box {
    display: flex;
    justify-content: space-between;
    .add-btn {
      padding: 0px 10px;
    }
    span:nth-child(2) {
      flex: 1;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      padding: 0 5px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        color: #409EFF;
      }
    }

    .delete-btn {
      padding: 0 10px;
    }
  }
}
</style>
