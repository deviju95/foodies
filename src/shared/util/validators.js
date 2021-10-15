const REQUIRE = "REQUIRE";
const MINLENGTH = "MINLENGTH";
const MAXLENGTH = "MAXLENGTH";
const MIN = "MIN";
const MAX = "MAX";
const EMAIL = "EMAIL";
const FILE = "FILE";

// type export

export const VALIDATOR_REQUIRE = () => ({
  type: REQUIRE,
});
export const VALIDATOR_MINLENGTH = (val) => ({
  type: MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({
  type: MIN,
  val: val,
});
export const VALIDATOR_MAX = (val) => ({
  type: MAX,
  val: val,
});
export const VALIDATOR_EMAIL = () => ({
  type: EMAIL,
});
export const VALIDATOR_FILE = () => ({
  type: FILE,
});

// validate function

export const validate = (input, validators) => {
  let isValid = true;

  for (const validator of validators) {
    if (validator.type === REQUIRE) {
      isValid = isValid && input.trim().length > 0;
    }
    if (validator.type === MINLENGTH) {
      isValid = isValid && input.trim().length >= validator.val;
    }
    if (validator.type === MAXLENGTH) {
      isValid = isValid && input.trim().length <= validator.val;
    }
    if (validator.type === MIN) {
      isValid = isValid && +input >= validator.val;
    }
    if (validator.type === MAX) {
      isValid = isValid && +input <= validator.val;
    }
    if (validator.type === EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(input);
    }
  }
  return isValid;
};
