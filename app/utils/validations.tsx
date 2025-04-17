const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email)
}

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password)
}

const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = /^\d{9}$/;
  return phoneNumberRegex.test(phoneNumber)
}

export {
  validateEmail,
  validatePassword,
  validatePhoneNumber
};
