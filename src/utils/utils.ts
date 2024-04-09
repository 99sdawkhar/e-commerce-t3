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