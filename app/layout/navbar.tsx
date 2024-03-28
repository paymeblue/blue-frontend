import { MenuOutlined } from "@ant-design/icons";
import useNavBg from "@hooks/useNavBg";
import { Button, Divider, Drawer, Layout, Menu, MenuProps } from "antd";
import { useSectionRef } from "app/context/section-scroll-context";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logoInvert from "public/blue-invert.png";
import logo from "public/logo.png";
import { useCallback, useEffect, useState } from "react";

const { Header } = Layout;

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const bgColor = useNavBg();
  const [open, setOpen] = useState(false);
  const [goto, setGoto] = useState<"personal" | "business" | undefined>();
  const { sectionRef, setValue } = useSectionRef();
  const scrollToSection = useCallback(
    (value: "personal" | "business") => {
      setValue(value);
      if (!sectionRef.current) {
        router.push("/");
      }
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [sectionRef, router, setValue]
  );
  useEffect(() => {
    if (goto && pathname === "/") {
      scrollToSection(goto);
    }
  }, [goto, pathname, scrollToSection]);

  const [current, setCurrent] = useState(
    pathname === "" || pathname === "/" ? "/home" : pathname
  );

  const showDrawer = () => setOpen(true);

  const onClose = () => setOpen(false);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    setOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "/#home",
      label: (
        <Link
          className={`text-sm text-body-text-2 ${pathname === "/" && !goto ? "border-[3px] rounded-lg px-4 py-3 border-[#EAEAFF] shadow-shadow" : pathname !== "/" ? "text-white" : ""}`}
          href="/"
          onClick={() => setGoto(undefined)}
        >
          Home
        </Link>
      ),
    },
    {
      key: "#/personal",
      label: (
        <small
          className={`text-sm text-body-text-2 ${pathname === "/" && goto === "personal" ? "border-[3px] rounded-lg px-4 py-3 border-[#EAEAFF] shadow-shadow" : pathname !== "/" ? "text-white" : ""}`}
          onClick={() => {
            scrollToSection("personal");
            setGoto("personal");
          }}
        >
          Personal
        </small>
      ),
    },
    {
      key: "/#business",
      label: (
        <small
          className={`text-sm text-body-text-2 ${pathname === "/" && goto === "business" ? "border-[3px] rounded-lg px-4 py-3 border-[#EAEAFF] shadow-shadow" : pathname !== "/" ? "text-white" : ""}`}
          onClick={() => {
            scrollToSection("business");
            setGoto("business");
          }}
        >
          Business
        </small>
      ),
    },
    // {
    //   key: "/contact-us",
    //   label: (
    //     <Link
    //       href="/contact-us"
    //       className={`text-sm text-body-text-2 ${pathname === "/contact-us" ? "border-[3px] rounded-lg px-4 py-3 text-white border-[#9694F3] shadow-light" : pathname !== "/" ? "text-white" : ""}`}
    //     >
    //       Contact us
    //     </Link>
    //   ),
    // },
  ];
  const items2: MenuProps["items"] = [
    {
      key: "/#home",
      label: (
        <Link
          className={`text-sm text-body-text-2 w-full hover:text-primary px-4 py-2 ${pathname === "/" && !goto ? "border-[2px] rounded-lg border-[#9694F3] shadow-light" : ""}`}
          href="/"
          onClick={() => setGoto(undefined)}
        >
          Home
        </Link>
      ),
    },
    {
      key: "/#personal",
      label: (
        <small
          className={`text-sm text-body-text-2 hover:text-primary w-full px-4 py-2 ${pathname === "/" && goto === "personal" ? "border-[2px] rounded-lg border-[#9694F3] shadow-light" : ""}`}
          onClick={() => {
            scrollToSection("personal");
            setGoto("personal");
          }}
        >
          Personal
        </small>
      ),
    },
    {
      key: "/#business",
      label: (
        <small
          className={`text-sm text-body-text-2 hover:text-primary w-full px-4 py-2 ${pathname === "/" && goto === "business" ? "border-[2px] rounded-lg border-[#9694F3] shadow-light" : ""}`}
          onClick={() => {
            scrollToSection("business");
            setGoto("business");
          }}
        >
          Business
        </small>
      ),
    },
    // {
    //   key: "/contact-us",
    //   label: (
    //     <Link
    //       href="/contact-us"
    //       className={`text-sm text-body-text-2 hover:text-primary w-full px-4 py-2 ${pathname === "/contact-us" ? "border-[2px] rounded-lg border-[#9694F3] shadow-shadow" : ""}`}
    //     >
    //       Contact us
    //     </Link>
    //   ),
    // },
  ];

  return (
    <Header
      className={`fixed left-0 top-0 z-30 m-auto flex h-aut w-full items-center justify-between ${pathname === "/" ? "bg-white" : "bg-primary"} px-4 transition-all ease-out tablet:px-20 ${bgColor > 0 ? "shadow-md" : "shadow-none"}`}
    >
      <div>
        <Link href="/">
          {pathname === "/" ? (
            <Image
              src={logo}
              alt="blue logo"
              className="w-[65%] laptop:w-auto"
              priority
              width={123}
            />
          ) : (
            <Image
              src={logoInvert}
              alt="blue logo"
              className="w-[65%] laptop:w-auto"
              priority
              width={123}
            />
          )}
        </Link>
      </div>

      <Menu
        items={items}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        disabledOverflow={true}
        triggerSubMenuAction="click"
        className="hidden border-b-0 font-medium laptop:flex laptop:items-center laptop:justify-between [&>.ant-menu-item-selected]:text-white [&>.ant-menu-item]:text-white [&>li::after]:border-b-0 [&>li]:rounded-md hover:[&>li]:text-input-field laptop:[&>li]:mx-2"
      />

      {/* <Button
        type="primary"
        size="large"
        className={`ml-4 border-transparent text-[0.875rem] leading-[1.25rem] shadow-none`}
      > */}
      <Link
        className={`font-medium border-transparent hidden tablet:block text-[0.875rem] px-4 border-[3px] py-3 rounded-lg  leading-[1.25rem] shadow-none text-inherit ${pathname === "/contact-us" ? " bg-white  text-primary hover:text-primary/80 border-[#9694F3] shadow-light" : pathname !== "/" ? "text-primary hover:text-primary/80 bg-white" : "text-white bg-primary hover:bg-primary/80"}`}
        href="/contact-us"
      >
        Contact us
      </Link>
      {/* </Button> */}
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        closable={false}
        width="65%"
      >
        <Menu
          items={items2}
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          triggerSubMenuAction="click"
          disabledOverflow={true}
          className="border-b-0 border-none font-medium laptop:hidden [&>li::after]:border-b-0 [&>li]:rounded-md [&>li]:w-full [&>li]:hover:bg-transparent [&>li]:px-0"
        />
        <Divider
          type="horizontal"
          className="my-4 border-slate-400 border-[0.5px]"
        />
        <Button
          type="primary"
          size="large"
          className={`ml-4 border-transparent text-[0.875rem] leading-[1.25rem] shadow-none`}
        >
          <Link
            className="font-medium border-transparent text-[0.875rem] leading-[1.25rem] shadow-none text-inherit"
            href="/contact-us"
          >
            Contact us
          </Link>
        </Button>
      </Drawer>
      <div className="block laptop:hidden">
        <MenuOutlined
          onClick={showDrawer}
          style={{ fontSize: "18px" }}
          className={`${pathname !== "/" ? "text-white" : "text-primary"}`}
        />
      </div>
    </Header>
  );
};

export default Navbar;
