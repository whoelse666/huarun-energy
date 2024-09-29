
<script>
/* eslint-disable */
    import FormModal from './FormModal.vue'
    export default {
        name: 'TableAction',
        components: { FormModal },
        inject: ['tableRoot'],
        data() {
            return {}
        },
        methods: {
            addOnClick() {
                new this.$pageModal(
                    FormModal,
                    {
                        props: {
                            title: '新增',
                        },
                    },
                    (result) => {
                        if (result) {
                            this.tableRoot.onSearchChange()
                        }
                    }
                )
            },
        },
    }
</script>

<template>
    <fragment>
        <el-button 
            size="small" 
            @click="addOnClick"
            icon="el-icon-plus"
            type="primary"
        >
            新增
        </el-button>
    </fragment>
</template>
