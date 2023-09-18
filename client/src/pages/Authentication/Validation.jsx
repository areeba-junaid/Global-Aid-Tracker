import { isPossiblePhoneNumber } from "react-phone-number-input";

// Validate organization name
export function validateName(name) {
  const nameRegex = /^[a-zA-Z\s]{2,30}$/;
  return nameRegex.test(name);
}

// Validate email
export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return emailRegex.test(email);
}

// Validate phone number using "impossible phone number" function
export function validatePhoneNumber(phoneNumber) {
  return isPossiblePhoneNumber(phoneNumber) === true;
}
