import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3,
  TrendingUp,
  Users,
  ClipboardList,
  Bell,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: '1월', value: 120 },
  { name: '2월', value: 150 },
  { name: '3월', value: 210 },
  { name: '4월', value: 180 },
  { name: '5월', value: 250 },
  { name: '6월', value: 320 },
];

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const { config, resources, updateConfig, addResource, deleteResource } = useApp();
  const [activeTab, setActiveTab] = useState<'stats' | 'cms' | 'theme'>('stats');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0a0502] text-white flex"
    >
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif italic text-lg tracking-tight">상상력 점포 관리</span>
        </div>

        <nav className="flex flex-col gap-2">
          <TabButton 
            active={activeTab === 'stats'} 
            onClick={() => setActiveTab('stats')}
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="점포 현황"
          />
          <TabButton 
            active={activeTab === 'cms'} 
            onClick={() => setActiveTab('cms')}
            icon={<Sparkles className="w-5 h-5" />}
            label="상상력 재고 관리"
          />
          <TabButton 
            active={activeTab === 'theme'} 
            onClick={() => setActiveTab('theme')}
            icon={<Settings className="w-5 h-5" />}
            label="점포 설정"
          />
        </nav>

        <button 
          onClick={onClose}
          className="mt-auto flex items-center gap-2 text-white/40 hover:text-primary transition-colors p-2 font-mono text-xs uppercase tracking-widest"
        >
          <LogOut className="w-5 h-5" />
          <span>점포 나가기</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'stats' && (
            <motion.div 
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif italic">점포 현황</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard icon={<Sparkles />} label="보유한 상상" value={resources.length} color="text-primary" />
                <StatCard icon={<Users />} label="방문한 몽상가" value="4,521" color="text-blue-400" />
                <StatCard icon={<Bell />} label="상상 의뢰" value="12" color="text-accent" />
                <StatCard icon={<TrendingUp />} label="상상 거래량" value="892" color="text-green-400" />
              </div>

              <div className="glass-card p-8 h-[450px]">
                <h3 className="text-xl font-serif italic mb-8">월별 상상 거래 추이</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1614', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }}
                      itemStyle={{ color: '#8B5CF6' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {activeTab === 'cms' && (
            <motion.div 
              key="cms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-serif italic">상상력 재고 관리</h2>
                <button 
                  onClick={() => {
                    const newItem = {
                      id: Date.now().toString(),
                      title: '새로운 상상',
                      category: 'idea' as const,
                      description: '이 상상에 대한 신비로운 설명을 입력하세요.',
                      date: new Date().toISOString().split('T')[0]
                    };
                    addResource(newItem);
                  }}
                  className="bg-white text-black hover:bg-primary hover:text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all font-bold"
                >
                  <Plus className="w-5 h-5" />
                  <span>상상 추가</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {resources.map(item => (
                  <div key={item.id} className="glass-card p-6 flex items-center justify-between group hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10",
                        item.category === 'dream' ? "bg-purple-500/20 text-purple-400" : 
                        item.category === 'idea' ? "bg-blue-500/20 text-blue-400" : 
                        item.category === 'sound' ? "bg-orange-500/20 text-orange-400" : "bg-pink-500/20 text-pink-400"
                      )}>
                        <Sparkles className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">{item.category}</span>
                          <span className="text-[10px] font-mono text-white/20">{item.date}</span>
                        </div>
                        <h4 className="font-serif text-xl">{item.title}</h4>
                        <p className="text-sm text-white/40 italic">"{item.description}"</p>
                      </div>
                    </div>
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-3 hover:bg-white/10 rounded-full transition-colors"><Edit3 className="w-5 h-5" /></button>
                      <button 
                        onClick={() => deleteResource(item.id)}
                        className="p-3 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'theme' && (
            <motion.div 
              key="theme"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 max-w-2xl"
            >
              <h2 className="text-4xl font-serif italic">점포 설정</h2>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/40">점포 명칭</label>
                  <input 
                    type="text" 
                    value={config.brandName}
                    onChange={(e) => updateConfig({ brandName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors font-serif text-xl"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/40">메인 슬로건</label>
                  <textarea 
                    value={config.heroTitle}
                    onChange={(e) => updateConfig({ heroTitle: e.target.value })}
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors font-serif text-2xl"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-widest text-white/40">점포 철학</label>
                  <textarea 
                    value={config.heroSubtitle}
                    onChange={(e) => updateConfig({ heroSubtitle: e.target.value })}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-colors italic text-white/60"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl transition-all",
        active ? "bg-primary text-white" : "text-muted hover:bg-secondary hover:text-primary"
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) {
  return (
    <div className="glass-card p-6 flex flex-col gap-2">
      <div className={cn("w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center", color)}>
        {icon}
      </div>
      <span className="text-sm text-muted font-medium">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
