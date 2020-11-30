import './app1.css'
import $ from 'jquery'
import Model from './base/Model.js'
import View from './base/View.js'

const $eventBus = $({})

const model = new Model({
    data: {
        n: +localStorage.getItem('app1-n') || 100
    },

    update(data) {
        Object.assign(model.data, data)
        $eventBus.trigger('model:updated')
        localStorage.setItem('app1-n', model.data.n)
    }
})

const view = {
    container: null,
    
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
    
    render(val) {
        if (view.container.children().length) {
            view.container.empty()
        }
        $(view.html.replace('{{n}}', val)).appendTo(view.container)
    },

    init(container) {
        view.container = $(container)
        view.render(model.data.n)
        view.autoBindEvents()
        $eventBus.on('model:updated', () => {
            view.render(model.data.n)
        })
    },

    events: {
        'click #add': 'add',
        'click #minus': 'minus',
        'click #multi': 'multi',
        'click #devide': 'devide'
    },

    add() {
        model.update({n: model.data.n + 1})
    },

    minus() {
        model.update({n: model.data.n - 1})
    },

    multi() {
        model.update({n: model.data.n * 2})
    },

    devide() {
        model.update({n: model.data.n / 2})
    },

    autoBindEvents() {
        for (let key in view.events) {
            let [event, selector] = key.split(' ')
            view.container.on(event, selector, view[view.events[key]])
        }
    }
}

export default view
