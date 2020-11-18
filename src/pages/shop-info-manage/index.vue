<template>
    <div>
        <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
            <el-form-item label="门店编号" prop="shopCode">
                <el-input v-model="formData.shopCode"></el-input>
            </el-form-item>
            <el-form-item label="门店名称" prop="shopName">
                <el-input v-model="formData.shopName"></el-input>
            </el-form-item>
            <el-form-item label="店长名称" prop="userName">
                <el-input v-model="formData.userName"></el-input>
            </el-form-item>
            <br>
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
                        <el-form-item label="门店名称" prop="shopName">
                            <el-input v-model="dialogFormData.shopName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="shopPhone">
                            <el-input v-model="dialogFormData.shopPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="店长编号" prop="userCode">
                            <el-input v-model="dialogFormData.userCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="营业执照编码" prop="businessCode">
                            <el-input v-model="dialogFormData.businessCode"></el-input>
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
                    <el-col>
                        <el-form-item label="详细地址" prop="shopAddress">
                            <el-input type="textarea" v-model="dialogFormData.shopAddress"></el-input>
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
                        <el-form-item label="门店名称" prop="shopName">
                            <el-input v-model="dialogFormDatas.shopName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="shopPhone">
                            <el-input v-model="dialogFormDatas.shopPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="店长编号" prop="userCode">
                            <el-input v-model="dialogFormDatas.userCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="营业执照编码" prop="businessCode">
                            <el-input v-model="dialogFormDatas.businessCode"></el-input>
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
                    <el-col>
                        <el-form-item label="详细地址" prop="shopAddress">
                            <el-input type="textarea" v-model="dialogFormDatas.shopAddress"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
        </i-dialog>
        <i-dialog v-model="dialogVisibless"
            :title="titles"
            @dialog-before-close="dialogBeforeClosess"
            @dialog-cancel="dialogCancelss"
            @dialog-confirm="dialogConfirmss">
            <el-form :model="dialogFormDatass" ref="form" :rules="formRules" label-width="120px">
                <el-row>
                    <el-col :span="12" >
                        <el-form-item label="门店名称" prop="shopName">
                            <el-input v-model="dialogFormDatass.shopName" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="shopPhone">
                            <el-input v-model="dialogFormDatass.shopPhone" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="店长编号" prop="userCode">
                            <el-input v-model="dialogFormDatass.userCode" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="营业执照编码" prop="businessCode">
                            <el-input v-model="dialogFormDatass.businessCode" :disabled="true"></el-input>
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
                    <el-col>
                        <el-form-item label="详细地址" prop="shopAddress">
                            <el-input type="textarea" v-model="dialogFormDatass.shopAddress" :disabled="true"></el-input>
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
import req from '@/api/shop-info-manage.js'
export default {
    name: 'shop-info-manage',
    components: {
        ISearch,
        ITable,
        IDialog
    },
    data () {
        return {
            formData: {},
            dialogVisible:false,
            dialogVisibles:false,
            dialogVisibless:false,
            selectRows: {},
            dialogTitle:'新增门店',
            dialogTitles:'修改门店',
            titles:'门店详情',
            dialogFormData: {},
            dialogFormDatass: {},
            dialogFormDatas: {},
            pageInfo: {
                pageNum: 1,
                pageSize: 5,
                total:0
            },
            provinceList:[],
            cityList:[],
            areaList:[],
            
            toolbar: [
                {
                    btnName: '详情',
                    type: 'primary',
                    func: () => {
                        if (this.selectRows.length === 1) {
                            req('getShopByShopCode',{
                                    shopCode:this.selectRows[0].shopCode,
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
                         req('getPlace',{
                             pid:0,
                            }).then(data => {
                            this.provinceList = data.data
                            console.log(data)
                            // console.log(this.firstGoodClassify)                                           
                            })
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
                                        req('getShopByShopCode',{
                                            shopCode:this.selectRows[0].shopCode, 
                                            // ...this.dialogFormDatas                                  
                                    }).then(data => {
                                        console.log(data)
                                        this.dialogFormDatas = data.data
                                        
                                    req('deleteShop',{
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
                {label: '门店编号', prop: 'shopCode'},
                {label: '门店名称', prop: 'shopName'},
                {label: '电话', prop: 'shopPhone'},
                {label: '详细地址', prop: 'shopAddress'},
                {label: '店长姓名', prop: 'userName'},
                {label: '邀请码', prop: 'shopInvite'},
            ],
            tableData: [],
            formRules: {
                shopName: [{ required: true, message: '请填写门店名称', trigger: 'change' }],
                shopPhone: [{ required: true, message: '请填写联系电话', trigger: 'change' }],
                userCode: [{ required: true, message: '请填写店长编号', trigger: 'change' }],
                businessCode: [{ required: true, message: '请填写营业执照编码', trigger: 'change' }],
                provinceCode: [{ required: true, message: '请选择所在省份', trigger: 'change' }],
                cityCode: [{ required: true, message: '请选择所在城市', trigger: 'change' }],
                areaCode: [{ required: true, message: '请选择所在地区', trigger: 'change' }],
                shopAddress: [{ required: true, message: '请填写详细地址', trigger: 'change' }],

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
            req('listShop',{
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
            
        },
        dialogConfirm () {
             this.$refs.form.validate((vaid) => {
                if(vaid) {   
                    req('saveShop',{
                                ...this.dialogFormData,
                        }).then(data => {
                            if (data.code !== 0)this.$message.error(data.msg)
                            this.$message.success(data.msg)
                            // this.tableData = data.data.data
                            console.log(data)
                            this.search()
                            
                        })
                        this.dialogVisible = false
                        this.dialogFormData={}
                } else {
                    return false
                }
            })
        },
        dialogBeforeClose () {
            this.dialogVisible = false
            this.$refs.form.resetFields()
        },
        //修改
        btnChange () {         
            if (this.selectRows.length === 1) {
                req('getShopByShopCode',{
                        shopCode:this.selectRows[0].shopCode,
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
                    req('updateShop',{
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
.el-form {
    .el-form-item {
      .el-form-item__content {
        .el-select {
        //   width: 100%;
          .el-input {
            .el-input__inner {
              width: 206.4px;
            }
          }
        }
      }
    }
}
// .el-form .el-form-item .el-form-item__content .el-input .el-input__inner
</style>