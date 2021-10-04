export function renderEvent(event, prevOrNext, context) {
  for (const key in event) {
    if (event.hasOwnProperty(key)) {
      let id = event[key].fullDate
      if (prevOrNext === 'prev') {
        id = 'prev-' + event[key].date;
      } else if (prevOrNext === 'next') {
        id = 'next-' + event[key].date;
      }

      const $date = document.getElementById(id);
      const datasetOfDate = $date.dataset.dayweek;
      const $nodeToAppendEvent = document.getElementById(id).children[0].children[0];

      const $eventWrapper = document.createElement('div');
      $eventWrapper.classList.add('eventWrapper');

      const $event = document.createElement('div');
      $event.classList.add('event');
      $event.innerHTML = event[key].name;
      $event.dataset.daynum = datasetOfDate;

      $eventWrapper.appendChild($event);
      $nodeToAppendEvent.appendChild($eventWrapper);
      context.eventsCheck.push(event[key].fullDate + event[key].name)
    }
  }
}

export function renderEvents(data, context) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = isInEventArray(data, context, key)
      if (!element) {
        renderEvent(data[key], null, context)
      }
    }
  }
  return true
}

export function getWidthOfEvents() {
  const width = document.documentElement.clientWidth;
  let a = 0;
  switch (true) {
    case width <= 450:
      a = 50;
      break;
    case (width <= 500 && width > 450):
      a = 60;
      break;
    case (width <= 600 && width > 500):
      a = 65;
      break;
    case (width <= 992 && width > 600):
      a = 80;
      break;
    case (width <= 1200 && width > 992):
      a = 100;
      break;
    case (width <= 5000 && width > 1200):
      a = 110;
      break;
  }
  return a;
}

function isInEventArray(data, context, key) {
  let inArr = false;
  for (const obj in data[key]) {
    if (data[key].hasOwnProperty(obj)) {
      inArr = context.eventsCheck.includes(data[key][obj].fullDate + data[key][obj].name);
    }
  }
  return inArr
}
