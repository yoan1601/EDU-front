import { Calendar, Clock, MapPin, BookOpen, Info, User, GraduationCap, School, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card-modern';
import { Badge } from './ui/badge-modern';
import { Alert } from './ui/feedback';

interface Course {
  id: string;
  subject: string;
  promotion: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
}

export function TeacherView() {
  const teacherName = 'Prof. Jean Dupont';
  const teacherEmail = 'jean.dupont@ufr.fr';

  const courses: Course[] = [
    {
      id: '1',
      subject: 'Mathématiques',
      promotion: 'L3-INFO',
      room: 'A101',
      day: 'Lundi',
      startTime: '08:00',
      endTime: '10:00',
      color: 'bg-blue-200',
    },
    {
      id: '2',
      subject: 'Mathématiques',
      promotion: 'L2-INFO',
      room: 'A103',
      day: 'Lundi',
      startTime: '14:00',
      endTime: '16:00',
      color: 'bg-blue-200',
    },
    {
      id: '3',
      subject: 'Statistiques',
      promotion: 'M1-INFO',
      room: 'B201',
      day: 'Mardi',
      startTime: '10:00',
      endTime: '12:00',
      color: 'bg-cyan-200',
    },
    {
      id: '4',
      subject: 'Mathématiques',
      promotion: 'L3-INFO',
      room: 'A101',
      day: 'Mercredi',
      startTime: '09:00',
      endTime: '11:00',
      color: 'bg-blue-200',
    },
    {
      id: '5',
      subject: 'Algèbre linéaire',
      promotion: 'L1-INFO',
      room: 'C105',
      day: 'Jeudi',
      startTime: '13:00',
      endTime: '15:00',
      color: 'bg-indigo-200',
    },
    {
      id: '6',
      subject: 'Statistiques',
      promotion: 'M1-INFO',
      room: 'B201',
      day: 'Vendredi',
      startTime: '10:00',
      endTime: '12:00',
      color: 'bg-cyan-200',
    },
  ];

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
            <h1 className="text-2xl font-bold text-neutral-900">Espace Enseignant</h1>
            <p className="text-neutral-600">Consultation de votre emploi du temps personnel</p>
          </div>
        </div>
      </div>

      {/* Teacher Info Card */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-brand-200 rounded-full">
                <User className="w-6 h-6 text-brand-700" />
              </div>
              <div>
                <CardTitle className="text-brand-800 mb-1">{teacherName}</CardTitle>
                <p className="text-sm text-brand-600">{teacherEmail}</p>
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
        message="Vous disposez d'un accès en lecture seule. Vous pouvez consulter votre emploi du temps mais pas le modifier. Pour toute modification, contactez l'administrateur."
      />

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
              <p className="text-neutral-600">Heures d'enseignement</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <School className="w-5 h-5 text-purple-600" />
              </div>
              <Badge variant="brand" size="sm">Promotions</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">
                {new Set(courses.map(c => c.promotion)).size}
              </p>
              <p className="text-neutral-600">Promotions enseignées</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Grid */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
          <CardTitle className="text-brand-800 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Mon emploi du temps - Semaine en cours
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
                                  <BookOpen className="w-3 h-3" />
                                  <span className="truncate">{course.promotion}</span>
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
            <Award className="w-5 h-5" />
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
                        <GraduationCap className="w-4 h-4" />
                        <span>{course.promotion}</span>
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
  );
}
