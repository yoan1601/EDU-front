import { useState } from 'react';
import { Plus, AlertTriangle, Calendar, Clock, MapPin, User, Download, FileText, Edit2, Trash2, Save, X, GraduationCap, BookOpen } from 'lucide-react';
import { Button } from '../ui/button-modern';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-modern';
import { Badge } from '../ui/badge-modern';
import { Input, FormField } from '../ui/input-modern';
import { Alert } from '../ui/feedback';

interface Course {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
}

export function ScheduleManagement() {
  const [selectedPromotion, setSelectedPromotion] = useState('L3-INFO');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [draggedCourse, setDraggedCourse] = useState<string | null>(null);
  const [conflictAlert, setConflictAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newCourse, setNewCourse] = useState({ subject: '', teacher: '', room: '', day: 'Lundi', startTime: '08:00', endTime: '10:00' });

  const promotions = ['L1-INFO', 'L2-INFO', 'L3-INFO', 'M1-INFO', 'M2-INFO'];
  
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      subject: 'Mathématiques',
      teacher: 'Prof. Dupont',
      room: 'A101',
      day: 'Lundi',
      startTime: '08:00',
      endTime: '10:00',
      color: 'bg-blue-200',
    },
    {
      id: '2',
      subject: 'Programmation',
      teacher: 'Prof. Martin',
      room: 'B205',
      day: 'Lundi',
      startTime: '14:00',
      endTime: '16:00',
      color: 'bg-green-200',
    },
    {
      id: '3',
      subject: 'Base de données',
      teacher: 'Prof. Bernard',
      room: 'A102',
      day: 'Mardi',
      startTime: '10:00',
      endTime: '12:00',
      color: 'bg-purple-200',
    },
    {
      id: '4',
      subject: 'Réseaux',
      teacher: 'Prof. Dubois',
      room: 'C301',
      day: 'Mercredi',
      startTime: '09:00',
      endTime: '11:00',
      color: 'bg-orange-200',
    },
  ]);

  const handleDragStart = (courseId: string) => {
    setDraggedCourse(courseId);
  };

  const handleDrop = (day: string, time: string) => {
    if (draggedCourse) {
      // Check for conflicts
      const hasConflict = courses.some(
        (c) => c.id !== draggedCourse && c.day === day && c.startTime === time
      );
      
      if (hasConflict) {
        setConflictAlert(true);
        setTimeout(() => setConflictAlert(false), 3000);
      } else {
        setCourses(
          courses.map((c) =>
            c.id === draggedCourse ? { ...c, day, startTime: time } : c
          )
        );
      }
    }
    setDraggedCourse(null);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowEditCourseModal(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      setCourses(courses.filter((c) => c.id !== courseId));
    }
  };

  const handleAddCourse = async () => {
    if (!newCourse.subject || !newCourse.teacher || !newCourse.room) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const courseToAdd: Course = {
        id: Date.now().toString(),
        ...newCourse,
        color: 'bg-brand-100',
      };
      setCourses([...courses, courseToAdd]);
      setNewCourse({ subject: '', teacher: '', room: '', day: 'Lundi', startTime: '08:00', endTime: '10:00' });
      setShowAddCourseModal(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleSaveEditCourse = async () => {
    if (!selectedCourse) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCourses(courses.map(c => c.id === selectedCourse.id ? selectedCourse : c));
      setShowEditCourseModal(false);
      setSelectedCourse(null);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-brand-100 rounded-lg">
            <Calendar className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Gestion Emploi du Temps</h1>
            <p className="text-neutral-600">Interface drag & drop avec détection de conflits</p>
          </div>
        </div>

        {/* Conflict Alert */}
        {conflictAlert && (
          <Alert
            variant="error"
            title="Conflit détecté"
            message="Un cours existe déjà à ce créneau horaire. Impossible de placer le cours."
          />
        )}
      </div>

      {/* Controls Card */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle className="text-brand-800 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Promotion sélectionnée
              </CardTitle>
              <select
                value={selectedPromotion}
                onChange={(e) => setSelectedPromotion(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
              >
                {promotions.map((promo) => (
                  <option key={promo} value={promo}>
                    {promo}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Export PDF
              </Button>
              <Button variant="secondary" size="sm" leftIcon={<FileText className="w-4 h-4" />}>
                Export CSV
              </Button>
              <Button onClick={() => setShowAddCourseModal(true)} size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Ajouter un cours
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Info Alert */}
      <Alert
        variant="info"
        title="Instructions"
        message="Glissez-déposez les cours dans les créneaux pour réorganiser l'emploi du temps. Les conflits sont automatiquement détectés."
      />

      {/* Schedule Grid */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
          <CardTitle className="text-brand-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Emploi du temps - {selectedPromotion}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="p-4 border-r border-neutral-200 text-sm font-medium text-neutral-700 w-24">
                    Horaire
                  </th>
                  {days.map((day) => (
                    <th key={day} className="p-4 border-r border-neutral-200 text-sm font-medium text-neutral-700">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, idx) => (
                  <tr key={time} className="border-b border-neutral-200">
                    <td className="p-2 border-r border-neutral-200 bg-neutral-50 text-center">
                      <span className="text-xs text-neutral-600 font-medium">{time}</span>
                    </td>
                    {days.map((day) => {
                      const course = courses.find(
                        (c) => c.day === day && c.startTime === time
                      );
                      return (
                        <td
                          key={`${day}-${time}`}
                          className="p-2 border-r border-neutral-200 relative h-20 hover:bg-neutral-50 transition-colors"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDrop(day, time)}
                        >
                          {course ? (
                            <div
                              draggable
                              onDragStart={() => handleDragStart(course.id)}
                              className="bg-white border border-brand-300 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow h-full relative group"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium text-neutral-900 truncate">{course.subject}</p>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditCourse(course);
                                    }}
                                    className="p-1 hover:bg-neutral-100 rounded"
                                  >
                                    <Edit2 className="w-3 h-3 text-neutral-500" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteCourse(course.id);
                                    }}
                                    className="p-1 hover:bg-error-50 rounded"
                                  >
                                    <Trash2 className="w-3 h-3 text-error-500" />
                                  </button>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs text-neutral-600">
                                  <User className="w-3 h-3" />
                                  <span className="truncate">{course.teacher}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-neutral-600">
                                  <MapPin className="w-3 h-3" />
                                  <span>{course.room}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center border-2 border-dashed border-neutral-200 rounded-lg">
                              <span className="text-xs text-neutral-400">Glisser ici</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <Badge variant="brand" size="sm">Total</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{courses.length}</p>
              <p className="text-neutral-600">Cours planifiés</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <Badge variant="success" size="sm">Actifs</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{new Set(courses.map(c => c.teacher)).size}</p>
              <p className="text-neutral-600">Enseignants</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <Badge variant="brand" size="sm">Utilisées</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{new Set(courses.map(c => c.room)).size}</p>
              <p className="text-neutral-600">Salles</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <Badge variant="warning" size="sm">Heures</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{courses.length * 2}</p>
              <p className="text-neutral-600">Heures/semaine</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-brand-800 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Ajouter un cours
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddCourseModal(false);
                    setNewCourse({ subject: '', teacher: '', room: '', day: 'Lundi', startTime: '08:00', endTime: '10:00' });
                  }}
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Matière" required hint="Nom de la matière enseignée">
                  <Input
                    type="text"
                    value={newCourse.subject}
                    onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })}
                    placeholder="Ex: Mathématiques"
                    leftIcon={<BookOpen className="w-4 h-4" />}
                    required
                  />
                </FormField>

                <FormField label="Enseignant" required hint="Sélectionner l'enseignant">
                  <select
                    value={newCourse.teacher}
                    onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                  >
                    <option value="">Sélectionner...</option>
                    <option value="Prof. Dupont">Prof. Dupont</option>
                    <option value="Prof. Martin">Prof. Martin</option>
                    <option value="Prof. Bernard">Prof. Bernard</option>
                    <option value="Prof. Dubois">Prof. Dubois</option>
                  </select>
                </FormField>

                <FormField label="Salle" required hint="Numéro ou nom de la salle">
                  <Input
                    type="text"
                    value={newCourse.room}
                    onChange={(e) => setNewCourse({ ...newCourse, room: e.target.value })}
                    placeholder="Ex: A101"
                    leftIcon={<MapPin className="w-4 h-4" />}
                    required
                  />
                </FormField>

                <FormField label="Jour" required hint="Jour de la semaine">
                  <select
                    value={newCourse.day}
                    onChange={(e) => setNewCourse({ ...newCourse, day: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Heure début" required hint="Heure de début du cours">
                  <select
                    value={newCourse.startTime}
                    onChange={(e) => setNewCourse({ ...newCourse, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Heure fin" required hint="Heure de fin du cours">
                  <select
                    value={newCourse.endTime}
                    onChange={(e) => setNewCourse({ ...newCourse, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddCourse}
                  disabled={!newCourse.subject || !newCourse.teacher || !newCourse.room || isLoading}
                  isLoading={isLoading}
                  leftIcon={<Save className="w-4 h-4" />}
                  className="flex-1"
                >
                  Créer le cours
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowAddCourseModal(false);
                    setNewCourse({ subject: '', teacher: '', room: '', day: 'Lundi', startTime: '08:00', endTime: '10:00' });
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

      {/* Edit Course Modal */}
      {showEditCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
              <div className="flex items-center justify-between">
                <CardTitle className="text-brand-800 flex items-center gap-2">
                  <Edit2 className="w-5 h-5" />
                  Modifier le cours
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowEditCourseModal(false);
                    setSelectedCourse(null);
                  }}
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField label="Matière" required hint="Nom de la matière enseignée">
                  <Input
                    type="text"
                    value={selectedCourse.subject}
                    onChange={(e) => setSelectedCourse({ ...selectedCourse, subject: e.target.value })}
                    placeholder="Ex: Mathématiques"
                    leftIcon={<BookOpen className="w-4 h-4" />}
                    required
                  />
                </FormField>

                <FormField label="Enseignant" required hint="Sélectionner l'enseignant">
                  <select
                    value={selectedCourse.teacher}
                    onChange={(e) => setSelectedCourse({ ...selectedCourse, teacher: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                  >
                    <option value="Prof. Dupont">Prof. Dupont</option>
                    <option value="Prof. Martin">Prof. Martin</option>
                    <option value="Prof. Bernard">Prof. Bernard</option>
                    <option value="Prof. Dubois">Prof. Dubois</option>
                  </select>
                </FormField>

                <FormField label="Salle" required hint="Numéro ou nom de la salle">
                  <Input
                    type="text"
                    value={selectedCourse.room}
                    onChange={(e) => setSelectedCourse({ ...selectedCourse, room: e.target.value })}
                    placeholder="Ex: A101"
                    leftIcon={<MapPin className="w-4 h-4" />}
                    required
                  />
                </FormField>

                <FormField label="Jour" required hint="Jour de la semaine">
                  <select
                    value={selectedCourse.day}
                    onChange={(e) => setSelectedCourse({ ...selectedCourse, day: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Heure début" required hint="Heure de début du cours">
                  <select
                    value={selectedCourse.startTime}
                    onChange={(e) => setSelectedCourse({ ...selectedCourse, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Heure fin" required hint="Heure de fin du cours">
                  <select
                    value={selectedCourse.endTime}
                    onChange={(e) => setSelectedCourse({ ...selectedCourse, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSaveEditCourse}
                  disabled={!selectedCourse.subject || !selectedCourse.teacher || !selectedCourse.room || isLoading}
                  isLoading={isLoading}
                  leftIcon={<Save className="w-4 h-4" />}
                  className="flex-1"
                >
                  Enregistrer les modifications
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowEditCourseModal(false);
                    setSelectedCourse(null);
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