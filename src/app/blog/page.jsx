"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import posts from "@/data/posts.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const gridRef = useRef(null);
  const sidebarRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Hero animation
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    heroTl.fromTo(
      heroRef.current?.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );

    // Featured post animation
    const featuredTl = gsap.timeline({
      scrollTrigger: {
        trigger: featuredRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    featuredTl.fromTo(
      featuredRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    // Grid animation
    const gridTl = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gridTl.fromTo(
      gridRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const categories = ["All", "AI", "Technology", "Business", "Innovation"];
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  const filteredPosts = otherPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="overflow-hidden">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-40 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTVlN2ViIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz4KPC9zdmc+')] opacity-30"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
                Insights & Innovation
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              ThinkAct AI <span className="text-blue-600">Blog</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore the latest insights, trends, and innovations in AI technology and business transformation
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none text-gray-700 bg-white/80 backdrop-blur-sm"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white/80 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
            
            <div ref={featuredRef} className="group">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="relative overflow-hidden">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        width={800}
                        height={500}
                        className="w-full h-80 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {featuredPost.category || "Featured"}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h3>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">{featuredPost.excerpt || featuredPost.content?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || 'No excerpt available'}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{featuredPost.date}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime || "5 min read"}</span>
                      </div>
                      <Link 
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
                      >
                        Read More
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="text-center lg:text-left mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Latest Articles
                    {selectedCategory !== "All" && (
                      <span className="text-blue-600"> - {selectedCategory}</span>
                    )}
                  </h2>
                  <p className="text-gray-600">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post, index) => (
                    <article key={index} className="group">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100">
                        <div className="relative overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={400}
                            height={250}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 bg-white/90 text-gray-700 rounded-full text-xs font-medium">
                              {post.category || "Article"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime || "3 min read"}</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || 'No excerpt available'}</p>
                          
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
                          >
                            Read More
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                
                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600">Try adjusting your search terms or category filter</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside ref={sidebarRef} className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Newsletter Signup */}
                  <div className="bg-blue-600 rounded-2xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                    <p className="text-sm mb-4 opacity-90">
                      Get the latest AI insights delivered to your inbox
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-white focus:outline-none ring-2 ring-white/20 focus:ring-white/50"
                      />
                      <button className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                        Subscribe
                      </button>
                    </div>
                  </div>

                  {/* Recent Posts */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
                    <div className="space-y-4">
                      {posts.slice(0, 3).map((post, index) => (
                        <div key={index} className="flex space-x-3">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={60}
                            height={60}
                            className="w-15 h-15 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <Link href={`/blog/${post.slug}`}>
                              <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                {post.title}
                              </h4>
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* About */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">About ThinkAct AI</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      ThinkAct AI offers a unique UI framework to build an agent serving specific intent. It has an in-build gateway agent which determines intent and then orchestrates with multiple agents built to serve various intents.
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {["AI", "Machine Learning", "Automation", "Technology", "Innovation", "Business", "Future", "Agents"].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-600 hover:text-white transition-colors duration-300 cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Build Your AI Agent?</h2>
            <p className="text-xl mb-8 opacity-90">
              Transform your business with intelligent automation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;