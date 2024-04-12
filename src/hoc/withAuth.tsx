import { useRouter } from "next/router";
import { useEffect } from "react";
import { ERoutes } from "@/utils/enum";
import useAuthenticated from "@/hooks/useAuthenticated";

export const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const router = useRouter();
    const { isAuthenticated } = useAuthenticated();

    useEffect(() => {
      const routeUpdates = () => {
        switch (router.route) {
          case ERoutes.login:
            return isAuthenticated && router.push(ERoutes.home);
          case ERoutes.signUp:
            return isAuthenticated && router.push(ERoutes.home);
          case ERoutes.generate:
          case ERoutes.home:
          case ERoutes.verifyAccount:
            return !isAuthenticated && router.push(ERoutes.login);
        }
      };
      routeUpdates();
    }, [isAuthenticated]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};
