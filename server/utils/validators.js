module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === ""){
    errors.username = "Username must not be blank."
  }
  if (email.trim() === ""){
    errors.email = "Email must not be blank."
  } else {
    const regEx = /.+@.+\..+/;
    if(!email.match(regEx)){
      errors.email = "Input must be a valid email address.";
    }
  }
  if (password === "") {
    errors.password = "Password must not be blank."
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match."
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === ""){
    errors.username = "Username must not be blank."
  }
  if (password.trim() === ""){
    errors.password = "Password must not be blank."
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}