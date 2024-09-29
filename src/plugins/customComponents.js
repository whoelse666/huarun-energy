import Vue from 'vue'


import Fragment from 'vue-fragment'


import pageModal from '../components/PageModal'



import globalComponents from './globalComponents'


import lodash from 'lodash'




const componentArr = [
    Fragment.Plugin,
    globalComponents,
    
]

componentArr.map((com) => {
    Vue.use(com)
})


Vue.prototype.$pageModal = pageModal


Vue.prototype.$lodash = lodash

