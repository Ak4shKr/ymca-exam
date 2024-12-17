export const validateEmail = (email) => {
  const emailRegex = /^[a-z][a-zA-Z0-9._%+-]*@jcboseust\.ac\.in$/;
  return emailRegex.test(email);
};
