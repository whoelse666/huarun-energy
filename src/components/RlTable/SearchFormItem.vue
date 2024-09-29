<script>
    import GridItem from '@/components/Grid/GridItem.vue'
    export default {
        name: 'SearchFormItem',
        components: { GridItem },
        props: {
            label: {
                type: String,
                default: '',
            },
            required: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>
<template>
    <el-form-item :label="label" :required="required">
        <slot />
    </el-form-item>
</template>

<style lang="scss" scoped>
    ::v-deep .el-form-item {
        margin-bottom: 0px;
        display: flex;
    }
    ::v-deep .el-form-item__label {
    }
</style>
