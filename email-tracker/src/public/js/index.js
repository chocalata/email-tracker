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
        console.error('Failed to toggle tracking')
      }
    })
  })
})

newTrackerBtn.addEventListener('click', async () => {
  // post fetch to /user-actions/tracker/create
  fetch('/user-actions/tracker/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    //reload page on success
    if (response.ok) {
      window.location.reload()
    } else {
      console.error('Failed to create new tracking')
    }
  })
})

deleteTrackerBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    console.log('Delete button clicked')
    const trackingId = btn.getAttribute('data-id')

    fetch('/user-actions/tracker/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ trackingId })
    }).then((response) => {
      if (response.ok) {
        const article = document.querySelector(
          `article[data-id="${trackingId}"]`
        )
        article.remove()
      } else {
        console.error('Failed to delete tracking')
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
      console.log('Image HTML copied to clipboard!')
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
