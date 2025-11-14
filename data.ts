
import { Role, User, Course, Notice, NoticeCategory, Assignment, Submission, Complaint, ComplaintStatus, Event, TimetableEntry, AttendanceRecord, AttendanceStatus, ChatMessage } from './types';

export const MOCK_USERS: User[] = [
  { id: 'admin1', name: 'Dr. Evelyn Reed', email: 'admin@campus.edu', role: Role.Admin, avatarUrl: 'https://picsum.photos/seed/admin1/100/100' },
  { id: 'faculty1', name: 'Prof. Alan Grant', email: 'agrant@campus.edu', role: Role.Faculty, department: 'Computer Science', courses: ['cs101', 'cs202'], avatarUrl: 'https://picsum.photos/seed/faculty1/100/100' },
  { id: 'faculty2', name: 'Prof. Ellie Sattler', email: 'esattler@campus.edu', role: Role.Faculty, department: 'Mechanical Engineering', courses: ['me101'], avatarUrl: 'https://picsum.photos/seed/faculty2/100/100' },
  { id: 'student1', name: 'John Hammond', email: 'jhammond@campus.edu', role: Role.Student, department: 'Computer Science', year: 2, courses: ['cs101', 'cs202'], avatarUrl: 'https://picsum.photos/seed/student1/100/100' },
  { id: 'student2', name: 'Ian Malcolm', email: 'imalcolm@campus.edu', role: Role.Student, department: 'Computer Science', year: 2, courses: ['cs101', 'cs202'], avatarUrl: 'https://picsum.photos/seed/student2/100/100' },
  { id: 'student3', name: 'Sarah Harding', email: 'sharding@campus.edu', role: Role.Student, department: 'Mechanical Engineering', year: 1, courses: ['me101'], avatarUrl: 'https://picsum.photos/seed/student3/100/100' },
];

export const MOCK_COURSES: Course[] = [
  { id: 'cs101', name: 'Intro to Programming', code: 'CS101', department: 'Computer Science', facultyId: 'faculty1' },
  { id: 'cs202', name: 'Data Structures', code: 'CS202', department: 'Computer Science', facultyId: 'faculty1' },
  { id: 'me101', name: 'Thermodynamics', code: 'ME101', department: 'Mechanical Engineering', facultyId: 'faculty2' },
];

export const MOCK_NOTICES: Notice[] = [
  { id: 'notice1', title: 'Mid-term Exam Schedule', content: 'The mid-term examination schedule for all departments has been published. Please check the exam timetable section.', category: NoticeCategory.Exam, authorId: 'admin1', createdAt: new Date(Date.now() - 86400000).toISOString(), isPinned: true },
  { id: 'notice2', title: 'Campus Holiday Announcement', content: 'The campus will be closed on the upcoming Monday for a national holiday.', category: NoticeCategory.Holiday, authorId: 'admin1', createdAt: new Date(Date.now() - 172800000).toISOString(), isPinned: false },
  { id: 'notice3', title: ' Urgent: Water Supply Disruption', content: 'There will be a temporary disruption in the water supply to all hostels tomorrow from 10 AM to 2 PM.', category: NoticeCategory.Urgent, authorId: 'admin1', createdAt: new Date(Date.now() - 3600000).toISOString(), isPinned: true },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: 'as1', title: 'Linked List Implementation', courseId: 'cs202', facultyId: 'faculty1', deadline: new Date(Date.now() + 604800000).toISOString(), description: 'Implement a doubly linked list in C++ with all standard operations.' },
  { id: 'as2', title: 'First Law of Thermodynamics Problems', courseId: 'me101', facultyId: 'faculty2', deadline: new Date(Date.now() + 864000000).toISOString(), description: 'Solve the attached problem set regarding the first law.' },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  { id: 'sub1', assignmentId: 'as1', studentId: 'student1', submittedAt: new Date(Date.now() - 86400000).toISOString(), grade: 85, feedback: 'Good work, but could optimize the deletion logic.', plagiarismStatus: 'Checked' },
  { id: 'sub2', assignmentId: 'as1', studentId: 'student2', submittedAt: new Date(Date.now() - 172800000).toISOString(), grade: null, feedback: null, plagiarismStatus: 'Pending' },
];

