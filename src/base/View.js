import $ from 'jquery'
import EventBus from './EventBus.js'

class View extends EventBus {
    constructor(options) {
        super()

        Object.assign(this, options) // {el, html, render, data, events, eventBus}
        
        this.container = $(this.el)
        this.render(this.data)
        this.autoBindEvents()
        this.on('model:updated', () => {
            this.render(this.data)
        })
    }

    autoBindEvents() {
        for (let key in this.events) {
            let [event, ...selector] = key.split(' ')
            this.container.on(event, selector.join(' '), this[this.events[key]])
        }
    }
}

export default View