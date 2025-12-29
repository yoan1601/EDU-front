// Mock API service for EdTech SaaS data
import { addDays, subDays } from 'date-fns';

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'superadmin' | 'admin' | 'teacher' | 'student';
  avatar?: string;
  tenantId?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  subscription: 'trial' | 'starter' | 'premium';
  status: 'active' | 'suspended' | 'trial_expired';
  userCount: number;
  maxUsers: number;
  adminId: string;
  createdAt: Date;
  trialEndsAt?: Date;
  metadata: {
    university: string;
    department: string;
    contactEmail: string;
    phone?: string;
  };
}

export interface Teacher {
  id: string;
  userId: string;
  tenantId: string;
  specialties: string[];
  courses: string[];
  status: 'active' | 'inactive';
  hireDate: Date;
}

export interface Student {
  id: string;
  userId: string;
  tenantId: string;
  studentId: string;
  grade: string;
  courses: string[];
  enrollmentDate: Date;
}

export interface Course {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  teacherId: string;
  students: string[];
  schedule: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    room: string;
  }[];
  semester: string;
  maxStudents: number;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  tenantId: string;
  type: 'exam' | 'assignment' | 'participation';
  value: number;
  maxValue: number;
  date: Date;
  comments?: string;
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalCourses: number;
  totalGrades: number;
  averageGrade: number;
  userGrowth: Array<{ date: Date; users: number }>;
  gradeDistribution: Array<{ range: string; count: number }>;
}

