
import React, { ReactNode, useState } from 'react';
import { User, Role } from './types';

// SVG Icon Library
export const Icons = {
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
  ),
  dashboard: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  users: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  attendance: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="m9 14 2 2 4-4"/></svg>,
  timetable: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  notice: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>,
  materials: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>,
  assignments: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10h-6.17a2 2 0 0 0-1.42.59L13 12l1.41-1.41a2 2 0 0 1 1.42-.59H22V10z"/><path d="M2 18a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2v-2z"/><path d="M5 16V9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7"/><path d="M12 16V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v12"/><path d="m19 16-2-3-2 3h4z"/></svg>,
  events: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>,
  chat: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  help: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>,
  analytics: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8a6 6 0 0 0-6.4 2.3l-4.4 4.3a4 4 0 0 0-5.7 5.7l.5.5"/><path d="m21 6-4.3 4.3"/><path d="M15 6h6v6"/></svg>,
  settings: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  logout: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  menu: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  close: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  profile: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>,
  gemini: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2a10 10 0 1 0-10 10"/><path d="M12 2a10 10 0 1 0 0 20"/><path d="M12 2a10 10 0 1 0 0-20"/><path d="M2 12a10 10 0 1 0 20 0"/><path d="M2 12a10 10 0 1 0-20 0"/></svg>,
};


// UI Components
export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 ${className}`}
      ref={ref}
      {...props}
    />
  )
);

// FIX: Explicitly type Card and related components as React.FunctionComponent
// to ensure TypeScript correctly handles `children` and `key` props.
export const Card: React.FunctionComponent<{ className?: string, children: ReactNode }> = ({ className, children }) => (
    <div className={`rounded-xl border bg-stone-900 text-stone-50 shadow-lg ${className}`}>
        {children}
    </div>
);

export const CardHeader: React.FunctionComponent<{ className?: string, children: ReactNode }> = ({ className, children }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
export const CardTitle: React.FunctionComponent<{ className?: string, children: ReactNode }> = ({ className, children }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);
export const CardDescription: React.FunctionComponent<{ className?: string, children: ReactNode }> = ({ className, children }) => (
    <p className={`text-sm text-stone-400 ${className}`}>{children}</p>
);
export const CardContent: React.FunctionComponent<{ className?: string, children: ReactNode }> = ({ className, children }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// Layout Components
interface LayoutProps {
  user: User;
  page: string;
  setPage: (page: string) => void;
  onLogout: () => void;
  children: ReactNode;
}

const adminNav = [
  { name: 'Dashboard', icon: Icons.dashboard, key: 'dashboard' },
  { name: 'User Management', icon: Icons.users, key: 'users' },
  { name: 'Attendance', icon: Icons.attendance, key: 'attendance' },
  { name: 'Timetable', icon: Icons.timetable, key: 'timetable' },
  { name: 'Notice Board', icon: Icons.notice, key: 'notices' },
  { name: 'Study Materials', icon: Icons.materials, key: 'materials' },
  { name: 'Assignments', icon: Icons.assignments, key: 'assignments' },
  { name: 'Events & Clubs', icon: Icons.events, key: 'events' },
  { name: 'Helpdesk', icon: Icons.help, key: 'helpdesk' },
  { name: 'Analytics', icon: Icons.analytics, key: 'analytics' },
];

const studentNav = [
  { name: 'Dashboard', icon: Icons.dashboard, key: 'dashboard' },
  { name: 'Attendance', icon: Icons.attendance, key: 'attendance' },
  { name: 'Timetable', icon: Icons.timetable, key: 'timetable' },
  { name: 'Notices', icon: Icons.notice, key: 'notices' },
  { name: 'Study Materials', icon: Icons.materials, key: 'materials' },
  { name: 'Assignments', icon: Icons.assignments, key: 'assignments' },
  { name: 'Events & Clubs', icon: Icons.events, key: 'events' },
  { name: 'Chat', icon: Icons.chat, key: 'chat' },
  { name: 'Complaint Box', icon: Icons.help, key: 'complaint' },
  { name: 'Profile', icon: Icons.profile, key: 'profile' },
];

const facultyNav = [
  { name: 'Dashboard', icon: Icons.dashboard, key: 'dashboard' },
  { name: 'Mark Attendance', icon: Icons.attendance, key: 'attendance' },
  { name: 'Assignments', icon: Icons.assignments, key: 'assignments' },
  { name: 'Chat', icon: Icons.chat, key: 'chat' },
  { name: 'Profile', icon: Icons.profile, key: 'profile' },
];

const getNavItems = (role: Role) => {
  switch (role) {
    case Role.Admin: return adminNav;
    case Role.Student: return studentNav;
    case Role.Faculty: return facultyNav;
    default: return [];
  }
};

// FIX: Corrected Sidebar props to not require `children`, as it's not passed down.
const Sidebar = ({ user, page, setPage, onLogout, isSidebarOpen }: Omit<LayoutProps, 'children'> & { isSidebarOpen: boolean }) => {
  const navItems = getNavItems(user.role);

  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-stone-950 border-r border-stone-800 flex flex-col`}>
      <div className="flex items-center justify-center h-16 border-b border-stone-800">
        <Icons.logo className="h-8 w-8 text-blue-500" />
        <span className="ml-3 text-xl font-bold text-white">CampusConnect</span>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navItems.map(item => (
          <a
            key={item.key}
            href="#"
            onClick={(e) => { e.preventDefault(); setPage(item.key); }}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${page === item.key ? 'bg-blue-600 text-white' : 'text-stone-400 hover:bg-stone-800 hover:text-white'}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-stone-800">
         <a
            href="#"
            onClick={(e) => { e.preventDefault(); onLogout(); }}
            className="flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg text-stone-400 hover:bg-stone-800 hover:text-white"
          >
            <Icons.logout className="h-5 w-5 mr-3" />
            Logout
          </a>
      </div>
    </aside>
  );
};


const Header = ({ user, onToggleSidebar }: { user: User, onToggleSidebar: () => void }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 lg:left-64 bg-stone-950/80 backdrop-blur-sm border-b border-stone-800 h-16 flex items-center justify-between px-6">
       <button onClick={onToggleSidebar} className="lg:hidden text-stone-400 hover:text-white">
        <Icons.menu className="h-6 w-6" />
      </button>
      <div className='lg:hidden'></div> {/* Spacer for mobile */}
      <div className="flex items-center gap-4 ml-auto">
        <span className="text-sm text-stone-300">Welcome, <span className="font-semibold text-white">{user.name}</span></span>
        <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt={user.name} />
      </div>
    </header>
  );
};

export const Layout = ({ user, page, setPage, onLogout, children }: LayoutProps) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-stone-950 text-stone-50">
            <Sidebar user={user} page={page} setPage={setPage} onLogout={onLogout} isSidebarOpen={isSidebarOpen} />
            <Header user={user} onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
             {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden"></div>}
            <main className="lg:ml-64 pt-16">
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
