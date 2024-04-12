import { api } from "@/utils/api";
import { parseCookies } from "nookies";

const useAuthenticated = () => {
  const { token = '' } = parseCookies();

  const isAuthenticated = token ? true : false;

  const { data: user, isLoading } = api.user.getUserByToken.useQuery({}, {
    enabled: isAuthenticated
  });

  const isVerified = isAuthenticated && user && user.emailVerified !== null

  return {
    isAuthenticated,
    isVerified,
    isLoading,
    user,
  };
};

export default useAuthenticated;
