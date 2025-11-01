/**
 * return sorted blogs
 * @param {*} data
 * @returns
 */
export const sortedBlogs = (data) =>
  [...(data?.blogs || [])].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

/**
 * return sorted bookmarks
 * @param {*} data
 * @returns
 */
export const sortedBookmarks = (data) =>
  [...(data?.bookmarks || [])].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
