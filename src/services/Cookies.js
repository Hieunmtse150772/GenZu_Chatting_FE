import Cookies from 'js-cookie'

function setCookie(name, value, days) {
  Cookies.set(name, value, { expires: days, secure: true, sameSite: 'None', path: '/' })
}

function getCookie(name) {
  return Cookies.get(name)
}

function removeCookie(name) {
  Cookies.remove(name, { path: '/' })
}

function checkCookie() {
  if (getCookie('userLogin')) {
    return true
  } else {
    return false
  }
}

export { setCookie, getCookie, removeCookie, checkCookie }
