<template>
    <div>
        <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
            <el-form-item label="司机编号" prop="driverCode">
                <el-input v-model="formData.driverCode"></el-input>
            </el-form-item>
            <el-form-item label="司机姓名" prop="driverName">
                <el-input v-model="formData.driverName"></el-input>
            </el-form-item>
            <el-form-item label="所在省份" prop="provinceCode">
                <el-select v-model="formData.provinceCode" placeholder="请选择" @change="province">
                        <el-option
                            v-for="item in provinceList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在城市" prop="cityCode">
                <el-select v-model="formData.cityCode" placeholder="请选择" @change="city">
                        <el-option
                            v-for="item in cityList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在区" prop="areaCode">
                <el-select v-model="formData.areaCode" placeholder="请选择">
                        <el-option
                            v-for="item in areaList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
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
            align="center">
            </el-table-column>
        </i-table>
        <i-dialog v-model="dialogVisible"
            :title="dialogTitle"
            @dialog-before-close="dialogBeforeClose"
            @dialog-cancel="dialogCancel"
            @dialog-confirm="dialogConfirm">
            <el-form :model="dialogFormData" ref="form" :rules="formRules" label-width="120px">
                <el-row>
                    <el-col :span="12" >
                        <el-form-item label="司机姓名" prop="driverName">
                            <el-input v-model="dialogFormData.driverName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="driverPhone">
                            <el-input v-model.number="dialogFormData.driverPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="司机账号" prop="driverAccount">
                            <el-input v-model="dialogFormData.driverAccount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码" prop="driverPassword">
                            <el-input v-model="dialogFormData.driverPassword"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="idCard">
                            <el-input v-model="dialogFormData.idCard"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在省份" prop="provinceCode">
                            <el-select v-model="dialogFormData.provinceCode" placeholder="请选择" @change="province">
                                <el-option
                                    v-for="item in provinceList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在城市" prop="cityCode">
                            <el-select v-model="dialogFormData.cityCode" placeholder="请选择" @change="city">
                                <el-option
                                    v-for="item in cityList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在区" prop="areaCode">
                            <el-select v-model="dialogFormData.areaCode" placeholder="请选择">
                                <el-option
                                    v-for="item in areaList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="photos">
                        <el-form-item label="用户头像" prop="photoPath">
                            <!-- <el-upload
                            ref="upload"
                            class="upload-btn"
                            action="http://3t059459r5.wicp.vip/pc/imageUpload/uploadImage" 
                                         
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :http-request="httpRequest"
                            :limit="1"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button> 
                                                    
                            </el-upload>
                            <el-input v-model="dialogFormData.photoPath" ></el-input>   -->
                            <i-file v-model="dialogFormData.photoPath"></i-file>
                        </el-form-item>
                        <el-form-item>
                            
                        </el-form-item>

                    </el-col>
                </el-row>
            </el-form>
        </i-dialog>
        <i-dialog v-model="dialogVisibles"
            :title="dialogTitles"
            @dialog-before-close="dialogBeforeCloses"
            @dialog-cancel="dialogCancels"
            @dialog-confirm="dialogConfirms">
            <el-form :model="dialogFormDatas" ref="form" :rules="formRules" label-width="120px">
                <el-row>
                    <el-col :span="12" >
                        <el-form-item label="司机姓名" prop="driverName">
                            <el-input v-model="dialogFormDatas.driverName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="driverPhone">
                            <el-input v-model.number="dialogFormDatas.driverPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="司机账号" prop="driverAccount">
                            <el-input v-model="dialogFormDatas.driverAccount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码" prop="driverPassword">
                            <el-input v-model="dialogFormDatas.driverPassword"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="idCard">
                            <el-input v-model="dialogFormDatas.idCard"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在省份" prop="provinceName">
                            <el-select v-model="dialogFormDatas.provinceName" placeholder="请选择" @change="province">
                                <el-option
                                    v-for="item in provinceList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在城市" prop="cityName">
                            <el-select v-model="dialogFormDatas.cityName" placeholder="请选择" @change="city">
                                <el-option
                                    v-for="item in cityList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在区" prop="areaName">
                            <el-select v-model="dialogFormDatas.areaName" placeholder="请选择">
                                <el-option
                                    v-for="item in areaList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="photos">
                        <el-form-item label="用户头像" prop="photoPath">
                            <!-- <el-upload
                            ref="upload"
                            class="upload-btn"
                            action="http://3t059459r5.wicp.vip/pc/imageUpload/uploadImage" 
                                         
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :http-request="httpRequest"
                            :limit="1"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button> 
                                                    
                            </el-upload>
                            <el-input v-model="dialogFormDatas.photoPath" ></el-input>   -->
                            <i-file v-model="dialogFormDatas.photoPath"></i-file>
                        </el-form-item>
                        <el-form-item>
                            
                        </el-form-item>

                    </el-col>
                </el-row>
            </el-form>
        </i-dialog>
        <i-dialog v-model="dialogVisibless"
            :title="dialogTitless"
            @dialog-before-close="dialogBeforeClosess"
            @dialog-cancel="dialogCancelss"
            @dialog-confirm="dialogConfirmss">
            <el-form :model="dialogFormDatass" ref="form" label-width="120px">
                <el-row>
                    <el-col :span="12" >
                        <el-form-item label="司机姓名" prop="driverName">
                            <el-input v-model="dialogFormDatass.driverName" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="driverPhone">
                            <el-input v-model="dialogFormDatass.driverPhone" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="司机账号" prop="driverAccount">
                            <el-input v-model="dialogFormDatass.driverAccount" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码" prop="driverPassword">
                            <el-input v-model="dialogFormDatass.driverPassword" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="idCard">
                            <el-input v-model="dialogFormDatass.idCard" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在省份" prop="provinceName">
                            <el-select v-model="dialogFormDatass.provinceName" placeholder="请选择" @change="province" :disabled="true">
                                <el-option
                                    v-for="item in provinceList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在城市" prop="cityName">
                            <el-select v-model="dialogFormDatass.cityName" placeholder="请选择" @change="city" :disabled="true">
                                <el-option
                                    v-for="item in cityList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在区" prop="areaName">
                            <el-select v-model="dialogFormDatass.areaName" placeholder="请选择" :disabled="true">
                                <el-option
                                    v-for="item in areaList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col class="photos">
                        <el-form-item label="用户头像" prop="photoPath" :disabled="true">
                            <i-file v-model="dialogFormDatass.photoPath" ></i-file>
                        </el-form-item>
                        <el-form-item>
                            
                        </el-form-item>

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
import IFile from '@/components/common/i-file.vue'
import req from '@/api/driver-info-manage.js'
import axios from 'axios'
export default {
    name: 'driver-info-manage',
    components: {
        ISearch,
        ITable,
        IDialog,
        IFile
    },
    data () {
        return {
            formData: {},
            dialogVisible:false,
            dialogVisibles:false,
            dialogVisibless:false,
            fileList: [],
            selectRows: {},
            dialogTitle:'新增司机',
            dialogTitles:'修改司机信息',
            dialogTitless:'查看司机信息',
            dialogFormData: {},
            dialogFormDatas: {},
            dialogFormDatass: {},
            pageInfo: {
                pageNum: 1,
                pageSize: 5,
                total:0
            },
            toolbar: [
                {
                    btnName: '详情',
                    type: 'primary',
                    func: () => {
                        if (this.selectRows.length === 1) {
                            req('getDriverByDriverCode',{
                                    driverCode:this.selectRows[0].driverCode,
                                }).then(data => {
                                    console.log(data.data)
                                    this.dialogFormDatass = data.data 
                                })
                            this.dialogVisibless = true
                        } 
                        if (this.selectRows.length === 0){
                            console.log('11',this.selectRows)
                            this.dialogVisibless = false
                        } 
                    }
                },
                {
                    btnName: '新增',
                    type: 'primary',
                    func: () => {
                        this.dialogVisible = true
                    }
                },
                {
                    btnName: '修改',
                    type: 'primary',
                    func: () => {
                        this.btnChange()
                    }
                },
                {
                    btnName: '删除',
                    type: 'primary',
                    func: () => {
                          if (this.selectRows.length>0) {
                            this.$confirm('此操作将永久删除该文件,是否继续?').then(() => {
                                    for (var i=1;i<=this.selectRows.length;i++) {
                                        req('getDriverByDriverCode',{
                                            driverCode:this.selectRows[0].driverCode, 
                                            // ...this.dialogFormDatas                                  
                                    }).then(data => {
                                        console.log(data)
                                        this.dialogFormDatas = data.data
                                        
                                    req('deleteDriver',{
                                            ...this.dialogFormDatas
                                        }).then(data => {
                                            console.log(data)
                                            this.dialogFormDatas={}
                                            this.search()
                                        })                                  
                                    })
                                    }
                                
                            })
                        } else {
                            return false
                        }
                    
                    }
                }
            ],
            columnList: [
                {label: '司机编号', prop: 'driverCode'},
                {label: '姓名', prop: 'driverName'},
                {label: '手机', prop: 'driverPhone'},
                {label: '身份证', prop: 'idCard'},
                {label: '账号', prop: 'driverAccount'},
            ],
            tableData: [],
            provinceList:[],
            cityList:[],
            areaList:[],
            formRules: {
                driverName: [{ required: true, message: '请填写司机姓名', trigger: 'change' }],
                driverPhone: [{ required: true, message: '请填写联系电话', trigger: 'change' },
                {type: 'number', message: '电话号码必须为数字'}],
                photoPath: [{ required: true, message: '请选择头像', trigger: 'change' }],
                driverAccount: [{ required: true, message: '请填写司机账号', trigger: 'change' }],
                driverPassword: [{ required: true, message: '请填写密码', trigger: 'change' }],
                idCard: [{ required: true, message: '请填写身份证', trigger: 'change' },
                {validator: this.validateIdCard, trigger: 'change'}],
                provinceCode: [{ required: true, message: '请选择所在省份', trigger: 'change' }],
                cityCode: [{ required: true, message: '请选择所在城市', trigger: 'change' }],
                areaCode: [{ required: true, message: '请选择所在区', trigger: 'change' }],
            }
        }
    },
    created () {
        this.search()
    },
    mounted () {
        this.pageInfo.total = this.tableData.length
    },
    methods: {
        fetch () {
            this.pageInfo.pageSize = 5
            this.pageInfo.pageNum = 1
            this.search()
        },
        search() {
            req('listDriver',{
                    ...this.formData,
                   
                    pageSize:this.pageInfo.pageSize,
                    pageNum:this.pageInfo.pageNum,
                    role: JSON.parse(sessionStorage.getItem('roleInfo')).role

            }).then(data => {
                this.tableData = data.data.list
                console.log(data)
               this.pageInfo.pageNum =data.data.pageNum
               this.pageInfo.pageSize = data.data.pageSize
               this.pageInfo.total = data.data.total
               
            })
            req('getPlace',{
                             pid:0,
                            }).then(data => {
                            this.provinceList = data.data
                            console.log(data)
                            // console.log(this.firstGoodClassify)                                           
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
                    req('saveDriver',{
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
        //修改
        btnChange () {         
            if (this.selectRows.length === 1) {
                req('getDriverByDriverCode',{
                        driverCode:this.selectRows[0].driverCode,
                    }).then(data => {
                        console.log(data)
                        this.dialogFormDatas = data.data 
                    })
                this.dialogVisibles = true
            } 
            if (this.selectRows.length === 0){
                console.log('11',this.selectRows)
                this.dialogVisibles = false
            } 
         
        },
        dialogCancels () {
            this.dialogVisibles = false
            this.$refs.form.resetFields()
        },
        dialogConfirms () {
                    console.log(this.dialogFormDatas)
                    req('updateDriver',{
                                ...this.dialogFormDatas,
                        }).then(data => {
                             
                            this.$message.success(data.msg)
                           
                            console.log(data)
                            this.search()
                            // this.selectRows=[]
                            // this.dialogFormData = {}
                        })
                        this.dialogVisibles = false         
        },
        dialogBeforeCloses () {
            this.dialogVisibles = false
            this.$refs.form.resetFields()
        },
        dialogCancelss () {
            this.dialogVisibless = false
            this.$refs.form.resetFields()
        },
        dialogConfirmss () {
             this.dialogVisibless = false         
        },
        dialogBeforeClosess () {
            this.dialogVisibless = false
            this.$refs.form.resetFields()
        },
        province (value) {
            console.log(value)
                req('getPlace',{
                    pid:value
                }).then(data => {
                    this.cityList=data.data
                })
        },
        city (value) {
            console.log(value)
                req('getPlace',{
                    pid:value
                }).then(data => {
                    this.areaList=data.data
                })
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
        })
       },
        validateIdCard (rule, value, callback) {
      let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

      console.log(reg.test(value))

      if (!reg.test(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    }
    }
}
</script>
<style lang="scss" scoped>
.el-textarea {
    width: 50%;
    .el-textarea__inner {
        min-height: 70px;
    }
}
.photos{
    .el-form-item {
        .el-form-item__content {
            display: flex;
        }
    }
    
    
}
.upload-btn {
        display: flex;
    }
</style>