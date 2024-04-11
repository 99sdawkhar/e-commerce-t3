import { parseCookies } from "nookies";

const useAuthenticated = () => {
  const { token } = parseCookies();

  return token;
};

export default useAuthenticated;
