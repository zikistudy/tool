import {App} from 'vue'
import rank from './src/index.vue'

// 这个组件可以通过use的形式使用
export default {
    install(app:App){
        app.component('gy-rank',rank)
    }
}