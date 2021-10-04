export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }
  initDomListeners() {
    this.listeners.forEach(listener => {
      const method = 'on' + capitalize(listener)
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name}.`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }
  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = 'on' + capitalize(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function capitalize(str) {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}
