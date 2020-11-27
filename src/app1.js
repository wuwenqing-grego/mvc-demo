import './app1.css'
import $ from 'jquery'

const view = {
    html: `
        <div class="output">
            <span>{{n}}</span>
        </div>
        <div class="actions">
            <button id="add">+1</button>
            <button id="minus">-1</button>
            <button id="multi">*2</button>
            <button id="devide">/2</button>
        </div>
    `,

    render(container) {
        $(view.html.replace('{{n}}', model.data.n)).appendTo($(container))
    }
}

const controller = {
    init(container) {
        view.render(container)

        controller.ui = {
            btnAdd: $('#add'),
            btnMinus: $('#minus'),
            btnMulti: $('#multi'),
            btnDevide: $('#devide'),
            num: $('.output span')
        }

        controller.bindEvents()
    },

    bindEvents() {
        controller.ui.btnAdd.on('click', () => {
            model.data.n += 1
            controller.ui.num.text(model.data.n)
            localStorage.setItem('n', model.data.n)
        })
        controller.ui.btnMinus.on('click', () => {
            model.data.n -= 1
            controller.ui.num.text(model.data.n)
            localStorage.setItem('n', model.data.n)
        })
        controller.ui.btnMulti.on('click', () => {
            model.data.n *= 2
            controller.ui.num.text(model.data.n)
            localStorage.setItem('n', model.data.n)
        })
        controller.ui.btnDevide.on('click', () => {
            model.data.n /= 2
            controller.ui.num.text(model.data.n)
            localStorage.setItem('n', model.data.n)
        })
    }
}

const model = {
    data: {
        n: +localStorage.getItem('n') || 100
    }
}

export default controller
