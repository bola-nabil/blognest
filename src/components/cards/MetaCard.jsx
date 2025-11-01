import React from "react";
import { getExcerpt } from "../../utils/getExcerpt";
import { Link } from "react-router-dom";

const MetaCard = ({ blogs }) => {
  const fallbackImg =
    "https://via.placeholder.com/400x225.png?text=No+Image+Available";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => {
        const excerpt = getExcerpt(blog?.content, 20);
        const formattedDate = new Date(blog?.created_at).toLocaleDateString(
          undefined,
          { year: "numeric", month: "short", day: "numeric" }
        );

        return (
          <Link
            to={`/blogs/${blog.id}`}
            key={blog.id}
            className="group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
            aria-label={`Read blog: ${blog?.title || "Untitled"}`}
          >
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300 ease-out overflow-hidden flex flex-col">
              {/* Image */}
              <div className="relative">
                <img
                  src={blog?.image || fallbackImg}
                  alt={blog?.title || "Blog image"}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[16/9] object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300 ease-out"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-5">
                <h3 className="font-bold text-lg md:text-xl text-gray-800 group-hover:text-blue-600 transition line-clamp-2">
                  {blog?.title || "Untitled Blog"}
                </h3>

                <div className="py-3 text-gray-600 text-sm leading-relaxed flex-grow">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: excerpt || "<p>No preview available.</p>",
                    }}
                  />
                </div>

                <div className="text-xs text-gray-500 border-t pt-3 mt-3">
                  {formattedDate}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MetaCard;
