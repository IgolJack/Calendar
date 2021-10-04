import {CalendarComponent} from '../../core/CalendarComponent';

export class FooterComponent extends CalendarComponent {
  static className = 'calendar__footer'
  constructor($root) {
    super($root, {
      name: 'FooterCalendarComponent',
      listeners: ['click'],
    });
  }
  toHtml() {
    return `<h1>Footer</h1>`
  }
  init() {
    super.init();
  }
  onClick() {}
}
