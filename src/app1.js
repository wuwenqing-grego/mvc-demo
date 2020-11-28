import './app1.css'
import $ from 'jquery'

const $eventBus = $({})

const model = {
    data: {
        n: +localStorage.getItem('n') || 100
    },

    update(data) {
        Object.assign(model.data, data)
        $eventBus.trigger('model:updated')
    }
}

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

    init(container) {
        view.container = $(container)
    },

    render(val) {
        if (view.container.children().length) {
            view.container.empty()
        }
        $(view.html.replace('{{n}}', val)).appendTo(view.container)
    }
}

const controller = {
    init(container) {
        view.init(container)
        view.render(model.data.n)
        controller.autoBindEvents()
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
        for (let key in controller.events) {
            let [event, selector] = key.split(' ')
            view.container.on(event, selector, () => {
                controller[controller.events[key]]()
                localStorage.setItem('n', model.data.n)
            })
        }
    }
}

export default controller
