import { useRouter } from "next/router";
import { useEffect } from "react";
import { ERoutes } from "@/utils/enum";
import useAuthenticated from "@/hooks/useAuthenticated";

export const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const router = useRouter();
    const token = useAuthenticated();

    useEffect(() => {
      const routeUpdates = () => {
        switch (router.route) {
          case ERoutes.login:
            return token && router.push(ERoutes.home);
          case ERoutes.signUp:
            return token && router.push(ERoutes.home);
          case ERoutes.home:
            return !token && router.push(ERoutes.login);
        }
      };
      routeUpdates();
    }, [token]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};
