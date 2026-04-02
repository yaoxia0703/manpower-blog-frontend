import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { permissionDirective } from '@/directives/permission'
// ルーターをインポートする
const app = createApp(App)
const pinia = createPinia()
// rounter 使う
app.use(router)
// Element Plus を使う
app.use(ElementPlus)
// Pinia を使う
app.use(pinia)
// カスタムディレクティブを登録する
app.directive('permission', permissionDirective)

app.mount('#app')