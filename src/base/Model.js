class Model {
    constructor(options) {
        this.properties = ['data', 'create', 'delete', 'update', 'read']
        this.properties.forEach(key => {
            if (key in options) {
                this[key] = options[key]
            }
        })
    }

    create() {
        console && console.error && console.error('You have not realized this function!')
    }

    delete() {
        console && console.error && console.error('You have not realized this function!')
    }

    update() {
        console && console.error && console.error('You have not realized this function!')
    }
    
    read() {
        console && console.error && console.error('You have not realized this function!')
    }
}

export default Model