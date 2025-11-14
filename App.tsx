
import React, { useState, useCallback } from 'react';
import { User, Role, Notice, Assignment, Complaint, TimetableEntry, NoticeCategory, ComplaintStatus, ChatMessage } from './types';
import { Layout, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Icons } from './components';
import { AttendanceTrendChart, AssignmentStatsChart, StudentAttendanceSummary } from './charts';
import { MOCK_USERS, MOCK_COURSES, MOCK_NOTICES, MOCK_ASSIGNMENTS, MOCK_SUBMISSIONS, MOCK_COMPLAINTS, MOCK_EVENTS, MOCK_TIMETABLE, MOCK_ATTENDANCE, MOCK_CHAT_MESSAGES } from './data';
import { getSmartAssistantResponse } from './geminiService';

// Helper to find entities by ID
const findUser = (id: string) => MOCK_USERS.find(u => u.id === id);
const findCourse = (id: string) => MOCK_COURSES.find(c => c.id === id);
const findFaculty = (id: string) => MOCK_USERS.find(u => u.id === id && u.role === Role.Faculty);

// --- SHARED COMPONENTS ---
const ProfilePage = ({ user }: { user: User }) => (
    <div>
        <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
        <Card className="max-w-2xl">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full" />
                    <div>
                        <CardTitle>{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                        <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">{user.role}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-stone-400">Department</label>
                    <p className="text-white">{user.department || 'N/A'}</p>
                </div>
                 {user.role === Role.Student && user.year && (
                    <div>
                        <label className="text-sm font-medium text-stone-400">Year</label>
                        <p className="text-white">{user.year}</p>
                    </div>
                 )}
                <div className="pt-4">
                    <Button>Edit Profile</Button>
                    <Button className="ml-2 bg-stone-700 hover:bg-stone-600">Change Password</Button>
                </div>
            </CardContent>
        </Card>
    </div>
);

const ChatPage = ({ user }: { user: User }) => {
    const relevantMessages = MOCK_CHAT_MESSAGES.filter(m => m.senderId === user.id || m.receiverId === user.id);
    const conversationPartner = user.role === Role.Student ? findFaculty(MOCK_COURSES.find(c => user.courses?.includes(c.id)!)?.facultyId!) : findUser(relevantMessages[0]?.senderId!);

    return (
        <div className="flex h-[calc(100vh-10rem)]">
            <h1 className="text-3xl font-bold text-white mb-6 absolute">Chat</h1>
            <div className="w-1/3 border-r border-stone-800 pr-4">
                <Card className="h-full">
                    <CardHeader><CardTitle>Contacts</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-stone-800">
                             <img src={conversationPartner?.avatarUrl} className="w-10 h-10 rounded-full" alt={conversationPartner?.name} />
                             <span className="font-semibold text-white">{conversationPartner?.name}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="w-2/3 pl-4 flex flex-col">
                <Card className="flex-1 flex flex-col">
                    <CardHeader className="border-b border-stone-800">
                        <CardTitle>Conversation with {conversationPartner?.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {relevantMessages.map(msg => (
                            <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === user.id ? 'justify-end' : ''}`}>
                                {msg.senderId !== user.id && <img src={conversationPartner?.avatarUrl} className="w-8 h-8 rounded-full" alt={conversationPartner?.name}/>}
                                <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.senderId === user.id ? 'bg-blue-600 text-white rounded-br-none' : 'bg-stone-800 text-stone-200 rounded-bl-none'}`}>
                                    <p className="text-sm">{msg.content}</p>
                                    <p className="text-xs text-right mt-1 opacity-70">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <div className="p-4 border-t border-stone-800 flex gap-2">
                        <input type="text" placeholder="Type a message..." className="w-full bg-stone-800 border border-stone-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                        <Button>Send</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
};


// --- Admin Pages ---

const AdminDashboard = () => {
    const attendanceData = [{ name: 'Mon', attendance: 85 }, { name: 'Tue', attendance: 92 }, { name: 'Wed', attendance: 95 }, { name: 'Thu', attendance: 88 }, { name: 'Fri', attendance: 91 }];
    const assignmentData = [{ name: 'CS101', submitted: 30, pending: 5 }, { name: 'ME101', submitted: 25, pending: 8 }, { name: 'CS202', submitted: 28, pending: 2 }];
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card><CardHeader><CardDescription>Total Students</CardDescription><CardTitle>{MOCK_USERS.filter(u=>u.role===Role.Student).length}</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Total Faculty</CardDescription><CardTitle>{MOCK_USERS.filter(u=>u.role===Role.Faculty).length}</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Pending Complaints</CardDescription><CardTitle>{MOCK_COMPLAINTS.filter(c=>c.status!=='Resolved').length}</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Upcoming Events</CardDescription><CardTitle>{MOCK_EVENTS.length}</CardTitle></CardHeader></Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Weekly Attendance Trend</CardTitle></CardHeader>
                    <CardContent><AttendanceTrendChart data={attendanceData} /></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Assignment Submission Status</CardTitle></CardHeader>
                    <CardContent><AssignmentStatsChart data={assignmentData} /></CardContent>
                </Card>
            </div>
        </div>
    );
};

const UserManagement = () => {
    const [users] = useState(MOCK_USERS);
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">User Management</h1>
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>All Users</CardTitle>
                    <div className="flex gap-2">
                        <Button>Add User</Button>
                        <Button className="bg-stone-700 hover:bg-stone-600">Bulk Upload</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-stone-400">
                        <thead className="text-xs text-stone-300 uppercase bg-stone-800">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Department</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-stone-800 hover:bg-stone-800/50">
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3"><img src={user.avatarUrl} className="w-8 h-8 rounded-full" /> {user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                    <td className="px-6 py-4">{user.department || 'N/A'}</td>
                                    <td className="px-6 py-4 space-x-2"><Button className="h-8 px-3 text-xs">Edit</Button><Button className="h-8 px-3 text-xs bg-rose-600 hover:bg-rose-700">Delete</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
      </div>
    );
};

const Helpdesk = () => {
    const [complaints] = useState<Complaint[]>(MOCK_COMPLAINTS);
    const getStatusColor = (status: string) => {
        if (status === 'Open') return 'bg-rose-500/20 text-rose-400';
        if (status === 'In Progress') return 'bg-amber-500/20 text-amber-400';
        return 'bg-emerald-500/20 text-emerald-400';
    }
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Complaint Helpdesk</h1>
            <Card>
                <CardHeader><CardTitle>All Complaints</CardTitle></CardHeader>
                <CardContent>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-stone-400">
                             <thead className="text-xs text-stone-300 uppercase bg-stone-800">
                                <tr>
                                    <th className="px-6 py-3">Student</th>
                                    <th className="px-6 py-3">Subject</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.map(c => (
                                    <tr key={c.id} className="border-b border-stone-800 hover:bg-stone-800/50">
                                        <td className="px-6 py-4 text-white">{findUser(c.studentId)?.name}</td>
                                        <td className="px-6 py-4 text-white">{c.subject}</td>
                                        <td className="px-6 py-4">{c.category}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(c.status)}`}>{c.status}</span>
                                        </td>
                                        <td className="px-6 py-4"><Button className="h-8 px-3 text-xs">View Details</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const AdminNotices = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Manage Notice Board</h1>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>All Notices</CardTitle>
                        <Button>Create Notice</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {MOCK_NOTICES.map(n => (
                        <div key={n.id} className="p-4 rounded-lg bg-stone-800/50 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-white">{n.title} {n.isPinned && <span className="text-xs text-amber-400 ml-2">(Pinned)</span>}</p>
                                <p className="text-sm text-stone-400">Category: {n.category} | By: {findUser(n.authorId)?.name}</p>
                            </div>
                            <div className="space-x-2">
                                <Button className="h-8 px-3 text-xs">Edit</Button>
                                <Button className="h-8 px-3 text-xs bg-rose-600 hover:bg-rose-700">Delete</Button>
                            </div>
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const PlaceholderPage = ({ title }: { title: string }) => (
    <div>
        <h1 className="text-3xl font-bold text-white mb-6">{title}</h1>
        <Card>
            <CardContent>
                <p>This page is under construction. Functionality for "{title}" will be implemented here.</p>
            </CardContent>
        </Card>
    </div>
);

// --- Student Pages ---

const StudentDashboard = ({ user }: { user: User }) => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSmartAssistant = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setResponse('');
        const res = await getSmartAssistantResponse(prompt);
        setResponse(res);
        setIsLoading(false);
    };

    const upcomingClass = MOCK_TIMETABLE[0];
    const upcomingAssignment = MOCK_ASSIGNMENTS.find(a => user.courses?.includes(a.courseId));

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Welcome, {user.name.split(' ')[0]}!</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader><CardTitle>Upcoming Class</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold">{findCourse(upcomingClass.courseId)?.name}</p>
                                <p className="text-stone-400">{upcomingClass.startTime} - {upcomingClass.endTime} in {upcomingClass.location}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Next Assignment Due</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-lg font-semibold">{upcomingAssignment?.title}</p>
                                <p className="text-stone-400">Due: {new Date(upcomingAssignment?.deadline!).toLocaleDateString()}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><Icons.gemini className="h-6 w-6 mr-2 text-blue-400"/> Smart Study Assistant</CardTitle>
                            <CardDescription>Ask me anything about your courses or campus life!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 bg-stone-950 rounded-lg min-h-[100px] text-sm whitespace-pre-wrap">{isLoading ? 'Thinking...' : response || 'Your answer will appear here.'}</div>
                                <div className="flex gap-2">
                                    <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="e.g., Explain linked lists" className="w-full bg-stone-800 border border-stone-700 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                                    <Button onClick={handleSmartAssistant} disabled={isLoading}>{isLoading ? 'Loading...' : 'Ask'}</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Pinned Notices</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                            {MOCK_NOTICES.filter(n => n.isPinned).map(notice => (
                                <li key={notice.id} className="text-sm p-2 rounded-md bg-stone-800/50">
                                    <p className="font-semibold text-white">{notice.title}</p>
                                    <p className="text-xs text-stone-400">{notice.content.substring(0, 50)}...</p>
                                </li>
                            ))}
                            </ul>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Your Attendance</CardTitle></CardHeader>
                        <CardContent>
                            <StudentAttendanceSummary percentage={82} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const StudentAssignments = ({ user }: { user: User }) => {
    const userAssignments = MOCK_ASSIGNMENTS.filter(a => user.courses?.includes(a.courseId));
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Your Assignments</h1>
            <div className="space-y-4">
            {userAssignments.map(assignment => {
                const submission = MOCK_SUBMISSIONS.find(s => s.assignmentId === assignment.id && s.studentId === user.id);
                const course = findCourse(assignment.courseId);
                return (
                    <Card key={assignment.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{assignment.title}</CardTitle>
                                    <CardDescription>{course?.name} - Due: {new Date(assignment.deadline).toLocaleString()}</CardDescription>
                                </div>
                                {submission ? (
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400">Submitted</span>
                                ) : (
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400">Pending</span>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm mb-4">{assignment.description}</p>
                            <Button>{submission ? 'View Submission' : 'Submit Now'}</Button>
                        </CardContent>
                    </Card>
                )
            })}
            </div>
        </div>
    )
};

const StudentAttendance = ({ user }: { user: User }) => {
    const userAttendance = MOCK_ATTENDANCE.filter(a => a.studentId === user.id);
    const courses = [...new Set(userAttendance.map(a => a.courseId))];

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Attendance</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(courseId => {
                    const courseRecords = userAttendance.filter(a => a.courseId === courseId);
                    const present = courseRecords.filter(a => a.status === 'Present').length;
                    const total = courseRecords.length;
                    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
                    return (
                        <Card key={courseId}>
                            <CardHeader>
                                <CardTitle>{findCourse(courseId)?.name}</CardTitle>
                                <CardDescription>{present} out of {total} classes attended.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="w-full bg-stone-700 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                                </div>
                                <p className="text-right text-sm mt-2 font-semibold">{percentage}%</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}

const StudentTimetable = ({ user }: { user: User }) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    const userTimetable = MOCK_TIMETABLE.filter(t => user.courses?.includes(t.courseId));
    
    const findEntry = (day: string, time: string): TimetableEntry | undefined => {
        return userTimetable.find(e => e.day === day && e.startTime === time);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Class Timetable</h1>
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-center text-sm">
                            <thead className="text-xs text-stone-300 uppercase bg-stone-800">
                                <tr>
                                    <th className="px-4 py-3">Time</th>
                                    {days.map(day => <th key={day} className="px-4 py-3">{day}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {times.map(time => (
                                    <tr key={time} className="border-b border-stone-800">
                                        <td className="px-4 py-3 font-medium text-stone-300 bg-stone-800/50">{time} - {String(parseInt(time.split(':')[0]) + 1).padStart(2,'0')}:00</td>
                                        {days.map(day => {
                                            const entry = findEntry(day, time);
                                            return (
                                                <td key={day} className="px-2 py-3 border-l border-stone-800">
                                                    {entry ? (
                                                        <div className="bg-blue-600/30 text-blue-200 rounded-md p-2">
                                                            <p className="font-semibold">{findCourse(entry.courseId)?.code}</p>
                                                            <p className="text-xs">{entry.location}</p>
                                                        </div>
                                                    ) : '-'}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const StudentNotices = () => {
    const [category, setCategory] = useState<NoticeCategory | 'All'>('All');
    const filteredNotices = category === 'All' ? MOCK_NOTICES : MOCK_NOTICES.filter(n => n.category === category);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Notice Board</h1>
                <div className="flex gap-2">
                    <Button onClick={() => setCategory('All')} className={category === 'All' ? '' : 'bg-stone-700 hover:bg-stone-600'}>All</Button>
                    {Object.values(NoticeCategory).map(cat => (
                         <Button key={cat} onClick={() => setCategory(cat)} className={category === cat ? '' : 'bg-stone-700 hover:bg-stone-600'}>{cat}</Button>
                    ))}
                </div>
            </div>
            <div className="space-y-4">
                {filteredNotices.map(n => (
                    <Card key={n.id}>
                        <CardHeader>
                            <div className="flex justify-between">
                                <CardTitle>{n.title}</CardTitle>
                                {n.isPinned && <Icons.notice className="w-5 h-5 text-amber-400" />}
                            </div>
                            <CardDescription>
                                By {findUser(n.authorId)?.name} on {new Date(n.createdAt).toLocaleDateString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent><p>{n.content}</p></CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

const StudentComplaintBox = ({ user }: { user: User }) => {
    const userComplaints = MOCK_COMPLAINTS.filter(c => c.studentId === user.id);
    const getStatusColor = (status: ComplaintStatus) => status === ComplaintStatus.Open ? 'text-rose-400' : status === ComplaintStatus.InProgress ? 'text-amber-400' : 'text-emerald-400';

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Complaint Box</h1>
                <Button>Create Complaint</Button>
            </div>
            <Card>
                <CardHeader><CardTitle>Your Complaint History</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {userComplaints.map(c => (
                            <li key={c.id} className="p-3 bg-stone-800/50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-white">{c.subject}</p>
                                    <span className={`text-sm font-medium ${getStatusColor(c.status)}`}>{c.status}</span>
                                </div>
                                <p className="text-sm text-stone-400">{c.description}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

// --- Faculty Pages ---
const FacultyDashboard = ({ user }: { user: User }) => {
     return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Welcome, {user.name}!</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Classes</CardTitle>
                        <CardDescription>You have 3 classes scheduled today.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full">View Timetable</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Submissions</CardTitle>
                        <CardDescription>{MOCK_SUBMISSIONS.filter(s=>s.grade===null).length} assignments need grading.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button className="w-full">Grade Assignments</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Perform common tasks quickly.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                         <Button className="w-full bg-stone-700 hover:bg-stone-600">Post a Notice</Button>
                         <Button className="w-full bg-stone-700 hover:bg-stone-600">Upload Material</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const FacultyAttendance = ({ user }: { user: User }) => {
    const facultyCourses = MOCK_COURSES.filter(c => c.facultyId === user.id);
    const studentsInCourse = MOCK_USERS.filter(u => u.role === Role.Student && u.courses?.includes(facultyCourses[0]?.id));
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Mark Attendance</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Class: {facultyCourses[0]?.name}</CardTitle>
                    <CardDescription>Date: {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-stone-400">
                             <thead className="text-xs text-stone-300 uppercase bg-stone-800">
                                <tr>
                                    <th className="px-6 py-3">Student Name</th>
                                    <th className="px-6 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {studentsInCourse.map(student => (
                                <tr key={student.id} className="border-b border-stone-800">
                                    <td className="px-6 py-4 text-white font-medium">{student.name}</td>
                                    <td className="px-6 py-4 flex justify-center gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name={`att-${student.id}`} className="form-radio bg-stone-700 border-stone-600 text-emerald-500 focus:ring-emerald-500"/> Present</label>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name={`att-${student.id}`} className="form-radio bg-stone-700 border-stone-600 text-rose-500 focus:ring-rose-500"/> Absent</label>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button>Submit Attendance</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

const FacultyAssignments = ({ user }: { user: User }) => {
    const facultyAssignments = MOCK_ASSIGNMENTS.filter(a => a.facultyId === user.id);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Manage Assignments</h1>
                <Button>Create Assignment</Button>
            </div>
            <div className="space-y-4">
                {facultyAssignments.map(assignment => {
                    const submissions = MOCK_SUBMISSIONS.filter(s => s.assignmentId === assignment.id);
                    const graded = submissions.filter(s => s.grade !== null).length;
                    return (
                        <Card key={assignment.id}>
                            <CardHeader>
                                <CardTitle>{assignment.title}</CardTitle>
                                <CardDescription>Course: {findCourse(assignment.courseId)?.name} | Due: {new Date(assignment.deadline).toLocaleDateString()}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <p>{submissions.length} Submissions ({graded} Graded)</p>
                                    <Button>View Submissions</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}


// --- Login Page ---
const LoginPage = ({ onLogin }: { onLogin: (user: User) => void }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-950">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="mx-auto bg-blue-600 p-3 rounded-full w-fit mb-4">
                <Icons.logo className="h-8 w-8 text-white"/>
            </div>
          <CardTitle>Welcome to CampusConnect</CardTitle>
          <CardDescription>Select your role to sign in</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => onLogin(MOCK_USERS.find(u => u.role === Role.Admin)!)}>Login as Admin</Button>
          <Button onClick={() => onLogin(MOCK_USERS.find(u => u.role === Role.Faculty)!)}>Login as Faculty</Button>
          <Button onClick={() => onLogin(MOCK_USERS.find(u => u.role === Role.Student)!)}>Login as Student</Button>
        </CardContent>
      </Card>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<string>('dashboard');

  const handleLogout = () => {
    setUser(null);
    setPage('dashboard');
  };

  const renderPage = useCallback(() => {
    if (!user) return null;

    switch (user.role) {
      case Role.Admin:
        switch (page) {
          case 'dashboard': return <AdminDashboard />;
          case 'users': return <UserManagement />;
          case 'helpdesk': return <Helpdesk />;
          case 'notices': return <AdminNotices />;
          case 'attendance': return <PlaceholderPage title="Attendance Control" />;
          case 'timetable': return <PlaceholderPage title="Timetable Manager" />;
          case 'materials': return <PlaceholderPage title="Study Materials Manager" />;
          case 'assignments': return <PlaceholderPage title="Assignments Overview" />;
          case 'events': return <PlaceholderPage title="Events & Club Management" />;
          case 'analytics': return <PlaceholderPage title="Analytics Dashboard" />;
          default: return <AdminDashboard />;
        }
      case Role.Student:
        switch (page) {
          case 'dashboard': return <StudentDashboard user={user} />;
          case 'assignments': return <StudentAssignments user={user} />;
          case 'attendance': return <StudentAttendance user={user} />;
          case 'timetable': return <StudentTimetable user={user} />;
          case 'notices': return <StudentNotices />;
          case 'complaint': return <StudentComplaintBox user={user} />;
          case 'profile': return <ProfilePage user={user} />;
          case 'chat': return <ChatPage user={user} />;
          case 'materials': return <PlaceholderPage title="Study Materials" />;
          case 'events': return <PlaceholderPage title="Events & Clubs" />;
          default: return <StudentDashboard user={user} />;
        }
      case Role.Faculty:
        switch (page) {
            case 'dashboard': return <FacultyDashboard user={user} />;
            case 'attendance': return <FacultyAttendance user={user} />;
            case 'assignments': return <FacultyAssignments user={user} />;
            case 'profile': return <ProfilePage user={user} />;
            case 'chat': return <ChatPage user={user} />;
            default: return <FacultyDashboard user={user} />;
        }
      default:
        return <div>Role not recognized</div>;
    }
  }, [user, page]);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <Layout user={user} page={page} setPage={setPage} onLogout={handleLogout}>
      {renderPage()}
    </Layout>
  );
};

export default App;
