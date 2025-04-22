const checkbox = document.getElementById('checkbox')
const root = document.documentElement
checkbox.addEventListener('change', toggleTheme)

function toggleTheme() {
  root.classList.toggle('dark')
}

//Che the prefered theme of the user
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.classList.add('dark')
  checkbox.checked = true
}
