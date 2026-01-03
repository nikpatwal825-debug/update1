"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog-data";

export default function BlogPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const t = (key) => getTranslation(language, key);

  const filteredPosts = selectedCategory === "all"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  return (
    <div className="bg-heritage-cream min-h-screen" data-page="blog">
      {/* Header Section */}
      <section className="relative py-20 px-4 bg-ivory border-b border-sandalwood/10">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' text-anchor='middle' font-size='24' fill='%238B4513'%3Eॐ%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Language Switcher */}
        <div className="absolute top-6 right-6">
          <LanguageSwitcher />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center space-y-4"
        >
          <div className="text-6xl text-sandalwood opacity-90" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
            ॐ
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-deep-brown tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'ब्लॉग' : 'Temple Blog'}
          </h1>
          <p className="text-lg text-incense font-light max-w-2xl mx-auto" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi' 
              ? 'आध्यात्मिक ज्ञान, मंदिर परंपराएं और पांडुकेश्वर की विरासत'
              : 'Spiritual wisdom, temple traditions, and the heritage of Pandukeshwar'}
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-[72px] md:top-[80px] z-30 bg-ivory shadow-sm py-4 md:py-6 border-b border-sandalwood/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {BLOG_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 md:px-6 py-2 text-sm md:text-base rounded-sm font-light transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-sandalwood text-ivory shadow-sm"
                    : "bg-heritage-cream text-deep-brown hover:bg-sandalwood/10 border border-sandalwood/20"
                }`}
                style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
              >
                {language === 'hi' ? cat.labelHi : cat.labelEn}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-blog-grid>
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-ivory border border-sandalwood/15 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={language === 'hi' ? post.titleHi : post.titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-sandalwood text-ivory px-3 py-1 rounded-sm text-xs font-light">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-ivory/90 text-sm font-light">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-light text-deep-brown mb-3 line-clamp-2 group-hover:text-sandalwood transition-colors" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                      {language === 'hi' ? post.titleHi : post.titleEn}
                    </h2>
                    <p className="text-incense font-light text-sm line-clamp-3 mb-4" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                      {language === 'hi' ? post.excerptHi : post.excerptEn}
                    </p>
                    <div className="flex items-center justify-between text-xs text-incense">
                      <span>{post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-incense">
                {language === 'hi' ? 'कोई पोस्ट नहीं मिली' : 'No posts found'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-sandalwood/5 border-t border-sandalwood/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'आध्यात्मिक अपडेट प्राप्त करें' : 'Stay Connected'}
          </h2>
          <p className="text-incense font-light" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi'
              ? 'मंदिर समाचार, आध्यात्मिक ज्ञान और विशेष आयोजनों के बारे में जानकारी प्राप्त करें।'
              : 'Receive updates on temple news, spiritual wisdom, and special events.'}
          </p>
          <Link href="/contact">
            <button className="bg-sandalwood text-ivory px-8 py-3 rounded-sm font-light transition-all duration-300 hover:bg-deep-brown border border-sandalwood shadow-sm" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
