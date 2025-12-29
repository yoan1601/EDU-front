import { useState } from 'react';
import { Save, Edit2, Building2, Phone, Mail, MapPin, Users, GraduationCap, School, X } from 'lucide-react';
import { Button } from '../ui/button-modern';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-modern';
import { Badge } from '../ui/badge-modern';
import { Input, FormField } from '../ui/input-modern';
import { Alert } from '../ui/feedback';

interface TenantData {
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  maxStudents: number;
  maxTeachers: number;
}

export function TenantManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tenantData, setTenantData] = useState<TenantData>({
    name: 'UFR Sciences et Technologies',
    code: 'UFR-ST-2024',
    address: '123 Avenue de l\'Université, 75000 Paris',
    phone: '+33 1 23 45 67 89',
    email: 'contact@ufr-st.fr',
    maxStudents: 200,
    maxTeachers: 5,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values in real app
  };

  const handleInputChange = (field: keyof TenantData, value: string | number) => {
    setTenantData({ ...tenantData, [field]: value });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-brand-100 rounded-lg">
            <Building2 className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Gestion Tenant / UFR</h1>
            <p className="text-neutral-600">Configuration et informations du tenant</p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert
          variant="info"
          title="Informations importantes"
          message="Le tenant représente votre université/UFR. Ces informations sont utilisées pour l'identification et la facturation."
        />
      </div>

      {/* Tenant Information Card */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-brand-800 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Informations du Tenant
            </CardTitle>
            <Button
              variant={isEditing ? "secondary" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
              leftIcon={isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              size="sm"
            >
              {isEditing ? 'Annuler' : 'Modifier'}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <FormField 
                label="Nom de l'établissement" 
                required
                hint="Nom officiel de votre université ou UFR"
              >
                {isEditing ? (
                  <Input
                    type="text"
                    value={tenantData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    leftIcon={<Building2 className="w-4 h-4" />}
                    required
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <Building2 className="w-4 h-4 text-neutral-500" />
                    <span className="font-medium text-neutral-900">{tenantData.name}</span>
                  </div>
                )}
              </FormField>

              <FormField 
                label="Code Tenant" 
                required
                hint="Identifiant unique de votre tenant"
              >
                {isEditing ? (
                  <Input
                    type="text"
                    value={tenantData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    leftIcon={<School className="w-4 h-4" />}
                    required
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <School className="w-4 h-4 text-neutral-500" />
                    <code className="font-mono text-sm text-neutral-700 bg-neutral-100 px-2 py-1 rounded">
                      {tenantData.code}
                    </code>
                  </div>
                )}
              </FormField>

              <FormField 
                label="Adresse" 
                required
                hint="Adresse postale complète de l'établissement"
              >
                {isEditing ? (
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                    <textarea
                      value={tenantData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
                      required
                    />
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <MapPin className="w-4 h-4 text-neutral-500 mt-0.5" />
                    <span className="text-neutral-900 leading-relaxed">{tenantData.address}</span>
                  </div>
                )}
              </FormField>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <FormField 
                label="Téléphone" 
                required
                hint="Numéro de téléphone principal"
              >
                {isEditing ? (
                  <Input
                    type="tel"
                    value={tenantData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    leftIcon={<Phone className="w-4 h-4" />}
                    required
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <Phone className="w-4 h-4 text-neutral-500" />
                    <span className="font-medium text-neutral-900">{tenantData.phone}</span>
                  </div>
                )}
              </FormField>

              <FormField 
                label="Email de contact" 
                required
                hint="Adresse email principale de l'établissement"
              >
                {isEditing ? (
                  <Input
                    type="email"
                    value={tenantData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    leftIcon={<Mail className="w-4 h-4" />}
                    required
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <Mail className="w-4 h-4 text-neutral-500" />
                    <span className="font-medium text-neutral-900">{tenantData.email}</span>
                  </div>
                )}
              </FormField>

              {/* Subscription Limits */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-700 mb-3">Limites d'abonnement</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-700">Max Étudiants</span>
                      <Users className="w-4 h-4 text-neutral-500" />
                    </div>
                    <p className="text-xl font-bold text-neutral-900">{tenantData.maxStudents}</p>
                    <p className="text-xs text-neutral-500 mt-1">Défini par l'abonnement</p>
                  </div>

                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-700">Max Enseignants</span>
                      <GraduationCap className="w-4 h-4 text-neutral-500" />
                    </div>
                    <p className="text-xl font-bold text-neutral-900">{tenantData.maxTeachers}</p>
                    <p className="text-xs text-neutral-500 mt-1">Limite MVP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="mt-8 pt-6 border-t border-neutral-200 flex gap-3">
              <Button
                onClick={handleSave}
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
                size="lg"
              >
                Enregistrer les modifications
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={isSaving}
                size="lg"
              >
                Annuler
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tenant Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
              </div>
              <Badge variant="success" size="sm">Actif</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">4</p>
              <p className="text-neutral-600 mb-2">Enseignants invités</p>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex-1 bg-neutral-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <span className="text-neutral-500">1 place restante</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <Badge variant="success" size="sm">Actif</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">127</p>
              <p className="text-neutral-600 mb-2">Étudiants inscrits</p>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex-1 bg-neutral-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '63.5%' }}></div>
                </div>
                <span className="text-neutral-500">73 places restantes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <School className="w-5 h-5 text-purple-600" />
              </div>
              <Badge variant="brand" size="sm">Configuré</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">8</p>
              <p className="text-neutral-600 mb-2">Promotions créées</p>
              <p className="text-xs text-neutral-500">L1, L2, L3, M1, M2, ...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
