import { useState } from 'react';
import { Mail, Lock, Building2, User, Eye, EyeOff, CheckCircle, AlertCircle, BookOpen, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/button-modern';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-modern';
import { Input, FormField } from '../ui/input-modern';
import { Badge } from '../ui/badge-modern';
import { Alert } from '../ui/feedback';

interface SignupScreenProps {
  onSignupComplete: () => void;
  onNavigateToLogin: () => void;
}

export function SignupScreen({ onSignupComplete, onNavigateToLogin }: SignupScreenProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Admin Info
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2: Tenant Info
    universityName: '',
    ufrName: '',
    tenantCode: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate validation
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 800);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      onSignupComplete();
    }, 1500);
  };

  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0;
  const passwordStrong = formData.password.length >= 8;
  const step1Valid = formData.firstName && formData.lastName && formData.email && passwordsMatch && passwordStrong;
  const step2Valid = formData.universityName && formData.ufrName && formData.acceptTerms;

  // Generate tenant code preview
  const tenantCodePreview = formData.ufrName
    ? `UFR-${formData.ufrName.split(' ').map(w => w[0]).join('').toUpperCase()}-2024`
    : 'UFR-XXX-2024';

  const stepItems = [
    { 
      number: 1, 
      label: 'Compte admin', 
      description: 'Vos informations personnelles',
      completed: step > 1,
      active: step === 1 
    },
    { 
      number: 2, 
      label: 'Tenant/UFR', 
      description: 'Configuration de votre établissement',
      completed: false,
      active: step === 2 
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-brand-600 rounded-xl mb-4 mx-auto">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">EdTech Platform</h1>
          <p className="text-neutral-600 mt-1">Créer votre compte administrateur</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            {stepItems.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                    ${stepItem.completed 
                      ? 'bg-success-500 border-success-500 text-white' 
                      : stepItem.active 
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'bg-white border-neutral-300 text-neutral-400'
                    }
                  `}>
                    {stepItem.completed ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{stepItem.number}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium ${stepItem.active ? 'text-neutral-900' : 'text-neutral-500'}`}>
                      {stepItem.label}
                    </div>
                    <div className="text-xs text-neutral-400 max-w-[120px]">
                      {stepItem.description}
                    </div>
                  </div>
                </div>
                
                {index < stepItems.length - 1 && (
                  <div className={`
                    w-16 h-0.5 mx-4 transition-colors duration-200
                    ${stepItem.completed ? 'bg-success-500' : 'bg-neutral-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-brand-50 to-brand-100 border-b border-brand-200">
            <CardTitle className="text-brand-800">
              {step === 1 ? 'Informations administrateur' : 'Configuration de votre établissement'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Step 1: Admin Information */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Trial Benefits */}
                <Alert
                  variant="success"
                  title="30 jours d'essai gratuit"
                  message="Aucune carte bancaire requise • Accès complet aux fonctionnalités"
                />

                <form onSubmit={handleStep1Submit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Prénom" required>
                      <Input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Jean"
                        leftIcon={<User className="w-4 h-4" />}
                        required
                      />
                    </FormField>

                    <FormField label="Nom" required>
                      <Input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Dupont"
                        leftIcon={<User className="w-4 h-4" />}
                        required
                      />
                    </FormField>
                  </div>

                  <FormField label="Adresse email professionnelle" required>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="admin@universite.fr"
                      leftIcon={<Mail className="w-4 h-4" />}
                      required
                    />
                  </FormField>

                  <FormField 
                    label="Mot de passe" 
                    required
                    error={formData.password && !passwordStrong ? 'Le mot de passe doit contenir au moins 8 caractères' : undefined}
                  >
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Minimum 8 caractères"
                      leftIcon={<Lock className="w-4 h-4" />}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="hover:text-neutral-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                      error={formData.password ? !passwordStrong : false}
                      required
                    />
                  </FormField>

                  <FormField 
                    label="Confirmer le mot de passe" 
                    required
                    error={formData.confirmPassword && !passwordsMatch ? 'Les mots de passe ne correspondent pas' : undefined}
                  >
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirmez votre mot de passe"
                      leftIcon={<Lock className="w-4 h-4" />}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="hover:text-neutral-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      }
                      error={formData.confirmPassword ? !passwordsMatch : false}
                      required
                    />
                  </FormField>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={!step1Valid}
                      isLoading={isLoading}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      size="lg"
                    >
                      Continuer
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Tenant Information */}
            {step === 2 && (
              <div className="space-y-6">
                <Alert
                  variant="info"
                  message="Ces informations permettront d'identifier votre établissement sur la plateforme."
                />

                <form onSubmit={handleStep2Submit} className="space-y-6">
                  <FormField label="Nom de l'université" required>
                    <Input
                      type="text"
                      value={formData.universityName}
                      onChange={(e) => handleInputChange('universityName', e.target.value)}
                      placeholder="Ex: Université de Paris"
                      leftIcon={<Building2 className="w-4 h-4" />}
                      required
                    />
                  </FormField>

                  <FormField label="Nom de l'UFR / Faculté" required>
                    <Input
                      type="text"
                      value={formData.ufrName}
                      onChange={(e) => handleInputChange('ufrName', e.target.value)}
                      placeholder="Ex: UFR Sciences et Technologies"
                      leftIcon={<Building2 className="w-4 h-4" />}
                      required
                    />
                  </FormField>

                  <FormField 
                    label="Code tenant (généré automatiquement)"
                    hint="Ce code unique identifiera votre tenant sur la plateforme"
                  >
                    <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                      <code className="text-sm font-mono text-neutral-700">
                        {tenantCodePreview}
                      </code>
                    </div>
                  </FormField>

                  {/* Subscription Limits */}
                  <div className="border border-warning-200 bg-warning-50 rounded-lg p-4">
                    <h4 className="font-medium text-warning-800 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Limites Plan Starter
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="warning" size="sm">Max 5</Badge>
                        <span className="text-sm text-warning-700">enseignants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="warning" size="sm">Max 200</Badge>
                        <span className="text-sm text-warning-700">étudiants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="warning" size="sm">Max 20</Badge>
                        <span className="text-sm text-warning-700">notes par promotion</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                        className="mt-1 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
                        required
                      />
                      <span className="text-sm text-neutral-700 leading-relaxed">
                        J'accepte les{' '}
                        <button type="button" className="text-brand-600 hover:underline">
                          conditions générales d'utilisation
                        </button>
                        {' '}et la{' '}
                        <button type="button" className="text-brand-600 hover:underline">
                          politique de confidentialité
                        </button>
                        . Je comprends que l'essai gratuit dure 30 jours et qu'ensuite l'abonnement Starter sera facturé 29€/mois.
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setStep(1)}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                    >
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={!step2Valid}
                      isLoading={isLoading}
                      size="lg"
                    >
                      Créer mon compte et démarrer l'essai
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            Vous avez déjà un compte ?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
