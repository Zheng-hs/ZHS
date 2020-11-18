<template>
  <div class="i-table">
      <!-- 按钮列表 -->
    <div class="btn-list">
      <el-button
      v-for="(item, index) in toolbar"
      :key="index"
      :type="item.type"
      @click="item.func">
      {{item.btnName}}
      </el-button>
    </div>

    <div class="table-container">
        <el-table border :data="tableData" @selection-change="handleSelectionChange">
           <el-table-column
          
           v-if="selectionShow"
           fixed="left"
            type="selection"
            width="55">
          </el-table-column>
            <slot></slot>
        </el-table>
    </div>

    <div class="table-pagination" v-show="tableData.length">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageInfo.pageNum"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'i-table',
  props: {
    toolbar: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
        type:Array,
        default: () => {
            return []
        }
    },
    pageInfo: {
      type:Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 5,
          total: 0
        }
      }
    },
    selectionShow: {
      type: Boolean,
      default:false
    }
  },
  data () {
    return {
        //  currentPage4: 4
    }
  },
  methods: {
      handleSizeChange (value) {
          this.$emit('handleSizeChange',value)
      },
      handleCurrentChange (value) {
            this.$emit('handleCurrentChange',value)
        },
        //多选框改变
      handleSelectionChange (rows) {
        console.log(rows)
        this.$emit('selection-change',rows)
      }
  }

  
}
</script>

<style lang="scss" scoped>
.i-table {
  padding: 10px;
  width: 100%;
  .el-table__header-wrapper {
    width: 100%;
  }
}
.btn-list {
  margin-bottom: 10px;
}
.table-pagination {
  .el-pagination {
    text-align: right;
  }
}

</style>