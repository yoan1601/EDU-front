import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button-modern';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card-modern';
import { Input, FormField } from '../ui/input-modern';
import { Badge } from '../ui/badge-modern';

interface LoginScreenProps {
  onLogin: (role: string) => void;
  onNavigateToSignup: () => void;
}

export function LoginScreen({ onLogin, onNavigateToSignup }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'student'>('admin');
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(selectedRole);
    }, 1000);
  };

  const roleOptions = [
    { key: 'admin', label: 'Administrateur', description: 'Gestion UFR' },
    { key: 'teacher', label: 'Enseignant', description: 'Cours & notes' },
    { key: 'student', label: 'Étudiant', description: 'Consultation' },
  ];

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          {/* Brand Header */}
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-brand-600 rounded-xl mb-4 mx-auto">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">EdTech Platform</h1>
            <p className="text-neutral-600 mt-1">Récupération de mot de passe</p>
          </div>

          {/* Forgot Password Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-brand-600" />
                Mot de passe oublié
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-brand-50 border border-brand-200 rounded-lg">
                <p className="text-sm text-brand-700">
                  Saisissez votre adresse email pour recevoir un lien de réinitialisation de votre mot de passe.
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <FormField label="Adresse email" required>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@universite.fr"
                    leftIcon={<Mail className="w-4 h-4" />}
                  />
                </FormField>

                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Envoyer le lien de récupération
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowForgotPassword(false)}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Retour à la connexion
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-brand-600 rounded-xl mb-4 mx-auto">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">EdTech Platform</h1>
          <p className="text-neutral-600 mt-1">Connexion à votre espace universitaire</p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-neutral-700">
                Type de compte
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map((role) => (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => setSelectedRole(role.key as typeof selectedRole)}
                    className={`p-3 text-center rounded-lg border transition-all duration-200 ${
                      selectedRole === role.key
                        ? 'bg-brand-50 border-brand-200 text-brand-700'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-sm font-medium">{role.label}</div>
                    <div className="text-xs text-neutral-500 mt-1">{role.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <FormField label="Adresse email" required>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@universite.fr"
                  leftIcon={<Mail className="w-4 h-4" />}
                  required
                />
              </FormField>

              {/* Password Input */}
              <FormField label="Mot de passe" required>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
                  required
                />
              </FormField>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-neutral-600">Se souvenir de moi</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-brand-600 hover:text-brand-700 transition-colors"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                Se connecter
              </Button>
            </form>

            {/* Demo Info */}
            <div className="border-t border-neutral-200 pt-4">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <p className="text-sm text-neutral-600 mb-2">
                  <strong>Version démo :</strong> utilisez n'importe quelle adresse email
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="default" size="sm">admin@demo.fr</Badge>
                  <Badge variant="default" size="sm">prof@demo.fr</Badge>
                  <Badge variant="default" size="sm">etudiant@demo.fr</Badge>
                </div>
              </div>
            </div>

            {/* Signup Link */}
            <div className="text-center border-t border-neutral-200 pt-4">
              <p className="text-sm text-neutral-600">
                Pas encore de compte ?{' '}
                <button
                  onClick={onNavigateToSignup}
                  className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
                >
                  Créer un compte
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
