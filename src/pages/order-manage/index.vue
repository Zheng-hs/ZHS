<template>
    <div>
        <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
            <el-form-item label="下单人" prop="customerName">
                <el-input v-model="formData.customerName"></el-input>
            </el-form-item>
            <el-form-item label="订单编码" prop="orderCode">
                <el-input v-model="formData.orderCode"></el-input>
            </el-form-item>
            <el-form-item label="付款时间" prop="payTime">
                 <el-date-picker
                    v-model="formData.payTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="手机号" prop="customerPhone">
                <el-input v-model="formData.customerPhone"></el-input>
            </el-form-item>
            <el-form-item label="订单状态" prop="orderState">
                <el-select v-model="formData.orderState" placeholder="请选择">
                        <el-option
                        v-for="item in orderList"
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
            </el-table-column>
        </i-table>
        <el-dialog 
        v-model="dialogVisible"
        :visible.sync="innerVisible"
        :title="dialogTitle"
        width="70%"
        height="200px"
        @dialog-before-close="dialogBeforeClose"
        @dialog-cancel="dialogCancel">
                    <div class="table-container">
                        <el-table border :data="tableDatas">
                            <el-table-column
                                v-for="(item,index) in columnLists"
                                :key="index"
                                :label="item.label"
                                :prop="item.prop"
                                align="center">
                            </el-table-column>

                        </el-table>
                    </div>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogCancel">取 消</el-button>
                </span>

        </el-dialog>
    </div>
</template>
<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import req from '@/api/order-manage.js'
import moment from 'moment'
// import IDialog from '@/components/common/i-dialog.vue'
export default {
    name: 'order-manage',
    components: {
        ISearch,
        ITable,
        // IDialog
    },
    data () {
        return {
            formData: {
                payTime: [],
            },
            dialogVisible:false,
            innerVisible: false,
            dialogTitle:'订单详情',
            selectRows:{},
            
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
                        req('getOrderByOrderCode',{
                                orderCode:this.selectRows[0].orderCode,
                            }).then(data => {
                                console.log(data)
                                this.tableDatas = data.data.listGoods

                                
                            })
                        this.innerVisible = true
                        } 
                        if (this.selectRows.length === 0 || this.selectRows.length==undefined){
                            this.innerVisible = false
                        } 
                    }
                },
                {
                    btnName: '订单取消',
                    type: 'primary',
                    func: () => {
                         if (this.selectRows.length>0) {
                                this.$confirm('是否取消订单?').then(() => {
                                        
                                    for (var i=0;i<=this.selectRows.length-1;i++) {    
                                            req('updateOrderState',{
                                                orderCode:this.selectRows[i].orderCode,
                                                orderState:1
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
                    btnName: '订单到货',
                    type: 'primary',
                    func: () => {
                         if (this.selectRows.length>0) {
                                this.$confirm('是否订单到货?').then(() => {
                                        
                                    for (var i=0;i<=this.selectRows.length-1;i++) {
                                            req('updateOrderState',{
                                                orderCode:this.selectRows[i].orderCode,
                                                orderState:2
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
                    btnName: '取消到货',
                    type: 'primary',
                    func: () => {
                         if (this.selectRows.length>0) {
                                this.$confirm('是否取消到货?').then(() => {
                                        
                                    for (var i=0;i<=this.selectRows.length-1;i++) {  
                                            req('updateOrderState',{
                                                orderCode:this.selectRows[i].orderCode,
                                                orderState:0
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
                    btnName: '订单已取货',
                    type: 'primary',
                    func: () => {
                         if (this.selectRows.length>0) {
                                this.$confirm('是否订单已取货?').then(() => {
                                        
                                    for (var i=0;i<=this.selectRows.length-1;i++) {       
                                            req('updateOrderState',{
                                                orderCode:this.selectRows[i].orderCode,
                                                orderState:3
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
                    btnName: '取消已取货',
                    type: 'primary',
                    func: () => {
                         if (this.selectRows.length>0) {
                                this.$confirm('是否取消已取货?').then(() => {
                                        
                                    for (var i=0;i<=this.selectRows.length-1;i++) {
                                            req('updateOrderState',{
                                                orderCode:this.selectRows[i].orderCode,
                                                orderState:2
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
            columnList: [
                {label: '订单编码', prop: 'orderCode'},
                {label: '订单总价', prop: 'orderTotal'},
                {label: '订单状态', prop: 'orderState',distName:'orderList'},
                {label: '门店编码', prop: 'shopCode'},
                {label: '下单人姓名', prop: 'customerName'},
                {label: '下单人手机号', prop: 'customerPhone'},
                {label: '确认付款时间', prop: 'payTime'},

            ],
            columnLists: [
                {label: '商品编码', prop: 'goodsCode'},
                {label: '购买数量', prop: 'goodsCount'},
                {label: '商品名称', prop: 'goodsName'},
                {label: '总金额', prop: 'moneyTotal'},
                {label: '售价', prop: 'sellPrice'},

            ],
            orderList:[
                 {label: '已下单', value:'0'},
                 {label: '已取消', value:'1'},
                 {label: '已到货', value:'2'},
                 {label: '已取货', value:'3'},
                 {label: '已完成未评价', value:'4'},
                 {label: '已完成', value:'5'},
            ],
            tableData: [

            ],
            tableDatas: [],
            formRules: {
                test1: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
                test2: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
                test3: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
                test4: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
                test5: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
                test6: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
                test7: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
                test8: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
                test9: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
                test10: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
            }
        }
    },
    mounted () {
        this.pageInfo.total = this.tableData.length
    },
    created () {
        this.fetch()
    },
    methods: {
        fetch () {
            this.pageInfo.pageSize = 5
            this.pageInfo.pageNum = 1
            this.search()
        },
        search() {
            console.log(this.formData.payTime),
            req('listOrder',{
                
                    ...this.formData,                
                    timeStart:this.formData.payTime[0] ? moment(this.formData.payTime[0]).format('YYYY-MM-DD') : '',
                    timeShop:this.formData.payTime[1] ? moment(this.formData.payTime[1]).format('YYYY-MM-DD') : '',
                    payTime: '',
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
            this.innerVisible = false
            
        },
        dialogBeforeClose () {
            this.innerVisible = false

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
    }
}
</script>
<style lang="scss" scoped>
    .line {
        text-align: center;
    }
</style>