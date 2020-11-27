import './app1.css'
import $ from 'jquery'

const view = {
    el: null,

    html: `
        <div>
            <div class="output">
                <span>{{n}}</span>
            </div>
            <div class="actions">
                <button id="add">+1</button>
                <button id="minus">-1</button>
                <button id="multi">*2</button>
                <button id="devide">/2</button>
            </div>
        </div>
    `,

    init(container) {
        view.container = $(container)
        view.render()
    },

    render() {
        if (!view.el) {
            view.el = $(view.html.replace('{{n}}', model.data.n)).appendTo(view.container)
        } else {
            const newEl = $(view.html.replace('{{n}}', model.data.n))
            view.el.replaceWith(newEl)
            view.el = newEl
        }
    }
}

const controller = {
    init(container) {
        view.init(container)

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
        view.container.on('click', '#add', () => {
            model.data.n += 1
            view.render()
            localStorage.setItem('n', model.data.n)
        })
        view.container.on('click', '#minus', () => {
            model.data.n -= 1
            view.render()
            localStorage.setItem('n', model.data.n)
        })
        view.container.on('click', '#multi', () => {
            model.data.n *= 2
            view.render()
            localStorage.setItem('n', model.data.n)
        })
        view.container.on('click', '#devide', () => {
            model.data.n /= 2
            view.render()
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
