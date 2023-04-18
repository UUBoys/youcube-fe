import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Link from "next/link";
import React from "react";

import { useUserSessionContext } from "@/modules/contexts/userContext";
import { useSearchStore } from "@/modules/stores/search-store";

type auth = "logged" | "notLogged" | "both";

interface Tab {
  name: string;
  icon: JSX.Element;
  href: string;
  auth: auth;
}

const tabs: Tab[] = [
  {
    name: "Login",
    icon: <LoginIcon />,
    href: "/auth/signin",
    auth: "notLogged",
  },
  {
    name: "Register",
    icon: <HowToRegIcon />,
    href: "/auth/signup",
    auth: "notLogged",
  },
  {
    name: "Home",
    icon: <HomeIcon />,
    href: "/",
    auth: "both",
  },
  {
    name: "Profile",
    icon: <AccountCircleIcon />,
    href: "/profile",
    auth: "logged",
  },
  {
    name: "Upload",
    icon: <CloudUploadIcon />,
    href: "/video/create",
    auth: "logged",
  },
  {
    name: "Playlists",
    icon: <SubscriptionsIcon />,
    href: "/playlists",
    auth: "both",
  },

  {
    name: "Logout",
    icon: <LogoutIcon />,
    href: "/auth/signin",
    auth: "logged",
  },
];

const SidePanel: React.FC = () => {
  const { setSearch } = useSearchStore((state) => ({
    setSearch: state.setSearch,
  }));
  const user = useUserSessionContext();

  const isUserAuthenticated = user && user.user;

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 mt-16 hidden h-screen w-64 md:block"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {tabs
            .filter(
              (tab) =>
                tab.auth === "both" ||
                (tab.auth === "logged" && isUserAuthenticated) ||
                (tab.auth === "notLogged" && !isUserAuthenticated)
            )
            .map((tab) => (
              <li key={tab.name}>
                <Link
                  onClick={() => setSearch("")}
                  href={tab.href}
                  className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <div className="text-red-500">{tab.icon}</div>
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    {tab.name}{" "}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default SidePanel;
