'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AARTI_SERVICES, CATEGORIES } from '@/lib/aarti-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// WhatsApp contact number for bookings
const WHATSAPP_NUMBER = '919999999999'; // Replace with actual WhatsApp number

export default function AartiPoojaPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const t = (key) => getTranslation(language, key);

  const filteredServices = selectedCategory === 'All Services'
    ? AARTI_SERVICES
    : AARTI_SERVICES.filter(service => service.category === selectedCategory);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleWhatsAppRedirect = () => {
    const serviceName = language === 'hi' ? selectedService.titleHi : selectedService.titleEn;
    const message = `Hello! I would like to book "${serviceName}" for ₹${selectedService.price}. Please confirm the booking and send me the live streaming link.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-heritage-cream">
      {/* Header - Heritage Design */}
      <div className="bg-ivory border-b border-sandalwood/10 py-16 relative">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="text-6xl text-sandalwood opacity-90" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
              ॐ
            </div>
            <h1 className="text-5xl font-light text-deep-brown tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {t('aarti.title')}
            </h1>
            <p className="text-lg text-incense font-light max-w-2xl mx-auto">
              {t('aarti.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters - Heritage */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-sm font-light transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-sandalwood text-ivory shadow-sm'
                    : 'bg-ivory text-deep-brown hover:bg-sandalwood/5 border border-sandalwood/20'
                }`}
                style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
              >
                {t(`aarti.${category.toLowerCase().replace(/ /g, '')}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid - Heritage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-ivory rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-sandalwood/15"
            >
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={language === 'hi' ? service.titleHi : service.titleEn}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.src = '/images/temple/default.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-sandalwood text-ivory px-4 py-2 rounded-sm font-light shadow-sm">
                  ₹{service.price}
                </div>
                {service.isSpecialPuja && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-sm text-xs font-medium">
                    Special Event
                  </div>
                )}
                {service.isGrandEvent && (
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-sm text-xs font-medium">
                    Grand Bhandara
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-ivory/90 backdrop-blur-sm px-3 py-1 rounded-sm text-sm font-light text-incense mb-2">
                    {service.category}
                  </div>
                  {service.specialDate && (
                    <div className="bg-sandalwood/90 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-light text-ivory">
                      📅 {service.specialDate || service.festival}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-light text-deep-brown mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {language === 'hi' ? service.titleHi : service.titleEn}
                </h3>
                <p className="text-incense font-light mb-4 line-clamp-2 text-sm">
                  {language === 'hi' ? service.descriptionHi : service.descriptionEn}
                </p>
                
                <div className="flex items-center justify-between text-xs text-incense mb-4 font-light">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.duration}
                  </div>
                  <div className="text-sandalwood">
                    {service.timing}
                  </div>
                </div>

                <button
                  onClick={() => handleBookNow(service)}
                  className="w-full bg-sandalwood text-ivory py-3 rounded-sm font-light hover:bg-deep-brown transition-all duration-300 shadow-sm border border-sandalwood"
                  style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
                >
                  {t('aarti.bookNow')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal - Heritage */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-deep-brown/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-ivory rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-sandalwood/20">
            <div className="relative h-64">
              <Image
                src={selectedService.image}
                alt={language === 'hi' ? selectedService.titleHi : selectedService.titleEn}
                fill
                className="object-cover"
                onError={(e) => {
                  e.target.src = '/images/temple/default.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/70 to-transparent" />
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
              <div className="flex items-center justify-between mb-4 border-b border-sandalwood/10 pb-4">
                <h2 className="text-3xl font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {language === 'hi' ? selectedService.titleHi : selectedService.titleEn}
                </h2>
                <div className="text-2xl font-light text-sandalwood">
                  ₹{selectedService.price}
                </div>
              </div>

              <p className="text-incense font-light mb-6 leading-relaxed">
                {language === 'hi' ? selectedService.descriptionHi : selectedService.descriptionEn}
              </p>

              {selectedService.specialNote && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm mb-6">
                  <p className="text-sm text-amber-900 font-light">
                    <span className="font-medium">Note: </span>{selectedService.specialNote}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-sandalwood/5 p-4 rounded-sm border border-sandalwood/10">
                  <div className="text-xs text-incense mb-1 font-light">{t('aarti.duration')}</div>
                  <div className="font-light text-deep-brown">{selectedService.duration}</div>
                </div>
                <div className="bg-sandalwood/5 p-4 rounded-sm border border-sandalwood/10">
                  <div className="text-xs text-incense mb-1 font-light">{t('aarti.timing')}</div>
                  <div className="font-light text-deep-brown">{selectedService.timing}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-light text-deep-brown mb-3" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {t('aarti.benefits')}
                </h3>
                <ul className="space-y-2">
                  {selectedService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-sandalwood mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-incense font-light text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 border-t border-sandalwood/10 pt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-heritage-bg border border-sandalwood/20 text-deep-brown py-3 rounded-sm font-light hover:bg-sandalwood/5 transition-colors"
                  style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
                >
                  {t('aarti.cancel')}
                </button>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-sm font-light transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                  style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Book via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
