<template>
    <div>
        <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="formData.userName"></el-input>
            </el-form-item>
            <el-form-item label="用户账号" prop="userAccount">
                <el-input v-model="formData.userAccount"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="formData.role" placeholder="请选择">
                        <el-option
                        v-for="item in roleOptions"
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
            :formatter="columnFormatter"
            >
            </el-table-column>
        </i-table>
        <i-dialog v-model="dialogVisible"
            :title="dialogTitle"
            @dialog-before-close="dialogBeforeClose"
            @dialog-cancel="dialogCancel"
            @dialog-confirm="dialogConfirm">
            <el-form :model="dialogFormData" ref="form" :rules="formRules" label-width="100px">
                <el-row>
                    <el-col :span="12" >
                        <el-form-item label="用户账号" prop="userAccount">
                            <el-input v-model="dialogFormData.userAccount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户姓名" prop="userName">
                            <el-input v-model="dialogFormData.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户性别" prop="sex">
                            <el-select v-model="dialogFormData.sex" placeholder="请选择你的性别">
                            <el-option
                            v-for="item in sexList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model.number="dialogFormData.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户邮箱" prop="email">
                            <el-input v-model="dialogFormData.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证" prop="idCard">
                            <el-input v-model="dialogFormData.idCard"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户密码" prop="userPassword">
                            <el-input v-model="dialogFormData.userPassword"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户角色" prop="role">
                            <el-select v-model="dialogFormData.role" placeholder="请选择你的角色">
                            <el-option
                            v-for="item in roleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
                            <el-button size="small" type="primary"  >点击上传</el-button>
                            </el-upload>
                            <el-input v-model="dialogFormData.photoPath" ></el-input> -->
                            <i-file v-model="dialogFormData.photoPath"></i-file>
                        </el-form-item>
                        <!-- <el-form-item > 
                            <el-input ></el-input>
                        </el-form-item> -->
                    </el-col>
                </el-row>
            </el-form>
        </i-dialog>
        <i-dialog v-model="dialogVisibles"
            :title="dialogTitles"
            @dialog-before-close="dialogBeforeCloses"
            @dialog-cancel="dialogCancels"
            @dialog-confirm="dialogConfirms">
            <el-form :model="dialogFormDatas" ref="form" :rules="formRules" label-width="100px">
                <el-row>
                    <el-col :span="12" >
                        <el-form-item label="用户账号" prop="userAccount">
                            <el-input v-model="dialogFormDatas.userAccount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户姓名" prop="userName">
                            <el-input v-model="dialogFormDatas.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户性别" prop="sex">
                            <el-select v-model="dialogFormDatas.sex" placeholder="请选择你的性别">
                            <el-option
                            v-for="item in sexList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model.number="dialogFormDatas.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户邮箱" prop="email">
                            <el-input v-model="dialogFormDatas.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证" prop="idCard">
                            <el-input v-model="dialogFormDatas.idCard"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户密码" prop="userPassword">
                            <el-input v-model="dialogFormDatas.userPassword" type="password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户角色" prop="role">
                            <el-select v-model="dialogFormDatas.role" placeholder="请选择你的角色">
                            <el-option
                            v-for="item in roleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
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
                            <el-input v-model="dialogFormDatas.photoPath" ></el-input> -->
                            <i-file v-model="dialogFormDatas.photoPath"></i-file>
                        </el-form-item>
                    </el-col>
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

