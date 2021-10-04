export function getDataCalendar(dataStart) {
  if (dataStart.getDate() != 1) {
    const month = dataStart.getMonth()
    const year = dataStart.getFullYear()
    dataStart = new Date(year, month)
  }
  const nameOfMonth = getMonthName(dataStart)
  const prevMonthDays = prevMonth(dataStart)
  const currentMonthDays = currentMonth(prevMonthDays, dataStart)
  const nextMonthDays = nextMonth([...prevMonthDays, ...currentMonthDays])

  const days = [
    ...prevMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ]
  return [days, nameOfMonth]
}

export function getDayOfWeek(day) {
  switch (day) {
    case 0:
      return 6
      break
    case 1:
      return 0
      break
    case 2:
      return 1
      break
    case 3:
      return 2
      break
    case 4:
      return 3
      break
    case 5:
      return 4
      break
    case 6:
      return 5
      break
  }
}

function prevMonth(startDate) {
  const prevDays = []
  let day = getDayOfWeek(startDate.getDay())
  if (day >= 0) {
    day = day === 0 ? day + 7 : day
    for (let i = 6 - day; i < 6; i++) {
      const date = new Date(startDate.setDate(startDate.getDate() - 1))
      prevDays.push({
        date,
        key: 'prevMonth'
      })
    }
  }
  return prevDays.reverse()
}

function currentMonth(data, start) {
  const days = []
  const prevDate = data[data.length - 1]?.date
    ? new Date(data[data.length - 1].date)
    : getPrevDay(start)
  const currentDay = new Date(prevDate.setDate(prevDate.getDate() + 1))
  const endDay = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0)
  for (let i = currentDay.getDate(); i <= endDay.getDate(); i++) {
    const date = new Date(currentDay.getFullYear(), currentDay.getMonth(), i)
    days.push({
      date,
      key: 'currentMonth'
    })
  }
  return [...days]
}

function nextMonth(data) {
  const days = []
  const prevDate = new Date(data[data.length - 1].date)
  const countDays = 42 - data.length
  if (data.length < 42) {
    for (let i = 1; i <= countDays; i++) {
      const date = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, i)
      days.push({
        date,
        key: 'nextMonth'
      })
    }
  }
  return [...days]
}

function getMonthName(date) {
  const options = {
    month: 'long',
  };
  let month = date.toLocaleString('ru', options)
  month = month[0].toUpperCase() + month.slice(1)
  return [month, date.getMonth()]
}

function getPrevDay(data) {
  const year = data.getFullYear()
  const monsth = data.getMonth()
  return new Date(year, monsth, 0)
}
