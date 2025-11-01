import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import NavBar from './components/navbar/NavBar';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import Notifications from './pages/Notifications';
import Bookmarks from './pages/Bookmarks';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import BlogUpdate from './pages/BlogUpdate';
import Categories from './pages/Categories';
import CategoryShow from './components/categories/CategoryShow';
import Tags from './pages/Tags';
import SearchResults from './pages/SearchResults';
import Settings from './pages/Settings';
import AppearanceSettings from './components/settings/AppearanceSettings';
import Secuirty from './pages/Secuirty';
import NotFound from './pages/NotFound';
import ServerFaild from './pages/ServerFaild';

function App() {
  const location = useLocation();
  const hideNavBarPaths = ['/register', '/login', '/server-faild'];
  const shouldHideNavBar = hideNavBarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavBar && <NavBar />}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/blogs/:id/edit" element={<BlogUpdate />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:id" element={<CategoryShow />} />
        <Route path="/tag/:id" element={<Tags />} />
        <Route path="/search" element={<SearchResults />} />

        <Route path="/settings" element={<Settings />}>
          <Route index element={<ProfileUpdate />} />
          <Route path="update-profile" element={<ProfileUpdate />} />
          <Route path="security" element={<Secuirty />} />
          <Route path="appearance" element={<AppearanceSettings />} />
        </Route>
        <Route path="/server-faild" element={<ServerFaild />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
