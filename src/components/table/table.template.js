import {getDayOfWeek} from './table.dataGetter'

export function getTemplateCalendar([data, startDate]) {
  const month = [];
  const table = [];

  const names = getNamesOfDays();
  const buttonsAndInput = getNameOfMothAndButtons(startDate);
  const input = getInput();
  for (let i = 1; i <= 6; i++) {
    table.push(getWeek(i, data, startDate));
  }

  month.push(`<tbody class="innerTable"> ${table.join('')} </tbody>`)
  return `<table class="table">${buttonsAndInput} <td id="tableInput">${input}</td> ${names}  ${month.join('')}</table>`
}

function getNamesOfDays() {
  return [`<tr class="namesOfDays">
  <td>ПН</td>
  <td>Вт</td>
  <td>Ср</td>
  <td>Чт</td>
  <td>Пт</td>
  <td>Сб</td>
  <td>Вс</td>
  </tr>`].join('');
}

function getInput() {
  const $tr = [];
  $tr.push(`<input id="tableInputContent" style="float: right" type="date"></input>`);
  return $tr.join('');
}

function getNameOfMothAndButtons(startDate) {
  const $tr = [];
  const month = startDate[0];
  $tr.push(`<tr class="name_of_month_and_buttons"> <td id="prev"><</td> <td id="name_of_month">${month}</td> <td id="next">></td></tr>`);
  return $tr.join();
}

function getWeek(numberOfWeek, days) {
  const week = [];
  for (let i = (numberOfWeek * 7) - 7; i < numberOfWeek * 7; i++) {
    week.push(getDayCell(days[i]));
  }
  const obj = [`<tr class="week">${week.join(' ')}</tr>`];
  return obj.join('');
}

function getDayCell(date) {
  const nameOfDay = getDayOfWeek(date.date.getDay());
  const freeDay = (nameOfDay === 6 || nameOfDay === 5) ? 'freeDay' : '';

  const obj = []
  let dataKey;
  let className;

  if (date['key'] !== 'currentMonth') {
    if (Number(formatDate(date.date)) < 15) {
      dataKey = 'next';
      className = `day otherDays ${freeDay}`;
    } else {
      dataKey = 'prev';
      className = `day otherDays ${freeDay}`
    }
  } else {
    dataKey = 'current';
    className = `day currentDays ${freeDay}`;
  }

  obj.push(`<td 
                id="${date.date.toLocaleDateString('en-US')}" 
                data-key=${dataKey} 
                data-dayweek="${nameOfDay}" 
                class="${className}"> 
                    ${formatDate(date.date)} 
                    ${getConteinerForEvents().join(' ')}
            </td>`);
  return obj.join(' ')
}

function getConteinerForEvents() {
  const $div = [];
  $div.push(`
  <div class="events-inner-content"> 
    <div class="events-list"> 
    </div>
  </div>`);
  return $div;
}

function formatDate(date) {
  return date.getDate();
}
