<script>
    export default {
        name: 'SearchContion',
        data() {
            return {
               
            }
        },
        created() {},
        inject: ['tableRoot'],
        mounted() {
            
        },
        methods: {
            
        },
    }
</script>

<template>
    <fragment>
        <GridItem :index="0">
            <SearchFormItem label="项目名称:">
                <el-input
                    placeholder="请输入内容"
                    v-model="tableRoot.searchParams.name"
                    size="small"
                ></el-input>
            </SearchFormItem>
        </GridItem>
        
        
    </fragment>
</template>
