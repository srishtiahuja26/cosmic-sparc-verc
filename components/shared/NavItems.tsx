"use client";

import { headerLinks } from "@/constants";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const isAdmin = user?.firstName === "Vinod" || user?.firstName === "vinod";

  return (
    <ul className="md:flex-between flex w-full flex-col item-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathName == link.route;
        if (isAdmin) {
          return (
            <li
              key={link.route}
              className={`${isActive && "text-primary-500"} flex-center
                        p-medium-16 whitespace-nowrap`}
            >
              <Link href={link.route}>{link.label}</Link>
            </li>
          );
        } else {
          if (link.label == "Create Event") {
            return null;
          } else {
            return (
              <li
                key={link.route}
                className={`${isActive && "text-primary-500"} flex-center
							p-medium-16 whitespace-nowrap`}
              >
                <Link href={link.route}>{link.label}</Link>
              </li>
            );
          }
        }
      })}
    </ul>
  );
};

export default NavItems;
