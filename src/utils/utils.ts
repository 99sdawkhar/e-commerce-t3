export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email.trim()).toLowerCase());
};

export const validateName = (name: string) => {
  const re = /^[a-zA-Z\s]{2,30}$/;
  return re.test(name.trim());
};

export const validatePassword = (pass: string) => {
  const re = /^[^<>]{8,16}$/;
  return re.test(pass.trim());
};

export const generateVerificationCode = () => {
  return Number(Math.floor(10000000 + Math.random() * 90000000).toString().substring(0, 8));
};

// Function to mask email
export const maskEmail = (email: string) => {
  const [prefix = '', suffix = ''] = email.split('@');
  const total = prefix.length > 3 ? prefix.length - 3 : 0
  const maskedPrefix = prefix?.slice(0, 3) + '*'.repeat(total)
  return maskedPrefix + '@' + suffix;
};