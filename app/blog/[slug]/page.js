"use client";
import { useParams } from 'next/navigation';
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getBlogPost, BLOG_POSTS } from "@/lib/blog-data";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  
  const post = getBlogPost(params.slug);
  
  // Get related posts (same category, excluding current)
  const relatedPosts = BLOG_POSTS
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 2);

  // Handle share functionality
  const handleShare = async () => {
    const shareData = {
      title: language === 'hi' ? post.titleHi : post.titleEn,
      text: language === 'hi' ? post.excerptHi : post.excerptEn,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(language === 'hi' ? 'लिंक कॉपी किया गया!' : 'Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  if (!post) {
    return (
      <div className="bg-heritage-cream min-h-screen flex items-center justify-center" data-page="blog-not-found">
        <div className="text-center">
          <h1 className="text-4xl text-deep-brown mb-4" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'पोस्ट नहीं मिला' : 'Post Not Found'}
          </h1>
          <Link href="/blog" className="text-sandalwood hover:text-deep-brown underline">
            {language === 'hi' ? 'ब्लॉग पर वापस जाएं' : 'Back to Blog'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-heritage-cream min-h-screen" data-page="blog-detail">
      {/* Hero Image Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={post.image}
          alt={language === 'hi' ? post.titleHi : post.titleEn}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 via-deep-brown/40 to-transparent" />
        
        {/* Language Switcher */}
        <div className="absolute top-6 right-6 z-20">
          <LanguageSwitcher />
        </div>

        {/* Back Button */}
        <Link 
          href="/blog" 
          className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-ivory/90 backdrop-blur-sm px-4 py-2 rounded-sm text-deep-brown hover:bg-ivory transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-light" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi' ? 'वापस' : 'Back'}
          </span>
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-sandalwood text-ivory px-4 py-1 rounded-sm text-sm font-light mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-light text-ivory mb-4" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                {language === 'hi' ? post.titleHi : post.titleEn}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-ivory/90 text-sm font-light">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-ivory border border-sandalwood/15 rounded-sm p-8 md:p-12 shadow-sm"
          >
            {/* Share Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-sandalwood/20 rounded-sm text-incense hover:bg-sandalwood/5 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-light">
                  {language === 'hi' ? 'साझा करें' : 'Share'}
                </span>
              </button>
            </div>

            {/* Blog Content */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:font-light prose-headings:text-deep-brown
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-incense prose-p:font-light prose-p:leading-relaxed
                prose-ul:text-incense prose-ul:font-light
                prose-li:marker:text-sandalwood
                prose-strong:text-deep-brown prose-strong:font-medium
              "
              style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
              dangerouslySetInnerHTML={{ 
                __html: language === 'hi' ? post.contentHi : post.contentEn 
              }}
            />
          </motion.div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-sandalwood/5 border-t border-sandalwood/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-light text-deep-brown text-center mb-10" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {language === 'hi' ? 'संबंधित पोस्ट' : 'Related Posts'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost, idx) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-ivory border border-sandalwood/15 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={language === 'hi' ? relatedPost.titleHi : relatedPost.titleEn}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-light text-deep-brown group-hover:text-sandalwood transition-colors line-clamp-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                        {language === 'hi' ? relatedPost.titleHi : relatedPost.titleEn}
                      </h3>
                      <p className="text-incense text-sm font-light mt-2 line-clamp-2">
                        {language === 'hi' ? relatedPost.excerptHi : relatedPost.excerptEn}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-ivory border-t border-sandalwood/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'आशीर्वाद प्राप्त करें' : 'Receive Divine Blessings'}
          </h2>
          <p className="text-incense font-light" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi'
              ? 'भगवान कुबेर के आशीर्वाद के लिए आज ही आरती और पूजा बुक करें।'
              : 'Book Aarti and Pooja services for blessings from Lord Kuber.'}
          </p>
          <Link href="/aarti-pooja">
            <button className="bg-sandalwood text-ivory px-8 py-3 rounded-sm font-light transition-all duration-300 hover:bg-deep-brown border border-sandalwood shadow-sm" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {language === 'hi' ? 'पूजा बुक करें' : 'Book Pooja'}
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
