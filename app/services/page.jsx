'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// WhatsApp contact number for bookings
const WHATSAPP_NUMBER = '919999999999'; // Replace with actual WhatsApp number

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const { language, toggleLanguage } = useLanguage();

  const categories = [
    { value: 'ALL', labelEn: 'All Services', labelHi: 'सभी सेवाएं' },
    { value: 'DAILY_AARTI', labelEn: 'Daily Aarti', labelHi: 'दैनिक आरती' },
    { value: 'SPECIAL_POOJA', labelEn: 'Special Pooja', labelHi: 'विशेष पूजा' },
    { value: 'GRAND_CEREMONY', labelEn: 'Grand Ceremony', labelHi: 'भव्य समारोह' },
    { value: 'SEVA', labelEn: 'Seva', labelHi: 'सेवा' },
  ];

  // Static services data
  const allServices = [
    {
      id: 1,
      category: 'DAILY_AARTI',
      nameEn: 'Morning Aarti',
      nameHi: 'प्रातःकालीन आरती',
      descriptionEn: 'Start your day with divine blessings through morning aarti',
      descriptionHi: 'प्रातःकालीन आरती के माध्यम से अपने दिन की शुरुआत दिव्य आशीर्वाद के साथ करें',
      benefitsEn: ['Spiritual awakening', 'Peace of mind'],
      benefitsHi: ['आध्यात्मिक जागृति', 'मन की शांति'],
      duration: 30,
      price: 500
    },
    {
      id: 2,
      category: 'DAILY_AARTI',
      nameEn: 'Evening Aarti',
      nameHi: 'संध्या आरती',
      descriptionEn: 'Experience divine peace with evening prayers',
      descriptionHi: 'संध्या प्रार्थना के साथ दिव्य शांति का अनुभव करें',
      benefitsEn: ['Inner peace', 'Divine blessings'],
      benefitsHi: ['आंतरिक शांति', 'दिव्य आशीर्वाद'],
      duration: 30,
      price: 500
    },
    {
      id: 3,
      category: 'SPECIAL_POOJA',
      nameEn: 'Abhishekam',
      nameHi: 'अभिषेकम',
      descriptionEn: 'Sacred bath ritual for Lord Kuber with milk and honey',
      descriptionHi: 'भगवान कुबेर के लिए दूध और शहद के साथ पवित्र स्नान अनुष्ठान',
      benefitsEn: ['Prosperity', 'Wealth attraction'],
      benefitsHi: ['समृद्धि', 'धन आकर्षण'],
      duration: 60,
      price: 2100
    },
    {
      id: 4,
      category: 'GRAND_CEREMONY',
      nameEn: 'Maha Puja',
      nameHi: 'महा पूजा',
      descriptionEn: 'Grand ceremony with complete Vedic rituals',
      descriptionHi: 'पूर्ण वैदिक अनुष्ठानों के साथ भव्य समारोह',
      benefitsEn: ['Complete blessings', 'Family prosperity'],
      benefitsHi: ['संपूर्ण आशीर्वाद', 'परिवार की समृद्धि'],
      duration: 120,
      price: 5100
    },
    {
      id: 5,
      category: 'SEVA',
      nameEn: 'Prasad Seva',
      nameHi: 'प्रसाद सेवा',
      descriptionEn: 'Offer and distribute blessed prasad to devotees',
      descriptionHi: 'भक्तों को धन्य प्रसाद अर्पित करें और वितरित करें',
      benefitsEn: ['Merit earning', 'Community blessing'],
      benefitsHi: ['पुण्य अर्जन', 'समुदाय का आशीर्वाद'],
      duration: 45,
      price: 1100
    },
  ];

  const filteredServices = selectedCategory === 'ALL' 
    ? allServices 
    : allServices.filter(service => service.category === selectedCategory);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBookNow = (service) => {
    const serviceName = language === 'en' ? service.nameEn : service.nameHi;
    const message = `Hello! I would like to book "${serviceName}" for ${formatPrice(service.price)}. Please confirm the booking and send me the details.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFF8DC]">
      {/* Header */}
      <div className="bg-[#8B4513] text-[#FFF8DC] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" data-services-title>
                {language === 'en' ? 'Temple Services' : 'मंदिर सेवाएं'}
              </h1>
              <p className="text-xl opacity-90">
                {language === 'en' 
                  ? 'Book your divine experience via WhatsApp' 
                  : 'WhatsApp के माध्यम से अपने दिव्य अनुभव को बुक करें'}
              </p>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-[#FFF8DC] text-[#8B4513] rounded-lg hover:bg-[#F5E6D3] transition-colors font-semibold"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-[#8B4513] text-[#FFF8DC]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'en' ? category.labelEn : category.labelHi}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredServices.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-[#654321]">
              {language === 'en' ? 'No services found' : 'कोई सेवा नहीं मिली'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-services-grid>
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#D4AF37] hover:shadow-xl transition-shadow duration-300"
              >
                {/* Service Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#8B4513] to-[#654321] flex items-center justify-center">
                  <span className="text-6xl">🕉️</span>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-[#FFF8DC] text-[#8B4513] text-xs font-semibold rounded-full">
                      {service.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Service Name */}
                  <h3 className="text-xl font-bold text-[#8B4513] mb-2">
                    {language === 'en' ? service.nameEn : service.nameHi}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {language === 'en' ? service.descriptionEn : service.descriptionHi}
                  </p>

                  {/* Benefits */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-[#654321] mb-2">
                      {language === 'en' ? 'Benefits:' : 'लाभ:'}
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {(language === 'en' ? service.benefitsEn : service.benefitsHi)
                        .slice(0, 2)
                        .map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#8B4513] mr-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Duration and Price */}
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Duration' : 'अवधि'}
                      </p>
                      <p className="text-sm font-semibold text-[#654321]">
                        {service.duration} {language === 'en' ? 'min' : 'मिनट'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Price' : 'मूल्य'}
                      </p>
                      <p className="text-2xl font-bold text-[#8B4513]">
                        {formatPrice(service.price)}
                      </p>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <button
                    onClick={() => handleBookNow(service)}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-center rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {language === 'en' ? 'Book via WhatsApp' : 'WhatsApp से बुक करें'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-lg font-bold text-[#8B4513] mb-2">
                {language === 'en' ? 'WhatsApp Booking' : 'WhatsApp बुकिंग'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? 'Book your service directly through WhatsApp message' 
                  : 'WhatsApp संदेश के माध्यम से सीधे अपनी सेवा बुक करें'}
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">📹</div>
              <h3 className="text-lg font-bold text-[#8B4513] mb-2">
                {language === 'en' ? 'Live Streaming' : 'लाइव स्ट्रीमिंग'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? 'Receive live streaming link after confirmation' 
                  : 'पुष्टि के बाद लाइव स्ट्रीमिंग लिंक प्राप्त करें'}
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-lg font-bold text-[#8B4513] mb-2">
                {language === 'en' ? 'Personal Confirmation' : 'व्यक्तिगत पुष्टि'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? 'Get personal confirmation and assistance from temple' 
                  : 'मंदिर से व्यक्तिगत पुष्टि और सहायता प्राप्त करें'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
