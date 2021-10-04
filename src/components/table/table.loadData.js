import {getDatabase, ref, onValue} from 'firebase/database'
import {renderEvent, renderEvents} from './table.renderEvents'

export function loadEventsByMonth(date, context) {
  const numberOfMonth = context.currentDate.getMonth() + 1
  if (!context.events[numberOfMonth]) {
    const db = getDatabase();
    const start = ref(db, 'events/' + date.getFullYear() + '/'+ (numberOfMonth));
    onValue(start, (snapshot) => {
      const data = snapshot.val();
      context.events[numberOfMonth] = data;
      renderEvents(data, context);
    })
  } else {
    console.log('Events loaded from cash');
    renderEvents(context.events[numberOfMonth], context);
  }
}

export function loadAndRender(context, otherEvents) {
  const date = context.currentDate;
  loadEventsByMonth(context.currentDate, context)

  const prev = context.currentDate.getMonth();
  const next = context.currentDate.getMonth() + 2;

  const arr = Array.from(otherEvents);

  arr.forEach(node => {
    const db = getDatabase();
    const type = node.id.split('-');
    if (type[0] === 'prev') {
      const start = ref(db, 'events/' + date.getFullYear() + '/'+ (prev) + '/' + (type[1]));
      onValue(start, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
          renderEvent(data, 'prev')
        }
      })
    }

    if (type[0] === 'next') {
      const start = ref(db, 'events/' + date.getFullYear() + '/'+ (next) + '/' + (type[1]));
      onValue(start, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
          renderEvent(data, 'next')
        }
      })
    }
  })
}

