<template>
    <div class="containers">
        <el-container>
            <el-header>
                <div class="btn">
                    <el-button type="primary" @click="addClick">新增</el-button>
                    <el-button type="primary" @click="btnChange">修改</el-button>
                    <el-button type="primary" @click="delect">删除</el-button>
                    <el-button type="primary" @click="search">刷新</el-button>  
                </div>
                <el-dialog
                v-model="dialogVisible"
                width="25%"
                title="新增菜单"
                :visible.sync="innerVisible"
                        height="200px"
                        @dialog-confirm="dialogConfirm"
                         @dialog-cancel="dialogCancel"
                @dialog-before-close="dialogBeforeClose">
                <div>
                    
                    <el-form  :model="dialogFormData" ref="form" :rules="formRules" label-width="80px">
                        <el-form-item label="分类名称" prop="cateName">
                            <el-input v-model="dialogFormData.cateName"></el-input>
                        </el-form-item>
                        <el-form-item label="父级编号" prop="cateFather">
                            <el-input v-model="dialogFormData.cateFather"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="remarks">
                            <el-input v-model="dialogFormData.remarks"></el-input>
                        </el-form-item>
   
                        
                    </el-form>
                   
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogCancel">取 消</el-button>
                    <el-button type="primary" @click="dialogConfirm">确 定</el-button>
                </span>
                </el-dialog>
                <div class="menuDetails"><span>分类详情</span></div>
            </el-header>
            <el-container>
                <el-aside width="303px">
                    <div class="elMenu">
                        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>

                </el-aside>
                <el-main>
                    <el-form :inline="true" label-width="100px">
                        <el-col :span="12">
                            <el-form-item label="分类名称" prop="cateName">
                                <el-input v-model="formData.cateName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="父级编号" prop="cateFather">
                                <el-input v-model="formData.cateFather"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备注" prop="remarks">
                                <el-input v-model="formData.remarks"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-form>
                </el-main>
            </el-container>
        </el-container>
    </div>


</template>
<script>
// import ISearch from '@/components/common/i-search.vue'
// import ITable from '@/components/common/i-table.vue'
// import IDialog from '@/components/common/i-dialog.vue'
import req from '@/api/comm-classify-manage.js'
export default {
    name: 'comm-classify-manage',
    components: {
        // ISearch,
        // ITable,
        // IDialog
    },
    data () {
        return {
            formData: {},
            dialogVisible:false,
            innerVisible: false,
            dialogFormData: {},
            pageInfo: {
                pageNum: 1,
                pageSize: 5,
                total:0
            },
            data: [{label:'cateName',
                    children:[{label:'listSecondClassify'}]}],
            defaultProps: {
                children: 'listSecondClassify',
                label: 'cateName',
                },
            formRules: {
                cateName: [{ required: true, message: '请填写商品分类名称', trigger: 'change' }],
                cateFather: [{ required: true, message: '请填写父级编号', trigger: 'change' }],
                remarks: [{ required: true, message: '请填写商品分类备注', trigger: 'change' }],
            }
        }
    },
        created () {
        this.search()
    },
    methods: {
 
        search() {
            req('listAllGoodsClassify',{
                    ...this.goodsClassifyInfoList,
            }).then(data => {
                this.data = data.data
                console.log(data)
            })
        },
        addClick () {
            this.innerVisible = true
        },
        dialogBeforeClose () {
            this.dialogVisible = false
            this.innerVisible = false

        },
        dialogCancel () {
            // this.$emit('dialog-cancels')
            this.innerVisible = false
            this.$refs.form.resetFields()
        },
        dialogConfirm () {
            this.$refs.form.validate((vaid) => {
                if(vaid) {   
                    req('saveGoodsClassify',{
                                ...this.dialogFormData,
                        }).then(data => {
                            if (data.code !== 0)this.$message.error(data.msg)
                            this.$message.success(data.msg)
                            this.menuList=data.data
                            console.log(data)
                            this.search()    
                        })
                        this.innerVisible = false
                        this.dialogFormData={}
                } else {
                    return false
                }
            })
        },
        btnChange () {
            req('updateGoodsClassify',{
                ...this.formData
            }).then(data => {
                this.$message.success(data.msg)
                // console.log(this.formData)
                this.search()
            })
        },
        delect () {
             this.$confirm('此操作将永久删除该文件,是否继续?').then(() => {
                        req('deleteGoodsClassify',{
                            ...this.formData
                        }).then(data => {
                            // console.log(data)
                            this.$message.success(data.msg)
                            this.search()
                            this.formData={}
                        })
                    })
        },
        handleNodeClick(data) {
            req('getGoodsClassifyByCateCode',{
                cateCode:data.cateCode
            }).then(data => {
                this.formData = data.data
                
            })
      }
    }
}
</script>
<style lang="scss" scoped>
.el-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #ddd;
    padding: 0;
    .btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 300px;
        height: 60px;
        border: 1px solid #ddd;
    }
    .menuDetails {
        height: 60px;
        flex: 1;
        span {
            text-align: center;
            line-height: 60px;
            font-size: 18px;
            padding:10px 30px;
            box-sizing: border-box;
        }
    }
}
.el-container {
    .el-aside {
        border: 1px solid #ddd;
    }
    .el-main {
        border: 1px solid #ddd;
    }
}
.elMenu {
    height: 400px;
    .el-menu {
        
        .el-menu-item {
            line-height: 30px;
            height: 30px;
            text-align: center;
            font-size: 13px;
        }
    }
}

</style>