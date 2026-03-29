import 'axios' // 引入 axios 类型声明（用于扩展类型）

declare module 'axios' { // 声明模块扩展 axios
  export interface AxiosRequestConfig { // 扩展外部使用的请求配置类型
    /**
     * true 时不显示 UI 错误提示
     */
    silent?: boolean // 控制是否静默（不弹错误提示）

    /**
     * true 时不携带 Authorization 头
     */
    skipAuth?: boolean // 控制是否跳过 token 注入

    /**
     * 手动指定请求 ID（用于日志追踪等）
     */
    requestId?: string // 自定义请求唯一标识
  }

  export interface InternalAxiosRequestConfig { // 扩展 axios 内部使用的请求配置类型
    silent?: boolean // 内部也需要识别 silent 参数
    skipAuth?: boolean // 内部也需要识别 skipAuth 参数
    requestId?: string // 内部也需要识别 requestId 参数
  }
}