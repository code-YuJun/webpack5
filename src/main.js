import './js/test'
import "./css/index.css"
import "./css/index.less"
import "./css/index.scss"
import "./css/index.styl"
// 字体图标样式文件
import "./css/iconfont.css"
// 判断是否支持HMR功能

if (module.hot) {
    module.hot.accept("./js/test")
}