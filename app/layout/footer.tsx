import {
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "@components/assets/icons";
import Store from "@shared/DownloadStore";
import Link from "next/link";

const policyLinks = [
  { label: "Privacy Policy", href: "privacy" },
  { label: "Terms and Conditions", href: "terms-and-conditions" },
];
const socialLinks = [
  { icon: <Instagram />, href: "https://instagram.com" },
  { icon: <Linkedin />, href: "https://linkedin.com" },
  { icon: <Twitter />, href: "https://twitter.com" },
  { icon: <Youtube />, href: "https://youtube.com" },
];

const Footer = () => {
  return (
    <footer className="bg-primary-grad-footer text-white px-2 laptop-md:px-0">
      <center className="space-y-10 py-14">
        <h6 className="font-bold text-[24px] leading-[30px] lg:text-[40px] lg:leading-[47px] tracking-title">
          What are you waiting for?
          <br />
          Simplify your life with seamless transactions.
          <br />
          Get the Blue app now!
        </h6>
        <Store centered />
      </center>
      <hr className="w-[95%] m-auto border-0 border-b-[0.5px] border-[#EAEAFF]" />
      <div className="flex flex-col-reverse lg:flex-row justify-between opacity-75 items-center gap-12 px-16 py-5">
        <small className="text-sm leading-[14px] tracking-text">
          © {new Date().getFullYear()} Blue. All rights reserved
        </small>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-10">
          <ul className="flex justify-between items-center gap-4 m-0">
            {policyLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm leading-[14px] tracking-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex justify-between items-center gap-4 m-0">
            {socialLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm leading-[14px] tracking-text"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
