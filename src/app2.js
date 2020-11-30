import './app2.css'
import $ from 'jquery'
import Model from './base/Model.js'
import View from './base/View.js'

const $eventBus = $({})

const model = new Model({
    data: {
        index: +localStorage.getItem('app2-index') || 0
    },

    update(data) {
        Object.assign(this.data, data)
        $eventBus.trigger('model:updated')
        localStorage.setItem('app2-index', this.data.index)
    }
})

const init = (el) => {
    new View({
        el: el,
    
        html(index) {
            return `
                <div>
                    <ol class="nav">
                        <li class="${index ? '' : 'selected'}" data-index="0"><span>1111</span></li>
                        <li class="${index ? 'selected' : ''}" data-index="1"><span>2222</span></li>
                    </ol>
                    <ol class="content">
                        <li class="${index ? '' : 'active'}">content1</li>
                        <li class="${index ? 'active' : ''}">content2</li>
                    </ol>
                </div>
            `
        },
    
        render(data) {
            if (this.container.children().length) {
                this.container.empty()
            }
            $(this.html(data.index)).appendTo(this.container)
        },

        data: model.data,
        
        events: {
            'click .nav li': 'switch'
        },

        eventBus: $eventBus,
        
        switch(e) {
            const selectedIndex = +e.currentTarget.dataset.index
            if (selectedIndex !== model.data.index) {
                model.update({index: selectedIndex})
            }
        }
    })
}

export default init
