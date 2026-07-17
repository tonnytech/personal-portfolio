import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  const post = await prisma.post.create({
    data: {
      title: "My First Blog Post",
      slug: "my-first-blog-post",
      content: "This is the content of my very first blog post!",
      published: true,
    },
  });

  console.log("Created post:", post);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
