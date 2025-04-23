const checkbox = document.getElementById('checkbox')
const root = document.documentElement
checkbox.addEventListener('change', toggleTheme)

function toggleTheme() {
  const darkMode = root.classList.toggle('dark')
  const theme = darkMode ? 'dark' : 'light'
  // sending on body dark or light
  fetch('/user-actions/change-theme', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ theme })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      console.log('Theme changed successfully:', data)
    })
    .catch((error) => {
      console.error('Error changing theme:', error)
    })
}
