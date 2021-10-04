import {getDataCalendar} from './table.dataGetter';
import {getTemplateCalendar} from './table.template';

export function initializationTable() {
  const data = getDataCalendar(new Date())
  return getTemplateCalendar(data)
}

export function loadMonth(event, context) {
  if (event.target.id === 'next') context.currentDate = getMonth(context.currentDate)
  if (event.target.id === 'prev') context.currentDate = getMonth(context.currentDate, false)
  if (context.cashe[context.currentDate]) {
    console.log(`Data loaded from cashe.`);
    pushDataToTable(context.cashe[context.currentDate], context)
  } else {
    const data = getDataCalendar(new Date(context.currentDate))
    context.cashe[context.currentDate] = getTemplateCalendar(data)
    pushDataToTable(context.cashe[context.currentDate], context)
  }
}

function pushDataToTable(caseVersio, context) {
  context.$table.html(caseVersio)
}

function getMonth(currentDate, next = true) {
  const year = currentDate.getFullYear()
  const month = next === true
        ? currentDate.getMonth() + 1
        : currentDate.getMonth() - 1
  return new Date(year, month)
}

