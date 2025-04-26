function formatDate(dateString) {
  if (!dateString) return

  const date = new Date(dateString)

  const pad = (n) => n.toString().padStart(2, '0')

  const dateDay = pad(date.getDate())
  const dateMonth = pad(date.getMonth() + 1)
  const dateYear = pad(date.getFullYear())
  const dateHours = pad(date.getHours())
  const dateMinutes = pad(date.getMinutes())

  const formattedTime = `${dateDay}/${dateMonth}/${dateYear} ${dateHours}:${dateMinutes}`

  return `${formattedTime} (UTC+0)`
}

module.exports = { formatDate }
