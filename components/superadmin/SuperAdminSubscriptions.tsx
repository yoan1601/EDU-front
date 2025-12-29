import { useState } from 'react';
import { CreditCard, Download, DollarSign, TrendingUp, Calendar, AlertCircle, CheckCircle, Clock, ArrowUpRight, Users, Building2, FileText, Filter } from 'lucide-react';
import { Button } from '../ui/button-modern';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-modern';
import { Badge } from '../ui/badge-modern';

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

interface SuperAdminSubscriptionsProps {
  tenants: Tenant[];
}

interface Invoice {
  id: string;
  tenantId: string;
  tenantName: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceNumber: string;
}

export function SuperAdminSubscriptions({ tenants }: SuperAdminSubscriptionsProps) {
  const [selectedTenant, setSelectedTenant] = useState<string>('all');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedTenantForUpgrade, setSelectedTenantForUpgrade] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const invoices: Invoice[] = [
    {
      id: '1',
      tenantId: '1',
      tenantName: 'UFR Sciences et Technologies',
      date: '29/11/2024',
      amount: 29,
      status: 'paid',
      invoiceNumber: 'INV-2024-001',
    },
    {
      id: '2',
      tenantId: '3',
      tenantName: 'UFR Économie et Gestion',
      date: '29/11/2024',
      amount: 29,
      status: 'paid',
      invoiceNumber: 'INV-2024-002',
    },
    {
      id: '3',
      tenantId: '5',
      tenantName: 'UFR Médecine',
      date: '29/11/2024',
      amount: 29,
      status: 'paid',
      invoiceNumber: 'INV-2024-003',
    },
    {
      id: '4',
      tenantId: '1',
      tenantName: 'UFR Sciences et Technologies',
      date: '29/10/2024',
      amount: 29,
      status: 'paid',
      invoiceNumber: 'INV-2024-004',
    },
    {
      id: '5',
      tenantId: '3',
      tenantName: 'UFR Économie et Gestion',
      date: '15/12/2024',
      amount: 29,
      status: 'pending',
      invoiceNumber: 'INV-2024-005',
    },
  ];

  const filteredInvoices = selectedTenant === 'all' 
    ? invoices 
    : invoices.filter(inv => inv.tenantId === selectedTenant);

  // Calculate metrics
  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingRevenue = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
  const activeTenants = tenants.filter(t => t.status === 'active').length;
  const trialTenants = tenants.filter(t => t.status === 'trial');

  const handleUpgradeTenant = (tenant: Tenant) => {
    setSelectedTenantForUpgrade(tenant);
    setShowUpgradeModal(true);
  };

  const handleConfirmUpgrade = async () => {
    if (!selectedTenantForUpgrade) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowUpgradeModal(false);
      setSelectedTenantForUpgrade(null);
      // In real app, this would trigger a tenant status update
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge variant="success" size="sm" className="gap-1">
            <CheckCircle className="w-3 h-3" />
            Payé
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="warning" size="sm" className="gap-1">
            <Clock className="w-3 h-3" />
            En attente
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="error" size="sm" className="gap-1">
            <AlertCircle className="w-3 h-3" />
            Échec
          </Badge>
        );
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Revenu Total</p>
                <p className="text-2xl font-bold text-purple-900">{totalRevenue.toLocaleString()}€</p>
                <p className="text-xs text-purple-600 mt-1">Facturé à ce jour</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-purple-200 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">MRR Actuel</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {tenants.reduce((sum, t) => sum + t.mrr, 0).toLocaleString()}€
                </p>
                <p className="text-xs text-success-600 mt-1 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {activeTenants} abonnements actifs
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">En attente</p>
                <p className="text-2xl font-bold text-neutral-900">{pendingRevenue}€</p>
                <p className="text-xs text-neutral-500 mt-1">À encaisser ce mois</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning-200 bg-gradient-to-br from-warning-50 to-warning-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warning-700">Essais gratuits</p>
                <p className="text-2xl font-bold text-warning-900">{trialTenants.length}</p>
                <p className="text-xs text-warning-600 mt-1">Opportunités de conversion</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-warning-200 rounded-lg">
                <Calendar className="w-5 h-5 text-warning-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trial Tenants - Conversion Opportunities */}
      {trialTenants.length > 0 && (
        <Card className="border-warning-200 bg-gradient-to-r from-warning-50 to-warning-100/50">
          <CardHeader className="bg-warning-100 border-b border-warning-200">
            <CardTitle className="text-warning-800 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Opportunités de conversion - Tenants en essai gratuit
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-warning-100">
              {trialTenants.map((tenant) => (
                <div key={tenant.id} className="p-4 flex items-center justify-between hover:bg-warning-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-warning-200 rounded-full">
                        <Building2 className="w-4 h-4 text-warning-700" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{tenant.name}</p>
                        <p className="text-sm text-neutral-600 flex items-center gap-2">
                          {tenant.adminEmail}
                          <span className="text-neutral-400">•</span>
                          <Users className="w-4 h-4" />
                          {tenant.students} étudiants
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-neutral-500 font-medium">Essai expire</p>
                      <Badge variant="warning" size="sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {tenant.trialEndsDate}
                      </Badge>
                    </div>
                    <Button
                      onClick={() => handleUpgradeTenant(tenant)}
                      size="sm"
                      rightIcon={<ArrowUpRight className="w-4 h-4" />}
                    >
                      Convertir en Starter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Subscriptions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-600" />
              Abonnements actifs
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="default" size="sm">
                <Filter className="w-3 h-3 mr-1" />
                Filtrer par tenant
              </Badge>
              <select
                value={selectedTenant}
                onChange={(e) => setSelectedTenant(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value="all">Tous les tenants</option>
                {tenants.filter(t => t.status === 'active').map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Tenant</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Plan</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Utilisateurs</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">MRR</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Date début</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Prochaine facturation</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {tenants.filter(t => t.status === 'active').map((tenant) => {
                  const nextBillingDate = new Date(tenant.createdDate.split('/').reverse().join('-'));
                  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
                  
                  return (
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
                        <Badge variant="success" size="sm">Starter</Badge>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="text-sm text-neutral-900">{tenant.students} étudiants</div>
                          <div className="text-sm text-neutral-900">{tenant.teachers} enseignants</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-neutral-900">{tenant.mrr}€</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-neutral-600">{tenant.createdDate}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-neutral-600">
                          {nextBillingDate.toLocaleDateString('fr-FR')}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge variant="success" size="sm" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Actif
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-600" />
              Historique de facturation global
            </CardTitle>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Download className="w-4 h-4" />}
            >
              Exporter tout (CSV)
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">N° Facture</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Tenant</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Montant</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Statut</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4">
                      <code className="text-sm font-mono text-neutral-700 bg-neutral-100 px-2 py-1 rounded">
                        {invoice.invoiceNumber}
                      </code>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-neutral-900">{invoice.tenantName}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600">{invoice.date}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-neutral-900">{invoice.amount}€</span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        Télécharger PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedTenantForUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100 border-b border-brand-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-brand-800">Convertir tenant en plan Starter</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowUpgradeModal(false);
                    setSelectedTenantForUpgrade(null);
                  }}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Action Super-Admin:</strong> Vous êtes sur le point de convertir ce tenant de l'essai gratuit vers le plan Starter payant.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-neutral-700 mb-3">Tenant sélectionné</p>
                <Card className="bg-neutral-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-brand-100 rounded-lg">
                        <Building2 className="w-5 h-5 text-brand-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900">{selectedTenantForUpgrade.name}</p>
                        <p className="text-sm text-neutral-600">{selectedTenantForUpgrade.adminEmail}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500">
                          <span>{selectedTenantForUpgrade.students} étudiants</span>
                          <span>•</span>
                          <span>{selectedTenantForUpgrade.teachers} enseignants</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-neutral-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-neutral-700">Plan Starter - Mensuel</span>
                    <span className="font-medium text-neutral-900">29€</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-3 flex items-center justify-between">
                    <span className="font-medium text-neutral-900">Total mensuel</span>
                    <span className="text-xl font-bold text-neutral-900">29€</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={handleConfirmUpgrade}
                  isLoading={isLoading}
                  leftIcon={<CreditCard className="w-4 h-4" />}
                >
                  Confirmer la conversion
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowUpgradeModal(false);
                    setSelectedTenantForUpgrade(null);
                  }}
                  disabled={isLoading}
                >
                  Annuler
                </Button>
              </div>

              <p className="text-xs text-neutral-500 text-center">
                Le tenant sera facturé automatiquement chaque mois via Stripe
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
