import {CalendarComponent} from '../../core/CalendarComponent';
import {loadMonth, initializationTable} from './table.monthLoad';
import {getDatabase, ref, set, /* remove */} from 'firebase/database';
import {loadAndRender} from './table.loadData'

function writeUserData(node, context, endDate = null) {
  const db = getDatabase();
  const name = node.id.trim() + new Date().toTimeString().split('GMT')[0];
  const date = new Date(node.id);

  set(ref(db, 'events/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + new Date().getTime()), {
    name: name,
    fullDate: node.id,
  });
}

export class TableComponent extends CalendarComponent {
  static className = 'calendar__table'
  constructor($root) {
    super($root, {
      name: 'TableCalendarComponent',
      listeners: ['click'],
    });
    this.currentDate
    this.cashe = {}
    this.events = []
    this.eventsCheck = []
  }

  toHtml() {
    return initializationTable();
  }

  init() {
    super.init();
    this.currentDate = new Date();

    this.$table = this.$root.find('.table');
    this.$tableInput = this.$root.find('#tableInputContent');
    this.$tableInput.$el.defaultValue = `${this.currentDate.getFullYear()}-0${this.currentDate.getMonth() + 1}-01`;
    this.$tableInput.on('blur', this.focusInput.bind(this));

    loadAndRender(this, document.getElementsByClassName('otherDays'))
  }

  onClick(event) {
    if (event.target.id === 'next' || event.target.id === 'prev') {
      loadMonth(event, this);
      loadAndRender(this, document.getElementsByClassName('otherDays'))
      console.log(this.currentDate);
      this.$tableInput.$el.value = `${this.currentDate.getFullYear()}-0${this.currentDate.getMonth() + 1}-01`;
    } else if (event.target.classList.contains('day')) {
      console.log(event.target);
      writeUserData(event.target, this)
    }
  }

  focusInput(event) {
    this.currentDate = event.target.value;
    loadMonth(event, this);
  }
}
