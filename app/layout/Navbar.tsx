"use client";
import { MenuOutlined } from "@ant-design/icons";
import useNavBg from "@hooks/useNavBg";
import { Button, Divider, Drawer, Layout, Menu, MenuProps, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "public/logo.svg";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-iconly";

const { Header } = Layout;
const items2: MenuProps["items"] = [
  {
    key: "/benefits",
    label: (
      <Link className="font-body text-sm text-inherit" href="/benefits">
        Benefits
      </Link>
    ),
  },
  {
    key: "/solutions",
    label: <span className="font-body text-sm text-inherit">Solutions</span>,
    children: [
      {
        key: "/solutions/catalogue",
        label: (
          <Link
            className="font-body text-sm text-inherit"
            href="/solutions/catalogue"
          >
            Catalogue
          </Link>
        ),
      },
    ],
  },
  {
    key: "/contact-us",
    label: (
      <Link className="font-body text-sm text-inherit" href="/contact-us">
        Contact us
      </Link>
    ),
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const bgColor = useNavBg();
  const [openKeys, setOpenKeys] = useState([""]);
  const rootSubmenuKeys = ["/cabinets", "/support"];

  const [hover, setHover] = useState<boolean>(false);

  const [current, setCurrent] = useState(
    pathname === "" || pathname === "/" ? "/home" : pathname
  );

  const showDrawer = () => setOpen(true);

  const onClose = () => setOpen(false);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    setOpen(false);
  };

  const mouseEnterHandler = () => {
    setHover(true);
  };

  const mouseLeaveHandler = () => {
    setHover(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "/benefits",
      label: (
        <Link className="font-body text-sm text-inherit" href="/benefits">
          Benefits
        </Link>
      ),
    },
    {
      key: "/solutions",
      label: (
        <span
          className="font-body flex items-center justify-center gap-2 text-sm text-inherit hover:text-neutral"
          onClick={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          Solutions
          {hover ? (
            <ChevronUp set="light" size={16} />
          ) : (
            <ChevronDown set="light" size={16} />
          )}
        </span>
      ),
      children: [
        {
          key: "/solutions/catalogue",
          label: (
            <Link
              className="font-body text-sm text-inherit"
              href="/solutions/catalogue"
            >
              Catalogue
            </Link>
          ),
        },
        {
          key: "/solutions/catalogue-1",
          label: (
            <Link
              className="font-body text-sm text-inherit"
              href="/solutions/catalogue=1"
            >
              Catalogue - 1
            </Link>
          ),
        },
      ],
    },
    {
      key: "/contact-us",
      label: (
        <Link className="font-body text-sm text-inherit" href="/contact-us">
          Contact us
        </Link>
      ),
    },
  ];

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Header
      className={`fixed left-0 top-0 z-30  m-auto flex h-auto w-full items-center justify-between ${
        bgColor <= 0 ? "bg-transparent" : "bg-primary"
      } px-4 transition-all ease-out tablet:px-20`}
    >
      <div className="flex-auto">
        <Link href="/">
          <Image src={logo} alt="soower logo" priority />
        </Link>
      </div>

      <Space
        size="large"
        className="items-center justify-between [&>.ant-space-item]:w-full"
      >
        <Menu
          items={items}
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          disabledOverflow={true}
          triggerSubMenuAction="click"
          className="[&>li.ant-menu-item-active]:bg-input-fied hidden border-b-0 font-semibold laptop:flex laptop:items-center laptop:justify-between [&>li::after]:border-b-0 [&>li]:rounded-md hover:[&>li]:text-neutral laptop:[&>li]:mx-2"
        />

        <Button
          type="primary"
          size="large"
          className="border-transparent bg-white text-primary shadow-none"
        >
          <Link className="font-body font-semibold text-inherit" href="#">
            Download App
          </Link>
        </Button>
      </Space>
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
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          triggerSubMenuAction="click"
          disabledOverflow={true}
          className="border-b-0 border-none font-semibold laptop:hidden [&>.ant-menu-item-active]:bg-input-field [&>li::after]:border-b-0 [&>li]:rounded-md"
        />
        <Divider type="horizontal" className="my-4 border-slate-400" />
        <Button
          type="primary"
          size="large"
          className="ml-4 border-transparent bg-white text-primary shadow-none"
        >
          <Link className="font-body font-semibold text-inherit" href="#">
            Download App
          </Link>
        </Button>
      </Drawer>
      <div className="block laptop:hidden">
        <MenuOutlined
          onClick={showDrawer}
          style={{ fontSize: "21px" }}
          className="hover:text-primary"
        />
      </div>
    </Header>
  );
};

export default Navbar;