export const MOCK_COMPLAINTS: Complaint[] = [
  { id: 'comp1', studentId: 'student3', category: 'Hostel', subject: 'Leaky faucet in Room 301', description: 'The faucet in my room has been dripping constantly for two days.', status: ComplaintStatus.Open, createdAt: new Date(Date.now() - 86400000).toISOString(), resolvedAt: null },
  { id: 'comp2', studentId: 'student2', category: 'IT', subject: 'Campus Wi-Fi not working in library', description: 'I cannot connect to the campus Wi-Fi network in the main library building.', status: ComplaintStatus.InProgress, createdAt: new Date(Date.now() - 172800000).toISOString(), resolvedAt: null },
  { id: 'comp3', studentId: 'student1', category: 'Admin', subject: 'Error in fee receipt', description: 'There seems to be a calculation error in my last tuition fee receipt.', status: ComplaintStatus.Resolved, createdAt: new Date(Date.now() - 604800000).toISOString(), resolvedAt: new Date(Date.now() - 259200000).toISOString() },
];

export const MOCK_EVENTS: Event[] = [
    { id: 'event1', name: 'Tech Fest 2024', description: 'Annual technical festival with coding competitions, robotics challenges, and more.', date: new Date(Date.now() + 1209600000).toISOString(), location: 'Main Auditorium', organizer: 'Computer Science Dept.', qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='},
    { id: 'event2', name: 'Guest Lecture on AI', description: 'A guest lecture by Dr. Ian Malcolm on the future of Artificial Intelligence.', date: new Date(Date.now() + 2592000000).toISOString(), location: 'Seminar Hall 1', organizer: 'AI Club', qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='},
];

export const MOCK_TIMETABLE: TimetableEntry[] = [
    { day: 'Monday', startTime: '09:00', endTime: '10:00', courseId: 'cs101', location: 'Room 101' },
    { day: 'Monday', startTime: '10:00', endTime: '11:00', courseId: 'cs202', location: 'Room 102' },
    { day: 'Tuesday', startTime: '11:00', endTime: '12:00', courseId: 'me101', location: 'Lab 3' },
    { day: 'Wednesday', startTime: '09:00', endTime: '10:00', courseId: 'cs101', location: 'Room 101' },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
    { studentId: 'student1', courseId: 'cs101', date: '2023-10-01', status: AttendanceStatus.Present },
    { studentId: 'student1', courseId: 'cs101', date: '2023-10-03', status: AttendanceStatus.Present },
    { studentId: 'student1', courseId: 'cs101', date: '2023-10-05', status: AttendanceStatus.Absent },
    { studentId: 'student1', courseId: 'cs202', date: '2023-10-02', status: AttendanceStatus.Present },
    { studentId: 'student1', courseId: 'cs202', date: '2023-10-04', status: AttendanceStatus.Present },
    { studentId: 'student2', courseId: 'cs101', date: '2023-10-01', status: AttendanceStatus.Present },
    { studentId: 'student2', courseId: 'cs101', date: '2023-10-03', status: AttendanceStatus.Absent },
    { studentId: 'student2', courseId: 'cs101', date: '2023-10-05', status: AttendanceStatus.Absent },
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
    { id: 'msg1', senderId: 'student1', receiverId: 'faculty1', content: 'Professor, I have a doubt regarding the last lecture.', timestamp: new Date(Date.now() - 3600000).toISOString(), isRead: true },
    { id: 'msg2', senderId: 'faculty1', receiverId: 'student1', content: 'Sure John, what is it?', timestamp: new Date(Date.now() - 3540000).toISOString(), isRead: true },
    { id: 'msg3', senderId: 'student1', receiverId: 'faculty1', content: 'Could you please explain the concept of recursion again?', timestamp: new Date(Date.now() - 3480000).toISOString(), isRead: false },
];
