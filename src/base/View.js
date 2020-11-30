import $ from 'jquery'

class View {
    constructor({el, html, render}) {
        this.container = $(el)
        this.html = html
        this.render = render
    }
}

export default View