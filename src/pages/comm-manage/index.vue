<template>
    <div>
        <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
            <el-form-item label="商品名称" prop="goodsName">
                <el-input v-model="formData.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品状态" prop="goodsState">
                <el-select v-model="formData.goodsState" placeholder="请选择">
                        <el-option
                        v-for="item in stateList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告词" prop="advertising">
                <el-input v-model="formData.advertising"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="press">
                <el-input v-model="formData.press"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="formData.author"></el-input>
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
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input v-model="dialogFormData.goodsName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="书号" prop="bookNum">
                        <el-input v-model="dialogFormData.bookNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="一级分类" prop="firstCode">
                        <el-select v-model="dialogFormData.firstCode" placeholder="请选择" @change="firstClassify">
                            <el-option
                            v-for="item in firstGoodClassify"
                            :key="item.cateCode"
                            :label="item.cateName"
                            :value="item.cateCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="二级分类" prop="secondCode">
                        <el-select v-model="dialogFormData.secondCode" placeholder="请选择">
                            <el-option
                            v-for="item in secondGoodClassify"
                            :key="item.cateCode"
                            :label="item.cateName"
                            :value="item.cateCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="广告词" prop="advertising">
                        <el-input type="textarea" v-model="dialogFormData.advertising"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品介绍" prop="synopsis">
                        <el-input type="textarea" v-model="dialogFormData.synopsis"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商家名称" prop="merchantName">
                        <el-input v-model="dialogFormData.merchantName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="库存" prop="stock">
                        <el-input v-model="dialogFormData.stock"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="售价" prop="sellPrice">
                        <el-input v-model="dialogFormData.sellPrice"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出版社" prop="press">
                        <el-input v-model="dialogFormData.press"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="dialogFormData.author"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="图片" prop="goodsPhoto">
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
                            <el-input v-model="dialogFormData.goodsPhoto" ></el-input> -->
                            <i-file v-model="dialogFormData.goodsPhoto"></i-file>
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
        <el-form :model="dialogFormDatas" ref="forms" :rules="formRules" label-width="100px">
            <el-row>
                <el-col :span="12" >
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input v-model="dialogFormDatas.goodsName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="书号" prop="bookNum">
                        <el-input v-model="dialogFormDatas.bookNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="一级分类" prop="firstName">
                        <el-select v-model="dialogFormDatas.firstName" placeholder="请选择" @change="firstClassify">
                            <el-option
                            v-for="item in firstGoodClassify"
                            :key="item.cateCode"
                            :label="item.cateName"
                            :value="item.cateCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="二级分类" prop="secondName">
                        <el-select v-model="dialogFormDatas.secondName" placeholder="请选择">
                            <el-option
                            v-for="item in secondGoodClassify"
                            :key="item.cateCode"
                            :label="item.cateName"
                            :value="item.cateCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="广告词" prop="advertising">
                        <el-input type="textarea" v-model="dialogFormDatas.advertising"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品介绍" prop="synopsis">
                        <el-input type="textarea" v-model="dialogFormDatas.synopsis"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商家名称" prop="merchantName">
                        <el-input v-model="dialogFormDatas.merchantName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="库存" prop="stock">
                        <el-input v-model="dialogFormDatas.stock"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="售价" prop="sellPrice">
                        <el-input v-model="dialogFormDatas.sellPrice"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出版社" prop="press">
                        <el-input v-model="dialogFormDatas.press"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="dialogFormDatas.author"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="图片" prop="goodsPhoto">
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
                            <el-input v-model="dialogFormDatas.goodsPhoto" ></el-input> -->
                            <i-file v-model="dialogFormDatas.goodsPhoto"></i-file>
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
import axios from 'axios'
import req from '@/api/comm-manage.js'
export default {
    name: 'comm-manage',
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
            fileList: [],
            goodsList: [],
            selectRows: {},
            dialogTitle:'新增商品',
            dialogTitles:'修改商品',
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
                        req('selectGoodsClassify',{
                             cateCode:0,
                            }).then(data => {
                            this.firstGoodClassify = data.data
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
                                                    req('getGoodsByGoodsCode',{
                                                        goodsCode:this.selectRows[0].goodsCode,                                   
                                                }).then(data => {
                                                    // console.log(data)
                                                    this.dialogFormDatas = data.data
                                                    
                                                req('deleteGoods',{
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
                    btnName: '上架',
                    type: 'primary',
                    func: () => {
                            if (this.selectRows.length>0) {
                                this.$confirm('是否将此商品上架?').then(() => {
                                        
                                    for (let i=0;i<=this.selectRows.length-1;i++) {   
                                            // this.goodsList.push(this.selectRows[i].goodsCode)  
                                            console.log('a',this.selectRows.length)
                                            console.log('aa',this.selectRows[i])
                                               
                                            req('updateGoodsState',{
                                                goodsCode:this.selectRows[i].goodsCode,
                                                goodsState:1
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
                    btnName: '下架',
                    type: 'primary',
                    func: () => {
                        if (this.selectRows.length>0) {
                                this.$confirm('是否将此商品下架?').then(() => {
                                        
                                    for (var i=0;i<=this.selectRows.length-1;i++) {         
                                            req('updateGoodsState',{
                                                goodsCode:this.selectRows[i].goodsCode,
                                                goodsState:2
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
                }
                
            ],
            columnList: [
                {label: '商品名称', prop: 'goodsName'},
                {label: '售价', prop: 'sellPrice'},
                {label: '销售量', prop: 'salesCount'},
                {label: '一级分类', prop: 'firstName'},
                {label: '二级分类', prop: 'secondName'},
                {label: '广告词', prop: 'advertising'},
                {label: '商品介绍', prop: 'synopsis'},
                {label: '商品状态', prop: 'goodsState',distName:'stateList'},
                {label: '上架时间', prop: 'sellTime'},
                {label: '商家名称', prop: 'merchantName'},
                {label: '库存', prop: 'stock'},
                {label: 'isbn书号', prop: 'bookNum'},
                {label: '作者', prop: 'author'},
                {label: '出版社', prop: 'press'},
            ],
            stateList:[
                {label:'未发布',value: '0'},
                {label:'在售',value: '1'},
                {label:'已下架',value: '2'},
                {label:'售完',value: '3'},
            ],
            firstGoodClassify:[],
            secondGoodClassify:[],
            tableData: [],
            formRules: {
                goodsName: [{ required: true, message: '请填写商品名称', trigger: 'change' }],
                bookNum: [{ required: true, message: '请填写书号', trigger: 'change' }],
                firstCode: [{ required: true, message: '请选择一级分类', trigger: 'change' }],
                secondCode: [{ required: true, message: '请选择二级分类', trigger: 'change' }],
                advertising: [{ required: true, message: '请填写广告词', trigger: 'change' }],
                synopsis: [{ required: true, message: '请填写商品介绍', trigger: 'change' }],
                merchantName: [{ required: true, message: '请选择商家名称', trigger: 'change' }],
                stock: [{ required: true, message: '请填写库存', trigger: 'change' }],
                sellPrice: [{ required: true, message: '请填写在售价', trigger: 'change' }],
                press: [{ required: true, message: '请填写出版社', trigger: 'change' }],
                author: [{ required: true, message: '请填写作者', trigger: 'change' }],
                goodsPhoto: [{ required: true, message: '请选择图片', trigger: 'change' }],
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
        methods () {
        this.pageInfo.total = this.tableData.length
    },
        fetch () {
            this.pageInfo.pageSize = 5
            this.pageInfo.pageNum = 1
            this.search()
        },
        search() {
            //发送请求
             req('listGoods',{
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
        dialogCancels () {
            this.dialogVisibles = false
            this.$refs.forms.resetFields()
            // this.$refs.upload.clearFiles()
            
        },
        dialogConfirm () {

            this.$refs.form.validate((vaid) => {
                if(vaid) {   
                    req('saveGoods',{
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
        btnChange () {    
            //  this.dialogVisibles = true 
            // console.log('1',this.selectRows.length)
            if (this.selectRows.length === 1) {
                // console.log('111') 
                req('getGoodsByGoodsCode',{
                        goodsCode:this.selectRows[0].goodsCode,
                        // version:this.selectRows[0].version
                    }).then(data => {
                        console.log(data)
                        this.dialogFormDatas = data.data 
                    })
                    req('selectGoodsClassify',{
                             cateCode:0,
                            }).then(data => {
                            this.firstGoodClassify = data.data
                            console.log(data)
                            // console.log(this.firstGoodClassify)                                           
                            })
    
                this.dialogVisibles = true
            } 
            if (this.selectRows.length === 0){
                // console.log('11',this.selectRows)
                this.dialogVisibles = false
            } 
         
        },
        dialogConfirms () {
                    console.log(this.dialogFormDatas)
                    req('updateGoods',{
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
        firstClassify (value) {
            // console.log(value)
                req('selectGoodsClassify',{
                    cateCode:value
                }).then(data => {
                    this.secondGoodClassify=data.data
                })
        },
        dialogBeforeClose () {
            this.dialogVisible = false
            this.$refs.form.resetFields()
            // this.$refs.upload.clearFiles()
        },
        dialogBeforeCloses () {
            this.dialogVisibles = false
            this.$refs.forms.resetFields()
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
            this.dialogFormData.goodsPhoto=data.data.data
            this.dialogFormDatas.goodsPhoto=data.data.data
        })
       },
    }
}
</script>
<style lang="scss" scoped>
.upload-btn{
    display: flex;
}
</style>