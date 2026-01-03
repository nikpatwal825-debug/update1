"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function MyNav() {
  const { language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = (key) => getTranslation(language, key);

  const navItems = [
    {
      name: t('nav.home'),
      link: "/",
    },
    {
      name: t('nav.about'),
      link: "/about",
    },
    {
      name: t('nav.visit'),
      link: "/howtoreachus",
    },
    {
      name: language === 'en' ? 'Services' : 'सेवाएं',
      link: "/services",
    },
    {
      name: t('nav.events'),
      link: "/events",
    },
    {
      name: t('nav.gallery'),
      link: "/media"
    },
    {
      name: t('nav.aarti'),
      link: "/aarti-pooja"
    },
    {
      name: t('nav.shop'),
      link:"/shop"
    },
    {
      name: t('nav.contact'),
      link: "/contact",
    }
  ];

  return (
    <div className="relative w-full bg-white shadow-sm z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />

          <div className="flex gap-4 items-center">
            <NavbarButton className="flex items-center justify-center bg-sandalwood hover:bg-deep-brown text-ivory border-sandalwood" variant="primary">
              <HeartIcon size={16} fill="currentColor" className="mr-2" />
              {t('nav.donate')}
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-deep-brown hover:text-sandalwood transition-colors font-light">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              {/* Language Switcher in Mobile */}
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full bg-sandalwood hover:bg-deep-brown text-ivory">
                <HeartIcon size={16} fill="currentColor" className="mr-2 inline" />
                {t('nav.donate')}
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
