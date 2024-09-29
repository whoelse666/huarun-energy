<template>
    <Space>
        <el-tooltip class="item" effect="light" content="编辑" placement="bottom-start">
            <el-button type="text" icon="el-icon-edit" @click="editClick" />
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="删除" placement="bottom-start">
            <el-button icon="el-icon-delete" type="text" @click="onDeleteClick" />
        </el-tooltip>
    </Space>
</template>
<script>
/* eslint-disable */
    import FormModal from './FormModal.vue'
    import { deleteTableRow } from '@/api/projectInfo'
    export default {
        name: 'Operation',
        props: {
            rowData: {
                type: Object,
                default: () => {
                    return {}
                },
            },
        },
        inject: ['tableRoot'],
        methods: {
            editClick() {
                new this.$pageModal(
                    FormModal,
                    {
                        props: {
                            title: '编辑',
                            rowData: this.$props.rowData,
                        },
                    },
                    (result) => {
                        if (result) {
                            this.tableRoot.onSearchChange()
                        }
                    }
                )
            },
            onDeleteClick() {
                this.$confirm('您确认要删除数据嘛？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    distinguishCancelAndClose: true,
                    type: 'warning',
                }).then(() => {
                    deleteTableRow(this.rowData.id).then((result) => {
                        if (result.code == 200) {
                            this.$message.success(result.msg)
                            this.tableRoot.onSearchChange()
                        }
                    })
                })
            },
        },
    }
</script>
