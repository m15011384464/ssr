let app = require('express')()
let Vue = require('vue')
let ssr = require('vue-server-renderer').createRenderer()
const port = 8888
let instance = new Vue({
    template: `<div><div>数字是{{num}}</div>
    <button @click="add">点我增加</button></div>`,
    data() {
        return {
            num: 0
        }
    },
    created() {
        this.num = 1
    },
    methods: {
        add() {
            this.num++
        }
    }
})
// 渲染后的静态html，触发created方法没有绑定
// <div data-server-rendered="true"><div>数字是1</div> <button>点我增加</button></div>
app.get('/', (req, res) => {
    ssr.renderToString(instance).then(html=> {
        res.send(html)
    })
    .catch(e => {
        throw e
    })
    
})
app.listen(port, ()=> console.log(`server is at localhost:${port}`))