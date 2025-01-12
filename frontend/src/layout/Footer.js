import React from "react";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import logo from "../assets/img/company.png"

const Footer = () => {
  const footerItems = [
    { link: "/", title: "Home" },
    { link: "/dashboard", title: "Dashboard" },
    { link: "/product", title: "Product" },
    { link: "/about", title: "About Us" },
  ];
  const companyItems = [
    { link: "/mission", title: "Mission" },
    { link: "/sponsors", title: "Sponsors" },
    { link: "/partners", title: "Partners" },
  ];
  const socialItems = [
    { link: "/intagram", title: "Instagram" },
    { link: "/linkedin", title: "LinkedIn" },
    { link: "/github", title: "Github" },
  ];
  const contactItems = [
    { link: "/", title: "sarthak.jain7213@gmail.com" },
  ];
  return (
    <footer className="bg-[#0A1218] py-8 pl-1 mt-16 flex justify-start sm:justify-center flex-wrap space-y-5 sm:space-y-0">
      <div className="flex-col w-full sm:w-auto ">
      <p className=" mx-1 lg:mx-[53px] text-[#FFFFFF] font-bold text-lg sm:text-xl mb-1">
          Neural Niti
        </p>
        <ul className="flex-col items-center lg:mx-12 text-white">
          {footerItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </ul>
      </div>
      <div className="flex-col w-full sm:w-auto ">
      <p className=" mx-1 lg:mx-[53px] text-[#FFFFFF] font-bold text-lg sm:text-xl  mb-1">Company</p>
      <ul className="flex-col items-center lg:mx-12 text-white">
          {companyItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </ul>
      </div>
      <div className="flex-col w-full sm:w-auto">
      <p className=" mx-1 lg:mx-[53px] text-[#FFFFFF] font-bold text-lg sm:text-xl mb-1">Social</p>
      <ul className="flex-col items-center lg:mx-12 text-white">
          {socialItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </ul>
      </div>
      <div className="flex-col w-full sm:w-auto">
        <p className="mx-1  lg:mx-[53px] text-[#FFFFFF] font-bold text-lg sm:text-xl  mb-1">
          Contact Us
        </p>
        <ul className="flex-col items-center lg:mx-12 text-white">
          {contactItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </ul>
      </div>
      <div className="flex-col w-full sm:w-auto">
        {/* <p className="mx-14 text-[#121212] font-bold text-lg mb-2">
          Join us in changing the world of policies! Join OpenPolitica
        </p> */}

        <Link to="/" className="mt-8 justify-center flex items-center ">
          <img src={logo} alt="logo" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
