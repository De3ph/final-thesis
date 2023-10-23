// using Object.freeze protects the object from unwanted changes, nested objects protecting too

const CONSTANTS = Object.freeze({
  usernameKey: "errorpad.username",
  passwordKey: "errorpad.password",
  commands: {
    updateUsername: "errorpad.updateUsername",
    updatePassword: "errorpad.updatePassword"
  }
})

export { CONSTANTS }
