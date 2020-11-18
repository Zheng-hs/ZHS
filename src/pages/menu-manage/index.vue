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
                @dialog-before-close="dialogBeforeClose">
                <div>
                    
                    <el-form  :model="dialogFormData" ref="form" :rules="formRules" label-width="80px">
                        <el-form-item label="菜单名称" prop="menuName">
                            <el-input v-model="dialogFormData.menuName"></el-input>
                        </el-form-item>
                        <el-form-item label="菜单路由" prop="menuPath">
                            <el-input v-model="dialogFormData.menuPath"></el-input>
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
                <div class="menuDetails"><span>菜单详情</span></div>
            </el-header>
            <el-container>
                <el-aside width="303px">
                    <div class="elMenu">
                        <!-- <el-menu @select="handlerSelect">
                            <el-menu-item v-for="(item,index) in menuList" :index="item.path" :key="index">
                                <span slot="title">{{item.menuName}}</span>
                                <span>{{index}}</span>
                                
                            </el-menu-item>
                        </el-menu> -->
                        <el-tree :data="menuList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                </el-aside>
                <el-main>
                    <el-form :inline="true" label-width="100px">
                        <el-col :span="12">
                            <el-form-item label="菜单名称" prop="menuName">
                                <el-input v-model="formData.menuName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="菜单路由" prop="menuPath">
                                <el-input v-model="formData.menuPath"></el-input>
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
import req from '@/api/menu-manage.js'
export default {
    name: 'menu-manage',
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
            menuList: [
            ],
            defaultProps: {
                label: 'menuName'
                },
            formRules: {
                menuName: [{ required: true, message: '请填写菜单名称', trigger: 'change' }],
                menuPath: [{ required: true, message: '请填写菜单路由', trigger: 'change' }],
                remarks: [{ required: true, message: '请填写备注', trigger: 'change' }],
            }
        }
    },
    created () {
        this.search()
    },
    
    methods: {
        search() {
            req('listMenu',{
                //  access_token: JSON.parse(sessionStorage.setItem('userInfo')).access_token ,
                    ...this.menuInfoList,

            }).then(data => {
                this.menuList = data.data
                console.log(data)
            })
        },
        addClick () {
            this.innerVisible = true
        },
        btnChange () {
            req('updateMenu',{
                ...this.formData
            }).then(data => {
                this.$message.success(data.msg)
                console.log(this.formData)
            })
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
                    req('saveMenu',{
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
        delect () {
             this.$confirm('此操作将永久删除该文件,是否继续?').then(() => {
                        req('deleteMenu',{
                            ...this.formData
                        }).then(data => {
                            // console.log(data)
                            this.$message.success(data.msg)
                            this.search()
                            this.formData={}
                        })
                    })
        },
        handlerSelect () {

        },
        handleNodeClick(data) {
            req('getMenuByMenuCode',{
                menuCode:data.menuCode
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
    .el-tree-node__label {
        padding-left: 20px;
    }
}

</style>