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
            @click="handleEdit(scope.row)"
            type="text"
            size="small"
            icon="el-icon-edit"
            >编辑</el-button
          >

          <el-popconfirm
            title="确定删除吗？"
            icon="el-icon-info"
            icon-color="red"
            @confirm="handleDelete(scope.row)"
            @cancel="handleCancel(scope.row)"
          >
            <el-button
              slot="reference"
              type="text"
              style="color: #ff985e"
              size="small"
              icon="el-icon-delete"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增标准" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item prop="name" label="分组名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="equipment" label="分组设备" :label-width="formLabelWidth">
          <el-select
            @change="handleSelectChange"
            v-model="form.equipment"
            placeholder="请选择"
            clearable
            multiple
          >
            <el-option
              v-for="item in equipmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="" :label-width="formLabelWidth">
          <div id="selected-tag">
            <el-tag v-for="tag in tags" :key="tag.value">
              {{ tag.label }}
            </el-tag>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'equipmentType',

  props: {
    equipmentOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      typeValue: '',
      dialogFormVisible: false,
      tags: [],
      tableData: [
        {
          id: 1,
          name: 'A线点巡检设备组1',
          count: 9,
          equipment: '空压机1#,空压机2#',
        },
        {
          id: 2,
          name: 'A线点巡检设备组2',
          count: 9,
          equipment: '空压机1#,空压机2#',
        },
        {
          id: 3,
          name: 'A线点巡检设备组3',
          count: 9,
          equipment: '空压机1#,空压机2#',
        },
      ],
      form: {
        name: '',
        equipment: '',
        remark: '',
      },
      rules: {
        name: [{ required: true, message: '请输入分组名称', trigger: 'blur' }],
        equipment: [{ required: true, message: '请输入分组设备', trigger: 'blur' }],
      },
      formLabelWidth: '110px',
    };
  },

  methods: {
    //表格行编辑
    handleEdit(row) {
      console.log('row', row);
    },
    //表格行删除
    handleDelete(row) {
      this.tableData.splice(this.tableData.indexOf(row), 1);
      this.$message({
        message: '删除成功',
        type: 'success',
      });
    },
    //表格行取消删除
    handleCancel(row) {
      console.log('表格行取消删除');
    },
    //多选事件
    handleSelectChange(val) {
      this.tags = [...val];
    },

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
          this.$message({
            message: '提交成功',
            type: 'success',
          });
          this.dialogFormVisible = false;

          this.tableData.push({
            id: this.tableData.length + 1,
            name: this.form.name,
            count: this.tags.length,
            equipment: this.tags.map((item) => item.label).join('#,') + '#',
          });
          this.resetForm('ruleForm');
          this.tags = [];
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
  #selected-tag {
    padding: 10px;
    width: 100%;
    height: 190px;
    gap: 12px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    background: #132e58;
    border-radius: 4px;
  }
  .pagination-container {
    width: 100%;
    display: flex;
    justify-content: end;
  }
  :deep(.el-table__body tr.hover-row > td.el-table__cell) {
    background-color: #0c316b !important;
  }

  :deep(.el-select) {
    width: 100%;
  }
}
</style>
