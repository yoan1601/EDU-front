import { useState } from 'react';
import { Check, CreditCard, Calendar, AlertCircle, ExternalLink } from 'lucide-react';

export function SubscriptionManagement() {
  const [currentPlan, setCurrentPlan] = useState<'trial' | 'starter'>('trial');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  const trialDaysRemaining = 15;
  const nextBillingDate = '29/12/2024';
  const billingAmount = 29;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-mono uppercase tracking-wider mb-2">Gestion Abonnement</h2>
        <p className="text-gray-600 font-mono">Essai gratuit et upgrade vers plan Starter</p>
        <div className="h-1 w-20 bg-gray-900 mt-4"></div>
      </div>

      {/* Current Status Alert */}
      {currentPlan === 'trial' && (
        <div className="mb-6 border-2 border-amber-600 bg-amber-50 p-4 flex items-start gap-3">
          <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
          <div className="flex-1">
            <p className="font-mono text-sm">
              <strong>[Essai gratuit]</strong> Votre période d'essai expire dans <strong>{trialDaysRemaining} jours</strong>. Passez au plan Starter pour continuer à utiliser la plateforme.
            </p>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="mt-3 px-4 py-2 border-2 border-gray-900 bg-gray-900 text-white font-mono uppercase text-xs hover:bg-gray-800"
            >
              Upgrade maintenant
            </button>
          </div>
        </div>
      )}

      {/* Current Plan Card */}
      <div className="mb-8 border-4 border-gray-900 bg-white">
        <div className="border-b-2 border-gray-900 p-4 bg-gray-50">
          <p className="font-mono uppercase text-sm">Abonnement actuel</p>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-mono mb-2">
                {currentPlan === 'trial' ? 'Essai Gratuit (30 jours)' : 'Plan Starter'}
              </h3>
              <p className="font-mono text-gray-600">
                {currentPlan === 'trial' 
                  ? `Expire le: ${new Date(Date.now() + trialDaysRemaining * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}`
                  : 'Abonnement mensuel actif'
                }
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-mono">{currentPlan === 'trial' ? '0€' : '29€'}</p>
              <p className="font-mono text-sm text-gray-600">/mois</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="border-2 border-gray-900 p-4 bg-gray-50">
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Étudiants max
              </p>
              <p className="text-2xl font-mono">200</p>
            </div>
            <div className="border-2 border-gray-900 p-4 bg-gray-50">
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Enseignants max
              </p>
              <p className="text-2xl font-mono">5</p>
            </div>
            <div className="border-2 border-gray-900 p-4 bg-gray-50">
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Notes max/promo
              </p>
              <p className="text-2xl font-mono">20</p>
            </div>
          </div>

          {currentPlan === 'starter' && (
            <div className="border-t-2 border-gray-200 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-gray-600" />
                <div>
                  <p className="font-mono text-sm">Prochaine facturation</p>
                  <p className="font-mono text-gray-600">{nextBillingDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-gray-600" />
                <div>
                  <p className="font-mono text-sm">Montant</p>
                  <p className="font-mono text-gray-600">{billingAmount}€</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Available Plans */}
      <div className="mb-8">
        <h3 className="font-mono uppercase text-sm tracking-wider mb-4 text-gray-700">
          [Plans disponibles]
        </h3>

        <div className="grid grid-cols-2 gap-6">
          {/* Trial Plan */}
          <div className={`border-4 ${currentPlan === 'trial' ? 'border-gray-900' : 'border-gray-300'} bg-white p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-mono mb-1">Essai Gratuit</h4>
                <p className="font-mono text-gray-600 text-sm">Période d'évaluation</p>
              </div>
              {currentPlan === 'trial' && (
                <span className="px-3 py-1 border-2 border-gray-900 bg-gray-900 text-white font-mono text-xs uppercase">
                  Actuel
                </span>
              )}
            </div>

            <div className="mb-6">
              <p className="text-4xl font-mono mb-1">0€</p>
              <p className="font-mono text-sm text-gray-600">30 jours d'essai</p>
            </div>

            <ul className="space-y-3 mb-6">
              {[
                '200 étudiants maximum',
                '5 enseignants maximum',
                '20 notes par promotion',
                'Emplois du temps illimités',
                'Support par email',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check size={16} className="text-gray-900 flex-shrink-0 mt-1" />
                  <span className="font-mono text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              disabled={currentPlan === 'trial'}
              className={`w-full py-3 border-2 border-gray-900 font-mono uppercase text-sm ${
                currentPlan === 'trial'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {currentPlan === 'trial' ? 'Plan actuel' : 'Déjà utilisé'}
            </button>
          </div>

          {/* Starter Plan */}
          <div className={`border-4 ${currentPlan === 'starter' ? 'border-gray-900' : 'border-gray-300'} bg-white p-6 relative`}>
            {currentPlan !== 'starter' && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 border-2 border-green-600 bg-green-100 text-green-700 font-mono text-xs uppercase">
                  Recommandé
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-mono mb-1">Plan Starter</h4>
                <p className="font-mono text-gray-600 text-sm">Pour une UFR</p>
              </div>
              {currentPlan === 'starter' && (
                <span className="px-3 py-1 border-2 border-gray-900 bg-gray-900 text-white font-mono text-xs uppercase">
                  Actuel
                </span>
              )}
            </div>

            <div className="mb-6">
              <p className="text-4xl font-mono mb-1">29€</p>
              <p className="font-mono text-sm text-gray-600">par mois, sans engagement</p>
            </div>

            <ul className="space-y-3 mb-6">
              {[
                '200 étudiants maximum',
                '5 enseignants maximum',
                '20 notes par promotion',
                'Emplois du temps illimités',
                'Support par email prioritaire',
                'Exports CSV',
                'Intégration Stripe',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check size={16} className="text-gray-900 flex-shrink-0 mt-1" />
                  <span className="font-mono text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowUpgradeModal(true)}
              disabled={currentPlan === 'starter'}
              className={`w-full py-3 border-2 border-gray-900 font-mono uppercase text-sm ${
                currentPlan === 'starter'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {currentPlan === 'starter' ? 'Plan actuel' : 'Upgrade vers Starter'}
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      {currentPlan === 'starter' && (
        <div className="border-4 border-gray-900 bg-white">
          <div className="border-b-2 border-gray-900 p-4 bg-gray-50">
            <p className="font-mono uppercase text-sm">Historique de facturation</p>
          </div>

          <table className="w-full">
            <thead className="border-b-2 border-gray-900 bg-gray-100">
              <tr>
                <th className="text-left p-4 font-mono uppercase text-xs text-gray-600">Date</th>
                <th className="text-left p-4 font-mono uppercase text-xs text-gray-600">Description</th>
                <th className="text-left p-4 font-mono uppercase text-xs text-gray-600">Montant</th>
                <th className="text-left p-4 font-mono uppercase text-xs text-gray-600">Statut</th>
                <th className="text-left p-4 font-mono uppercase text-xs text-gray-600">Facture</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-200">
              {[
                { date: '29/11/2024', description: 'Plan Starter - Décembre 2024', amount: '29€', status: 'Payé' },
                { date: '29/10/2024', description: 'Plan Starter - Novembre 2024', amount: '29€', status: 'Payé' },
              ].map((invoice, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm">{invoice.date}</td>
                  <td className="p-4 font-mono text-sm">{invoice.description}</td>
                  <td className="p-4 font-mono">{invoice.amount}</td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 border-2 border-green-600 bg-green-100 font-mono text-xs uppercase text-green-700">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="font-mono text-sm text-blue-600 hover:underline flex items-center gap-1">
                      Télécharger
                      <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 border-2 border-blue-600 bg-blue-50 p-4 flex items-start gap-3">
        <CreditCard className="text-blue-600 flex-shrink-0" size={20} />
        <div>
          <p className="font-mono text-sm">
            <strong>[Paiement sécurisé]</strong> Les paiements sont traités de manière sécurisée via Stripe. Vous pouvez annuler votre abonnement à tout moment.
          </p>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-4 border-gray-900 w-full max-w-lg">
            <div className="border-b-2 border-gray-900 p-4 bg-gray-50 flex items-center justify-between">
              <p className="font-mono uppercase text-sm">Upgrade vers Plan Starter</p>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-2xl hover:bg-gray-200 w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 border-2 border-blue-600 bg-blue-50 p-4">
                <p className="font-mono text-sm">
                  <strong>[Simulation Stripe]</strong> Dans l'application réelle, cette action ouvrirait l'interface de paiement Stripe sécurisée.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-mono text-xl mb-4">Récapitulatif</h4>
                <div className="border-2 border-gray-900 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm">Plan Starter - Mensuel</span>
                    <span className="font-mono">29€</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-3 flex items-center justify-between">
                    <span className="font-mono">Total</span>
                    <span className="text-2xl font-mono">29€</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-mono text-sm text-gray-600 mb-3">
                  [Champ simulation] Informations de paiement Stripe
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Numéro de carte (simulation)"
                    className="w-full p-3 border-2 border-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full p-3 border-2 border-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full p-3 border-2 border-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setCurrentPlan('starter');
                    setShowUpgradeModal(false);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-900 bg-gray-900 text-white font-mono uppercase text-sm hover:bg-gray-800 flex items-center justify-center gap-2"
                >
                  <CreditCard size={16} />
                  Confirmer le paiement
                </button>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="px-6 py-3 border-2 border-gray-900 bg-white text-gray-900 font-mono uppercase text-sm hover:bg-gray-100"
                >
                  Annuler
                </button>
              </div>

              <p className="text-xs font-mono text-gray-500 mt-4 text-center">
                Paiement sécurisé par <strong>Stripe</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
