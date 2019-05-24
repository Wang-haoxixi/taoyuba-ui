const initPasswordForm = (username = null) => {
  return {
    username,
    password: '',
    newpassword1: '',
    newpassword2: '',
  }
}

export { initPasswordForm }