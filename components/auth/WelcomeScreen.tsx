import { CheckCircle, ArrowRight, Calendar, Users, Settings, Upload, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '../ui/button-modern';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-modern';
import { Badge } from '../ui/badge-modern';
import { Alert } from '../ui/feedback';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  // Calculate trial end date
  const trialEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const formattedDate = trialEndDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const setupSteps = [
    {
      icon: <Settings className="w-4 h-4" />,
      title: "Configurer les informations de votre tenant",
      description: "Personnalisez votre espace UFR",
      completed: true
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Inviter vos premiers enseignants",
      description: "Jusqu'à 5 enseignants dans le plan Starter",
      completed: false
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      title: "Créer votre premier emploi du temps",
      description: "Organisez les cours et les créneaux",
      completed: false
    },
    {
      icon: <Upload className="w-4 h-4" />,
      title: "Importer la liste des étudiants",
      description: "Jusqu'à 200 étudiants dans le plan Starter",
      completed: false
    }
  ];

  const features = [
    {
      title: "Tenant créé",
      description: "Votre espace UFR est prêt à être configuré",
      completed: true
    },
    {
      title: "Compte administrateur activé",
      description: "Vous pouvez maintenant inviter jusqu'à 5 enseignants",
      completed: true
    },
    {
      title: "Aucune carte bancaire requise",
      description: "Vous pourrez ajouter vos informations de paiement plus tard",
      completed: true
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        {/* Success Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-20 h-20 bg-success-100 border-4 border-success-200 rounded-full mb-6 mx-auto relative">
            <CheckCircle className="w-10 h-10 text-success-600" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Compte créé avec succès !
          </h1>
          <p className="text-lg text-neutral-600 mb-4">
            Bienvenue sur EdTech Platform
          </p>
          <Badge variant="success" size="md" className="animate-pulse">
            Votre essai gratuit a démarré
          </Badge>
        </div>

        {/* Trial Information Card */}
        <Card className="border-success-200 bg-gradient-to-br from-success-50 to-success-100/50">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 bg-success-500 text-white px-6 py-3 rounded-lg shadow-sm">
                <Calendar className="w-5 h-5" />
                <span className="text-xl font-semibold">30 jours d'essai gratuit</span>
              </div>
              <p className="text-success-800">
                Accès complet à toutes les fonctionnalités jusqu'au{' '}
                <span className="font-semibold">{formattedDate}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Features Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success-500" />
                Configuration terminée
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-success-50 rounded-lg border border-success-100">
                  <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900">{feature.title}</p>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-800 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-brand-600" />
                Prochaines étapes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {setupSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${
                    step.completed 
                      ? 'bg-success-50 border-success-200' 
                      : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                    ${step.completed 
                      ? 'bg-success-500 text-white' 
                      : 'bg-neutral-200 text-neutral-500'
                    }
                  `}>
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className={`
                      ${step.completed ? 'text-success-600' : 'text-neutral-500'}
                    `}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        step.completed ? 'text-success-800 line-through' : 'text-neutral-900'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Card */}
        <Card className="border-brand-200 bg-gradient-to-r from-brand-50 to-brand-100/50">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex items-center justify-center w-12 h-12 bg-brand-600 rounded-xl mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-brand-900">
              Prêt à commencer ?
            </h3>
            <p className="text-brand-700">
              Accédez à votre tableau de bord pour configurer votre plateforme EdTech
            </p>
            <Button 
              onClick={onContinue}
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Accéder à mon tableau de bord
            </Button>
          </CardContent>
        </Card>

        {/* Email Confirmation Notice */}
        <Alert
          variant="info"
          message="Un email de confirmation a été envoyé à votre adresse email"
        />
      </div>
    </div>
  );
}
