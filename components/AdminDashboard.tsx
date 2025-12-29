import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  Plus,
  TrendingUp,
  Clock,
  UserCheck,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card-modern';
import { Button } from './ui/button-modern';
import { Badge } from './ui/badge-modern';
import { TenantManagement } from './admin/TenantManagement';
import { TeacherManagement } from './admin/TeacherManagement';
import { ScheduleManagement } from './admin/ScheduleManagement';
import { GradesManagement } from './admin/GradesManagement';
import { mockApi, Analytics } from '../services/mockApi';

type AdminView = 'dashboard' | 'tenant' | 'teachers' | 'schedule' | 'grades';

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await mockApi.getAnalytics('ufr-sciences');
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentView === 'dashboard') {
      loadAnalytics();
    }
  }, [currentView]);

  const navigationItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Vue d\'ensemble'
    },
    {
      key: 'tenant',
      label: 'Configuration',
      icon: Settings,
      description: 'Paramètres UFR'
    },
    {
      key: 'teachers',
      label: 'Enseignants',
      icon: Users,
      description: 'Max 5 en Starter'
    },
    {
      key: 'schedule',
      label: 'Planning',
      icon: Calendar,
      description: 'Emplois du temps'
    },
    {
      key: 'grades',
      label: 'Évaluations',
      icon: FileText,
      description: 'Gestion des notes'
    }
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-white border-r border-neutral-200 p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-1">Navigation</h2>
          <p className="text-sm text-neutral-500">Tableau de bord admin</p>
        </div>

        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.key;
            
            return (
              <button
                key={item.key}
                onClick={() => setCurrentView(item.key as AdminView)}
                className={`w-full flex items-start gap-3 px-3 py-3 text-left rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand-50 text-brand-700 border border-brand-200' 
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  isActive ? 'text-brand-600' : 'text-neutral-400'
                }`} />
                <div>
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-neutral-500">{item.description}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* User Info Card */}
        <Card className="mt-8" padding="sm">
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-brand-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">Admin UFR</p>
                <p className="text-xs text-neutral-500 truncate">admin@ufr.fr</p>
                <Badge variant="success" size="sm" className="mt-1">UFR Sciences</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-neutral-50">
        {currentView === 'dashboard' && <DashboardView analytics={analytics} loading={loading} />}
        {currentView === 'tenant' && <TenantManagement />}
        {currentView === 'teachers' && <TeacherManagement />}
        {currentView === 'schedule' && <ScheduleManagement />}
        {currentView === 'grades' && <GradesManagement />}
      </div>
    </div>
  );
}

interface DashboardViewProps {
  analytics: Analytics | null;
  loading: boolean;
}

function DashboardView({ analytics, loading }: DashboardViewProps) {
  const quickActions = [
    {
      label: 'Nouvel emploi du temps',
      description: 'Planifier les cours',
      icon: Calendar,
      variant: 'primary' as const,
    },
    {
      label: 'Inviter un enseignant',
      description: '3/5 enseignants utilisés',
      icon: Users,
      variant: 'secondary' as const,
    },
    {
      label: 'Saisir des notes',
      description: 'Évaluations en attente',
      icon: FileText,
      variant: 'secondary' as const,
    },
  ];

  const recentActivities = [
    { 
      action: 'Emploi du temps créé', 
      detail: 'L3 Informatique - Semestre 1', 
      time: 'Il y a 2h',
      type: 'schedule'
    },
    { 
      action: 'Enseignant invité', 
      detail: 'prof.dupont@sciences.univ.fr', 
      time: 'Il y a 5h',
      type: 'user'
    },
    { 
      action: 'Notes saisies', 
      detail: '15 étudiants - Mathématiques L2', 
      time: 'Il y a 1j',
      type: 'grades'
    },
    { 
      action: 'Configuration mise à jour', 
      detail: 'Paramètres de notification', 
      time: 'Il y a 2j',
      type: 'settings'
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="h-8 bg-neutral-200 rounded animate-pulse w-64"></div>
          <div className="h-4 bg-neutral-200 rounded animate-pulse w-96"></div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-32">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-neutral-200 rounded w-24"></div>
                <div className="h-8 bg-neutral-200 rounded w-16"></div>
                <div className="h-4 bg-neutral-200 rounded w-32"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard Admin</h1>
        <p className="text-neutral-600">Vue d'ensemble de votre UFR Sciences et Technologies</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-600 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Étudiants actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-3xl font-bold text-neutral-900">{analytics?.activeUsers || 0}</p>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-success-600" />
                <span className="text-success-600">+{analytics?.newUsersThisMonth || 0}</span>
                <span className="text-neutral-500">ce mois</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-600 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Quotas utilisés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-3xl font-bold text-neutral-900">
                {analytics?.totalUsers || 0}/50
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Utilisateurs</span>
                  <span className="text-neutral-900">90%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-brand-600 h-2 rounded-full" 
                    style={{ width: `${((analytics?.totalUsers || 0) / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Abonnement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="brand">Plan Starter</Badge>
                <Badge variant="success">Actif</Badge>
              </div>
              <p className="text-sm text-neutral-600">
                Prochaine facturation: <br />
                <span className="font-medium">29 janvier 2025</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} variant="interactive" className="group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-50 rounded-lg group-hover:bg-brand-100 transition-colors">
                      <Icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral-900 mb-1">{action.label}</h4>
                      <p className="text-sm text-neutral-600 mb-3">{action.description}</p>
                      <Button size="sm" variant={action.variant}>
                        <Plus className="w-4 h-4 mr-1" />
                        Créer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Activité récente</h3>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Journal d'activité
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-200">
              {recentActivities.map((item, index) => (
                <div key={index} className="p-6 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-neutral-900">{item.action}</h4>
                      <p className="text-sm text-neutral-600">{item.detail}</p>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-500 whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}