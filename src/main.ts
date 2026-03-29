import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// ルーターをインポートする
const app = createApp(App)
// rounter 使う
app.use(router)
// Element Plus を使う
app.use(ElementPlus)
// app をマウントする
app.mount('#app')