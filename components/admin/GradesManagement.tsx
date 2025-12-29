import { useState } from 'react';
import { Save, Download, GraduationCap, Users, TrendingUp, Award, BookOpen, Calculator, CheckCircle, XCircle, Minus } from 'lucide-react';
import { Button } from '../ui/button-modern';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-modern';
import { Badge } from '../ui/badge-modern';
import { Input } from '../ui/input-modern';
import { Alert } from '../ui/feedback';

interface Student {
  id: string;
  name: string;
  studentId: string;
}

interface Grade {
  studentId: string;
  value: string;
  coefficient: number;
}

export function GradesManagement() {
  const [selectedPromotion, setSelectedPromotion] = useState('L3-INFO');
  const [selectedSubject, setSelectedSubject] = useState('Mathématiques');
  const [gradesCount] = useState(12);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const maxGrades = 20;

  const promotions = ['L1-INFO', 'L2-INFO', 'L3-INFO', 'M1-INFO', 'M2-INFO'];
  const subjects = ['Mathématiques', 'Programmation', 'Base de données', 'Réseaux', 'Algorithmique'];

  const [students] = useState<Student[]>([
    { id: '1', name: 'Alice Durand', studentId: 'ET2024001' },
    { id: '2', name: 'Bob Lefebvre', studentId: 'ET2024002' },
    { id: '3', name: 'Claire Martin', studentId: 'ET2024003' },
    { id: '4', name: 'David Petit', studentId: 'ET2024004' },
    { id: '5', name: 'Emma Bernard', studentId: 'ET2024005' },
    { id: '6', name: 'François Dubois', studentId: 'ET2024006' },
    { id: '7', name: 'Gabrielle Thomas', studentId: 'ET2024007' },
    { id: '8', name: 'Hugo Robert', studentId: 'ET2024008' },
  ]);

  const [grades, setGrades] = useState<{ [key: string]: Grade }>({
    '1': { studentId: '1', value: '15', coefficient: 2 },
    '2': { studentId: '2', value: '12', coefficient: 2 },
    '3': { studentId: '3', value: '18', coefficient: 2 },
    '4': { studentId: '4', value: '', coefficient: 2 },
    '5': { studentId: '5', value: '', coefficient: 2 },
    '6': { studentId: '6', value: '', coefficient: 2 },
    '7': { studentId: '7', value: '', coefficient: 2 },
    '8': { studentId: '8', value: '', coefficient: 2 },
  });

  const updateGrade = (studentId: string, value: string) => {
    setGrades({
      ...grades,
      [studentId]: { ...grades[studentId], value },
    });
  };

  const updateCoefficient = (studentId: string, coefficient: number) => {
    setGrades({
      ...grades,
      [studentId]: { ...grades[studentId], coefficient },
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
    }, 1000);
  };

  const handleExport = () => {
    // Export logic would go here
    console.log('Exporting grades...');
  };

  // Calculate statistics
  const enteredGrades = students.filter((s) => grades[s.id]?.value !== '').length;
  const validGrades = students
    .map((s) => parseFloat(grades[s.id]?.value || '0'))
    .filter((g) => g > 0);
  const classAverage = validGrades.length > 0
    ? (validGrades.reduce((a, b) => a + b, 0) / validGrades.length)
    : 0;
  const passedStudents = students.filter((s) => {
    const grade = parseFloat(grades[s.id]?.value || '0');
    return grade >= 10;
  }).length;
  const failedStudents = students.filter((s) => {
    const grade = parseFloat(grades[s.id]?.value || '0');
    return grade > 0 && grade < 10;
  }).length;

  const remainingGrades = maxGrades - gradesCount;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-brand-100 rounded-lg">
            <GraduationCap className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Saisie des Notes</h1>
            <p className="text-neutral-600">Maximum 20 notes par promotion (limite MVP)</p>
          </div>
        </div>

        {/* MVP Limit Alert */}
        <Alert
          variant="warning"
          title="Limite MVP"
          message={`Maximum 20 notes par promotion. Notes saisies: ${gradesCount}/20 - Places restantes: ${remainingGrades}`}
        />
      </div>

      {/* Controls Card */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <CardTitle className="text-brand-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Sélection
              </CardTitle>
              
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-neutral-700">Promotion</label>
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

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-neutral-700">Matière</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" size="sm" onClick={handleExport} leftIcon={<Download className="w-4 h-4" />}>
                Exporter CSV
              </Button>
              <Button 
                onClick={handleSave} 
                size="sm" 
                leftIcon={<Save className="w-4 h-4" />}
                isLoading={isSaving}
              >
                Enregistrer
              </Button>
            </div>
          </div>
          {lastSaved && (
            <p className="text-xs text-neutral-500 mt-2">
              Dernière sauvegarde: {lastSaved.toLocaleTimeString('fr-FR')}
            </p>
          )}
        </CardHeader>
      </Card>

      {/* Grades Table */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100/50 border-b border-brand-200">
          <CardTitle className="text-brand-800 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Saisie notes - {selectedPromotion} - {selectedSubject}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-neutral-700 w-12">#</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-700">N° Étudiant</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-700">Étudiant</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-700 w-32">Note (/20)</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-700 w-32">Coefficient</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-700 w-24">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {students.map((student, idx) => {
                  const grade = grades[student.id];
                  const hasGrade = grade?.value !== '';
                  const numericGrade = parseFloat(grade?.value || '0');
                  const status = 
                    !hasGrade ? 'non-saisie' : 
                    numericGrade >= 10 ? 'admis' : 'échec';
                  
                  return (
                    <tr key={student.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-4 text-sm text-neutral-500">{idx + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-brand-100 rounded-full">
                            <span className="text-xs font-medium text-brand-700">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm text-neutral-600">{student.studentId}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-neutral-900">{student.name}</span>
                      </td>
                      <td className="p-4">
                        <Input
                          type="number"
                          min="0"
                          max="20"
                          step="0.5"
                          value={grade?.value || ''}
                          onChange={(e) => updateGrade(student.id, e.target.value)}
                          placeholder="--"
                          className="w-20"
                        />
                      </td>
                      <td className="p-4">
                        <select
                          value={grade?.coefficient || 1}
                          onChange={(e) => updateCoefficient(student.id, parseInt(e.target.value))}
                          className="px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white w-20"
                        >
                          <option value="1">x1</option>
                          <option value="2">x2</option>
                          <option value="3">x3</option>
                          <option value="4">x4</option>
                        </select>
                      </td>
                      <td className="p-4">
                        {status === 'non-saisie' && (
                          <Badge variant="default" size="sm">
                            <Minus className="w-3 h-3 mr-1" />
                            Non saisie
                          </Badge>
                        )}
                        {status === 'admis' && (
                          <Badge variant="success" size="sm">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Admis
                          </Badge>
                        )}
                        {status === 'échec' && (
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
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <Badge variant="brand" size="sm">Saisies</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">
                {enteredGrades}/{students.length}
              </p>
              <p className="text-neutral-600">Notes saisies</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <Badge variant="success" size="sm">Moyenne</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">
                {classAverage > 0 ? classAverage.toFixed(2) : '--'}
              </p>
              <p className="text-neutral-600">Moyenne classe</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <Badge variant="success" size="sm">Réussite</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{passedStudents}</p>
              <p className="text-neutral-600">Étudiants admis</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <Badge variant="error" size="sm">Échec</Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{failedStudents}</p>
              <p className="text-neutral-600">Étudiants en échec</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Alert */}
      <Alert
        variant="info"
        title="Information"
        message="Les notes sont automatiquement sauvegardées. Les étudiants pourront consulter leurs notes depuis leur espace personnel."
      />
    </div>
  );
}
