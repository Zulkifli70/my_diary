export const formatLongDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))

export const formatShortDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${date}T12:00:00`))

export const formatMonthYear = (date: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`))

const toLocalIsoDate = (date: Date) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const shiftMonth = (date: string, amount: number) => {
  const currentDate = new Date(`${date}T12:00:00`)
  const shiftedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + amount,
    1,
  )

  return toLocalIsoDate(shiftedDate)
}

export const getCalendarDays = (selectedDate: string) => {
  const visibleMonth = new Date(`${selectedDate}T12:00:00`)
  const year = visibleMonth.getFullYear()
  const month = visibleMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const leadingDays = firstDay.getDay()

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(year, month, index - leadingDays + 1)

    return {
      date,
      isoDate: toLocalIsoDate(date),
      isCurrentMonth: date.getMonth() === month,
    }
  })
}
