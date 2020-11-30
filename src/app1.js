import './app1.css'
import $ from 'jquery'
import Model from './base/Model.js'
import View from './base/View.js'
import EventBus from './base/EventBus.js'

const model = new Model({
    data: {
        n: +localStorage.getItem('app1-n') || 100
    },

    update(data) {
        Object.assign(this.data, data)
        this.trigger('model:updated')
        localStorage.setItem('app1-n', this.data.n)
    }
})

const init = (el) => {
    new View({
        el: el,
        
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
        
        render(data) {
            if (this.container.children().length) {
                this.container.empty()
            }
            $(this.html.replace('{{n}}', data.n)).appendTo(this.container)
        },
    
        data: model.data,
    
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
        }
    })
}

export default init
