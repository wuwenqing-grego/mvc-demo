import './app2.css'
import $ from 'jquery'
import Model from './base/Model.js'

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

const view = {
    container: null,

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

    render(index) {
        if (view.container.children().length) {
            view.container.empty()
        }
        $(view.html(index)).appendTo(view.container)
    },

    init(container) {
        view.container = $(container)
        view.render(model.data.index)
        view.autoBindEvents()
        $eventBus.on('model:updated', () => {
            view.render(model.data.index)
        })
    },
    
    events: {
        'click .nav li': 'switch'
    },
    
    switch(e) {
        const selectedIndex = +e.currentTarget.dataset.index
        if (selectedIndex !== model.data.index) {
            model.update({index: selectedIndex})
        }
    },
    
    autoBindEvents() {
        for (let key in view.events) {
            let [event, ...selector] = key.split(' ')
            view.container.on(event, selector.join(' '), view[view.events[key]])
        }
    }
}

export default view
