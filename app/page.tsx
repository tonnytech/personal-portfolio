import { prisma } from "../lib/prisma";
import Profile from "./components/Profile";
import FeaturedBlogs from "./components/FeaturedBlogs";
import Tags from "./components/Tags";
import Portfolio from "./components/Port";
import Newsletter from "./components/Newsletter";

export default async function HomePage() {
  const [featuredProjects, featuredPosts] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.post.findMany({
      where: { published: true, featured: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      {/* Hero */}
      <Profile />
      <FeaturedBlogs posts={featuredPosts} postsIsLoading={false} />
      <Tags />
      <Portfolio
        projectsIsLoading={false}
        displayProjects={featuredProjects}
        showButton={true}
      />
      <Newsletter />
    </>
  );
}
