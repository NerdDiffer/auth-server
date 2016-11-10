module.exports.isNameValid = name => {
  const len = name.length;

  if (len < 4 || len > 32) {
    return false;
  }

  for (let i = 0; i < len; i += 1) {
    const ch = name[i];
    if (/\W/.test(ch)) { return false; }
  }

  return true;
};

module.exports.isPasswordValid = password => {
  // check length
  const len = password.length;

  if (len < 6 || len > 14) {
    return false;
  }

  // check for presence of: 1 upper-case letter, 1 lower-case letter, 1 number
  let lowerCaseLetterIsPresent = false;
  let upperCaseLetterIsPresent = false;
  let numberIsPresent = false;

  for (let i = 0; i < len; i += 1) {
    const ch = password[i];

    if (!lowerCaseLetterIsPresent && /[a-z]/.test(ch)) {
      lowerCaseLetterIsPresent = true;
    } else if (!upperCaseLetterIsPresent && /[A-Z]/.test(ch)) {
      upperCaseLetterIsPresent = true;
    } else if (!numberIsPresent && /[0-9]/.test(ch)){
      numberIsPresent = true;
    }
  }

  return lowerCaseLetterIsPresent && upperCaseLetterIsPresent && numberIsPresent;
};
