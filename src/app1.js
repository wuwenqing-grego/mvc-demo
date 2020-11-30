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
        Object.assign(this.data, data)
        $eventBus.trigger('model:updated')
        localStorage.setItem('app1-n', this.data.n)
    }
})

const controller = {
    view: null,

    initV(container) {
        controller.view = new View({
            el: container,
        
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
                if (this.container.children().length) {
                    this.container.empty()
                }
                $(this.html.replace('{{n}}', val)).appendTo(this.container)
            }
        })
    },

    init(container) {
        controller.initV(container)
        controller.view.render(model.data.n)
        controller.autoBindEvents()
        $eventBus.on('model:updated', () => {
            controller.view.render(model.data.n)
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
            controller.view.container.on(event, selector, controller[controller.events[key]])
        }
    }
}

export default controller
