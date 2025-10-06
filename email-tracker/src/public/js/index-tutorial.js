const driver = window.driver.js.driver

const defatultPopoverOptions = {
  position: 'bottom',
  align: 'center'
}

const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: '#new-tracker',
      popover: {
        ...defatultPopoverOptions,
        title: 'New Tracker',
        description: 'Click here to create a new email tracker.'
      }
    },
    {
      element: '#new-tracker-btn',
      popover: {
        ...defatultPopoverOptions,
        title: 'New Tracker',
        description: 'Click here to create a new email tracker.'
      }
    }
  ]
})

driverObj.drive()