import req from '@/api/user-manage.js'
// const qs = require('qs')
import axios from 'axios'
export default {
    name: 'user-manage',
    components: {
        ISearch,
        ITable,
        IDialog,
        IFile
    },
    data () {
        return {
            formData: {},
            fileList: [],
            dialogVisible:false,
            dialogVisibles:false,
            selectRows: {},
            dialogTitle:'新增用户',
            dialogTitles:'修改用户',
            dialogFormData: {},
            dialogFormDatas: {},
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
                        console.log('selectRows',this.selectRows)
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
                                        req('getUserByUserCode',{
                                            userCode:this.selectRows[0].userCode, 
                                            // ...this.dialogFormDatas                                  
                                    }).then(data => {  
                                        console.log(data)
                                        this.dialogFormDatas = data.data
                                        
                                    req('deleteUser',{
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
            roleOptions: [
                {label:'管理员',value:'0'},
                {label:'店长',value:'1'},

            ],
            sexList: [
                {label:'男',value:0},
                {label:'女',value:1}
            ]
            ,
            columnList: [
                {label: '用户编号', prop: 'userCode'},
                {label: '账号', prop: 'userAccount'},
                {label: '姓名', prop: 'userName'},
                {label: '角色', prop: 'role',distName: 'roleOptions'},
                {label: '性别', prop: 'sex',distName: 'sexList'},
                {label: '手机', prop: 'phone'},
                {label: '邮箱', prop: 'email'},
                {label: '身份证', prop: 'idCard'},
 
                
            ],
            tableData: [],
            formRules: {
                userAccount: [{ required: true, message: '请填写用户账号', trigger: 'change' }],
                userName: [{ required: true, message: '请填写用户名', trigger: 'change' }],
                sex: [{ required: true, message: '请选择你的性别', trigger: 'change' }],
                phone: [{ required: true, message: '请填写手机号', trigger: 'change' },
                {type: 'number', message: '电话号码必须为数字'}],
                email: [{ required: true, message: '请填写用户邮箱', trigger: 'change' }],
                idCard: [{ required: true, message: '请填写身份证', trigger: 'change' },
                {validator: this.validateIdCard, trigger: 'change'}],
                userPassword: [{ required: true, message: '请填写用户密码', trigger: 'change' }],
                role: [{ required: true, message: '请选择你的角色', trigger: 'change' }],
                // photoPath: [{ required: true, message: '请选择图片', trigger: 'change' }],

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
    //     methods () {
    //     this.pageInfo.total = this.tableData.length
    // },
        fetch () {
            this.pageInfo.pageSize = 5
            this.pageInfo.pageNum = 1
            this.search()
        },
        search() {
            req('getTableData',{
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
            
            // axios({
            //     methods: 'post',
            //     url: 'http://29916786qq.zicp.vip/pc/user/listUsers',
            //     data: qs.stringify({
            //         tokens: JSON.parse(sessionStorage.setItem('userInfo')).tokens ,
            //         ...this.formData,
            //         pageSize:this.pageInfo.pageSize,
            //         pageNum:this.pageInfo.pageIndex
            //     }),
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded;'
            //     }

            // }).then(data => {
            //     this.tableData = data.data.data.list
            //     console.log(data)
            //    this.pageInfo.pageIndex =data.data.pageNum
            //    this.pageInfo.pageSize = data.data.pageSize
            //    this.pageInfo.total = data.data.total

            // })
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
            // console.log('rows',rows)

        },

        //新增
        dialogCancel () {
            this.dialogVisible = false
            this.$refs.form.resetFields()
            // this.$refs.upload.clearFiles()
        },
        dialogConfirm () {
            this.$refs.form.validate((vaid) => {
                if(vaid) {   
                    req('addTableData',{
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
                req('getUserByUserCode',{
                        userCode:this.selectRows[0].userCode,
                        
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
            // this.$refs.upload.clearFiles()
        },
        dialogConfirms () {
                    console.log(this.dialogFormDatas)
                    req('updateUser',{
                                ...this.dialogFormDatas,
                        }).then(data => {
                             
                            this.$message.success(data.msg)
                           
                            console.log(data)
                            this.search()
                            // this.selectRows=[]
                            // this.dialogFormData = {}
                        })
                        this.dialogVisibles = false  
                        // this.$refs.upload.clearFiles()        
        },
        dialogBeforeCloses () {
            this.dialogVisibles = false
            this.$refs.form.resetFields()
            // this.$refs.upload.clearFiles()
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
            this.dialogFormDatas.photoPath=data.data.data 

            // console.log(this.dialogFormData)
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
    // .photos el-col el-col-24{
    //     .el-form-item is-required {
    //             .el-form-item__content {
    //                 display: flex;
    //             }
        
    //     }     
    // }
    // .el-form {
    //     .el-row {
    //         .el-row div:nth-child(9) {
    //             .el-form-item {
    //                 .el-form-item__content {
    //                     display: flex;
    //                 }
    //             }
    //         }
    //     }
    // }
    // .upload-btn {
    //     display: flex;
    // }
</style>
