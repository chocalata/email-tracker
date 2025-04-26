const { USER_ID, USER_THEME, THEMES } = require('../config/cookie')

const siteIdentification = (req, res, next) => {
  const userId = req.signedCookies.userId
  let userTheme = req.cookies.userTheme

  if (!userId) {
    const newUserId = crypto.randomUUID()
    res.cookie(USER_ID.name, newUserId, USER_ID.options)
  } else {
    res.cookie(USER_ID.name, userId, USER_ID.options)
  }

  if (!userTheme) {
    res.cookie(USER_THEME.name, THEMES.dark, USER_THEME.options)
    userTheme = THEMES.dark
  }

  res.locals.userTheme = userTheme

  next()
}

module.exports = { siteIdentification }
