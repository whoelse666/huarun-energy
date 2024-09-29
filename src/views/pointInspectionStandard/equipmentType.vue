<template>
  <div id="equipmentType">
    <el-button
      class="add-btn"
      type="primary"
      icon="el-icon-document-add"
      @click="dialogFormVisible = true"
      >新建分组</el-button
    >

    <el-table
      :data="tableData"
      style="width: 100%"
      header-align="center"
      cell-align="center"
    >
      <el-table-column
        type="index"
        label="序号"
        :index="
          (index) => {
            return index + 1 < 10 ? '0' + (index + 1) : index + 1;
          }
        "
        width="50"
      >
      </el-table-column>
      <el-table-column prop="name" label="分组名称"> </el-table-column>
      <el-table-column prop="count" label="设备数量"> </el-table-column>
      <el-table-column prop="equipment" label="组内设备"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button type="text" style="color: #ff985e" size="small" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'equipmentType',
  data() {
    return {
      dialogFormVisible: false,
      tableData: [
        {
          id: 1,
          name: 'A线点巡检设备组1',
          count: 9,
          equipment: '空压机1#、空压机2#',
        },
        {
          id: 2,
          name: 'A线点巡检设备组2',
          count: 9,
          equipment: '空压机1#、空压机2#',
        },
        {
          id: 3,
          name: 'A线点巡检设备组3',
          count: 9,
          equipment: '空压机1#、空压机2#',
        },
      ],
    };
  },

  methods: {
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // table 添加行
    onAddRow(formName) {
      this.tableData.push({
        id: this.tableData.length + 1,
      });
    },

    // 表单取消
    onCancel(formName) {
      this.dialogFormVisible = false;
      this.resetForm(formName);
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.dialogFormVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#equipmentType {
  .add-btn {
    margin: 10px 0;
  }
}
</style>
