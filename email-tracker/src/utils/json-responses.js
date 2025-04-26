const getErrorMessage = (message) => {
  return {
    status: 'error',
    message: message || 'An error occurred'
  }
}

const getSuccessMessage = (message) => {
  return {
    status: 'success',
    message: message || 'Operation completed successfully'
  }
}

const getSuccessData = (data) => {
  return {
    status: 'success',
    data: data || null
  }
}

module.exports = {
  getErrorMessage,
  getSuccessMessage,
  getSuccessData
}
