<template>
    <div>
        <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
            <el-form-item label="状态" prop="state">
                <el-select v-model="formData.state" placeholder="请选择">
                        <el-option
                        v-for="item in stateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                </el-select>
            </el-form-item>
        </i-search>
        <!-- <el-button  @click="test">click</el-button> -->
        <i-table :toolbar="toolbar" 
        :tableData="tableData" 
        :pageInfo="pageInfo"
        :selectionShow="true"
        @selection-change="handleSelectionChange"
         @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
            <el-table-column
            v-for="(item,index) in columnList"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center"
            :formatter="columnFormatter">
            <template slot-scope="scope">
                <el-button v-if="item.prop === 'watch'" type="text"
                @click="watchImg(scope.row)">预览</el-button>
                <span v-else>{{filterDist(scope.row[item.prop],item)}}</span>
            </template>
            </el-table-column>
        </i-table>
        <i-dialog v-model="dialogVisible"
        :title="dialogTitle"
        height="200px"
        @dialog-before-close="dialogBeforeClose"
        @dialog-cancel="dialogCancel"
        @dialog-confirm="dialogConfirm">
            
        <el-form :model="dialogFormData" ref="form" :rules="formRules" label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="轮播图片" prop="photoPath">
                            <!-- <el-upload
                            ref="upload"
                            class="upload-btn"
                            action="http://3t059459r5.wicp.vip/pc/imageUpload/uploadImage"                    
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :http-request="httpRequest"
                            :limit="1"
                            :file-list="fileList">
                            <el-button size="small" type="primary"  >点击上传</el-button>
                            </el-upload>
                            <el-input v-model="dialogFormData.photoPath" ></el-input> -->
                             <i-file v-model="dialogFormData.photoPath"></i-file>
                    </el-form-item>
                </el-col>
                <el-col :span="12" >
                    <el-form-item label="排序" prop="sort">
                        <el-input v-model.number="dialogFormData.sort"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="有效期起" prop="timeStart">
                            <el-date-picker
                                v-model="dialogFormData.timeStart"
                                :picker-options="start"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期时间">
                                </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="有效期止" prop="timeStop">
                            <el-date-picker
                                v-model="dialogFormData.timeStop"
                                type="date"
                                value-format="yyyy-MM-dd"
                                 :picker-options="end"
                                placeholder="选择日期时间">
                            </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12" >
                    <el-form-item label="商品" prop="goodsCode">
                        <comm-select v-model="dialogFormData.goodsCode"></comm-select>
                    </el-form-item>
                   
                </el-col>
                <!-- <el-col :span="12" >
                    <el-button type="primary" @click="innerVisible = true">选择</el-button>
                </el-col> -->

                 
            </el-row>
        </el-form>
        </i-dialog>
    </div>
