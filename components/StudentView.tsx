import { useState } from 'react';
import { Calendar, Clock, MapPin, BookOpen, FileText, Info, User, GraduationCap, Award, TrendingUp, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card-modern';
import { Badge } from './ui/badge-modern';
import { Button } from './ui/button-modern';
import { Alert } from './ui/feedback';

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

interface Grade {
  subject: string;
  grade: number;
  coefficient: number;
  date: string;
  teacher: string;
}

export function StudentView() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'grades'>('schedule');
  
  const studentName = 'Alice Durand';
  const studentId = 'ET2024001';
  const promotion = 'L3-INFO';

  const courses: Course[] = [
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
    {
      id: '5',
      subject: 'Algorithmique',
      teacher: 'Prof. Leroy',
      room: 'B103',
      day: 'Jeudi',
      startTime: '13:00',
      endTime: '15:00',
      color: 'bg-pink-200',
    },
    {
      id: '6',
      subject: 'Mathématiques',
      teacher: 'Prof. Dupont',
      room: 'A101',
      day: 'Vendredi',
      startTime: '10:00',
      endTime: '12:00',
      color: 'bg-blue-200',
    },
  ];

  const grades: Grade[] = [
    {
      subject: 'Mathématiques',
      grade: 15,
      coefficient: 2,
      date: '05/12/2024',
      teacher: 'Prof. Dupont',
    },
    {
      subject: 'Programmation',
      grade: 17.5,
      coefficient: 3,
      date: '10/12/2024',
      teacher: 'Prof. Martin',
    },
    {
      subject: 'Base de données',
      grade: 14,
      coefficient: 2,
      date: '12/12/2024',
      teacher: 'Prof. Bernard',
    },
    {
      subject: 'Réseaux',
      grade: 16,
      coefficient: 2,
      date: '08/12/2024',
      teacher: 'Prof. Dubois',
    },
    {
      subject: 'Algorithmique',
      grade: 13.5,
      coefficient: 3,
      date: '11/12/2024',
      teacher: 'Prof. Leroy',
    },
  ];

  const calculateAverage = () => {
    const totalPoints = grades.reduce((sum, grade) => sum + (grade.grade * grade.coefficient), 0);
    const totalCoefficients = grades.reduce((sum, grade) => sum + grade.coefficient, 0);
    return (totalPoints / totalCoefficients).toFixed(2);
  };

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-brand-100 rounded-lg">
            <GraduationCap className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Espace Étudiant</h1>
            <p className="text-neutral-600">Consultation emploi du temps et notes</p>
          </div>
        </div>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-brand-200 rounded-full">
                <User className="w-6 h-6 text-brand-700" />
              </div>
              <div>
                <CardTitle className="text-brand-800 mb-1">{studentName}</CardTitle>
                <p className="text-sm text-brand-600">N° Étudiant: {studentId} - {promotion}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500 mb-2">Statut</p>
              <Badge variant="success" size="sm">
                Accès lecture seule
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Info Alert */}
      <Alert
        variant="info"
        title="Information d'accès"
        message="Vous disposez d'un accès en lecture seule. Vous pouvez consulter votre emploi du temps et vos notes."
      />

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-neutral-100 rounded-lg">
        <Button
          variant={activeTab === 'schedule' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('schedule')}
          leftIcon={<Calendar className="w-4 h-4" />}
          className="flex-1"
        >
          Emploi du temps
        </Button>
        <Button
          variant={activeTab === 'grades' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('grades')}
          leftIcon={<FileText className="w-4 h-4" />}
          className="flex-1"
        >
          Notes & Bulletins
        </Button>
      </div>

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <Badge variant="brand" size="sm">Cette semaine</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900 mb-1">{courses.length}</p>
                  <p className="text-neutral-600">Cours cette semaine</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <Badge variant="success" size="sm">Heures</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900 mb-1">
                    {courses.reduce((total, course) => {
                      const start = parseInt(course.startTime.split(':')[0]);
                      const end = parseInt(course.endTime.split(':')[0]);
                      return total + (end - start);
                    }, 0)}h
                  </p>
                  <p className="text-neutral-600">Heures de cours</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <Badge variant="brand" size="sm">Matières</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900 mb-1">
                    {new Set(courses.map(c => c.subject)).size}
                  </p>
                  <p className="text-neutral-600">Matières différentes</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Grid */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
              <CardTitle className="text-brand-800 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Mon emploi du temps - {promotion}
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
                    {timeSlots.map((time) => (
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
                              className="p-2 border-r border-neutral-200 relative h-20"
                            >
                              {course ? (
                                <div className="bg-white border border-brand-300 rounded-lg p-3 h-full shadow-sm">
                                  <p className="text-sm font-medium text-neutral-900 mb-2 truncate">{course.subject}</p>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-xs text-neutral-600">
                                      <User className="w-3 h-3" />
                                      <span className="truncate">{course.teacher}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-neutral-600">
                                      <MapPin className="w-3 h-3" />
                                      <span>{course.room}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-neutral-600">
                                      <Clock className="w-3 h-3" />
                                      <span>{course.startTime} - {course.endTime}</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full flex items-center justify-center">
                                  <span className="text-xs text-neutral-300">—</span>
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

          {/* Course List View */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
              <CardTitle className="text-brand-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Liste des cours
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y divide-neutral-200">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-brand-100 rounded-lg">
                        <BookOpen className="w-5 h-5 text-brand-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-900 mb-2">{course.subject}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{course.teacher}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{course.day}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.startTime} - {course.endTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{course.room}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="brand" size="sm">
                          {(() => {
                            const start = parseInt(course.startTime.split(':')[0]);
                            const end = parseInt(course.endTime.split(':')[0]);
                            return `${end - start}h`;
                          })()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Grades Tab */}
      {activeTab === 'grades' && (
        <div className="space-y-6">
          {/* Average Card */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
              <CardTitle className="text-brand-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Moyenne générale
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-5xl font-bold text-neutral-900 mb-2">{calculateAverage()}/20</p>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <span>Notes saisies: {grades.length}</span>
                    <span>Total coefficients: {grades.reduce((sum, g) => sum + g.coefficient, 0)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full">
                  <BarChart3 className="w-8 h-8 text-brand-600" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Progression</span>
                  <span>{((parseFloat(calculateAverage()) / 20) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${(parseFloat(calculateAverage()) / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grades Table */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
              <CardTitle className="text-brand-800 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Bulletin de notes - {promotion}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-neutral-700">Matière</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-700">Enseignant</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-700">Note</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-700">Coefficient</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-700">Points</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-700">Date</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-700">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {grades.map((grade, idx) => {
                      const points = grade.grade * grade.coefficient;
                      const status = grade.grade >= 10 ? 'admis' : 'échec';
                      
                      return (
                        <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-brand-100 rounded-full">
                                <BookOpen className="w-4 h-4 text-brand-600" />
                              </div>
                              <span className="font-medium text-neutral-900">{grade.subject}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-neutral-600">{grade.teacher}</td>
                          <td className="p-4">
                            <span className="text-lg font-bold text-neutral-900">{grade.grade}/20</span>
                          </td>
                          <td className="p-4">
                            <Badge variant="default" size="sm">x{grade.coefficient}</Badge>
                          </td>
                          <td className="p-4 text-neutral-600">{points.toFixed(1)}</td>
                          <td className="p-4 text-sm text-neutral-600">{grade.date}</td>
                          <td className="p-4">
                            {status === 'admis' ? (
                              <Badge variant="success" size="sm">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Admis
                              </Badge>
                            ) : (
                              <Badge variant="error" size="sm">
                                <XCircle className="w-3 h-3 mr-1" />
                                Échec
                              </Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="border-t-2 border-neutral-300 bg-neutral-50">
                    <tr>
                      <td colSpan={2} className="p-4 font-medium text-neutral-900">Total</td>
                      <td className="p-4 text-lg font-bold text-neutral-900">{calculateAverage()}/20</td>
                      <td className="p-4">
                        <Badge variant="brand" size="sm">
                          {grades.reduce((sum, g) => sum + g.coefficient, 0)}
                        </Badge>
                      </td>
                      <td className="p-4 font-medium text-neutral-900">
                        {grades.reduce((sum, g) => sum + (g.grade * g.coefficient), 0).toFixed(1)}
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Performance Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <Badge variant="success" size="sm">Validées</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900 mb-1">
                    {grades.filter(g => g.grade >= 10).length}/{grades.length}
                  </p>
                  <p className="text-neutral-600">Matières validées</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <Badge variant="brand" size="sm">Maximum</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900 mb-1">
                    {Math.max(...grades.map(g => g.grade))}/20
                  </p>
                  <p className="text-neutral-600">Meilleure note</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                  </div>
                  <Badge variant="warning" size="sm">Minimum</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900 mb-1">
                    {Math.min(...grades.map(g => g.grade))}/20
                  </p>
                  <p className="text-neutral-600">Note la plus basse</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <Badge variant="brand" size="sm">Excellence</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900 mb-1">
                    {grades.filter(g => g.grade >= 16).length}
                  </p>
                  <p className="text-neutral-600">Mentions TB (≥16)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
