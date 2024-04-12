import useAuthenticated from "@/hooks/useAuthenticated";
import { api } from "@/utils/api";
import { header } from "@/utils/constants";
import { ERoutes } from "@/utils/enum";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import React from "react";

const Header = () => {
  const router = useRouter();
  
  const { isAuthenticated, user, } = useAuthenticated();

  const handleLogout = () => {
    destroyCookie(null, "token");
    router.push(ERoutes.login);
  };

  return (
    <header>
      <div className="mb-4 px-10">
        <div className="mb-4 flex items-center justify-end gap-5 pt-2">
          <div className="flex gap-5">
          {isAuthenticated ? (
              <div className="flex gap-5">
                <button
                  onClick={handleLogout}
                  className="text-black hover:text-slate-700 hover:underline"
                  >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href={ERoutes.login}
                className="text-black hover:text-slate-700 hover:underline"
              >
                Login
              </Link>
            )}
          </div>
          <ul className="flex gap-5">
            {header.support.map((item) => (
              <li
                key={item.id}
                className="text-black hover:text-slate-700 hover:underline"
              >
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-5">
          {isAuthenticated && <span>Hi, {user?.name}</span>}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold uppercase mb-2">
            <Link href={ERoutes.home}>{header.logo}</Link>
          </h1>
          <nav className="mb-2">
            <ul className="flex items-center gap-5 font-semibold flex-wrap">
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
          <ul className="flex items-center gap-5">
            {header.addtionalDetails.map((item) => (
              <li key={item.id}>
                <item.icon className="h-5 w-5" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
