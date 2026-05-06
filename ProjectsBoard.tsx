import { TopNavBar } from '../components/TopNavBar';
import { 
  MoreHorizontal, 
  Plus, 
  Calendar,
  Edit2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import type { TaskStatus, TaskPriority } from '../types';

interface TaskMock {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assigneeAvatar: string;
  image?: string;
  progress?: number;
}

const MOCK_TASKS: TaskMock[] = [
  { id: '1', title: 'Update Hero Image', priority: 'high', status: 'todo', dueDate: 'Oct 24', assigneeAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  { id: '2', title: 'Footer Accessibility Audit', priority: 'low', status: 'todo', dueDate: 'Oct 26', assigneeAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: '3', title: 'API Integration', priority: 'high', status: 'in-progress', dueDate: 'Oct 22', assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', progress: 66 },
  { id: '4', title: 'Color Palette Refinement', priority: 'medium', status: 'in-progress', dueDate: 'Oct 23', assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop' },
  { id: '5', title: 'Mobile Responsive Layouts', priority: 'medium', status: 'in-review', dueDate: 'Oct 20', assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: '6', title: 'User Flow Diagrams', priority: 'low', status: 'done', dueDate: 'Oct 18', assigneeAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop' },
];

export default function ProjectsBoard() {
  const [selectedTask, setSelectedTask] = useState<TaskMock | null>(null);

  const columns: { label: string; status: TaskStatus; color: string }[] = [
    { label: 'To Do', status: 'todo', color: 'bg-primary' },
    { label: 'In Progress', status: 'in-progress', color: 'bg-secondary' },
    { label: 'In Review', status: 'in-review', color: 'bg-tertiary-fixed-dim' },
    { label: 'Done', status: 'done', color: 'bg-secondary' },
  ];

  return (
    <>
      <TopNavBar title="Website Redesign" />
      <div className="flex-1 overflow-x-auto bg-surface p-6">
        <div className="flex h-full gap-6 items-start min-w-max">
          {columns.map((col) => (
            <div key={col.status} className="w-[320px] flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between px-1 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-on-surface">{col.label}</span>
                  <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold", col.status === 'todo' ? "bg-surface-container-high text-on-surface-variant" : "bg-secondary-container text-on-secondary-container")}>
                    {MOCK_TASKS.filter(t => t.status === col.status).length}
                  </span>
                </div>
                <MoreHorizontal className="w-5 h-5 text-on-surface-variant cursor-pointer" />
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar pb-4">
                <AnimatePresence mode="popLayout">
                  {MOCK_TASKS.filter(t => t.status === col.status).map((task) => (
                    <motion.div
                      key={task.id}
                      layoutId={task.id}
                      onClick={() => setSelectedTask(task)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={cn(
                        "bg-surface-container-lowest rounded-2xl shadow-sm border-l-4 hover:shadow-md transition-all cursor-pointer overflow-hidden group",
                        task.status === 'done' ? "opacity-75" : "opacity-100",
                        task.priority === 'high' ? "border-primary" : task.priority === 'medium' ? "border-on-tertiary-container" : "border-outline-variant"
                      )}
                    >
                      {task.image && (
                        <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url(${task.image})` }}></div>
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                            task.priority === 'high' ? "bg-error-container text-on-error-container" : task.priority === 'medium' ? "bg-tertiary-fixed text-on-tertiary-fixed" : "bg-surface-container-high text-on-surface-variant"
                          )}>
                            {task.priority}
                          </span>
                          {task.status !== 'done' && <Edit2 className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />}
                        </div>
                        <h4 className={cn("text-base font-bold mb-4 leading-tight", task.status === 'done' && "line-through text-on-surface-variant")}>
                          {task.title}
                        </h4>

                        {task.progress !== undefined && (
                          <div className="w-full bg-surface-container-high h-1 rounded-full mb-4 overflow-hidden">
                            <div 
                              className="bg-secondary h-full transition-all duration-500" 
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                          <div className="flex items-center gap-2 text-on-surface-variant">
                            {task.status === 'done' ? (
                              <CheckCircle2 className="w-4 h-4 text-secondary" />
                            ) : (
                              <Calendar className="w-4 h-4" />
                            )}
                            <span className="text-xs font-medium">
                              {task.status === 'done' ? `Completed ${task.dueDate}` : task.dueDate}
                            </span>
                          </div>
                          <img className="w-6 h-6 rounded-full border border-surface shadow-sm" src={task.assigneeAvatar} alt="Assignee" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {col.status !== 'done' && (
                  <button className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-outline-variant rounded-2xl text-on-surface-variant hover:border-primary hover:text-primary transition-all font-bold group">
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Add Task</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Detail Drawer */}
      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTask(null)}
              className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-surface-container-lowest shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              <TaskDetailDrawer task={selectedTask} onClose={() => setSelectedTask(null)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function TaskDetailDrawer({ task, onClose }: { task: TaskMock; onClose: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="px-8 py-6 border-b border-outline-variant flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary-fixed rounded-lg text-primary">
            <CheckCircle2 className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">TASK-{task.id}024</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant">
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-outline-variant mx-2"></div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant group">
            <Plus className="w-5 h-5 rotate-45 group-hover:text-error transition-all" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-8">
        <h2 className="text-3xl font-bold text-on-surface mb-6">{task.title}</h2>
        
        <div className="flex items-center gap-4 mb-8">
          <button className="flex items-center gap-2 bg-primary-container text-on-primary font-bold px-4 py-2 rounded-xl active:scale-95 transition-all text-sm">
            <Clock className="w-4 h-4" />
            {task.status.replace('-', ' ')}
          </button>
          <span className="text-sm text-on-surface-variant italic">Updated 2 hours ago</span>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8 p-6 bg-surface-container-low rounded-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-2 uppercase tracking-wide">Assignee</label>
              <div className="flex items-center gap-3">
                <img src={task.assigneeAvatar} alt="Assignee" className="w-8 h-8 rounded-full" />
                <span className="text-sm font-bold text-on-surface">Team Member</span>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-2 uppercase tracking-wide">Reviewer</label>
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Reviewer" className="w-8 h-8 rounded-full" />
                <span className="text-sm font-bold text-on-surface">Sarah Chen</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-2 uppercase tracking-wide">Due Date</label>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Calendar className="w-4 h-4" />
                Nov 12, 2024
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant mb-2 uppercase tracking-wide">Priority</label>
              <div className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-lg w-fit text-[10px] font-bold uppercase",
                task.priority === 'high' ? "bg-error-container text-on-error-container" : task.priority === 'medium' ? "bg-tertiary-fixed text-on-tertiary-fixed" : "bg-surface-container-high text-on-surface-variant"
              )}>
                <AlertCircle className="w-3 h-3" />
                {task.priority}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wide">Labels</label>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold uppercase">Backend</span>
            <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold uppercase">Payments</span>
            <button className="w-8 h-8 flex items-center justify-center border-2 border-dashed border-outline-variant rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-lg font-bold text-on-surface mb-2">Description</label>
          <div className="p-6 bg-white border border-outline-variant rounded-2xl">
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Integrate the new checkout flow with the Stripe API for subscription payments. 
              This includes setting up webhooks for payment confirmations and handling recurring billing logic.
              Ensure the frontend receives immediate feedback upon successful processing.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-lg font-bold text-on-surface mb-2">Attachments</label>
          <div className="relative group rounded-2xl overflow-hidden border border-outline-variant shadow-sm aspect-video">
            <img src={task.image || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=450&fit=crop"} alt="Attachment" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button className="bg-white text-on-surface p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </button>
              <button className="bg-white text-on-surface p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-surface-container-low border-t border-outline-variant">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-bold">U</div>
          <div className="flex-1 relative">
            <textarea 
              className="w-full bg-white border border-outline-variant rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary resize-none h-24 transition-all" 
              placeholder="Add a comment..."
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button className="px-6 py-2 bg-primary text-on-primary font-bold rounded-xl shadow-sm active:scale-95 transition-all">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { AlertCircle, Clock, Download, Search as SearchIcon } from 'lucide-react';