// Mock data generators
const generateMockUsers = (count: number, tenantId: string): User[] => {
  const roles: Array<'admin' | 'teacher' | 'student'> = ['admin', 'teacher', 'student'];
  const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Antoine', 'Claire', 'Michel', 'Isabelle'];
  const lastNames = ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${tenantId}-${i}`,
    email: `user${i}@${tenantId}.fr`,
    firstName: firstNames[i % firstNames.length],
    lastName: lastNames[i % lastNames.length],
    role: roles[i % roles.length],
    tenantId,
    status: 'active' as const,
    createdAt: subDays(new Date(), Math.floor(Math.random() * 90)),
    lastLoginAt: subDays(new Date(), Math.floor(Math.random() * 7)),
  }));
};

const generateMockTenants = (): Tenant[] => [
  {
    id: 'ufr-sciences',
    name: 'UFR Sciences et Technologies',
    domain: 'sciences.univ-paris.fr',
    subscription: 'starter',
    status: 'active',
    userCount: 45,
    maxUsers: 50,
    adminId: 'admin-sciences',
    createdAt: subDays(new Date(), 120),
    metadata: {
      university: 'Université Paris Diderot',
      department: 'Sciences et Technologies',
      contactEmail: 'admin@sciences.univ-paris.fr',
      phone: '01 57 27 60 00',
    },
  },
  {
    id: 'ufr-medecine',
    name: 'UFR Médecine',
    domain: 'medecine.univ-lyon.fr',
    subscription: 'trial',
    status: 'active',
    userCount: 23,
    maxUsers: 25,
    adminId: 'admin-medecine',
    createdAt: subDays(new Date(), 15),
    trialEndsAt: addDays(new Date(), 15),
    metadata: {
      university: 'Université Claude Bernard Lyon 1',
      department: 'Médecine',
      contactEmail: 'admin@medecine.univ-lyon.fr',
    },
  },
];

const generateMockCourses = (tenantId: string): Course[] => [
  {
    id: `course-math-${tenantId}`,
    tenantId,
    name: 'Mathématiques Appliquées',
    code: 'MATH301',
    teacherId: `teacher-1-${tenantId}`,
    students: [`student-1-${tenantId}`, `student-2-${tenantId}`],
    schedule: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '11:00', room: 'Amphi A' },
      { dayOfWeek: 4, startTime: '14:00', endTime: '16:00', room: 'Salle 201' },
    ],
    semester: 'S1 2024',
    maxStudents: 20,
  },
  {
    id: `course-phys-${tenantId}`,
    tenantId,
    name: 'Physique Quantique',
    code: 'PHYS401',
    teacherId: `teacher-2-${tenantId}`,
    students: [`student-3-${tenantId}`, `student-4-${tenantId}`],
    schedule: [
      { dayOfWeek: 2, startTime: '10:00', endTime: '12:00', room: 'Amphi B' },
    ],
    semester: 'S1 2024',
    maxStudents: 15,
  },
];

// Mock API functions
export const mockApi = {
  // Authentication
  login: async (email: string, _password: string): Promise<{ user: User; token: string }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: 'user-1',
      email,
      firstName: 'Admin',
      lastName: 'UFR',
      role: 'admin',
      tenantId: 'ufr-sciences',
      status: 'active',
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };
    
    return { user: mockUser, token: 'mock-jwt-token' };
  },

  // Users
  getUsers: async (tenantId: string): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateMockUsers(15, tenantId);
  },

  // Tenants (SuperAdmin only)
  getTenants: async (): Promise<Tenant[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return generateMockTenants();
  },

  createTenant: async (tenantData: Partial<Tenant>): Promise<Tenant> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const newTenant: Tenant = {
      id: `ufr-${Date.now()}`,
      name: tenantData.name || 'Nouvelle UFR',
      domain: tenantData.domain || 'nouvel.univ.fr',
      subscription: 'trial',
      status: 'active',
      userCount: 1,
      maxUsers: 25,
      adminId: `admin-${Date.now()}`,
      createdAt: new Date(),
      trialEndsAt: addDays(new Date(), 30),
      metadata: tenantData.metadata || {
        university: 'Nouvelle Université',
        department: 'Nouveau Département',
        contactEmail: 'admin@nouvel.univ.fr',
      },
    };
    return newTenant;
  },

  // Courses
  getCourses: async (tenantId: string): Promise<Course[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return generateMockCourses(tenantId);
  },

  // Grades
  getGrades: async (tenantId: string): Promise<Grade[]> => {
    await new Promise(resolve => setTimeout(resolve, 350));
    return Array.from({ length: 50 }, (_, i) => ({
      id: `grade-${i}`,
      studentId: `student-${(i % 10) + 1}-${tenantId}`,
      courseId: `course-${i % 2 ? 'math' : 'phys'}-${tenantId}`,
      tenantId,
      type: ['exam', 'assignment', 'participation'][i % 3] as any,
      value: Math.floor(Math.random() * 20) + 1,
      maxValue: 20,
      date: subDays(new Date(), Math.floor(Math.random() * 30)),
      comments: i % 5 === 0 ? 'Excellent travail!' : undefined,
    }));
  },

  // Analytics
  getAnalytics: async (_tenantId: string): Promise<Analytics> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const userGrowth = Array.from({ length: 7 }, (_, i) => ({
      date: subDays(new Date(), 6 - i),
      users: Math.floor(Math.random() * 10) + 40,
    }));

    return {
      totalUsers: 45,
      activeUsers: 38,
      newUsersThisMonth: 8,
      totalCourses: 12,
      totalGrades: 234,
      averageGrade: 14.2,
      userGrowth,
      gradeDistribution: [
        { range: '0-5', count: 3 },
        { range: '6-10', count: 15 },
        { range: '11-15', count: 89 },
        { range: '16-20', count: 127 },
      ],
    };
  },
};

// Helper functions for components
export const getSubscriptionLimits = (subscription: string) => {
  switch (subscription) {
    case 'trial':
      return { maxUsers: 25, maxCourses: 5, maxGrades: 100 };
    case 'starter':
      return { maxUsers: 50, maxCourses: 20, maxGrades: 1000 };
    case 'premium':
      return { maxUsers: 200, maxCourses: 100, maxGrades: 10000 };
    default:
      return { maxUsers: 25, maxCourses: 5, maxGrades: 100 };
  }
};

export const formatRole = (role: string) => {
  const roleMap = {
    superadmin: 'Super Admin',
    admin: 'Administrateur',
    teacher: 'Enseignant',
    student: 'Étudiant',
  };
  return roleMap[role as keyof typeof roleMap] || role;
};