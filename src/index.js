import {Calendar} from './components/calendar/Calendar';
import {HeaderComponent} from './components/header/headerComponent';
import {TableComponent} from './components/table/tableComponent';
import {FooterComponent} from './components/footer/footerComponent';
import {firebaseInit} from './core/Firebase';
import './scss/index.scss'

const calendar = new Calendar('#app', {
  components: [
    HeaderComponent,
    TableComponent,
    FooterComponent,
  ],
})

firebaseInit();
calendar.render()


