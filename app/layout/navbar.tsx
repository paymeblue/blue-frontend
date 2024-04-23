"use client";
import { Close, Menu } from "@components/assets/icons";
import useNavBg from "@hooks/useNavBg";
import Portal from "@shared/portal";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "public/logo.png";
import { useState } from "react";

const navLinks = [
  { label: "Personal", href: "personal" },
  { label: "Business", href: "business" },
  { label: "About", href: "about" },
  { label: "Contact us", href: "contact-us" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const backgroundTransparent = useNavBg();
  const pathname = usePathname();
  const openMenu = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <header
      className={`flex gap-8 w-full fixed items-center justify-between lg:justify-start text-white py-4 px-6 tablet:px-20 z-50 laptop:px-6 laptop-md:px-20 top-0 ${backgroundTransparent <= 0 ? "bg-inherit" : "bg-primary-grad-nav"}`}
    >
      <Link href="/">
        <Image
          width={110}
          height={44.8}
          src={logo}
          alt="blue logo"
          className="w-auto object-contain"
        />
      </Link>
      <span onClick={openMenu} className="cursor-pointer lg:hidden">
        <Menu />
      </span>
      {open && (
        <Portal onClose={onClose}>
          <div
            className="absolute right-0 top-0 h-full w-3/5 gap-4 bg-[#FFFCFA] p-4 pt-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[90%] mt-4">
              <ul
                className={`flex flex-col gap-4 px-0 py-[0.625rem] laptop:hidden`}
              >
                {navLinks.map((item) => (
                  <li key={item.href} className="text-[#32374E]">
                    <Link
                      className={`text-[0.9375rem] leading-normal text-inherit`}
                      href={`/${item.href}`}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div onClick={onClose} className="absolute right-4 top-4 h-max">
              <Close />
            </div>
          </div>
        </Portal>
      )}
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-8 justify-center m-0">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${pathname === `/${item.href}` ? "font-bold" : "font-normal"}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
