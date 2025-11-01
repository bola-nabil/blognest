import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faFire,
  faTags,
  faBookmark,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';


const NavLinks = () => {
  const navLinks = [
    { id: 1, title: 'Home', path: '/', icon: faHouse },
    { id: 2, title: 'Explore', path: '/explore', icon: faFire },
    { id: 3, title: 'Categories', path: '/categories', icon: faTags },
    { id: 4, title: 'Bookmarks', path: '/bookmarks', icon: faBookmark },
    { id: 5, title: 'Feed', path: '/feed', icon: faNewspaper },
  ];
  return (
    <ul>
      {navLinks.map((link) => (
        <li key={link.id} className='py-[10px] px[0]'>
          <FontAwesomeIcon icon={link.icon} className='pr-[20px]'/>
          <Link to={link.path}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
