import { React, useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import logo from '../assets/music-app-icon-19.png';
import { links } from '../assets/constants.js';

const SideBarLinks = ({ handleClick }) => (
  <div>
    {
      links.map((item) => (
        <Link key={item.name} to={item.to} onClick={handleClick && handleClick} className="text-white flex flex-row justify-items-center py-1 px-1 text-sm font-medium hover:text-cyan-400 visited:text-white">
          <item.icon className="px-[2px] py-[2px] w-[60px] h-[22px]" />
          {item.name}
        </Link>
      ))
    };
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#171717]">
        <img src={logo} alt="logo" className="w-40 mx-auto shadow-md" />
        <SideBarLinks />
      </div>

      <div className="md:hidden absolute block top-6 right-3 text-white z-10">
        {
        mobileMenuOpen ? <RiCloseLine className="text-white text-xl mr-2 cursor-pointer" onClick={() => setMobileMenuOpen(false)} /> : <HiOutlineMenu className="text-white text-xl mr-2 cursor-pointer" onClick={() => setMobileMenuOpen(true)} />
      }
      </div>

      <div className={`bg-[#171717] opacity-95 absolute top-0 h-full w-1/2 z-10 md:hidden ${mobileMenuOpen ? 'left-0' : 'hidden'}`}>
        <img src={logo} alt="logo" className="w-40 mx-auto shadow-md" />
        <SideBarLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
