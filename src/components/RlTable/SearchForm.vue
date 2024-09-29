<script>
    import Grid from '@/components/Grid/index.vue'
    import GridItem from '@/components/Grid/GridItem.vue'
    export default {
        name: 'SearchForm',
        components: { Grid, GridItem },
        props: {
            columns: {
                type: Array,
                default: () => {
                    return []
                },
            },
            searchParam: {
                type: Object,
                default: () => {
                    return {}
                },
            },
            isShowRest: {
                type: Boolean,
                default: () => true,
            },
            isShowMore: {
                type: Boolean,
                default: () => true,
            },
            searchName: {
                type: String,
                default: '搜索',
            },
            cols: {
                type: Object,
                default: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            initCollapsed: {
                type: Boolean,
                default: false,
            },
            isExport: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                //是否默认折叠搜索项
                collapsed: this.$props.initCollapsed,
            }
        },
        mounted() {
            // console.log(this.$slots.default[0].componentInstance.$children,"ghaha")
            // if(this.$slots.default&&this.$slots.default.length==1){
            //     const solts=this.$slots.default[0].componentInstance.$children;
            //     const arr=[1,2,3]
            //     solts.reduce((prev, current) => {
            //         console.log(prev,"haha")
            //     })
            // }
        },
        computed: {
            showCollapse() {
                //let show = false

                return true
            },
        },
        methods: {
            collapsedChange() {
                this.collapsed = !this.collapsed
            },
            searchOnClick() {
                this.$emit('on-search')
            },
            restOnClick() {
                this.$emit('on-rest')
            },
            exportOnClick() {
                this.$emit('on-export')
            },
        },
    }
</script>
<template>
    <div class="table-search">
        <el-form ref="formRef" :show-message="false">
            <Grid :collapsed="collapsed" :gap="[20, 20]" :cols="cols">
                <slot />
                <GridItem suffix>
                    <div class="operation">
                        <el-button
                            type="primary"
                            icon="el-icon-search"
                            @click="searchOnClick"
                            size="small"
                            :disabled="disabled"
                        >
                            {{ searchName }}
                        </el-button>
                        <el-button @click="restOnClick" size="small" v-if="isShowRest"
                            >重置</el-button
                        >
                        <el-button
                            @click="exportOnClick"
                            size="small"
                            v-if="isExport"
                            type="primary"
                            >导出</el-button
                        >
                        <el-button
                            v-if="showCollapse && isShowMore"
                            link
                            class="search-isOpen"
                            @click="collapsedChange"
                            icon="el-icon-arrow-down"
                            size="small"
                        >
                            {{ collapsed ? '展开' : '合并' }}
                        </el-button>
                        <slot name="search-button" />
                    </div>
                </GridItem>
            </Grid>
        </el-form>
    </div>
</template>
<style lang="scss" scoped>
    .table-search {
        margin-bottom: 10px;
        padding: 16px 24px 24px;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 0 12px #0000000d;
        background-color: rgba(38, 86, 157, 0.3);
        ::v-deep .el-form-item__label {
            color: #fff;
        }
    }

    .operation {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    ::v-deep .el-form-item {
        margin-bottom: 0px;
        display: flex;
    }

    ::v-deep .el-form-item__content {
        flex: 1;
    }
</style>
