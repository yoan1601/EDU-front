import { useState } from 'react';
import { Plus, Mail, Trash2, CheckCircle, Clock, Users, GraduationCap, Send, X } from 'lucide-react';
import { Button } from '../ui/button-modern';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-modern';
import { Badge } from '../ui/badge-modern';
import { Input, FormField } from '../ui/input-modern';
import { Alert } from '../ui/feedback';

interface Teacher {
  id: string;
  email: string;
  name: string;
  status: 'invited' | 'active' | 'pending';
  invitedDate: string;
  department?: string;
}

export function TeacherManagement() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newTeacherEmail, setNewTeacherEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      email: 'jean.dupont@ufr.fr',
      name: 'Jean Dupont',
      status: 'active',
      invitedDate: '01/11/2024',
      department: 'Mathématiques',
    },
    {
      id: '2',
      email: 'marie.martin@ufr.fr',
      name: 'Marie Martin',
      status: 'active',
      invitedDate: '05/11/2024',
      department: 'Informatique',
    },
    {
      id: '3',
      email: 'pierre.bernard@ufr.fr',
      name: 'Pierre Bernard',
      status: 'pending',
      invitedDate: '10/12/2024',
      department: 'Physique',
    },
    {
      id: '4',
      email: 'sophie.dubois@ufr.fr',
      name: 'Sophie Dubois',
      status: 'active',
      invitedDate: '12/12/2024',
      department: 'Chimie',
    },
  ]);

  const remainingSlots = 5 - teachers.length;
  const activeTeachers = teachers.filter(t => t.status === 'active').length;
  const pendingInvitations = teachers.filter(t => t.status === 'pending').length;

  const handleInviteTeacher = async () => {
    if (!newTeacherEmail.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newTeacher: Teacher = {
        id: Date.now().toString(),
        email: newTeacherEmail,
        name: newTeacherEmail.split('@')[0].replace('.', ' '),
        status: 'pending',
        invitedDate: new Date().toLocaleDateString('fr-FR'),
      };
      setTeachers([...teachers, newTeacher]);
      setNewTeacherEmail('');
      setShowInviteModal(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    // In a real app, show confirmation dialog first
    setTeachers(teachers.filter(t => t.id !== teacherId));
  };

  const handleResendInvitation = async (teacherId: string) => {
    // Simulate API call
    console.log('Resending invitation for teacher:', teacherId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-brand-100 rounded-lg">
            <GraduationCap className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Gestion des Enseignants</h1>
            <p className="text-neutral-600">Maximum 5 enseignants - Accès consultation uniquement</p>
          </div>
        </div>

        {/* MVP Limit Alert */}
        <Alert
          variant="warning"
          title="Limite MVP"
          message={`Vous pouvez inviter jusqu'à 5 enseignants. Places restantes: ${remainingSlots}/5`}
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <Badge variant="success" size="sm">Actifs</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{activeTeachers}</p>
              <p className="text-neutral-600">Enseignants actifs</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <Badge variant="warning" size="sm">En attente</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{pendingInvitations}</p>
              <p className="text-neutral-600">Invitations envoyées</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <Badge variant={remainingSlots > 0 ? "brand" : "error"} size="sm">
                {remainingSlots > 0 ? 'Disponible' : 'Complet'}
              </Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{remainingSlots}</p>
              <p className="text-neutral-600">Places restantes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teachers Management Card */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-brand-800 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Liste des enseignants
            </CardTitle>
            <Button
              onClick={() => setShowInviteModal(true)}
              disabled={remainingSlots === 0}
              leftIcon={<Plus className="w-4 h-4" />}
              size="sm"
            >
              Inviter un enseignant
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {teachers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Aucun enseignant invité</h3>
              <p className="text-neutral-600 mb-6">Commencez par inviter vos premiers enseignants</p>
              <Button
                onClick={() => setShowInviteModal(true)}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Inviter un enseignant
              </Button>
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-neutral-700">Enseignant</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-700">Email</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-700">Département</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-700">Statut</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-700">Date invitation</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-brand-100 rounded-full">
                            <span className="text-sm font-medium text-brand-700">
                              {teacher.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-neutral-900">{teacher.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-neutral-600">{teacher.email}</td>
                      <td className="p-4 text-sm text-neutral-600">{teacher.department || '-'}</td>
                      <td className="p-4">
                        {teacher.status === 'active' && (
                          <Badge variant="success" size="sm">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Actif
                          </Badge>
                        )}
                        {teacher.status === 'pending' && (
                          <Badge variant="warning" size="sm">
                            <Clock className="w-3 h-3 mr-1" />
                            En attente
                          </Badge>
                        )}
                      </td>
                      <td className="p-4 text-sm text-neutral-600">{teacher.invitedDate}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResendInvitation(teacher.id)}
                            className="p-2"
                            title="Renvoyer l'invitation"
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTeacher(teacher.id)}
                            className="p-2 text-error-600 hover:text-error-700 hover:bg-error-50"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Access Information */}
      <Alert
        variant="info"
        title="Informations d'accès"
        message="Les enseignants ont un accès en lecture seule. Ils peuvent consulter leur emploi du temps personnel et les informations de leurs cours."
    />

    {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-brand-800 flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Inviter un enseignant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowInviteModal(false);
                    setNewTeacherEmail('');
                  }}
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <Alert
                variant="info"
                title="Information"
                message="Un email d'invitation sera envoyé automatiquement avec les instructions de connexion."
              />

              <FormField 
                label="Adresse email de l'enseignant" 
                required
                hint="L'enseignant recevra une invitation par email"
              >
                <Input
                  type="email"
                  value={newTeacherEmail}
                  onChange={(e) => setNewTeacherEmail(e.target.value)}
                  placeholder="exemple@ufr.fr"
                  leftIcon={<Mail className="w-4 h-4" />}
                  required
                />
              </FormField>

              <div className="flex gap-3">
                <Button
                  onClick={handleInviteTeacher}
                  disabled={!newTeacherEmail.trim() || isLoading}
                  isLoading={isLoading}
                  leftIcon={<Send className="w-4 h-4" />}
                  className="flex-1"
                >
                  Envoyer l'invitation
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowInviteModal(false);
                    setNewTeacherEmail('');
                  }}
                  disabled={isLoading}
                >
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
