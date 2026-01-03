"use client";
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { SHOP_PRODUCTS } from "@/lib/aarti-data";
import { useState } from 'react';

// WhatsApp contact number for orders
const WHATSAPP_NUMBER = '917579183761';

export default function Shop() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleOrderNow = (product) => {
    const productName = language === 'hi' ? product.titleHi : product.titleEn;
    const description = language === 'hi' ? product.descriptionHi : product.descriptionEn;
    
    // Create detailed message with product info
    let message = `🙏 Namaste!\n\n`;
    message += `I would like to order the following item from Kuber Prasadam:\n\n`;
    message += `🛍️ *Product:* ${productName}\n`;
    message += `💰 *Price:* ₹${product.price}\n`;
    message += `📂 *Category:* ${product.category}\n`;
    message += `${product.isDigital ? '📱 *Type:* Digital Product\n' : '📦 *Type:* Physical Product\n'}`;
    message += `\n📋 *Description:*\n${description}\n\n`;
    
    if (product.benefits && product.benefits.length > 0) {
      message += `✨ *Benefits:*\n`;
      product.benefits.forEach((benefit, index) => {
        message += `${index + 1}. ${benefit}\n`;
      });
      message += `\n`;
    }
    
    message += `Please confirm the availability and provide shipping/delivery details.\n\n`;
    message += `Thank you! 🙏`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleQuickContact = (product) => {
    const productName = language === 'hi' ? product.titleHi : product.titleEn;
    const message = `🙏 Hello! I'm interested in "${productName}" (₹${product.price}). Please provide more information.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="bg-heritage-cream cursor-default select-none min-h-screen" data-page="shop">

      {/* Header Section - Heritage Design */}
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
          initial={{opacity:0, y:50}}
          whileInView={{opacity:1, y:0}}
          transition={{duration:0.8, ease: 'easeInOut'}}
          viewport={{once:true}}
          className='relative flex flex-col items-center justify-center space-y-4'
        >
          <div className="text-6xl text-sandalwood opacity-90" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
            ॐ
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-deep-brown tracking-wide text-center" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'कुबेर प्रसादम्' : 'Kuber Prasadam'}
          </h1>
          <h3 className='text-sandalwood text-center font-light text-xl max-w-2xl' style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi' 
              ? 'भगवान कुबेर से आशीर्वादित पवित्र वस्तुएं - धन और समृद्धि के लिए' 
              : 'Sacred Items Blessed by Lord Kuber - For Wealth and Prosperity'}
          </h3>
        </motion.div>
      </section>

      {/* Products Grid - Heritage Design */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SHOP_PRODUCTS.map((product, index) => (
              <motion.div
                initial={{opacity:0, y:50}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.8, delay: index * 0.1, ease:"easeInOut"}}
                viewport={{once:true}}
                key={product.id}
                className="bg-ivory border border-sandalwood/15 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-64 bg-gradient-to-br from-heritage-cream to-ivory flex items-center justify-center p-6 border-b border-sandalwood/10">
                  <Image
                    src={product.image}
                    alt={language === 'hi' ? product.titleHi : product.titleEn}
                    width={200}
                    height={200}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/images/temple/temple.jpg';
                    }}
                  />
                  {product.isDigital && (
                    <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-sm text-xs font-medium">
                      Digital
                    </div>
                  )}
                  {product.inStock ? (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-sm text-xs font-medium">
                      In Stock
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-sm text-xs font-medium">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-xl font-light text-deep-brown mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                      {language === 'hi' ? product.titleHi : product.titleEn}
                    </h2>
                    <p className="text-sm text-incense font-light line-clamp-2">
                      {language === 'hi' ? product.descriptionHi : product.descriptionEn}
                    </p>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-light text-sandalwood" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      ₹{product.price}
                    </p>
                    <span className="text-xs text-incense font-light">{product.category}</span>
                  </div>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleViewDetails(product)}
                      className="w-full px-4 py-3 bg-sandalwood text-ivory rounded-sm font-light border border-sandalwood hover:bg-deep-brown transition-all duration-300" 
                      style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
                    >
                      {language === 'hi' ? 'विवरण देखें' : 'View Details'}
                    </button>
                    <button 
                      onClick={() => handleQuickContact(product)}
                      disabled={!product.inStock}
                      className={`w-full px-4 py-2 rounded-sm font-light border transition-all duration-300 flex items-center justify-center gap-2 ${
                        product.inStock 
                          ? 'border-green-600 text-green-700 hover:bg-green-50' 
                          : 'border-gray-300 text-gray-400 cursor-not-allowed'
                      }`}
                      style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
                    >
                      {product.inStock && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      )}
                      {language === 'hi' ? 'WhatsApp से संपर्क करें' : 'Contact on WhatsApp'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-deep-brown/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-ivory rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-sandalwood/20"
          >
            <div className="relative h-80 bg-gradient-to-br from-heritage-cream to-ivory flex items-center justify-center p-8 border-b border-sandalwood/10">
              <Image
                src={selectedProduct.image}
                alt={language === 'hi' ? selectedProduct.titleHi : selectedProduct.titleEn}
                width={300}
                height={300}
                className="object-contain"
                onError={(e) => {
                  e.target.src = '/images/temple/temple.jpg';
                }}
              />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-ivory/90 backdrop-blur-sm p-2 rounded-sm hover:bg-ivory transition-colors"
              >
                <svg className="w-6 h-6 text-deep-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-6 border-b border-sandalwood/10 pb-6">
                <div>
                  <h2 className="text-3xl font-light text-deep-brown mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                    {language === 'hi' ? selectedProduct.titleHi : selectedProduct.titleEn}
                  </h2>
                  <span className="inline-block bg-sandalwood/10 text-sandalwood px-3 py-1 rounded-sm text-sm font-light">
                    {selectedProduct.category}
                  </span>
                </div>
                <div className="text-3xl font-light text-sandalwood">
                  ₹{selectedProduct.price}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-light text-deep-brown mb-3" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {language === 'hi' ? 'विवरण' : 'Description'}
                </h3>
                <p className="text-incense font-light leading-relaxed">
                  {language === 'hi' ? selectedProduct.descriptionHi : selectedProduct.descriptionEn}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-light text-deep-brown mb-3" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {language === 'hi' ? 'लाभ' : 'Benefits'}
                </h3>
                <ul className="space-y-2">
                  {selectedProduct.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-incense font-light">
                      <svg className="w-5 h-5 text-sandalwood mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm mb-6">
                <p className="text-sm text-amber-900 font-light">
                  <span className="font-medium">Note: </span>
                  {language === 'hi' 
                    ? 'यह वस्तु पांडुकेश्वर में भगवान कुबेर के मंदिर से आशीर्वादित है।'
                    : 'This item is blessed at Lord Kuber\'s temple in Pandukeshwar.'}
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleOrderNow(selectedProduct)}
                  disabled={!selectedProduct.inStock}
                  className={`flex-1 px-6 py-4 rounded-sm font-light transition-all duration-300 flex items-center justify-center gap-2 ${
                    selectedProduct.inStock
                      ? 'bg-green-600 text-white hover:bg-green-700 border border-green-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
                  }`}
                  style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
                >
                  {selectedProduct.inStock && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  )}
                  {language === 'hi' ? 'WhatsApp से ऑर्डर करें' : 'Order via WhatsApp'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-4 border border-sandalwood text-sandalwood rounded-sm font-light hover:bg-sandalwood/5 transition-all duration-300"
                  style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
                >
                  {language === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-12 px-4 bg-sandalwood/5 border-t border-sandalwood/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="text-5xl text-sandalwood opacity-80" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
            ॐ श्री कुबेराय नमः
          </div>
          <h2 className="text-3xl font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'पवित्र प्रसाद' : 'Sacred Prasadam'}
          </h2>
          <p className="text-incense font-light max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi'
              ? 'भगवान कुबेर के मंदिर से आशीर्वादित ये पवित्र वस्तुएं आपके जीवन में धन, समृद्धि और सुख लाने के लिए हैं। प्रत्येक वस्तु मंदिर में विधिवत पूजा और मंत्रों से आशीर्वादित की गई है।'
              : 'These sacred items blessed at Lord Kuber\'s temple are meant to bring wealth, prosperity and happiness into your life. Each item has been blessed with proper rituals and mantras at the temple.'}
          </p>
          <div className="pt-4">
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 bg-sandalwood text-ivory rounded-sm font-light hover:bg-deep-brown transition-all duration-300 border border-sandalwood"
              style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
            >
              {language === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>

      <Footer/>
    </section>
  );
}
