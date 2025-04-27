const newTrackerForm = document.getElementById('new-tracker')

const newTrackerBtn = document.getElementById('new-tracker-btn')

const toggleTrackingBtns = document.querySelectorAll('.toggle-tracking')

const deleteTrackerBtns = document.querySelectorAll('.delete-btn')
const copyBtns = document.querySelectorAll('.copy-btn')

toggleTrackingBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const trackingId = btn.getAttribute('data-id')
    const isTracking = btn.getAttribute('data-is-tracking') === 'true'

    const action = isTracking ? 'stop' : 'start'

    fetch(`/user-actions/tracker/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ trackingId })
    }).then((response) => {
      if (response.ok) {
        const article = document.querySelector(
          `article[data-id="${trackingId}"]`
        )

        btn.setAttribute('data-is-tracking', !isTracking)
        //change class to stop-btn or start-btn to the opposite
        btn.classList.toggle('start-btn')
        btn.classList.toggle('stop-btn')

        btn.textContent = isTracking ? 'Start tracking' : 'Stop tracking'

        article.classList.toggle('tracker-status-on')
        article.classList.toggle('tracker-status-off')
      } else {
        response.json().then((jsonResponse) => {
          alert(jsonResponse.message)
        })
      }
    })
  })
})

/* //Change this to using a form
newTrackerBtn.addEventListener('click', async () => {
  // post fetch to /user-actions/tracker/create
  fetch('/user-actions/tracker/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (response) => {
    //reload page on success
    if (response.ok) {
      window.location.reload()
    } else {
      response.json().then((jsonResponse) => {
        alert(jsonResponse.message)
      })
    }
  })
})
*/

newTrackerForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const formData = new FormData(newTrackerForm)
  const trackerName = formData.get('tracker-name')

  fetch('/user-actions/tracker/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ trackerName })
  }).then(async (response) => {
    //reload page on success
    if (response.ok) {
      window.location.reload()
    } else {
      response.json().then((jsonResponse) => {
        alert(jsonResponse.message)
      })
    }
  })
})

deleteTrackerBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const trackingId = btn.getAttribute('data-id')

    fetch('/user-actions/tracker/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ trackingId })
    }).then(async (response) => {
      if (response.ok) {
        const article = document.querySelector(
          `article[data-id="${trackingId}"]`
        )
        article.remove()
      } else {
        response.json().then((jsonResponse) => {
          alert(jsonResponse.message)
        })
      }
    })
  })
})

copyBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const imageId = btn.getAttribute('data-id')

    const imageUrl = `${window.location.origin}/tracking/image/${imageId}`

    const html = `<img src="${imageUrl}" />`

    const blob = new Blob([html], { type: 'text/html' })

    const clipboardItem = new ClipboardItem({ 'text/html': blob })

    try {
      if (isMobileUser()) {
        alert(
          'ClipboardItem is not supported on mobile devices. Copying HTML may not work.'
        )
      } else {
        // Desktop devices can use ClipboardItem
        await navigator.clipboard.write([clipboardItem])
      }
      alert('Image HTML copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy HTML:', error)
    }
  })
})

function isMobileUser() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}
