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
      <div className="wrapper px-10 mb-4">
        <div className="flex items-center justify-end gap-5 mb-4">
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
        <div className="flex justify-between items-center">
          <h1 className="uppercase text-3xl font-bold">{header.logo}</h1>
          <nav>
            <ul className="flex gap-5 font-semibold items-center">
              {header.nav.map((item) => (
                <li key={item.id} className="hover:text-slate-700 hover:underline">
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-5 items-center">
            {header.addtionalDetails.map((item) => (
              <div key={item.id}>
                <item.icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
