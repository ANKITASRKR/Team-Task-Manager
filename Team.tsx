import { TopNavBar } from '../components/TopNavBar';
import { 
  UserPlus, 
  Filter, 
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Shield,
  User as UserIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Team() {
  const stats = [
    { label: 'Total Members', value: 42, color: 'bg-primary' },
    { label: 'Active Now', value: 28, color: 'bg-secondary' },
    { label: 'Pending Invites', value: 6, color: 'bg-tertiary-container' },
    { label: 'Roles Defined', value: 4, color: 'bg-outline' },
  ];

  const members = [
    { name: 'Alex Rivera', email: 'alex.rivera@teamtask.com', role: 'admin', status: 'active', joined: '2 months ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { name: 'Sarah Chen', email: 'sarah.c@teamtask.com', role: 'member', status: 'active', joined: '1 year ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { name: 'Jordan Smith', email: 'jordan.smith@external.com', role: 'member', status: 'invited', joined: '2 days ago', initials: 'JS' },
    { name: 'Marcus Wright', email: 'm.wright@teamtask.com', role: 'member', status: 'active', joined: '6 months ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  ];

  return (
    <>
      <TopNavBar title="Team Members" />
      <div className="p-6 md:p-12 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-on-surface mb-1">Team Members</h1>
            <p className="text-sm font-medium text-on-surface-variant">Manage your organization's team members and their access levels.</p>
          </div>
          <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 shadow-sm active:scale-95 transition-all">
            <UserPlus className="w-5 h-5" />
            Invite Member
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 border-primary">
              <span className="text-xs font-bold text-on-surface-variant block mb-2 uppercase tracking-wider">{stat.label}</span>
              <span className="text-2xl font-bold text-on-surface">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <h3 className="text-lg font-bold text-on-surface">All Members</h3>
            <div className="flex gap-2">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Name</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Role</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {members.map((member, i) => (
                  <motion.tr 
                    key={member.email}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-surface-container-low transition-colors group"
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border border-outline-variant shadow-sm" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold">
                            {member.initials}
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-on-surface block">{member.name}</span>
                          <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Joined {member.joined}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm font-medium text-on-surface-variant">{member.email}</td>
                    <td className="px-8 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 w-fit",
                        member.role === 'admin' ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-high text-on-surface-variant"
                      )}>
                        {member.role === 'admin' ? <Shield className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                        {member.role}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", member.status === 'active' ? "bg-secondary" : "bg-on-tertiary-container")} />
                        <span className="text-sm font-bold text-on-surface capitalize">{member.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-outline-variant flex justify-between items-center bg-surface-container-low">
            <span className="text-xs font-bold text-on-surface-variant">Showing 4 of 42 members</span>
            <div className="flex gap-2">
              <button disabled className="p-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Explore Card */}
        <section className="pb-12">
          <div className="relative overflow-hidden rounded-2xl bg-primary-container p-12 text-white">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl font-bold mb-4">Streamline Your Team Onboarding</h2>
              <p className="text-lg mb-8 opacity-90 leading-relaxed">Integrate with Slack or Microsoft Teams to automatically sync your organization's directory and manage permissions from a single dashboard.</p>
              <button className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-opacity-90 transition-all active:scale-95 shadow-lg">
                Explore Integrations
              </button>
            </div>
            <Users className="absolute right-0 top-0 w-80 h-80 opacity-5 -translate-y-1/4 translate-x-1/4 select-none" />
          </div>
        </section>
      </div>
    </>
  );
}
