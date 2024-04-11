import useAuthenticated from "@/hooks/useAuthenticated";
import { header } from "@/utils/constants";
import { ERoutes } from "@/utils/enum";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import React from "react";

interface IHeader {
  user: {
    name: string;
  };
}

const Header = ({ user }: IHeader) => {
  const token = useAuthenticated();
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, "token");
    router.push(ERoutes.login);
  };

  return (
    <header>
      <div className="wrapper mb-4 px-10">
        <div className="mb-4 flex items-center justify-end gap-5">
          <ul className="flex gap-5">
            {header.support.map((item) => (
              <li key={item.id}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-5">
            {token && (
              <div>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
            {!token && <Link href={ERoutes.login}>Login</Link>}
            <div>Hi {user?.name}</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold uppercase">{header.logo}</h1>
          <nav>
            <ul className="flex items-center gap-5 font-semibold">
              {header.nav.map((item) => (
                <li
                  key={item.id}
                  className="hover:text-slate-700 hover:underline"
                >
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-5">
            {header.addtionalDetails.map((item) => (
              <div key={item.id}>
                <item.icon className="h-5 w-5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
