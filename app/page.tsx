'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-RULE
// Typography Personality: oversized

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Palette,
  Package,
  Zap,
  Camera,
  Layers,
  MapPin,
  ArrowRight,
  CheckCheck,
  Loader2,
  Menu,
  X,
  Instagram,
  Phone,
  Mail,
  ImageOff,
  ExternalLink
} from 'lucide-react';

// --- Types ---
interface Stat { number: string; label: string; icon?: any; }
interface Step { number: string; title: string; description: string; }
interface Product { name: string; description: string; price: string; image_url: string; }
interface Feature { title: string; description: string; icon: string; }

// --- Hooks ---
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- Components ---
function SafeImage({ src, alt, fill, width, height, className, priority, sizes }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={24} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className}
      priority={priority}
      sizes={sizes || (fill ? "(max-width: 768px) 100vw, 50vw" : undefined)}
      onError={() => setError(true)}
    />
  );
}

const IconMap: any = { Palette, Package, Zap, Camera, Layers, MapPin };

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand = {
    name: "Home of Effects",
    tagline: "I Help Business Owners Stand Out",
    description: "A premier props and decor studio specializing in editorial set design and unique rentals. We transform ordinary brand identities into cinematic visual experiences through curated aesthetics and couture-level craftsmanship.",
    industry: "Services",
    region: "Nigeria"
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Prop Vault", href: "#products" },
    { name: "Location", href: "#map" },
    { name: "Member Portal", href: "https://t.me/+8_loMZ1kj4kwODk0", highlight: true }
  ];

  const features: Feature[] = [
    { title: "Studio Design", description: "Creative set design for brands and professional productions.", icon: "Palette" },
    { title: "Prop Hire", description: "Access our curated vault of unique backdrops and textures.", icon: "Package" },
    { title: "Bulk Deals", description: "Exclusive pricing and early access via our Telegram channel.", icon: "Zap" }
  ];

  const products: Product[] = [
    { name: "Grand Roman Pillar Set", description: "Architectural Roman-style pillars for high-fashion photography and premium set builds.", price: "₦45,000", image_url: "/props/pillars.png" },
    { name: "Iridescent Backdrop Panel", description: "A 10x10 light-reactive panel that shifts colors under studio flash, perfect for modern brand shoots.", price: "₦35,000", image_url: "/props/backdrop.png" },
    { name: "Velvet Studio Chaise", description: "Custom-designed prop furniture in Deep Obsidian, built for editorial posing and comfort.", price: "₦65,000", image_url: "/props/chaise.png" }
  ];

  const stats: Stat[] = [
    { number: "500+", label: "Sets Built", icon: "Camera" },
    { number: "120+", label: "Unique Props", icon: "Layers" },
    { number: "1", label: "Okota Showroom", icon: "MapPin" }
  ];

  const steps: Step[] = [
    { number: "01", title: "Consultation", description: "We analyze your brand vibe and visual goals for the project." },
    { number: "02", title: "Curation", description: "We select the perfect props and textures from our Okota vault." },
    { number: "03", title: "Execution", description: "On-site set decoration or prop delivery for your production." }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: featRef, isVisible: featVisible } = useScrollReveal();
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { ref: processRef, isVisible: processVisible } = useScrollReveal();
  const { ref: prodRef, isVisible: prodVisible } = useScrollReveal();
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal();

  return (
    <main className="relative">
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/90 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-heading text-xl font-black tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary flex items-center justify-center rounded-sm">
              <span className="text-primary text-xs">H</span>
            </div>
            <span>Home of Effects</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors hover:text-secondary ${link.highlight ? 'bg-secondary text-primary px-4 py-2 rounded-full hover:bg-white hover:text-primary' : 'text-white/70'}`}
                {...(link.highlight ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-end">
          <button onClick={() => setMobileMenuOpen(false)}><X size={32} className="text-secondary" /></button>
        </div>
        <nav className="flex flex-col items-center gap-10 mt-20 px-6 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-heading font-black text-white hover:text-secondary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Hero: HR-C Pattern */}
      <section id="hero" ref={heroRef} className="min-h-screen grid md:grid-cols-[1.1fr_0.9fr] items-stretch bg-primary overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-20 py-32 relative">
          <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-12'}`}>
            <p className="text-secondary font-mono text-xs tracking-[0.4em] uppercase mb-8">
              Services & Prop Rentals
            </p>
            <h1 className="font-heading text-4xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              The Couture Studio for Brand Visionaries
            </h1>
            <p className="text-white/40 mt-10 text-lg md:text-xl max-w-md leading-relaxed font-medium">
              Transforming spaces. Defining styles. We don&apos;t just decorate; we help your business stand out in a crowded market.
            </p>
            <div className="mt-12 flex flex-wrap gap-6">
              <a href="#products" className="bg-secondary text-primary px-10 py-5 font-black text-lg hover:brightness-110 hover:scale-[1.03] transition-all rounded-full">
                View Prop Vault
              </a>
              <a href="#contact" className="border border-white/20 text-white px-10 py-5 font-bold hover:bg-white/5 transition-all rounded-full">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
        <div className={`relative hidden md:block transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
          <SafeImage
            src="/hero.png"
            alt="Photography Studio"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/10 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(191,148,255,0.08)_0%,transparent_70%)] pointer-events-none" />
        </div>
      </section>

      {/* Features: F-BENTO Pattern */}
      <section id="features" ref={featRef} className="py-28 px-6 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-700 ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading text-4xl md:text-7xl font-black text-white">Studio Services</h2>
            <p className="text-white/40 mt-4 text-lg md:text-xl">Professional set solutions tailored for impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Bento Card */}
            <div className={`md:col-span-2 bg-primary border border-white/5 rounded-[2rem] p-12 hover:border-secondary/40 transition-all duration-500 group flex flex-col justify-between min-h-[400px] ${featVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Palette size={32} />
              </div>
              <div>
                <h3 className="font-heading text-2xl md:text-4xl font-black text-white mt-10">Set Decoration</h3>
                <p className="text-white/50 text-lg mt-4 max-w-md">Creative design for brands looking to build an immersive world around their products. We handle the aesthetics so you can focus on the vision.</p>
              </div>
            </div>

            {/* Side Bento Cards */}
            <div className="space-y-6">
              {features.slice(1).map((f, i) => {
                const Icon = IconMap[f.icon] || Zap;
                return (
                  <div key={i} className={`bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between min-h-[190px] ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white">{f.title}</h3>
                      <p className="text-white/40 text-sm mt-2">{f.description}</p>
                    </div>
                  </div>
                );
              })}
              {/* Telegram Signature Box */}
              <a href="https://t.me/+8_loMZ1kj4kwODk0" target="_blank" rel="noopener noreferrer" className={`block bg-secondary p-8 rounded-[2rem] group hover:brightness-110 transition-all ${featVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
                <div className="flex justify-between items-start">
                  <Zap className="text-primary fill-primary" />
                  <ExternalLink size={20} className="text-primary/50 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-primary font-black mt-4 text-lg">Join Exclusive Telegram Portal</p>
                <p className="text-primary/60 text-xs mt-1 uppercase font-bold tracking-widest">Wholesale Access</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section: V3 Horizontal Split */}
      <section id="about" ref={aboutRef} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className={`w-full md:w-1/2 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[0.9] mb-8 md:mb-10">
              The Editorial Standard
            </h2>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-10 md:mb-12">
              Located in the heart of Okota Road, Home of Effects is where artistry meets commercial strategy. We believe that every business owner deserves to stand out, and our mission is to provide the props, decor, and set direction that make it happen.
            </p>
            <p className="text-secondary font-bold text-sm uppercase tracking-widest flex items-center gap-4 mb-12">
              <span className="w-12 h-px bg-secondary" /> Lagos-based craftsmanship
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {stats.map((s, i) => (
                <div key={i} className={`transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                  <p className="font-heading text-4xl font-black text-white">{s.number}</p>
                  <p className="text-white/40 text-xs uppercase tracking-[0.2em] mt-2 font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`w-full md:w-1/2 relative aspect-square rounded-[3rem] overflow-hidden transition-all duration-1000 delay-300 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <SafeImage
              src="https://images.unsplash.com/photo-1581495009654-777d243766e8"
              alt="Studio Workspace"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-secondary/10 mix-blend-overlay" />
          </div>
        </div>
      </section>

      {/* Process Section: Linear Counter Rise */}
      <section ref={processRef} className="py-28 px-6 bg-secondary/10 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-black text-white">How We Build Your World</h2>
            <p className="text-white/40 text-base md:text-lg mt-2">Our linear approach to set perfection.</p>
          </div>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className={`flex gap-10 items-start group transition-all duration-1000 ${processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="font-heading text-5xl md:text-7xl font-black text-secondary/20 group-hover:text-secondary/50 transition-colors shrink-0 leading-none">
                  {step.number}
                </div>
                <div className="pt-2 border-l border-white/10 pl-10">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white group-hover:text-secondary transition-colors">{step.title}</h3>
                  <p className="text-white/50 mt-3 text-lg leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products: P-EDITORIAL Pattern */}
      <section id="products" ref={prodRef} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className={`${prodVisible ? 'animate-slideUp' : 'opacity-0'}`}>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white">Prop Vault</h2>
              <p className="text-white/40 mt-4 text-xl">Select pieces for your next production.</p>
            </div>
            <a href="https://t.me/+8_loMZ1kj4kwODk0" className="text-secondary font-mono text-sm border-b border-secondary/30 pb-2 hover:border-secondary transition-all">
              Request Wholesale Catalog →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <div key={i} className={`group relative h-[500px] rounded-[2.5rem] overflow-hidden transition-all duration-700 ${prodVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <SafeImage
                  src={p.image_url}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-[1.5s]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
                  <p className="text-secondary font-black text-2xl mb-2">{p.price}</p>
                  <h3 className="font-heading text-3xl font-black text-white leading-tight">{p.name}</h3>
                  <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500">
                    <p className="text-white/60 mt-4 text-sm leading-relaxed">{p.description}</p>
                  </div>
                  <button className="mt-8 bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-secondary hover:text-primary transition-all w-full">
                    Reserve Prop
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-white/30 text-sm italic italic-none">Sharp set delivery, Lagos-wide.</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-28 px-6 bg-secondary/5 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-primary/50 p-10 rounded-[3rem] border border-white/5">
              <h2 className="font-heading text-2xl md:text-5xl font-black text-white mb-6">Visit the Showroom</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="text-secondary shrink-0" />
                  <div>
                    <p className="text-white font-bold text-lg">Location</p>
                    <p className="text-white/50">Okota Road Showroom, Okota, Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-secondary shrink-0" />
                  <div>
                    <p className="text-white font-bold text-lg">WhatsApp Inquiry</p>
                    <p className="text-white/50">09136415504</p>
                  </div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Okota+Road+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 bg-white/5 text-white px-8 py-4 rounded-2xl font-bold hover:bg-secondary hover:text-primary transition-all"
              >
                Get Directions <ArrowRight size={18} />
              </a>
            </div>
            <div className="h-[450px] bg-zinc-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
              <SafeImage
                src="https://images.unsplash.com/photo-1682542686319-393272073c6d"
                alt="Showroom Location"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-secondary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary/80 backdrop-blur-md p-6 rounded-full border border-secondary/30 animate-float">
                  <MapPin size={40} className="text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section: C3 Minimal Centered */}
      <section id="contact" ref={contactRef} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[radial-gradient(circle_at_center,rgba(191,148,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-4xl md:text-6xl font-black text-white mb-6">Connect</h2>
            <p className="text-white/40 mb-10 md:mb-16 text-lg md:text-xl">Start your next production here.</p>

            {sent ? (
              <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-zinc-900/50 rounded-[3rem] border border-secondary/20 shadow-2xl relative overflow-hidden">
                <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/40">
                  <CheckCheck size={40} className="text-secondary" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white mb-4">Message Sent</h3>
                <p className="text-white/60 text-lg">Our studio team will review your inquiry and respond shortly.</p>
                <button onClick={() => setSent(false)} className="mt-8 text-secondary font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 text-left bg-zinc-900/40 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/5 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-4">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 outline-none focus:border-secondary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-4">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 0913..."
                      value={form.phone}
                      onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 outline-none focus:border-secondary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-4">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Describe your vision or inquiry..."
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 outline-none resize-none focus:border-secondary transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary text-primary py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all disabled:opacity-50 flex justify-center items-center gap-3 shadow-[0_10px_40px_rgba(191,148,255,0.2)]"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer: F2 Pattern */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
          <div className="md:col-span-2">
            <a href="#" className="font-heading text-3xl font-black tracking-tighter text-white flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-sm">
                <span className="text-primary text-sm">H</span>
              </div>
              <span>Home of Effects</span>
            </a>
            <p className="text-white/40 text-lg max-w-sm mb-10 leading-relaxed">
              Curating aesthetics and couture-level craftsmanship for the visionaries of Nigeria&apos;s brand landscape.
            </p>
            <div className="flex gap-6">
              <a href="https://instagram.com/_homeofeffects" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-secondary hover:border-secondary transition-all">
                <Instagram size={20} />
              </a>
              <a href={`https://wa.me/09136415504`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-secondary hover:border-secondary transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#hero" className="text-white/40 hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="text-white/40 hover:text-white transition-colors">Prop Vault</a></li>
              <li><a href="#map" className="text-white/40 hover:text-white transition-colors">Showroom</a></li>
              <li><a href="#contact" className="text-white/40 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-widest text-xs">Studio</h4>
            <p className="text-white/40 leading-relaxed mb-6">
              Okota Road Showroom,<br />Okota, Lagos, Nigeria
            </p>
            <a href="https://t.me/+8_loMZ1kj4kwODk0" className="bg-secondary/10 text-secondary border border-secondary/20 px-4 py-2 rounded-lg text-sm font-bold inline-block hover:bg-secondary hover:text-primary transition-all">
              Telegram Portal
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-medium tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Home of Effects Studio. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-mono text-white/10 tracking-[0.4em] uppercase">Okota &bull; Lagos</span>
          </div>
        </div>
      </footer>
    </main>
  );
}