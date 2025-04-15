const copyBtns = document.getElementsByClassName('copy-btn')

copyBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const imageId = btn.getAttribute('data-id')

    const imageUrl = `${window.location.origin}/tracking/image/${imageId}`

    const html = `<img src="${imageUrl}" />`

    const blob = new Blob([html], { type: 'text/html' })

    const clipboardItem = new ClipboardItem({ 'text/html': blob })

    try {
      await navigator.clipboard.write([clipboardItem])
      console.log('Image HTML copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy HTML:', error)
    }
  })
})
