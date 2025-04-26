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
  }).then((response) => {
    if (!response.ok) {
      response.json().then((jsonResponse) => {
        alert(jsonResponse.message)
      })
    }
  })
}
