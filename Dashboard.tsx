import { TopNavBar } from '../components/TopNavBar';
import { 
  Briefcase, 
  Clock, 
  Zap, 
  Calendar,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const kpis = [
    { title: 'Active Projects', value: '24', change: '+12%', icon: Briefcase, color: 'primary' },
    { title: 'Pending Tasks', value: '142', error: '8 Critical', icon: Clock, color: 'on-tertiary-container' },
    { title: 'Team Efficiency', value: '94%', sub: 'Exceeding target', icon: Zap, color: 'secondary' },
    { title: 'Upcoming Deadlines', value: '6', sub: 'Next 72 hours', icon: Calendar, color: 'outline' },
  ];

  return (
    <>
      <TopNavBar title="Dashboard" />
      <div className="p-6 max-w-7xl mx-auto w-full space-y-12">
        {/* KPI Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, i) => (
            <motion.div 
              key={kpi.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4"
              style={{ borderLeftColor: `var(--color-${kpi.color})` }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-on-surface-variant text-xs font-bold">{kpi.title}</span>
                <kpi.icon className="w-5 h-5 text-primary" style={{ color: `var(--color-${kpi.color})` }} />
              </div>
              <div className="text-3xl font-bold text-on-surface">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-2">
                {kpi.change && (
                  <div className="flex items-center text-secondary text-xs font-bold">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{kpi.change} from last month</span>
                  </div>
                )}
                {kpi.error && (
                  <div className="flex items-center text-error text-xs font-bold">
                    <AlertCircle className="w-3 h-3" />
                    <span>{kpi.error} priority</span>
                  </div>
                )}
                {kpi.sub && (
                  <div className="flex items-center text-on-surface-variant text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    <span>{kpi.sub}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Middle Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-on-surface">Recent Activity</h2>
              <button className="text-primary text-xs font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-6">
               {[
                 { name: 'Sarah Jenkins', action: 'completed the', item: 'Q3 Brand Refresh', time: '2 minutes ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
                 { name: 'Marcus Thorne', action: 'assigned', item: 'Database Optimization', time: '45 minutes ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
                 { type: 'system', action: 'automated weekly backup was successful', time: '2 hours ago' }
               ].map((act, i) => (
                 <div key={i} className="flex gap-4 items-start p-4 hover:bg-surface transition-colors rounded-xl border border-transparent hover:border-outline-variant">
                   {act.type === 'system' ? (
                     <div className="h-10 w-10 rounded-full bg-primary-container flex items-center justify-center text-white">
                        <Zap className="w-5 h-5" />
                     </div>
                   ) : (
                     <img src={act.avatar} alt={act.name} className="h-10 w-10 rounded-full border-2 border-surface-container-high" />
                   )}
                   <div>
                     <p className="text-sm">
                        {act.name && <span className="font-bold">{act.name} </span>}
                        {act.action} {act.item && <span className="text-primary font-semibold">{act.item}</span>}
                     </p>
                     <span className="text-xs text-on-surface-variant font-medium">{act.time}</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col">
            <h2 className="text-2xl font-bold text-on-surface mb-8">Project Health</h2>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 rounded-full border-[16px] border-secondary flex items-center justify-center mb-8" style={{ borderLeftColor: '#ffb95f', borderBottomColor: '#ba1a1a' }}>
                <div className="text-center">
                  <span className="text-4xl font-bold">82%</span>
                  <p className="text-xs text-on-surface-variant font-bold">On Track</p>
                </div>
              </div>
              <div className="w-full space-y-2">
                {[
                  { label: 'Healthy', value: 18, color: 'bg-secondary' },
                  { label: 'At Risk', value: 4, color: 'bg-[#ffb95f]' },
                  { label: 'Critical', value: 2, color: 'bg-error' }
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center px-4 py-1">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", item.color)}></div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top Projects */}
        <section className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8 flex justify-between items-center border-b border-outline-variant">
            <h2 className="text-2xl font-bold text-on-surface">Top Projects</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-outline rounded-lg text-xs font-bold hover:bg-surface-container-low transition-colors">Export CSV</button>
              <button className="px-4 py-2 border border-outline rounded-lg text-xs font-bold hover:bg-surface-container-low transition-colors">Filter</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-8 py-4 text-on-surface-variant text-xs font-bold uppercase tracking-wider">Project Name</th>
                  <th className="px-8 py-4 text-on-surface-variant text-xs font-bold uppercase tracking-wider">Lead</th>
                  <th className="px-8 py-4 text-on-surface-variant text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-on-surface-variant text-xs font-bold uppercase tracking-wider">Due Date</th>
                  <th className="px-8 py-4 text-on-surface-variant text-xs font-bold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {[
                  { name: 'Cloud Migration Phase 2', lead: 'David Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', status: 75, date: 'Oct 12, 2024' },
                  { name: 'Enterprise CRM Integration', lead: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', status: 45, date: 'Nov 05, 2024' },
                  { name: 'Mobile App Security Audit', lead: 'Sam Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', status: 20, date: 'Sep 30, 2024' }
                ].map((proj, i) => (
                  <tr key={i} className="hover:bg-surface transition-colors">
                    <td className="px-8 py-4 font-bold text-primary">{proj.name}</td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <img src={proj.avatar} alt={proj.lead} className="h-8 w-8 rounded-full" />
                        <span className="text-sm font-medium">{proj.lead}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 min-w-[200px]">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full transition-all duration-1000", proj.status > 50 ? "bg-secondary" : proj.status > 30 ? "bg-[#ffb95f]" : "bg-error")} 
                            style={{ width: `${proj.status}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold">{proj.status}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-on-surface-variant text-sm font-medium">{proj.date}</td>
                    <td className="px-8 py-4">
                      <button className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          <div className="group relative h-[300px] rounded-2xl overflow-hidden shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Team Work"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-bold mb-1">Team Performance Review</h3>
              <p className="text-sm opacity-90 max-w-sm">View the comprehensive efficiency metrics for Q3 2024.</p>
            </div>
          </div>
          <div className="bg-primary-container rounded-2xl p-8 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Operational Excellence</h3>
              <p className="text-lg mb-8 opacity-90 max-w-sm">Our workspace reached a milestone of 500+ projects managed with 98% on-time delivery rate.</p>
              <button className="bg-secondary-container text-on-secondary-fixed-variant px-6 py-3 rounded-xl font-bold hover:brightness-105 transition-all active:scale-95 flex items-center gap-2">
                Download Full Report
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Zap className="absolute -right-8 -bottom-8 w-64 h-64 opacity-5 rotate-12 select-none" />
          </div>
        </section>
      </div>

      <footer className="bg-surface-container-lowest border-t border-outline-variant py-4 px-6 flex justify-between items-center mt-auto">
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold text-primary">TeamTask</span>
          <p className="text-xs text-on-surface-variant">© 2024 TeamTask Management Inc. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-on-surface-variant hover:text-primary underline">Privacy Policy</a>
          <a href="#" className="text-xs text-on-surface-variant hover:text-primary underline">Terms of Service</a>
          <a href="#" className="text-xs text-on-surface-variant hover:text-primary underline">API Docs</a>
        </div>
      </footer>
    </>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
