import {App} from 'vue'
import chooseSwitch from './switch'
import eye from './eye'
import button from './button'
import rank from './rank'
import total from './total'
const components = [
    chooseSwitch,
    eye,
    button,
    rank,
    total
]

export default {
    install(app:App){
        components.map(item=>{
            app.use(item)
        })
    }
}