import React, {useMemo} from 'react';
import { Link } from 'react-router-dom';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useBlogs } from '@/hooks/useBlogs';
import Container from '../components/Container';
import welcomeImg from '../assets/images/home.jpg';
import TrendingTags from '../components/tags/TrendingTags';
import LastBlogsCard from '@/components/cards/LastBlogsCard';
import HowToFollow from '@/components/following/HowToFollow';
import LastBlogsSkeleton from '@/components/Loading/LastBlogsSkeleton';

const Home = () => {
  const { blogs, loading: blogsLoading } = useBlogs();

  const lastBlogs = useMemo(() => {
    return blogs
      .map((blog, index) => ({ ...blog, index }))
      .sort((a, b) => {
        const diff = new Date(b.created_at) - new Date(a.created_at);
        return diff !== 0 ? diff : a.index - b.index;
      })
    .slice(0, 5);
  }, [blogs]);

  return (
    <Container>
      <section className="bg-blue-100 rounded-lg flex flex-col md:flex-row items-center justify-between gap-8 p-8 mb-12">
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Welcome to <span className="text-blue-600">BlogNest</span>
          </h1>
          <p className="py-4 text-gray-700 text-lg">
            Share your thoughts, discover stories, and connect with others.
          </p>
          <Link
            to="/create-blog"
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 px-4 rounded-md shadow-md"
          >
            Start Writing ✍️
          </Link>
        </div>

        <div className="w-full md:w-96">
          <img
            src={welcomeImg}
            srcSet={`
              ${welcomeImg}?w=480 480w,
              ${welcomeImg}?w=768 768w,
              ${welcomeImg}?w=1024 1024w,
              ${welcomeImg}?w=1600 1600w
            `}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Welcome"
            loading='lazy'
            className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[4/3]"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Latest Blogs
          </h2>
          {blogsLoading ? (
            <LastBlogsSkeleton />
          ) : lastBlogs.length > 0 ? (
            <LastBlogsCard lastBlogs={lastBlogs} />
          ) : (
            <p className="text-gray-500">No blogs found. Be the first to post!</p>
          )}
        </div>

        <aside className="space-y-8">
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Trending Tags
            </h2>
            <TrendingTags />
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              How to Follow
            </h2>
            <HowToFollow />
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Bookmarks
            </h2>
            <Link
              to="/bookmarks"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
              aria-label='go to saved blogs'
            >
              <FontAwesomeIcon icon={faBookmark} />
              <span>Go to your saved blogs</span>
            </Link>
          </div>
        </aside>
      </section>
    </Container>
  );
};

export default Home;
