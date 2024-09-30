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
      <el-button type="primary" plain size="small" @click="onSearch">编辑</el-button>
      <el-button type="danger" plain size="small" @click="onReset">删除</el-button>
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
    // 搜索
    onSearch() {
      console.log('onSearch');
    },
    // 重置搜索框
    onReset() {
      this.searchName = '';
    },
  },
};
</script>

<style lang="scss" scoped>
#pointInspectionStandardCard {
  width:32%;
  min-width:260px;
  height: 360px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px dashed #ccc;
  display: flex;
  flex: 1 1 auto;
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
