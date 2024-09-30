<!--
* @Author: pengrongwei
* @Date: 2024-09-29
* @LastEditors: pengrongwei
* @LastEditTime: 2024-09-29
* @Description: 点巡检标准
* @FilePath： src/views/pointInspectionStandard/index.vue
-->

<template>
  <div id="pointInspectionStandard">
    <el-container>
      <el-header>
        <img
          class="logo"
          src="https://files.axshare.com/gsc/ACUG42/12/18/0e/12180eb4abae45e3a14f9ca1a7a8cf59/images/%E7%82%B9%E5%B7%A1%E6%A3%80%E6%A0%87%E5%87%86/u17.png?pageId=579fb2b5-0d0e-4ed6-b17b-3b33b7b9517b"
          alt=""
        />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1"
            background-color="#487df7"
            text-color="#ffffff"
            active-text-color="#2354c3"
          >
            <el-menu-item index="1">
              <span slot="title">点巡检标准</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div id="searchBox">
            <div id="tabsBox">
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane v-for="item in tabs" :key="item" :label="item" :name="item">
                </el-tab-pane>
              </el-tabs>
              <template v-if="activeName === '标准方案'">
                <span>设备类型：</span>
                <el-select v-model="typeValue" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </div>
            <div id="searchInput">
              <el-input
                v-model="searchName"
                placeholder="请输入标准名称"
                suffix-icon="el-icon-search"
              ></el-input>
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button type="warning" @click="onReset">重置</el-button>
            </div>
          </div>

          <template v-if="activeName === '标准方案'">
            <div id="contentBox">
              <el-button
                class="add-btn"
                type="primary"
                icon="el-icon-document-add"
                @click="dialogFormVisible = true"
                >新建标准</el-button
              >
              <div class="card-list">
                <PointInspectionStandardCard
                  :data="cardList"
                  :title="'注塑机巡检标准' + (index + 1)"
                  v-for="(item, index) in 7"
                  :key="item"
                >
                </PointInspectionStandardCard>
              </div>
            </div>
          </template>
          <template v-if="activeName === '设备分组'">
            <div id="contentBox">
              <EquipmentType :equipmentOptions="equipmentOptions" />
            </div>
          </template>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="新增标准" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item prop="name" label="标准名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="适用设备类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="frequency1" label="检查频率" :label-width="formLabelWidth">
          <el-select v-model="form.frequency1">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in dates"
              :key="item.value"
            >
            </el-option>
          </el-select>
          <el-select v-model="form.frequency2">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in times"
              :key="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="timeliness"
          label="任务完成时效"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.timeliness" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="project" label="点巡检项目" :label-width="formLabelWidth">
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
            <el-table-column prop="name" label="项目"> </el-table-column>
            <el-table-column prop="check" label="检查及基准"> </el-table-column>
            <el-table-column prop="lowerBound" label="下限"> </el-table-column>
            <el-table-column prop="upperLimit" label="上限"> </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
          </el-table>

          <el-button
            class="add-btn"
            type="primary"
            icon="el-icon-document-add"
            @click="onAddRow"
            >添加</el-button
          >
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            class="remark"
            type="textarea"
            v-model="form.remark"
            autocomplete="off"
          ></el-input>
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
import PointInspectionStandardCard from './pointInspectionStandardCard.vue';
import EquipmentType from './equipmentType.vue';
export default {
  name: 'PointInspectionStandard',
  components: {
    PointInspectionStandardCard,
    EquipmentType,
    
  },
  data() {
    return {
      typeValue: '',
      tabs: ['标准方案', '设备分组'],
      equipmentOptions: [
        {
          label: '设备1',
          value: 1,
        },
        {
          label: '设备2',
          value: 2,
        },
        {
          label: '设备3',
          value: 3,
        },
      ],

      cardList: [
        {
          key: '标准编号',
          value: '115155813',
        },
        {
          key: '设备类型',
          value: '注塑机',
        },
        {
          key: '检查频率',
          value: '一周一次',
        },
        {
          key: '检查项目',
          value: '开关键颜色是否符合要求；传动系统是否有异常声响；气压系统是否正常',
        },
        {
          key: '更新时间',
          value: '2024-09-12 15:00',
        },
      ],
      options: [
        {
          label: '全部',
          value: 'all',
        },
        {
          label: '类型1',
          value: 1,
        },
        {
          label: '类型2',
          value: 2,
        },
      ],
      dates: [
        {
          label: '年',
          value: 'year',
        },
        {
          label: '月',
          value: 'month',
        },
        {
          label: '周',
          value: 'week',
        },
        {
          label: '日',
          value: 'day',
        },
      ],
      times: [
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
      ],
      searchName: '',
      activeName: '标准方案',
      dialogFormVisible: false,
      form: {
        name: '',
        type: '',
        frequency1: '',
        frequency2: '',
        timeliness: '',
        remark: '',
      },
      rules: {
        name: [{ required: true, message: '请输入标准名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入适用设备类型', trigger: 'blur' }],
        // project: [{ required: true, message: '请输入适用设备类型', trigger: 'blur' }],
        timeliness: [{ required: false, message: '请输入任务完成时效', trigger: 'blur' }],
        frequency1: [{ required: true, message: '检查频率', trigger: 'change' }],
        frequency2: [{ required: true, message: '检查频率', trigger: 'change' }],
        remark: [{ required: false, message: '请输入备注', trigger: 'blur' }],
      },
      formLabelWidth: '110px',
      tableData: [],
    };
  },
  methods: {
    // tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 搜索
    onSearch() {
      console.log('onSearch');
    },
    // 重置搜索框
    onReset() {
      this.searchName = '';
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // table 添加行
    onAddRow(formName) {
      this.tableData.push({
        id: this.tableData.length + 1,
        name: '主机检查' + (this.tableData.length + 1),
        check: '滑动屏幕',
        lowerBound: '50',
        upperLimit: '50',
        remark: '上海市普陀区金沙江路 1518 弄',
      });
      this.form.project = this.form.project + ',' + (this.tableData.length + 1);
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
          this.resetForm('ruleForm');
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
#pointInspectionStandard {
  color: #ffffff;
  .el-header {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .el-main,
  .el-aside {
    height: calc(100vh - 60px);
  }
  .el-aside {
    background-color: #13357a;
    text-align: center;
  }

  .el-main {
    width: 100%;
    background-color: #071b48;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .logo {
    width: 100px;
    height: 50px;
  }

  #searchBox {
    height: 60px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    background-color: #0c2e64;
  }

  #tabsBox {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  #searchInput {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .add-btn {
    margin: 10px 0;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  :deep(.remark > .el-textarea__inner) {
    height: 180px !important;
  }
  :deep(.el-dialog__header) {
    font-family: PingFang SC, PingFang SC;
    font-weight: bold;
    font-size: 16px;
    color: #ffffff;
    line-height: 24px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }

  :deep(.el-menu-item.is-active),
  :deep(.el-tabs__item) {
    color: #ffffff !important;
  }
  :deep(.el-tabs__item.is-active) {
    background-color: #3574eb;
  }
  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs--card > .el-tabs__header) {
    border: none;
  }
  :deep(.el-tabs__item) {
    border-bottom: 1px solid #e4e7ed;
  }
}
</style>
