'use client'

import React from 'react';
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars,
  faTachometerAlt,
  faShoppingCart,
  faIndustry,
  faTruck,
  faCogs,
  faBoxes,
  faChartBar,
  faUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';


const menuItems = [
  { href: "/", label: "Dashboard", icon: faTachometerAlt },
  {
    href: "", 
    label: "Order", 
    icon: faShoppingCart,
    submenu: [
      { href: "/order/create", label: "New Order" },
      { href: "/order/history", label: "Order History" },
      { href: "/order/customer", label: "Customer" },
    ]
  },
  { 
    href: "", 
    label: "Production", 
    icon: faIndustry,
    submenu: [
      { href: "/production/create", label: "New Product Order" },
      { href: "/production/history", label: "Product History" },
    ],
  },
  { 
    href: "/delivery", 
    label: "Delivery", 
    icon: faTruck,
    submenu: [
      { href: "/delivery/create", label: "New Delivery" },
      { href: "/delivery/history", label: "Delivery History" },
    ], 
  },
  { href: "/machines", label: "Machines", icon: faCogs },
  { href: "/materials", label: "Materials", icon: faBoxes },
  { href: "/reports", label: "Reports", icon: faChartBar },
  { href: "/user", label: "User", icon: faUser },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const onLogout = () => {
    signOut({ callbackUrl: '/login', redirect: true })
  }

  return (
    <nav className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <div className='section-title '>
        <div className="title">Printing Factory</div>
        <FontAwesomeIcon
          size="lg"
          icon={faBars}
          className="btn-hamburger-sidebar"
          onClick={toggleSidebar}
        />
      </div>
      <ul className="menuList">
        {menuItems.map(({ href, label, icon, submenu }, index) => (
          <li key={label + index} className='menuItemGroup'>
            <a href={href} className="menuItem">
              <FontAwesomeIcon size="lg" className="pr-[9px]" icon={icon} />
              <span>{label}</span>
            </a>

            {submenu && (
              <ul className="subMenuList">
                {submenu.map((sub, index) => (
                  <li key={sub.href}>
                    <a href={sub.href} className="menuItem">
                      <span >{sub.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <a className='btn-logout' onClick={onLogout}>
        <FontAwesomeIcon 
          icon={faRightFromBracket} 
        />
        <span>Logout</span>
      </a>
    </nav>
  );
}
