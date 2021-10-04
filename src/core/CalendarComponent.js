import {DomListener} from './DomListener';

export class CalendarComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.prepare()
    this.asyncPrepare()
  }
  prepare() {

  }

  async asyncPrepare() {

  }

  toHtml() {
  }

  init() {
    this.initDomListeners()
  }

  destroy() {

  }
}
