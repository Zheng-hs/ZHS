<template>
    <div>
        <i-search ref="iSearch" :model="formData" @search="fetch" @reset="reset">
            <el-form-item label="客户名称" prop="customerName">
                <el-input v-model="formData.customerName"></el-input>
            </el-form-item>
            <el-form-item label="客户账号" prop="customerAccount">
                <el-input v-model="formData.customerAccount"></el-input>
            </el-form-item>
        </i-search>
        <!-- <el-button  @click="test">click</el-button> -->
        <i-table
        :tableData="tableData" 
        :pageInfo="pageInfo"
        :selectionShow="false"
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
        
    </div>
</template>
<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import req from '@/api/client-manage.js'
export default {
    name: 'client-manage',
    components: {
        ISearch,
        ITable,

    },
    data () {
        return {
            formData: {},
            dialogFormData: {},
            pageInfo: {
                pageNum: 1,
                pageSize: 5,
                total:0
            },
            columnList: [
                {label: '客户账号', prop: 'customerAccount'},
                {label: '客户姓名', prop: 'customerName'},
                {label: '性别', prop: 'sex',distName: 'sexList'},
                {label: '手机号码', prop: 'customerPhone'},
                {label: '邮箱', prop: 'email'},
                {label: '身份证', prop: 'idCard'}
            ],
            sexList: [
                {label:'男',value:0},
                {label:'女',value:1}
            ],
            tableData: [
            ],
            formRules: {
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
            req('listCustomer',{
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
            console.log('rows',rows)
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