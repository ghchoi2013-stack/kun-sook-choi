/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Moon, 
  Menu, 
  X, 
  ChevronRight,
  ShoppingBag,
  Compass,
  Zap,
  Lock,
  Download,
  Search,
  Star,
  Globe
} from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import AdminDashboard from './components/AdminDashboard';
import { cn } from './lib/utils';

function MainContent() {
  const { config, resources } = useApp();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'dream' | 'idea' | 'sound' | 'object'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const filteredResources = resources.filter(item => {
    const matchesFilter = filter === 'all' ? true : item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0502] text-white selection:bg-primary/30 selection:text-white font-sans overflow-x-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-900/10 blur-[150px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif italic text-2xl tracking-tight text-white">{config.brandName}</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <NavLink href="#store">점포 둘러보기</NavLink>
            <NavLink href="#about">우리의 철학</NavLink>
            <NavLink href="#contact">상상 의뢰</NavLink>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-primary"
            >
              <Lock className="w-5 h-5" />
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section - Surreal Split Layout */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center pt-24 overflow-hidden">
        {/* Left Pane: Typography */}
        <div className="flex-1 px-6 lg:pl-24 z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-8">
              Established in the Void
            </span>
            <h1 className="text-7xl md:text-[12rem] font-serif font-light tracking-tighter leading-[0.8] mb-12 text-white mix-blend-difference">
              {config.heroTitle.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-white/40 max-w-lg mb-16 font-light leading-relaxed italic">
              "{config.heroSubtitle}"
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <button className="group relative px-12 py-6 rounded-full overflow-hidden transition-all duration-500">
                <div className="absolute inset-0 bg-white group-hover:bg-primary transition-colors duration-500" />
                <span className="relative z-10 text-black group-hover:text-white font-bold text-lg flex items-center gap-3">
                  점포 입장하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
              <button className="text-white/40 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors flex items-center gap-2">
                <Globe className="w-4 h-4" />
                상상력 기부 안내
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Pane: Visual Object */}
        <div className="flex-1 relative h-[600px] w-full lg:h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="relative w-80 h-80 md:w-[500px] md:h-[500px]"
          >
            {/* Abstract Surreal Object */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-purple-900/40 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-10 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute inset-20 border border-accent/20 rounded-full animate-[spin_15s_linear_infinite]" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  y: [0, -30, 0],
                  rotateY: [0, 180, 360]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-40 h-40 md:w-64 md:h-64 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-2xl flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Sparkles className="w-20 h-20 md:w-32 md:h-32 text-white/20" />
              </motion.div>
            </div>

            {/* Floating Particles */}
            <FloatingParticle className="top-0 left-0 w-4 h-4 bg-primary" delay={0} />
            <FloatingParticle className="bottom-20 right-0 w-3 h-3 bg-accent" delay={1} />
            <FloatingParticle className="top-40 right-20 w-2 h-2 bg-white" delay={2} />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] vertical-rl">Scroll</span>
          <div className="w-px h-12 bg-white" />
        </motion.div>
      </section>

      {/* Marquee - Trending Imaginations */}
      <div className="py-12 border-y border-white/5 bg-white/5 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-serif italic text-2xl text-white/20">
              {resources[i % resources.length].title} • {resources[i % resources.length].category}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Store Section */}
      <section id="store" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-serif italic mb-6">현재 판매 중인 상상</h2>
              <p className="text-white/40 text-lg">모든 제품은 단 하나의 영감으로 이루어져 있으며, 구매 시 당신의 의식 속으로 전송됩니다.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="상상 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-primary/50 w-full sm:w-72 transition-all backdrop-blur-sm"
                />
              </div>
              <div className="flex p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>전체</FilterButton>
                <FilterButton active={filter === 'dream'} onClick={() => setFilter('dream')}>꿈</FilterButton>
                <FilterButton active={filter === 'idea'} onClick={() => setFilter('idea')}>아이디어</FilterButton>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredResources.map((item) => (
                <ResourceCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className="py-32 bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-6 block">Our Philosophy</span>
              <h2 className="text-4xl md:text-7xl font-serif leading-tight mb-10">상상은 가장 강력한 실체입니다.</h2>
              <p className="text-white/60 text-xl leading-relaxed mb-12">
                우리는 눈에 보이는 것만이 진실이라고 믿지 않습니다. 
                모든 위대한 발명과 예술은 누군가의 머릿속에만 존재하던 작은 상상에서 시작되었습니다. 
                상상력 점포는 그 보이지 않는 씨앗을 소중히 여기고 가꿉니다.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="border-l border-primary/30 pl-6">
                  <div className="text-3xl font-serif mb-2">99%</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">영감 순도</div>
                </div>
                <div className="border-l border-primary/30 pl-6">
                  <div className="text-3xl font-serif mb-2">∞</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">확장 가능성</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-3xl blur-3xl animate-pulse" />
              <div className="relative h-full w-full border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl flex items-center justify-center">
                <Globe className="w-48 h-48 text-white/10 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border border-primary/50 rounded-full animate-ping" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-6 block">Inquiry</span>
              <h2 className="text-4xl md:text-7xl font-serif leading-tight mb-10 italic">
                당신만의 상상을<br />현실로 만드세요
              </h2>
              <p className="text-white/60 text-xl leading-relaxed mb-12 font-light">
                세상에 없는 이야기, 꿈속의 풍경, 미래의 아이디어까지. 
                우리의 상상력 장인들이 당신의 의뢰를 기다립니다. 
                아래 양식을 통해 당신의 상상을 들려주세요.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg">글로벌 네트워크</h4>
                    <p className="text-white/40 text-sm">전 세계 몽상가들과 연결됩니다.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg">맞춤형 제작</h4>
                    <p className="text-white/40 text-sm">당신의 의식에 가장 적합한 형태로 제작합니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full -z-10" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-8 h-8 text-primary" />
                <span className="font-serif italic text-3xl tracking-tight text-white">{config.brandName}</span>
              </div>
              <p className="text-white/40 max-w-sm mb-10 leading-relaxed">
                우리는 보이지 않는 가치를 믿습니다. 
                당신의 상상이 멈추지 않도록, 상상력 점포가 함께합니다.
              </p>
            </div>
            
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/30 mb-8">Navigation</h4>
              <ul className="space-y-5 text-white/50 font-light">
                <li><a href="#store" className="hover:text-primary transition-colors">점포 둘러보기</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">우리의 철학</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">상상 의뢰</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/30 mb-8">Contact</h4>
              <ul className="space-y-5 text-white/50 font-light">
                <li>hello@imagination.store</li>
                <li>상상구 꿈길 123-45</li>
                <li>00:00 - 24:00 (꿈속 상담 가능)</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/20 font-mono">
            <p>© 2024 {config.brandName}. All rights reserved.</p>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    content: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('https://formspree.io/f/mykbekkb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', content: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('idle');
        alert('의뢰 제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      setStatus('idle');
      alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 text-center"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-3xl font-serif italic mb-4">의뢰가 접수되었습니다</h3>
        <p className="text-white/40">당신의 상상이 곧 현실로 다가갈 것입니다. 잠시만 기다려주세요.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-2">이름</label>
          <input 
            required
            name="name"
            type="text" 
            placeholder="성함을 입력하세요"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors font-light"
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-2">이메일</label>
          <input 
            required
            name="email"
            type="email" 
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors font-light"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-2">핸드폰 번호</label>
        <input 
          required
          name="phone"
          type="tel" 
          placeholder="010-0000-0000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors font-light"
        />
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-2">상상 내용</label>
        <textarea 
          required
          name="content"
          rows={5}
          placeholder="당신이 꿈꾸는 상상을 자유롭게 들려주세요..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors font-light resize-none"
        />
      </div>

      <button 
        disabled={status === 'submitting'}
        className="w-full bg-white text-black py-6 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
      >
        {status === 'submitting' ? (
          <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Compass className="w-6 h-6" />
            상상 의뢰하기
          </>
        )}
      </button>
    </form>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-xs font-bold text-white/40 hover:text-white transition-colors tracking-[0.2em] uppercase"
    >
      {children}
    </a>
  );
}

function FloatingParticle({ className, delay }: { className: string, delay: number }) {
  return (
    <motion.div 
      animate={{ 
        y: [0, -40, 0],
        x: [0, 20, 0],
        opacity: [0.2, 0.5, 0.2]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      className={cn("absolute rounded-full", className)}
    />
  );
}

function FloatingElement({ className, delay }: { className: string, delay: number }) {
  return (
    <motion.div 
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 5, 0]
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      className={cn("absolute rounded-full pointer-events-none", className)}
    />
  );
}

function FilterButton({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-8 py-2.5 rounded-full text-xs font-bold transition-all tracking-widest uppercase",
        active ? "bg-white text-black shadow-xl" : "text-white/40 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

const ResourceCard: React.FC<{ item: any }> = ({ item }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:border-primary/50 transition-all duration-500 backdrop-blur-xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-start justify-between mb-10 relative z-10">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner",
          item.category === 'dream' ? "bg-purple-500/10 text-purple-400" : 
          item.category === 'idea' ? "bg-orange-500/10 text-orange-400" : 
          item.category === 'sound' ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"
        )}>
          {item.category === 'dream' ? <Moon className="w-7 h-7" /> : 
           item.category === 'idea' ? <Zap className="w-7 h-7" /> : 
           item.category === 'sound' ? <Compass className="w-7 h-7" /> : <Star className="w-7 h-7" />}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">{item.date}</span>
      </div>
      
      <h3 className="text-2xl font-serif italic text-white mb-4 group-hover:text-primary transition-colors relative z-10">{item.title}</h3>
      <p className="text-white/40 text-sm line-clamp-2 mb-10 leading-relaxed font-light relative z-10">{item.description}</p>
      
      <div className="flex items-center justify-between pt-8 border-t border-white/5 relative z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          {item.category}
        </span>
        <button className="flex items-center gap-2 text-xs font-bold text-white group/btn">
          <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
          상상 구매
        </button>
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
