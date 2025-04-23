//export button copies the userId cookie to the clipboard
document
  .getElementById('export-trackers')
  .addEventListener('click', function () {
    const userId = document.cookie
      .split('; ')
      .find((row) => row.startsWith('userId='))
      .split('=')[1]
    navigator.clipboard
      .writeText(userId)
      .then(() => {
        console.log('User ID copied to clipboard')
      })
      .catch((err) => {
        console.error('Could not copy text: ', err)
      })
  })
//import button sets the userId cookie to the value in the input field
document
  .getElementById('inport-trackers')
  .addEventListener('click', function () {
    const userId = document.querySelector('input[type="text"]').value
    document.cookie = `userId=${userId}; path=/;`
    console.log('User ID set to cookie')
  })

// Get the button that opens the modal
const transferTrackerBtn = document.getElementById('transfer-tracker-btn')
const trackerTransferModal = document.getElementById('tracker-transfer-modal')

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
