import { useEffect, useState, useRef } from "react";
import "@/App.css";
import {
  Phone,
  MapPin,
  Clock,
  Scissors,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const LOGO = "/assets/new-logo-no-bg.png";
const STOREFRONT = "/assets/shop-front.png";
const HERO_BG = "/assets/barber-tools.jpg";

const PHONE = "773-685-7744";
const ADDRESS = "5812 Irving Park Rd, Chicago, IL 60634";
const SERVICES = [
  { name: "Fades", description: "Classic to skin fades" },
  { name: "Mohawk", description: "Bold statement cuts" },
  { name: "Linings", description: "Sharp edge-ups" },
  { name: "Blow Out", description: "Volume & style" },
  { name: "Eyebrows", description: "Clean shaping" },
  { name: "Razor Fades", description: "Ultra smooth finish" },
  { name: "Full Graphics", description: "Custom designs" },
];
const HOURS = [
  { day: "Monday - Friday", time: "10:00 AM - 7:00 PM" },
  { day: "Saturday", time: "9:00 AM - 6:00 PM" },
  { day: "Sunday", time: "9:00 AM - 4:00 PM" },
];
const GALLERY_IMAGES = [
  { src: "/assets/haircut-detail.jpg", alt: "Haircut detail" },
  { src: "/assets/gallery-1.jpeg", alt: "Cuts and style" },
  { src: "/assets/gallery-2.jpeg", alt: "Our work" },
  { src: "/assets/gallery-3.jpeg", alt: "Client cut" },
  { src: "/assets/gallery-4.jpeg", alt: "Fade and lineup" },
  { src: "/assets/gallery-5.jpeg", alt: "Gallery" },
  { src: "/assets/gallery-6.jpeg", alt: "Gallery" },
  { src: "/assets/gallery-7.jpeg", alt: "Gallery" },
  { src: STOREFRONT, alt: "Fade By Tom and Mario storefront" },
  { src: "/assets/gallery-interior-1.jpeg", alt: "Shop interior" },
  { src: "/assets/barber-tools.jpg", alt: "Barber tools" },
];

const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1, ...options });

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return [ref, isVisible];
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Hours", href: "#hours" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-barber-black/95 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <img src={LOGO} alt="Fade By Tom and Mario" className="h-12 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link font-oswald uppercase tracking-wider text-sm">
                {link.name}
              </a>
            ))}
          </div>

          <a
            href={`tel:${PHONE}`}
            data-testid="header-call-btn"
            className="hidden md:flex btn-skew bg-barber-red hover:bg-barber-red-dark text-white font-oswald uppercase tracking-wider px-6 py-3"
          >
            <span className="flex items-center gap-2">
              <Phone size={16} />
              Call Now
            </span>
          </a>

          <button
            data-testid="mobile-menu-btn"
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-barber-green/20">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-oswald uppercase tracking-wider text-white hover:text-barber-green-light"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={`tel:${PHONE}`}
                className="btn-skew bg-barber-red text-white font-oswald uppercase tracking-wider px-6 py-3 text-center mt-2"
              >
                <span>Call Now</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = () => (
  <section id="hero" data-testid="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${HERO_BG})` }} />
    <div className="hero-overlay absolute inset-0" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-barber-green/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-barber-red/10 rounded-full blur-3xl" />

    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <img src={LOGO} alt="Fade By Tom and Mario - Family Hair Salon" className="w-64 md:w-80 lg:w-96 mx-auto mb-8 animate-fade-in-up" data-testid="hero-logo" />
      <p className="font-oswald text-barber-green-light tracking-[0.3em] uppercase text-sm md:text-base mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        Family Hair Salon
      </p>
      <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide mb-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        Classic Cuts, Modern Vibe
      </h1>
      <p className="font-manrope text-white/80 text-base md:text-lg mb-10 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        Men • Women • Kids — Chicago&apos;s trusted barbershop since day one
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <a href={`tel:${PHONE}`} data-testid="hero-call-btn" className="btn-skew bg-barber-red hover:bg-barber-red-dark text-white font-oswald uppercase tracking-wider px-8 py-4 text-lg">
          <span className="flex items-center justify-center gap-2">
            <Phone size={20} />
            Call to Book
          </span>
        </a>
        <a href="#services" data-testid="hero-services-btn" className="border-2 border-barber-green text-barber-green-light hover:bg-barber-green hover:text-white font-oswald uppercase tracking-wider px-8 py-4 text-lg transition-colors duration-300">
          View Services
        </a>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown className="text-barber-green-light" size={32} />
    </div>
  </section>
);

const AboutSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="about" data-testid="about-section" ref={ref} className="py-20 md:py-32 bg-barber-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`fade-in-section ${isVisible ? "visible" : ""}`}>
            <img src={STOREFRONT} alt="Fade By Tom and Mario Storefront" className="w-full h-auto rounded-sm gallery-image" data-testid="about-image" />
          </div>
          <div className={`fade-in-section stagger-2 ${isVisible ? "visible" : ""}`}>
            <img src={LOGO} alt="" className="h-10 w-auto mb-4 opacity-90" aria-hidden="true" />
            <span className="section-subtitle">Our Story</span>
            <div className="gold-divider" />
            <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-6">Where Tradition Meets Style</h2>
            <p className="font-manrope text-white/80 leading-relaxed mb-6">
              Located in the heart of Chicago&apos;s Irving Park neighborhood, Fade By Tom and Mario has been serving families with precision cuts and quality grooming for years. Our skilled barbers bring expertise, passion, and a welcoming atmosphere to every visit.
            </p>
            <p className="font-manrope text-white/80 leading-relaxed mb-8">
              Whether you&apos;re looking for a classic fade, bold mohawk, or intricate graphic design, our team delivers with attention to detail and care for every client — men, women, and kids alike.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="border-l-2 border-barber-green pl-4">
                <span className="font-oswald text-3xl text-barber-green-light">15+</span>
                <p className="font-manrope text-white/60 text-sm">Years Experience</p>
              </div>
              <div className="border-l-2 border-barber-green pl-4">
                <span className="font-oswald text-3xl text-barber-green-light">5000+</span>
                <p className="font-manrope text-white/60 text-sm">Happy Clients</p>
              </div>
              <div className="border-l-2 border-barber-green pl-4">
                <span className="font-oswald text-3xl text-barber-green-light">7</span>
                <p className="font-manrope text-white/60 text-sm">Expert Barbers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="services" data-testid="services-section" ref={ref} className="py-20 md:py-32 bg-barber-gray relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 fade-in-section ${isVisible ? "visible" : ""}`}>
          <span className="section-subtitle">What We Offer</span>
          <div className="gold-divider mx-auto" />
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">Our Services</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <div key={service.name} data-testid={`service-card-${service.name.toLowerCase().replace(" ", "-")}`} className={`service-card p-8 fade-in-section stagger-${index + 1} ${isVisible ? "visible" : ""}`}>
              <Scissors className="text-barber-green-light mb-4" size={32} />
              <h3 className="font-oswald text-xl uppercase tracking-wide text-white mb-2">{service.name}</h3>
              <p className="font-manrope text-white/60 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        <div className={`text-center mt-12 fade-in-section stagger-7 ${isVisible ? "visible" : ""}`}>
          <a href={`tel:${PHONE}`} data-testid="services-call-btn" className="btn-skew inline-block bg-barber-red hover:bg-barber-red-dark text-white font-oswald uppercase tracking-wider px-10 py-4">
            <span className="flex items-center gap-2">
              <Phone size={18} />
              Book Your Appointment
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [slideIndex, setSlideIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const totalSlides = GALLERY_IMAGES.length;

  useEffect(() => {
    const updateSlidesPerView = () => setSlidesPerView(window.innerWidth < 768 ? 1 : 3);
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => (current <= 0 ? totalSlides - 1 : current - 1));
      if (event.key === "ArrowRight") setLightboxIndex((current) => (current >= totalSlides - 1 ? 0 : current + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, totalSlides]);

  return (
    <section id="gallery" data-testid="gallery-section" ref={ref} className="py-20 md:py-32 bg-barber-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 fade-in-section ${isVisible ? "visible" : ""}`}>
          <span className="section-subtitle">Our Work</span>
          <div className="gold-divider mx-auto" />
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">Gallery</h2>
        </div>

        <div className={`fade-in-section ${isVisible ? "visible" : ""}`}>
          <div className="relative flex items-center gap-4 md:gap-6">
            <button type="button" onClick={() => setSlideIndex((current) => (current <= 0 ? totalSlides - 1 : current - 1))} className="flex-shrink-0 p-2 rounded-full border border-white/10 text-white/70 hover:text-barber-green-light hover:border-barber-green/50 hover:bg-white/5 transition-all z-10" aria-label="Previous slide">
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="gallery-slide-track flex transition-transform duration-500 ease-out" style={{ width: `${(totalSlides / slidesPerView) * 100}%`, transform: `translateX(-${(slideIndex / totalSlides) * 100}%)` }}>
                {GALLERY_IMAGES.map((image, index) => (
                  <div key={image.src} className="gallery-slide flex-shrink-0 px-1 md:px-2" style={{ width: `${100 / totalSlides}%` }}>
                    <button type="button" onClick={() => setLightboxIndex(index)} className="w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-md border border-white/10 bg-barber-gray gallery-tile gallery-slide-tile block focus:outline-none focus-visible:ring-2 focus-visible:ring-barber-green focus-visible:ring-offset-2 focus-visible:ring-offset-barber-black">
                      <img src={image.src} alt={image.alt} className="w-full h-full object-cover gallery-image" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" onClick={() => setSlideIndex((current) => (current >= totalSlides - 1 ? 0 : current + 1))} className="flex-shrink-0 p-2 rounded-full border border-white/10 text-white/70 hover:text-barber-green-light hover:border-barber-green/50 hover:bg-white/5 transition-all z-10" aria-label="Next slide">
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-6" aria-hidden="true">
            {GALLERY_IMAGES.map((image, index) => (
              <button key={`dot-${image.src}`} type="button" onClick={() => setSlideIndex(index)} className={`h-1.5 rounded-full transition-all duration-300 ${index === slideIndex ? "w-6 bg-barber-green" : "w-1.5 bg-white/30 hover:bg-white/50"}`} aria-label={`Go to slide ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4" role="dialog" aria-modal="true" aria-label="Image gallery lightbox" onClick={() => setLightboxIndex(null)}>
          <button type="button" onClick={(event) => { event.stopPropagation(); setLightboxIndex((current) => (current <= 0 ? totalSlides - 1 : current - 1)); }} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full text-white/80 hover:text-barber-green-light hover:bg-white/10 transition-colors z-10" aria-label="Previous image">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img src={GALLERY_IMAGES[lightboxIndex].src} alt={GALLERY_IMAGES[lightboxIndex].alt} className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded shadow-2xl" onClick={(event) => event.stopPropagation()} />
          <button type="button" onClick={(event) => { event.stopPropagation(); setLightboxIndex((current) => (current >= totalSlides - 1 ? 0 : current + 1)); }} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 rounded-full text-white/80 hover:text-barber-green-light hover:bg-white/10 transition-colors z-10" aria-label="Next image">
            <ChevronRight className="w-8 h-8" />
          </button>
          <button type="button" onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors z-10" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

const HoursContactSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="hours" data-testid="hours-section" ref={ref} className="py-20 md:py-32 bg-barber-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className={`fade-in-section ${isVisible ? "visible" : ""}`}>
            <div className="relative h-80 lg:h-full min-h-[400px] overflow-hidden rounded-sm">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.467360336986!2d-87.77258692346624!3d41.95085997123366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fcba9e1fc36a7%3A0x1234567890!2s5812%20W%20Irving%20Park%20Rd%2C%20Chicago%2C%20IL%2060634!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Fade By Tom and Mario Location" className="map-grayscale absolute inset-0" data-testid="google-map" />
            </div>
          </div>
          <div className={`fade-in-section stagger-2 ${isVisible ? "visible" : ""}`} id="contact">
            <span className="section-subtitle">Visit Us</span>
            <div className="gold-divider" />
            <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-8">Hours & Location</h2>
            <div className="space-y-6 mb-10">
              <a href={`tel:${PHONE}`} data-testid="contact-phone" className="flex items-center gap-4 group">
                <div className="contact-icon"><Phone size={24} /></div>
                <div>
                  <p className="font-oswald text-white/60 uppercase tracking-wider text-sm">Phone</p>
                  <p className="font-manrope text-white text-lg group-hover:text-barber-green-light transition-colors duration-300">{PHONE}</p>
                </div>
              </a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer" data-testid="contact-address" className="flex items-center gap-4 group">
                <div className="contact-icon"><MapPin size={24} /></div>
                <div>
                  <p className="font-oswald text-white/60 uppercase tracking-wider text-sm">Address</p>
                  <p className="font-manrope text-white text-lg group-hover:text-barber-green-light transition-colors duration-300">{ADDRESS}</p>
                </div>
              </a>
            </div>
            <div className="bg-barber-card border border-barber-green/20 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-barber-green-light" size={24} />
                <h3 className="font-oswald text-xl uppercase tracking-wider text-white">Business Hours</h3>
              </div>
              <div data-testid="hours-list">
                {HOURS.map((item, index) => (
                  <div key={item.day} className="hours-row" data-testid={`hours-row-${index}`}>
                    <span className="font-manrope text-white/80">{item.day}</span>
                    <span className={`font-oswald tracking-wide ${item.time === "Closed" ? "text-barber-red" : "text-barber-green-light"}`}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer data-testid="footer" className="bg-barber-black py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <img src={LOGO} alt="Fade By Tom and Mario" className="h-16 w-auto" />
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <a href={`tel:${PHONE}`} className="font-manrope text-white/80 hover:text-barber-green-light transition-colors duration-300">{PHONE}</a>
          <span className="hidden md:block text-white/40">|</span>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noopener noreferrer" className="font-manrope text-white/80 hover:text-barber-green-light transition-colors duration-300 text-center md:text-left">{ADDRESS}</a>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 text-center">
        <p className="font-manrope text-white/50 text-sm">© {new Date().getFullYear()} Fade By Tom and Mario - Family Hair Salon. All rights reserved.</p>
        <p className="font-manrope text-white/40 text-xs mt-2">Men • Women • Kids — Serving Chicago with Pride</p>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-barber-black">
      <div className="grain-overlay" />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <HoursContactSection />
      </main>
      <div className="barber-pole-strip" data-testid="footer-barber-pole" />
      <Footer />
    </div>
  );
}

export default App;
