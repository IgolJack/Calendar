import {CalendarComponent} from '../../core/CalendarComponent';

export class HeaderComponent extends CalendarComponent {
  static className = 'calendar__header'
  constructor($root) {
    super($root, {
      name: 'HeaderCalendarComponent',
      listeners: ['click'],
    });
  }
  toHtml() {
    return `<h1>Header</h1>
    
`
  }
  init() {
    super.init();
  }

  onClick(event) {
    console.log(event.target);
  }
}
