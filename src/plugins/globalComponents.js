import RlTable from '@/components/RlTable'
import SearchFormItem from '@/components/RlTable/SearchFormItem.vue'
import GridItem from '@/components/Grid/GridItem.vue'
import Space from '@/components/Space'

const globalComponents = [RlTable, Space, SearchFormItem, GridItem]
export default {
    install(Vue) {
        globalComponents.forEach((component) => {
            Vue.component(component.name, component)
        })
    },
}
