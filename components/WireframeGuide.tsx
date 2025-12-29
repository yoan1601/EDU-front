import { Info, X } from 'lucide-react';
import { useState } from 'react';

export function WireframeGuide() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 border-2 border-gray-900 bg-gray-900 text-white hover:bg-gray-800 shadow-lg z-50"
        title="Afficher le guide"
      >
        <Info size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 border-4 border-gray-900 bg-white shadow-2xl z-50 max-h-[80vh] overflow-y-auto">
      <div className="border-b-2 border-gray-900 p-4 bg-gray-50 flex items-center justify-between sticky top-0">
        <p className="font-mono uppercase text-sm">Guide d'utilisation</p>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-gray-200 w-8 h-8 flex items-center justify-center border-2 border-gray-900"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Introduction */}
        <div>
          <h3 className="font-mono uppercase text-sm mb-2 text-gray-700">
            [À propos]
          </h3>
          <p className="font-mono text-xs leading-relaxed text-gray-600">
            Wireframes interactifs pour un MVP SaaS EdTech multi-tenant. Ces écrans représentent les user stories critiques avec une approche low/mid fidelity, incluant l'authentification complète.
          </p>
        </div>

        {/* How to navigate */}
        <div>
          <h3 className="font-mono uppercase text-sm mb-3 text-gray-700">
            [Navigation]
          </h3>
          <div className="space-y-2">
            <div className="border-2 border-gray-900 bg-gray-50 p-3">
              <p className="font-mono text-xs mb-1">0. Authentification</p>
              <p className="font-mono text-xs text-gray-600">
                Écrans de connexion, inscription et mot de passe oublié
              </p>
            </div>
            <div className="border-2 border-gray-900 bg-gray-50 p-3">
              <p className="font-mono text-xs mb-1">1. Sélecteur de rôle</p>
              <p className="font-mono text-xs text-gray-600">
                En haut de page : [Super-Admin] | [Admin] | [Enseignant] | [Étudiant]
              </p>
            </div>
            <div className="border-2 border-gray-900 bg-gray-50 p-3">
              <p className="font-mono text-xs mb-1">2. Menu latéral (Admin)</p>
              <p className="font-mono text-xs text-gray-600">
                Accès aux 5 sections clés du tableau de bord
              </p>
            </div>
            <div className="border-2 border-gray-900 bg-gray-50 p-3">
              <p className="font-mono text-xs mb-1">3. Onglets (Super-Admin / Étudiant)</p>
              <p className="font-mono text-xs text-gray-600">
                Navigation par onglets selon le contexte
              </p>
            </div>
            <div className="border-2 border-red-600 bg-red-50 p-3">
              <p className="font-mono text-xs mb-1">4. Déconnexion</p>
              <p className="font-mono text-xs text-red-700">
                Bouton rouge en haut à droite pour retourner à l'écran de connexion
              </p>
            </div>
          </div>
        </div>

        {/* Role breakdown */}
        <div>
          <h3 className="font-mono uppercase text-sm mb-3 text-gray-700">
            [Rôles & Fonctionnalités]
          </h3>
          
          <div className="space-y-3">
            <div className="border-l-4 border-purple-600 pl-3">
              <p className="font-mono text-xs mb-1">→ SUPER-ADMIN (Gestion globale)</p>
              <ul className="space-y-1 ml-2">
                <li className="font-mono text-xs text-gray-600">• Dashboard global multi-tenant</li>
                <li className="font-mono text-xs text-gray-600">• Gestion de tous les tenants/UFR</li>
                <li className="font-mono text-xs text-gray-600">• Abonnements & facturation</li>
                <li className="font-mono text-xs text-gray-600">• Conversion essais gratuits</li>
                <li className="font-mono text-xs text-gray-600">• Métriques MRR & revenus</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-900 pl-3">
              <p className="font-mono text-xs mb-1">→ ADMIN (Édition)</p>
              <ul className="space-y-1 ml-2">
                <li className="font-mono text-xs text-gray-600">• Dashboard avec KPIs</li>
                <li className="font-mono text-xs text-gray-600">• Gestion tenant/UFR</li>
                <li className="font-mono text-xs text-gray-600">• Invitation enseignants (max 5)</li>
                <li className="font-mono text-xs text-gray-600">• Emploi du temps (drag & drop)</li>
                <li className="font-mono text-xs text-gray-600">• Saisie notes (max 20/promo)</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-900 pl-3">
              <p className="font-mono text-xs mb-1">→ ENSEIGNANT (Lecture seule)</p>
              <ul className="space-y-1 ml-2">
                <li className="font-mono text-xs text-gray-600">• Emploi du temps personnel</li>
                <li className="font-mono text-xs text-gray-600">• Vue par cours/promotion</li>
              </ul>
            </div>

            <div className="border-l-4 border-gray-900 pl-3">
              <p className="font-mono text-xs mb-1">→ ÉTUDIANT (Lecture seule)</p>
              <ul className="space-y-1 ml-2">
                <li className="font-mono text-xs text-gray-600">• Emploi du temps promotion</li>
                <li className="font-mono text-xs text-gray-600">• Bulletin de notes</li>
                <li className="font-mono text-xs text-gray-600">• Statistiques performance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Wireframe conventions */}
        <div>
          <h3 className="font-mono uppercase text-sm mb-3 text-gray-700">
            [Conventions visuelles]
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-900 bg-gray-900"></div>
              <span className="font-mono text-xs">Bordures épaisses = Conteneurs principaux</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-900 bg-white"></div>
              <span className="font-mono text-xs">Boutons clairs = Actions secondaires</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 bg-blue-50"></div>
              <span className="font-mono text-xs">Bleu = Informations contextuelles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-amber-600 bg-amber-50"></div>
              <span className="font-mono text-xs">Ambre = Alertes / Limites</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-red-600 bg-red-50"></div>
              <span className="font-mono text-xs">Rouge = Erreurs / Conflits</span>
            </div>
          </div>
        </div>

        {/* MVP Constraints */}
        <div>
          <h3 className="font-mono uppercase text-sm mb-3 text-gray-700">
            [Contraintes MVP]
          </h3>
          <div className="space-y-2 border-2 border-amber-600 bg-amber-50 p-3">
            <p className="font-mono text-xs">✓ Max 5 enseignants par tenant</p>
            <p className="font-mono text-xs">✓ Max 20 notes par promotion</p>
            <p className="font-mono text-xs">✓ Max 200 étudiants (Plan Starter)</p>
            <p className="font-mono text-xs">✓ Essai gratuit 30 jours</p>
            <p className="font-mono text-xs">✓ Abonnement 29€/mois</p>
          </div>
        </div>

        {/* Technical notes */}
        <div>
          <h3 className="font-mono uppercase text-sm mb-3 text-gray-700">
            [Notes techniques]
          </h3>
          <div className="border-2 border-gray-900 bg-gray-50 p-3">
            <p className="font-mono text-xs leading-relaxed text-gray-600">
              • Drag & drop fonctionnel avec détection de conflits
              <br />
              • Édition/suppression de cours créés
              <br />
              • Export emploi du temps (PDF/CSV)
              <br />
              • Export notes (CSV)
              <br />
              • Modales interactives pour création/édition
              <br />
              • États visuels clairs (lecture seule vs édition)
              <br />
              • Labels explicites sur tous les champs
              <br />
              • Desktop first, responsive ready
              <br />
              • Intégration Stripe simulée
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t-2 border-gray-200">
          <p className="font-mono text-xs text-gray-500 text-center">
            Wireframes MVP • Low/Mid Fidelity
            <br />
            Conçu pour développement rapide
          </p>
        </div>
      </div>
    </div>
  );
}