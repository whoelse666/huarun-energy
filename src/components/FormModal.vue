<template>
    <el-form label-position="top" :model="formData" :rules="rules" ref="ruleForm">
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="项目名称" prop="name">
                    <el-input placeholder="请输入" v-model="formData.name" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="地区" prop="areaId">
                    <el-cascader 
                        v-model="formData.areaId"
                        :options="areaList"
                        style="width:100%;"
                        :props="areaProps"
                        ref="areaRef"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="详细地址" prop="address">
                    <el-input placeholder="请输入" v-model="formData.address" />
                </el-form-item>
            </el-col>
            
               
            <el-col :span="12">
                <el-form-item label="总建筑面积" prop="buildingArea">
                    <el-input placeholder="请输入" v-model="formData.buildingArea">
                        <span slot="suffix">m²</span>
                    </el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="供能类型" prop="energyType">
                    <el-select
                        v-model="formData.energyType"
                        filterable
                        placeholder="请选择"
                        transfer
                        style="width: 100%"
                    >
                        <el-option
                            v-for="item in industryTypeList"
                            :key="item.code"
                            :value="item.code"
                            :label="item.name"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="项目类型" prop="projectType">
                    <el-select
                        v-model="formData.projectType"
                        filterable
                        placeholder="请选择"
                        transfer
                        style="width: 100%"
                    >
                        <el-option
                            v-for="item in projectTypeList"
                            :key="item.code"
                            :value="item.code"
                            :label="item.name"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            
           
            <el-col :span="12">
                <el-form-item label="项目投运日期:">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="formData.operationDate"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系人电话">
                    <el-input 
                        placeholder="请输入" 
                        v-model="formData.contactPhone"

                    />
                </el-form-item>
            </el-col>
            
        </el-row>
    </el-form>
</template>

<script>


import { addRequest, updateRequest } from "@/api/projectInfo"






const ruleValue = [
    {
        pattern: /^(?:-?\d+|-?\d*\.\d+)$/,
        message: '请输入有效的整数或浮点数',
        trigger: 'change',
    },
]

export default {
    props: {
        title: String,
        rowData: Object,
    },
    data() {
        return {
            
            formData: {
                //项目名称
                name: this.$props.rowData?.name || null,
                //地区id
                areaId: [],
                //详细地址
                address: this.$props.rowData?.address || null,
                //行业分类
                energyType: null,
                projectType: null,
                //总建筑面积
                buildingArea: this.$props.rowData?.buildingArea || null,
                //项目投运日期
                operationDate: this.$props.rowData?.operationDate || null,
                //项目负责人
                //responsiblePerson: this.$props.rowData?.responsiblePerson || null,
                //经度
                longitude: this.$props.rowData?.longitude || null,
                //纬度
                latitude: this.$props.rowData?.latitude || null,
                //联系人电话号码
                contactPhone:this.$props.rowData?.contactPhone || null,
                image: this.$props.rowData?.image || null,
                useImage: this.$props.rowData?.useImage || null,
            },
            rules: {
                name: [{ required: true, message: '请输入项目名', trigger: 'blur' }],
                latitudeValues: [{ required: true, message: '请选择经纬度', trigger: 'change' }],
                areaId: [{ required: true, message: '请选择地区', trigger: 'change' }],
                //energyType: [{ required: true, message: '请选择行业分类', trigger: 'change' }],
                longitude: ruleValue,
                latitude: ruleValue,
                // responsiblePerson:[{ required: true, message: '请输入项目负责人', trigger: 'blur' }],
            },
            //地区选择数据源
            areaList: [],
            //行业分类选择下拉数据源
            industryTypeList: [
            {
                    "code":1,
                    "name":"供水"
                },  
                {
                    "code":2,
                    "name":"供热"
                },  
                {
                    "code":3,
                    "name":"供电"
                },  
            ],
            projectTypeList: [
                {
                    "code":1,
                    "name":"住宅"
                },  
                {
                    "code":2,
                    "name":"医院"
                },  
                {
                    "code":3,
                    "name":"学校"
                },  
            ],
            areaProps: {
                label: 'areaName',
                value: 'id',
                children:'children'
            },
            latitudeValues:null
        }
    },
    created() {
        this.initSetModal()
        this.initData()


    },
    methods: {
        /**
        *@function 初始化数据
        */
        initData() {
            
            
                
                // this.industryTypeList = result.data.supply_energy_type

                // //回填数据
                // this.formData.energyType=this.$props.rowData?.energyType
            

         
                
                // this.projectTypeList = result.data.supply_project_type

                // //回填数据
                // this.formData.projectType=this.$props.rowData?.projectType
            

        },
        /**
         * @function 初始化弹窗
         */
        initSetModal() {
            this.$emit('SetTitle', this.$props.title)
            this.$emit('SetPageWidth', 800)
            this.$emit('SetPageActions', [
                {
                    text: '取消',
                    theme: 'default',
                    handle: () => {
                        this.$emit('Close')
                    },
                },
                {
                    text: '保存',
                    theme: 'primary',
                    handle: () => {
                        this.submitForm()
                    },
                    loading: false,
                },
            ])
        },
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    const { id = null } = this.$props.rowData || {}
                    const params = {
                        ...this.formData,
                        areaId:this.formData.areaId[this.formData.areaId.length-1],
						areaName:this.getAreaNames(),
                        id
                    }
                    const fetchType = id ? updateRequest : addRequest
                    fetchType(params).then((result) => {
                        const { code, msg } = result
                        if (code == 200) {
                            this.$message.success(msg)
                            this.$emit('Close', true)
                        }
                    })
                }
            })
        },
        /**
         * @function 地区改变回调事件
         */
       
    }
}
</script>
<style lang="scss" scoped>
img {
        max-width: 300px;
        margin-top: 20px;
    }
</style>