</template>
<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'
import CommSelect from './comm-select.vue'
import IFile from '@/components/common/i-file.vue'
import moment from 'moment'
import req from '@/api/home-pic-manage.js'
import axios from 'axios'
export default {
    name: 'home-pic-manage',
    components: {
        ISearch,
        ITable,
        IDialog,
        IFile,
        // eslint-disable-next-line vue/no-unused-components
        CommSelect
    },
    data () {
        return {
            formData: {},
            fileList: [],
            
            dialogVisible:false,
            dialogVisibles:false,
            innerVisible: false,
            dialogTitle:'新增轮播图',
            dialogFormData: {
                timeStart: '',
                timeStop: ''
            },
            pageInfo: {
                pageNum: 1,
                pageSize: 5,
                total:0
            },
            toolbar: [
                {
                    btnName: '新增',
                    type: 'primary',
                    func: () => {
                        this.dialogVisible = true
                    }
                },
                {
                    btnName: '删除',
                    type: 'primary',
                    func: () => {
                        if (this.selectRows.length>0) {
                            this.$confirm('此操作将永久删除该文件,是否继续?').then(() => {
                              
                                    for (var i=0;i<=this.selectRows.length;i++) {
                                        req('getSlideshowByPhotoCode',{
                                            photoCode:this.selectRows[i].photoCode, 
                                            // ...this.dialogFormDatas                                  
                                    }).then(data => {
                                        console.log(data)
                                        this.dialogFormData = data.data
                                        
                                    req('deleteSlideshow',{
                                            ...this.dialogFormData
                                        }).then(data => {
                                            console.log(data)
                                            this.dialogFormData={}
                                            this.search()
                                        })                                  
                                    })
                                    }
                                
                            })
                        } else {
                            return false
                        }

                    }
                },
                {
                    btnName: '启用',
                    type: 'primary',
                    func: () => {
                        if (this.selectRows.length>0) {
                                this.$confirm('是否将此商品启用?').then(() => {
                                        
                                    for (var i=0;i<=this.selectRows.length-1;i++) {              
                                            req('updateSlideshowState',{
                                                photoCode:this.selectRows[i].photoCode,
                                                state:0
                                            }).then(data => {
                                              
                                                this.tableData=data.data
                                                this.search()
                                            })                                 
                                    }
                                            
                                })
                            } else {
                                return false
                                }
                    }
                },
                {
                    btnName: '禁用',
                    type: 'primary',
                    func: () => {
                        if (this.selectRows.length>0) {
                                this.$confirm('是否将此商品禁用?').then(() => {
                                        
                                    for (var i=0;i<=this.selectRows.length-1;i++) {           
                                            req('updateSlideshowState',{
                                                photoCode:this.selectRows[i].photoCode,
                                                state:1
                                            }).then(data => {
                                              
                                                this.tableData=data.data
                                                this.search()
                                            })                                  
                                    }
                                            
                                })
                            } else {
                                return false
                                }
                    }
                },
            ],
            start: {
                disabledDate: (value) => {
                    if(this.dialogFormData.timeStop !== '') {
                        return this.dialogFormData.timeStop < value
                    }
                }
            },
            end: {
                disabledDate: (value) => {
                        return this.dialogFormData.timeStart > value
                }
            },
            columnList: [
                {label: '排序', prop: 'sort'},
                {label: '图片路径', prop: 'photoPath'},
                {label: '状态', prop: 'state',distName:'stateOptions'},
                {label: '预览', prop: 'watch'},
                {label: '有效期始', prop: 'timeStart'},
                {label: '有效期止', prop: 'timeStop'},
                
            ],
            tableData: [
            ],
            formRules: {
                photoPath: [{ required: true, message: '请选择图片', trigger: 'change' }],
                sort: [{ required: true, message: '请填写排序', trigger: 'change' },
                 {type: 'number', message: '排序必须为数字'}],
                timeStart: [{ required: true, message: '请选择有效期起', trigger: 'change' }],
                timeStop: [{ required: true, message: '请选择有效期止', trigger: 'change' }],
                goodsCode: [{ required: true, message: '请选择商品', trigger: 'change' }],
            },
            stateOptions: [
                {label:'启用',value:'0'},
                {label:'禁用',value:'1'}
            ]
        }
    },
    created () {
        this.search()
    },
    mounted () {
        this.pageInfo.total = this.tableData.length
    },
    methods: {
    //     methods () {
    //     this.pageInfo.total = this.tableData.length
    // },
            fetch () {
            this.pageInfo.pageSize = 5
            this.pageInfo.pageNum = 1
            this.search()
        },

        search() {
             req('listSlideshow',{
                //  access_token: JSON.parse(sessionStorage.setItem('userInfo')).access_token ,
                ...this.formData,
                pageSize:this.pageInfo.pageSize,
                pageNum:this.pageInfo.pageNum
            }).then(data => {
                this.tableData = data.data.list
                console.log(data)
               this.pageInfo.pageNum =data.data.pageNum
               this.pageInfo.pageSize = data.data.pageSize
               this.pageInfo.total = data.data.total
               
            })
        },
        reset() {
            this.fetch()
        },
        handleSizeChange (value) {
            this.pageInfo.pageSize = value
            this.search()
        },
        handleCurrentChange (value) {
            this.pageInfo.pageNum = value
           this.search()
        },
        handleSelectionChange (rows) {
           this.selectRows = rows
        },
        dialogCancel () {
            
            this.dialogVisible = false
            this.$refs.form.resetFields()
            // this.$refs.upload.clearFiles()

        },
        dialogConfirm () {
            this.$refs.form.validate((vaid) => {
                if(vaid) {
                        // this.dateFormat()
                        req('saveSlideshow',{
                                ...this.dialogFormData,
                        }).then(data => {
                            if (data.code !== 0)this.$message.error(data.msg)
                            this.$message.success(data.msg)
                            // this.tableData = data.data.data
                            console.log(data)
                            this.search()
                            
                        })
                    
                        this.dialogVisible = false
                        // this.$refs.upload.clearFiles()
                        this.dialogFormData={}
                } else {
                    return false
                }
            })
        },
        dialogBeforeClose () {
            this.dialogVisible = false
            this.$refs.form.resetFields()
            // this.$refs.upload.clearFiles()
        },
        dialogCancels () {
            // this.$emit('dialog-cancels')
            this.innerVisible = false

        },
        dialogConfirms () {
            this.$emit('dialog-confirms')
        },
        // eslint-disable-next-line no-unused-vars
        columnFormatter (row,column,cellValue,index) {
            let distName = this.columnList.filter(item => {
                return item.prop === column.property
            })[0].distName

            if (distName) {
                // console.log(row)
                return this[distName].filter(item => {
                    return item.value === row[column.property]
                })[0].label
            } else {
                return row[column.property]
            }
        },
         handleRemove(file, fileList) {
        console.log(file, fileList);
      },
        // eslint-disable-next-line no-unused-vars
        beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
       httpRequest(params) {
           let form = new FormData()
           form.append('imageFile', params.file)
           form.append('file', params.file.name)
        //    form.append('imagePath')
            form.append('access_token',JSON.parse(sessionStorage.getItem('userInfo')).access_token)

        axios({
            method: 'post',
            url: 'http://3t059459r5.wicp.vip/pc/imageUpload/uploadImage',
            data: form,
            headers: {
                'Content-Type':'multipart/form-data'
            }
        }).then(data => {
            console.log('data',data)
            this.dialogFormData.photoPath=data.data.data

            // console.log(this.dialogFormData)
        })
       },
       //预览图片
       watchImg (data) {
           window.open(data.photoPath)
       },
       //转换字典
       filterDist (value,item) {
           if (item.distName) {
               return this[item.distName].filter(distItme => {
                   return distItme.value === value
               })[0].label
           } else {
               return value
           }
       },
       //日期格式化
       dateFormat () {
           this.dialogFormData.timeStart = moment(this.dialogFormData.timeStart).format('YY-MM-DD')
           this.dialogFormData.timeStop = moment(this.dialogFormData.timeStop).format('YY-MM-DD')
       }

    }
}
</script>
<style lang="scss" scoped>
    .el-col:nth-child(6) {
        padding: 6px 10px;

        }
    .upload-btn {
        display: flex;
    }
    
</style>