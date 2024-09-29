<template>
  <div>
    <router-view></router-view>
    <!-- <RlTable
      :data="tableData"
      :border="false"
      :showCard="false"
      :initData="false"
      :is-pagination="true"
      @on-change="loadTableData"
    >
      <template #default>
        <el-table-column prop="name" label="项目名称" min-width="180" />
        <el-table-column prop="projectPerson" label="负责人" min-width="120" />
        <el-table-column prop="contactPhone" label="联系人电话" min-width="120" />
        <el-table-column prop="energyTypeName" label="供能分类" min-width="150" />
        <el-table-column prop="projectTypeName" label="项目类型" min-width="150" />
        <el-table-column prop="address" label="地址" min-width="200">
          <template slot-scope="{ row }">
            <span>{{ `${row.areaName || ''}${row.address || ''}` }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="buildingArea" label="总建筑面积" min-width="120" />
        <el-table-column prop="operationDate" label="项目投运日期" min-width="150" />
        <el-table-column prop="creator" label="创建人" min-width="120" />
        <el-table-column fixed="right" label="操作">
          <template slot-scope="{ row }">
            <Operation :rowData="row" />
          </template>
        </el-table-column>
      </template>
      <template #head-left-button>
        <HeaderAction />
      </template>
      <template #search>
        <SearchContion />
      </template>
    </RlTable> -->
  </div>
</template>
<script>
import RlTable from '@/components/RlTable/index.vue';
import Operation from './components/Operation.vue';
import SearchContion from './components/SearchContion.vue';
import HeaderAction from './components/HeaderAction.vue';
import { findPageList } from '@/api/projectInfo.js';
export default {
  components: {
    SearchContion,
    Operation,
    HeaderAction,
    RlTable,
  },
  data() {
    return {
      tableData: [
        {
          id: '1771057478330081281',
          name: '广东普瑞玛测试',
          areaId: '1771057046723616770',
          areaName: '广东省中山市',
          address: '广东省中山市泰工区置业路5号',
          energyType: 'supplyhotwater',
          energyTypeName: '供热水',
          projectType: 'factory',
          projectTypeName: '工厂',
          buildingArea: '23',
          operationDate: '2024-05-14',
          responsiblePerson: null,
          contactPhone: '15378187591',
          longitude: '22.705779',
          latitude: '113.273758',
          useImage: true,
          creator: 'admin',
          deviceTotalNum: '8',
          deviceOnlineNum: '7',
          deviceOfflineNum: '1',
        },
        {
          id: '1790936283378913281',
          name: '四川能源职业学院',
          areaId: '1826541326907813890',
          areaName: '四川省遂宁市船山区',
          address: '科创西路9号四川能源职业学院',
          energyType: 'supplyhotwater',
          energyTypeName: '供热水',
          projectType: 'school',
          projectTypeName: '学校',
          buildingArea: '5000',
          operationDate: '2024-06-01',
          responsiblePerson: null,
          contactPhone: '15378187591',
          longitude: '30.552947',
          latitude: '105.616842',
          image: null,
          useImage: false,
          creator: 'admin',
          deviceTotalNum: '11',
          deviceOnlineNum: '2',
          deviceOfflineNum: '9',
        },
        {
          id: '1790936798850486273',
          name: '泸州建国饭店',
          areaId: '1828265379536375810',
          areaName: '四川省泸州市龙马潭区',
          address: '泸州建国饭店',
          energyType: 'supplyhotwater',
          energyTypeName: '供热水',
          projectType: 'hotel',
          projectTypeName: '酒店',
          buildingArea: '50000',
          operationDate: '2024-05-01',
          responsiblePerson: null,
          contactPhone: '15378187591',
          longitude: '28.915562',
          latitude: '105.410725',
          image: null,
          useImage: null,
          creator: 'admin',
          deviceTotalNum: '4',
          deviceOnlineNum: '1',
          deviceOfflineNum: '3',
        },
        {
          id: '1790937828313042945',
          name: '锦阳社区热水',
          areaId: '1790281089225887745',
          areaName: '四川省',
          address: '成都市锦江区柳江街办柳荫路',
          energyType: 'supplyhotwater',
          energyTypeName: '供热水',
          projectType: 'residents',
          projectTypeName: '居民楼',
          buildingArea: '300',
          operationDate: '2024-05-01',
          responsiblePerson: null,
          contactPhone: '15378187591',
          longitude: '30.589012',
          latitude: '104.10182',
          image: null,
          useImage: null,
          creator: 'admin',
          deviceTotalNum: '0',
          deviceOnlineNum: '0',
          deviceOfflineNum: '0',
        },
        {
          id: '1823566870451163138',
          name: '成都西站派出所',
          areaId: '1823566248305856513',
          areaName: '成都青羊区',
          address: '西站一路',
          energyType: 'supplyhotwater',
          energyTypeName: '供热水',
          projectType: 'enterprise',
          projectTypeName: '企事业',
          buildingArea: '1000',
          operationDate: '2024-08-14',
          responsiblePerson: null,
          contactPhone: '15196657961',
          longitude: '30.68538',
          latitude: '103.979246',
          image: null,
          useImage: false,
          creator: 'admin',
          deviceTotalNum: '1',
          deviceOnlineNum: '1',
          deviceOfflineNum: '0',
        },
        {
          id: '1823961431388192770',
          name: '西安钟楼饭店',
          areaId: '1823961163292475393',
          areaName: '陕西省西安市碑林区',
          address: '南大街110号',
          energyType: 'supplyhotwater',
          energyTypeName: '供热水',
          projectType: 'hotel',
          projectTypeName: '酒店',
          buildingArea: '1000',
          operationDate: '2024-08-15',
          responsiblePerson: null,
          contactPhone: '17789265478',
          longitude: '34.25844',
          latitude: '108.946033',
          image: null,
          useImage: false,
          creator: 'admin',
          deviceTotalNum: '4',
          deviceOnlineNum: '4',
          deviceOfflineNum: '0',
        },
        {
          id: '1828265883863683074',
          name: '四川日盛铜箔科技股份有限公司',
          areaId: '1828265379536375810',
          areaName: '四川省泸州市龙马潭区',
          address: '罗汉街道上岩',
          energyType: 'supplyhotwater',
          energyTypeName: '供热水',
          projectType: 'enterprise',
          projectTypeName: '企事业',
          buildingArea: '1000',
          operationDate: '2024-08-27',
          responsiblePerson: null,
          contactPhone: '15378187591',
          longitude: '28.886906',
          latitude: '105.523274',
          image: null,
          useImage: null,
          creator: 'admin',
          deviceTotalNum: '1',
          deviceOnlineNum: '1',
          deviceOfflineNum: '0',
        },
        {
          id: '1830437020710289410',
          name: '武侯区武侯祠希尔顿惠庭酒店',
          areaId: '1830436814245675009',
          areaName: '四川省成都市武侯区',
          address: '一环路南四段19号',
          energyType: 'supplyhotwater',
          energyTypeName: '供热水',
          projectType: 'hotel',
          projectTypeName: '酒店',
          buildingArea: '1000',
          operationDate: null,
          responsiblePerson: null,
          contactPhone: '15378187591',
          longitude: '30.639439',
          latitude: '104.042299',
          image: null,
          useImage: null,
          creator: 'admin',
          deviceTotalNum: '1',
          deviceOnlineNum: '0',
          deviceOfflineNum: '1',
        },
      ],
    };
  },
  methods: {
    loadTableData({ resolve, params }) {
      const result = { records: [], total: 0 };
      params.desc = ['id'];
      findPageList(params)
        .then((res) => {
          const { code, data } = res;
          if (code === 200) {
            result.records = data.records || [];
            result.total = Number(data.total);
          }
          resolve(result);
        })
        .catch(() => {
          resolve(result);
        });
    },
  },
};
</script>
