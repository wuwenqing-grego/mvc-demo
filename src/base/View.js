import $ from 'jquery'

class View {
    constructor(options) {
        Object.assign(this, options)
        // {el, html, render, data, events, eventBus}

        this.container = $(this.el)
        this.render(this.data)
        this.autoBindEvents()
        this.eventBus.on('model:updated', () => {
            this.render(this.data)
        })
    }

    autoBindEvents() {
        for (let key in this.events) {
            let [event, selector] = key.split(' ')
            this.container.on(event, selector, this[this.events[key]])
        }
    }
}

export default View