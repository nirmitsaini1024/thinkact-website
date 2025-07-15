import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import posts from "@/data/posts.json";

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogDetails({ params }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <article className="blog-details">
         <Image
          src={post.image}
          alt={post.title}
          layout="responsive"  
          width={1000}  
          height={500}  
          className="blog-image rounded-lg"
        />
          <h1 className="text-4xl font-bold my-6">{post.title}</h1>
          <div
            dangerouslySetInnerHTML={{
             __html: post.content,
           }}
         className="blog-content"></div>
        </article>
      </main>
      <Footer />
    </>
  );
}
