import { useState } from 'react';
import { AdminDashboard } from './components/AdminDashboard';
import { TeacherView } from './components/TeacherView';
import { StudentView } from './components/StudentView';
import { SuperAdminView } from './components/SuperAdminView';
import { LoginScreen } from './components/auth/LoginScreen';
import { SignupScreen } from './components/auth/SignupScreen';
import { WelcomeScreen } from './components/auth/WelcomeScreen';
import { Button } from './components/ui/button-modern';
import { LogOut, Settings, BookOpen } from 'lucide-react';

type Role = 'superadmin' | 'admin' | 'teacher' | 'student';
type AuthState = 'login' | 'signup' | 'welcome' | 'authenticated';

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [currentRole, setCurrentRole] = useState<Role>('admin');

  const handleLogin = (role: string) => {
    setCurrentRole(role as Role);
    setAuthState('authenticated');
  };

  const handleSignupComplete = () => {
    setCurrentRole('admin');
    setAuthState('welcome');
  };

  const handleWelcomeContinue = () => {
    setAuthState('authenticated');
  };

  const handleLogout = () => {
    setAuthState('login');
    setCurrentRole('admin');
  };

  // Authentication screens
  if (authState === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onNavigateToSignup={() => setAuthState('signup')}
      />
    );
  }

  if (authState === 'signup') {
    return (
      <SignupScreen
        onSignupComplete={handleSignupComplete}
        onNavigateToLogin={() => setAuthState('login')}
      />
    );
  }

  if (authState === 'welcome') {
    return <WelcomeScreen onContinue={handleWelcomeContinue} />;
  }

  // Authenticated application
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Modern Header */}
      <header className="bg-white border-b border-neutral-200 shadow-soft">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-brand-600 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900">EdTech Platform</h1>
                <p className="text-xs text-neutral-500 hidden sm:block">Multi-tenant SaaS pour universités</p>
              </div>
            </div>

            {/* Role Switcher & Actions */}
            <div className="flex items-center gap-3">
              {/* Demo Role Switcher */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-lg">
                <Settings className="w-4 h-4 text-neutral-500" />
                <span className="text-xs text-neutral-600 font-medium hidden sm:block">Demo:</span>
                
                <Button
                  size="sm"
                  variant={currentRole === 'superadmin' ? 'primary' : 'ghost'}
                  onClick={() => setCurrentRole('superadmin')}
                >
                  Super Admin
                </Button>
                
                <Button
                  size="sm"
                  variant={currentRole === 'admin' ? 'primary' : 'ghost'}
                  onClick={() => setCurrentRole('admin')}
                >
                  Admin
                </Button>
                
                <Button
                  size="sm"
                  variant={currentRole === 'teacher' ? 'primary' : 'ghost'}
                  onClick={() => setCurrentRole('teacher')}
                >
                  Enseignant
                </Button>
                
                <Button
                  size="sm"
                  variant={currentRole === 'student' ? 'primary' : 'ghost'}
                  onClick={() => setCurrentRole('student')}
                >
                  Étudiant
                </Button>
              </div>

              {/* User Actions */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                leftIcon={<LogOut className="w-4 h-4" />}
              >
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {currentRole === 'superadmin' && <SuperAdminView />}
        {currentRole === 'admin' && <AdminDashboard />}
        {currentRole === 'teacher' && <TeacherView />}
        {currentRole === 'student' && <StudentView />}
      </main>
    </div>
  );
}