<template>
  <div id="pointInspectionStandardCard">
    <div>
      <p class="title">
        {{ title }}
      </p>
      <div v-for="item in data" :key="item.key">
        <template v-if="item.key === '检查项目'">
          <div class="project ellipsis">
            {{ item.key }}:
            <span class="label-value">
              {{ item.value }}
            </span>
          </div>
        </template>
        <template v-else>
          {{ item.key }}:
          <span class="label-value">
            {{ item.value }}
          </span>
        </template>
      </div>
    </div>
    <div class="footer">
      <el-button
        style="margin-right: 10px"
        type="primary"
        plain
        size="small"
        @click="handleEdit"
        >编辑</el-button
      >
      <el-popconfirm
        title="确定删除吗？"
        icon="el-icon-info"
        icon-color="red"
        @confirm="handleDelete(item)"
        @cancel="handleCancel(item)"
      >
        <el-button slot="reference" type="danger" plain size="small">删除</el-button>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pointInspectionStandardCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // 编辑
    handleEdit() {
      console.log('编辑');
    },
    // 删除
    handleDelete(item) {
       this.$message({
        message: '删除成功',
        type: 'success',
      });
    },
    // 取消删除
    handleCancel() {
      console.log('取消删除');
    },
  },
};
</script>

<style lang="scss" scoped>
#pointInspectionStandardCard {
  width: 32%;
  min-width: 260px;
  height: 360px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px dashed #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: url(../../assets/cardbg.png) no-repeat;
  background-size: 100% 100%;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 30px;

  .title {
    font-weight: bold;
    font-size: 15px;
    color: #ffffff;
  }
  .label {
    line-height: 22px;
  }
  .label-value {
    color: #ffffff;
  }
  .project {
    background: #003e86;
    line-height: 22px;
    padding: 5px 10px;
    height: 52px;
    width: 100%;
    position: relative;
    left: -10px;
  }

  .footer {
    text-align: right;
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid rgba(81, 162, 255, 0.2);
  }
}
</style>
