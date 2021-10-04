Here a *small* framework has been created that gives a life cycle for components.

```
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
```

![](https://github.com/IgolJack/Calendar/blob/0cc76166c8275269f957d402c02f7040167ecf68/Screenshot%202021-10-04%20at%2011-50-51%20Document.png)
