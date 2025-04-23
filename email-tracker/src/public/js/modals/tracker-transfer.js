const transferTrackerBtn = document.getElementById('transfer-tracker-btn')
const trackerTransferModal = document.getElementById('tracker-transfer-modal')
const exportTrackersBtn = document.getElementById('export-trackers')
const importTrackersBtn = document.getElementById('import-trackers')

exportTrackersBtn.addEventListener('click', function () {
  const userId = document.cookie
    .split('; ')
    .find((row) => row.startsWith('userId='))
    .split('=')[1]
  navigator.clipboard
    .writeText(userId)
    .then(() => {
      alert('Your user ID has been copied to your clipboard.')
    })
    .catch((err) => {
      console.error('Could not copy text: ', err)
      alert('Failed to copy user ID.')
    })
})

importTrackersBtn.addEventListener('click', function () {
  const userId = document.getElementById('user-id').value

  // Show an alert advertising that the user data will be overwritten
  const confirmImport = confirm(
    'This will overwrite your current user data. Are you sure you want to continue?'
  )

  if (!confirmImport) {
    return
  }

  document.cookie = `userId=${userId}; path=/;`

  window.location.reload()
})

// When the user clicks the button, open the modal
transferTrackerBtn.onclick = function () {
  trackerTransferModal.showModal()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == trackerTransferModal) {
    trackerTransferModal.close()
  }
}
