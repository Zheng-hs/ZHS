<template>
    <div>
        <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
            <el-form-item label="商品名称" prop="goodsName">
                <el-input v-model="formData.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品编号" prop="goodsCode">
                <el-input v-model="formData.goodsCode"></el-input>
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
            height="200px"
            @dialog-before-close="dialogBeforeClose"
            @dialog-cancel="dialogCancel"
            @dialog-confirm="dialogConfirm">
            
            <el-form :model="dialogFormData" ref="form" :rules="formRules" label-width="100px">
                <el-row>

                    <el-col :span="12" >
                        <el-form-item label="商品" prop="goodsCode">
                            <comm-select v-model="dialogFormData.goodsCode"></comm-select>
                        </el-form-item>
                    
                    </el-col>
                    <el-col>
                        <el-form-item label="热门位排序" prop="sort">
                            <el-input v-model.number="dialogFormData.sort"></el-input>
                        </el-form-item>
                    </el-col>                
                </el-row>
            </el-form>
        </i-dialog>
        <i-dialog v-model="dialogVisibles"
            :title="dialogTitles"
            height="200px"
            @dialog-before-close="dialogBeforeCloses"
            @dialog-cancel="dialogCancels"
            @dialog-confirm="dialogConfirms">
            
            <el-form :model="dialogFormDatas" ref="form" :rules="formRules" label-width="100px">
                <el-row>

                    <el-col :span="12" >
                        <el-form-item label="商品" prop="goodsCode">
                            <comm-select v-model="dialogFormDatas.goodsCode"></comm-select>
                        </el-form-item>
                    
                    </el-col>
                    <el-col>
                        <el-form-item label="热门位排序" prop="sort">
                            <el-input v-model.number="dialogFormDatas.sort"></el-input>
                        </el-form-item>
                    </el-col>                
                </el-row>
            </el-form>
        </i-dialog>
        <i-dialog v-model="dialogVisibless"
            :title="titles"
            height="200px"
            @dialog-before-close="dialogBeforeCloseBtn"
            @dialog-cancel="dialogCancelBtn"
            @dialog-confirm="dialogConfirmBtn">
            
            <el-form :model="dialogFormDatass" ref="form" :rules="formRules" label-width="120px">
                <el-row>
                    <el-col>
                        <el-form-item label="商品展示数量" prop="showCount">
                            <el-input v-model.number="dialogFormDatass.showCount"></el-input>
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
import req from '@/api/hot-comm-manage.js'
import CommSelect from './comm-select.vue'
export default {
    name: 'hot-comm-manage',
    components: {
        ISearch,
        ITable,
        IDialog,
        // eslint-disable-next-line vue/no-unused-components
        CommSelect
    },
    data () {
        return {
            formData: {},
            selectRows: {},
            dialogVisible:false,
            dialogVisibles:false,
            dialogVisibless:false,
            innerVisible: false,
            dialogTitle:'新增热门位商品',
            dialogTitles:'修改热门位商品',
            titles:'热门位商品数量设置',
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
                                        req('getHotGoodsByHotGoodsCode',{
                                            hotGoodsCode:this.selectRows[0].hotGoodsCode, 
                                            // ...this.dialogFormDatas                                  
                                    }).then(data => {
                                        console.log(data)
                                        this.dialogFormDatas = data.data
                                        
                                    req('deleteHotGoods',{
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
                },

                {
                    btnName: '展示数量设置',
                    type: 'primary',
                    func: () => {
                        req('getShowCount',{
                            ...this.dialogFormDatass
                        }).then(data => {
                            this.dialogFormDatass=data.data
                        })
                        this.dialogVisibless=true
                    }
                },
            ],
            columnList: [
                {label: '排序', prop: 'sort'},
                {label: '商品编号', prop: 'goodsCode'},
                {label: '商品名称', prop: 'goodsName'},
                {label: '商品价格', prop: 'sellPrice'},
                {label: '商品介绍', prop: 'synopsis'},
            ],
            tableData: [
            ],
            formRules: {
                goodsCode: [{ required: true, message: '请选择商品', trigger: 'change' }],
                sort: [{ required: true, message: '请填写热门商品排序', trigger: 'change' },
                 {type: 'number', message: '排序必须为数字'}],
                 showCount: [{ required: true, message: '请修改热门商品展示数量', trigger: 'change' },
                 {type: 'number', message: '展示数量必须为数字'}],
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
            req('listHotGoods',{
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
        },
        dialogConfirm () {
            
             this.$refs.form.validate((vaid) => {
                if(vaid) {
                    req('saveHotGoods',{
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
            console.log('11',this.selectRows.length)      
            if (this.selectRows.length === 1) {
                req('getHotGoodsByHotGoodsCode',{
                        hotGoodsCode:this.selectRows[0].hotGoodsCode,
                    }).then(data => {
                        console.log(data)
                        this.dialogFormDatas = data.data 
                        
                    })
                this.dialogVisibles = true
            } 
            if (this.selectRows.length === 0){
                
                this.dialogVisibles = false
            } 
         
        },
        dialogCancels () {
            
            this.dialogVisibles = false
            this.$refs.form.resetFields()
        },
        dialogConfirms () {
            
             req('updateHotGoods',{
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
        dialogCancelBtn () {
            
            this.dialogVisibless = false
            this.$refs.form.resetFields()
        },
        dialogConfirmBtn () {
            
             req('updateShowCount',{
                                ...this.dialogFormDatass,
                        }).then(data => {
                             
                            this.$message.success(data.msg)
                           
                            console.log(data)
                            this.search()
                            // this.selectRows=[]
                            // this.dialogFormData = {}
                        })
                        this.dialogVisibless = false      
        },
        
        dialogBeforeCloseBtn () {
            this.dialogVisibless = false
            this.$refs.form.resetFields()
        },
       
    }
}
</script>
<style lang="scss" scoped>
    .el-col:nth-child(2) {
        padding: 6px 10px;

        }
    .el-col:nth-child(3)
     {
         .el-form-item {
             .el-form-item__content {
                 .el-input {
                     width:265px;
                 }
             }
         }
     }
</style>