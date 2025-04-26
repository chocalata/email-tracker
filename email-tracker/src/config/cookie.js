const NODE_ENV = process.env.NODE_ENV
const TRACKING_EXPIRATION_DAYS =
  parseInt(process.env.TRACKING_EXPIRATION_DAYS) + 1

const USER_ID = {
  name: 'userId',
  options: {
    signed: true,
    maxAge: 24 * 60 * 60 * 1000 * TRACKING_EXPIRATION_DAYS,
    secure: NODE_ENV === 'PROD'
  }
}

const THEMES = {
  light: 'light',
  dark: 'dark'
}

const USER_THEME = {
  name: 'userTheme',
  options: {
    signed: false,
    maxAge: 365 * 24 * 60 * 60 * 1000 // One year
  }
}

module.exports = { USER_ID, USER_THEME, THEMES }
