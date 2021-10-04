class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    });
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

const emitter = new Emitter

emitter.subscribe('Jack:done', data => console.log(data))
emitter.emit('Jack:done', 42, 41)
setTimeout(() => {
  emitter.emit('Jack:done', 'After 2 seconds')
}, 2000)

