import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import NavLinks from './NavLinks';
import { api } from '@/api';
import { logout } from '../../utils/logout';
import ProfileNav from './ProfileNav';
import NotificationBell from '../notifications/NotificationBell';

const Navbar = () => {
  const [user, setUser] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLists, setShowLists] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 912);

  const handleShowList = () => {
    setShowLists(!showLists);
  };

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 912);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const res = await api.get(`/v1/profile/${userId}`);
        setUser(res.data.user);
      } catch (err) {
        console.error(
          'profile fetch error:',
          err.response?.data || err.message
        );
      }
    };

    fetchUserData();
  }, []);

  const userName = user?.name || 'U';

  return (
    <nav className="fixed top-0 z-[1000] w-full">
      <div className="navbar flex justify-between items-center max-w-[1200px] mx-auto">
        {isMobile && (
          <div className="mobile-links">
            <div className="menu-bar" onClick={handleMenuOpen}>
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className='text-white text-[20px]'/>
            </div>
            {isMobile && menuOpen && (
              <div
                className="mobile-navs absolute top-0 left-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] w-[200px] h-screen py-[10px] px-[25px]"
                onClick={handleMenuOpen}
              >
                <div className="mobile-menu mb-10 pb-2 flex items-center gap-2.5 border-b border-gray-500">
                  <div className="menu-bars" onClick={handleMenuOpen}>
                    <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className='text-black text-[20px]' />
                  </div>
                  <p className='text-[30px]'>Blognest</p>
                </div>
                <NavLinks />
              </div>
            )}
          </div>
        )}
        <div className="logo">
          <Link to="/home" className="text-white font-bold text-2xl">
            Blognest
          </Link>
        </div>

        {!isMobile && (
          <div className="links">
            <NavLinks />
          </div>
        )}

        <div className="content flex items-center gap-4">
          {!isMobile && (
            <form onSubmit={handleSearch} className="relative w-64">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-2 text-gray-500 hover:text-blue-500"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          )}

          {isMobile && (
            <div
              className="search-icon text-xl cursor-pointer text-white transition-colors duration-300 text-[1.2rem]"
              onClick={() => navigate('/search')}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          )}
          <NotificationBell />
          <ProfileNav
            user={user}
            userName={userName}
            showLists={showLists}
            handleShowList={handleShowList}
            logout={logout}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
