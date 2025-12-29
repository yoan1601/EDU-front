import { useState } from 'react';
import { Building2, Users, TrendingUp, DollarSign, Search, Eye, CreditCard, Shield, Globe, BarChart3, Activity, Filter, MoreHorizontal, ArrowUpRight, UserCheck, Calendar } from 'lucide-react';
import { SuperAdminSubscriptions } from './superadmin/SuperAdminSubscriptions';
import { Button } from './ui/button-modern';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card-modern';
import { Badge } from './ui/badge-modern';
import { Input } from './ui/input-modern';

type SuperAdminTab = 'dashboard' | 'tenants' | 'subscriptions';

interface Tenant {
  id: string;
  name: string;
  code: string;
  admin: string;
  adminEmail: string;
  students: number;
  teachers: number;
  plan: 'trial' | 'starter';
  status: 'active' | 'trial' | 'suspended';
  createdDate: string;
  trialEndsDate?: string;
  mrr: number;
}

export function SuperAdminView() {
  const [activeTab, setActiveTab] = useState<SuperAdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tenants: Tenant[] = [
    {
      id: '1',
      name: 'UFR Sciences et Technologies',
      code: 'UFR-ST-2024',
      admin: 'Admin UFR',
      adminEmail: 'admin@ufr-st.fr',
      students: 127,
      teachers: 4,
      plan: 'starter',
      status: 'active',
      createdDate: '01/10/2024',
      mrr: 29,
    },
    {
      id: '2',
      name: 'UFR Lettres et Sciences Humaines',
      code: 'UFR-LSH-2024',
      admin: 'Marie Dubois',
      adminEmail: 'admin@ufr-lsh.fr',
      students: 89,
      teachers: 3,
      plan: 'trial',
      status: 'trial',
      createdDate: '28/11/2024',
      trialEndsDate: '28/12/2024',
      mrr: 0,
    },
    {
      id: '3',
      name: 'UFR Économie et Gestion',
      code: 'UFR-EG-2024',
      admin: 'Pierre Martin',
      adminEmail: 'admin@ufr-eg.fr',
      students: 156,
      teachers: 5,
      plan: 'starter',
      status: 'active',
      createdDate: '15/09/2024',
      mrr: 29,
    },
    {
      id: '4',
      name: 'UFR Droit',
      code: 'UFR-DROIT-2024',
      admin: 'Sophie Laurent',
      adminEmail: 'admin@ufr-droit.fr',
      students: 45,
      teachers: 2,
      plan: 'trial',
      status: 'trial',
      createdDate: '05/12/2024',
      trialEndsDate: '05/01/2025',
      mrr: 0,
    },
    {
      id: '5',
      name: 'UFR Médecine',
      code: 'UFR-MED-2024',
      admin: 'Dr. Jacques Bernard',
      adminEmail: 'admin@ufr-med.fr',
      students: 198,
      teachers: 5,
      plan: 'starter',
      status: 'active',
      createdDate: '20/08/2024',
      mrr: 29,
    },
  ];

  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.adminEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate metrics
  const totalStudents = tenants.reduce((sum, t) => sum + t.students, 0);
  const totalTeachers = tenants.reduce((sum, t) => sum + t.teachers, 0);
  const totalMRR = tenants.reduce((sum, t) => sum + t.mrr, 0);
  const activeTenants = tenants.filter((t) => t.status === 'active').length;
  const trialTenants = tenants.filter((t) => t.status === 'trial').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Actif</Badge>;
      case 'trial':
        return <Badge variant="warning" size="sm">Essai</Badge>;
      case 'suspended':
        return <Badge variant="error" size="sm">Suspendu</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string, mrr: number) => {
    if (plan === 'trial') {
      return <Badge variant="warning" size="sm">Essai gratuit</Badge>;
    }
    return <Badge variant="success" size="sm">Starter - {mrr}€</Badge>;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Espace Super-Admin</h1>
            <p className="text-neutral-600">Gestion globale multi-tenant de la plateforme</p>
          </div>
        </div>

        {/* Super Admin Info */}
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-700 font-medium">Connecté en tant que</p>
                  <p className="text-lg font-semibold text-purple-900">Super Administrateur</p>
                  <p className="text-sm text-purple-600">superadmin@edtech-platform.com</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-700 font-medium mb-2">Niveau d'accès</p>
                <Badge variant="brand" className="bg-purple-600">
                  <Shield className="w-3 h-3 mr-1" />
                  Accès global
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-neutral-100 rounded-lg">
        <Button
          variant={activeTab === 'dashboard' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('dashboard')}
          leftIcon={<BarChart3 className="w-4 h-4" />}
          className="flex-1"
        >
          Dashboard Global
        </Button>
        <Button
          variant={activeTab === 'tenants' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('tenants')}
          leftIcon={<Building2 className="w-4 h-4" />}
          className="flex-1"
        >
          Gestion Tenants/UFR
        </Button>
        <Button
          variant={activeTab === 'subscriptions' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('subscriptions')}
          leftIcon={<CreditCard className="w-4 h-4" />}
          className="flex-1"
        >
          Abonnements & Facturation
        </Button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Global Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Tenants totaux</p>
                    <p className="text-2xl font-bold text-neutral-900">{tenants.length}</p>
                    <p className="text-xs text-success-600 mt-1">
                      {activeTenants} actifs • {trialTenants} en essai
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 bg-brand-100 rounded-lg">
                    <Building2 className="w-5 h-5 text-brand-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Étudiants totaux</p>
                    <p className="text-2xl font-bold text-neutral-900">{totalStudents.toLocaleString()}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Sur tous les tenants
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Enseignants totaux</p>
                    <p className="text-2xl font-bold text-neutral-900">{totalTeachers}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Sur tous les tenants
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
                    <UserCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700">MRR Total</p>
                    <p className="text-2xl font-bold text-purple-900">{totalMRR.toLocaleString()}€</p>
                    <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {activeTenants} abonnements actifs
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-200 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tenants Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-600" />
                Vue d'ensemble des tenants
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Tenant</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Code</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Utilisateurs</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Plan</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Statut</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">MRR</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {tenants.map((tenant) => (
                      <tr key={tenant.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-neutral-900">{tenant.name}</p>
                            <p className="text-sm text-neutral-500">{tenant.adminEmail}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <code className="text-sm font-mono text-neutral-700 bg-neutral-100 px-2 py-1 rounded">
                            {tenant.code}
                          </code>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="text-sm text-neutral-900">{tenant.students}/200 étudiants</div>
                            <div className="text-sm text-neutral-900">{tenant.teachers}/5 enseignants</div>
                          </div>
                        </td>
                        <td className="p-4">
                          {getPlanBadge(tenant.plan, tenant.mrr)}
                        </td>
                        <td className="p-4">
                          {getStatusBadge(tenant.status)}
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-neutral-900">{tenant.mrr}€</div>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                            Voir
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tenants Tab */}
      {activeTab === 'tenants' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Rechercher un tenant, code ou email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={<Search className="w-4 h-4" />}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
                    Filtres
                  </Button>
                  <Badge variant="default">
                    {filteredTenants.length} tenant(s)
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tenants List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-600" />
                Liste complète des tenants
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">UFR / Université</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Administrateur</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Utilisateurs</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Plan</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Date création</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredTenants.map((tenant) => (
                      <tr key={tenant.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-neutral-900">{tenant.name}</p>
                            <code className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded mt-1 inline-block">
                              {tenant.code}
                            </code>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-sm font-medium text-neutral-900">{tenant.admin}</p>
                            <p className="text-xs text-neutral-500">{tenant.adminEmail}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-neutral-400" />
                              <span className="text-sm">{tenant.students} étudiants</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-neutral-400" />
                              <span className="text-sm">{tenant.teachers} enseignants</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-2">
                            {getPlanBadge(tenant.plan, tenant.mrr)}
                            {tenant.plan === 'trial' && tenant.trialEndsDate && (
                              <div className="flex items-center gap-1 text-xs text-warning-600">
                                <Calendar className="w-3 h-3" />
                                Expire: {tenant.trialEndsDate}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-neutral-600">{tenant.createdDate}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                              Voir
                            </Button>
                            <Button variant="ghost" size="sm" leftIcon={<MoreHorizontal className="w-4 h-4" />} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Subscriptions Tab */}
      {activeTab === 'subscriptions' && <SuperAdminSubscriptions tenants={tenants} />}
    </div>
  );
}
