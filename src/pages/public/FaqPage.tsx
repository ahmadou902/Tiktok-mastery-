import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      category: 'À propos de la formation',
      items: [
        {
          q: 'Faut-il déjà avoir un compte TikTok avec des abonnés pour commencer ?',
          a: 'Non, TikTok Mastery est structuré pour vous prendre par la main depuis 0 abonné. Les modules 1 et 2 vous guident pour la création d’un profil optimisé et le choix d’une niche porteuse.'
        },
        {
          q: 'Combien de temps faut-il pour terminer la formation ?',
          a: 'La formation compte 8 modules et 48 leçons, soit environ 12 heures de contenu pédagogique dense. À raison de 30 minutes par jour, vous pouvez terminer la totalité des cours et des quiz en moins de 3 semaines.'
        },
        {
          q: 'Les leçons sont-elles accessibles sur smartphone ?',
          a: 'Oui, à 100%. L’interface de TikTok Mastery est pensée en mode mobile-first. Vous pouvez regarder vos vidéos, télécharger vos fiches mémo et passer vos quiz directement depuis votre téléphone.'
        }
      ]
    },
    {
      category: 'Paiement & Accès',
      items: [
        {
          q: 'Quels sont les modes de paiement acceptés au Sénégal et dans la zone UEMOA ?',
          a: 'Vous pouvez régler par Wave, Orange Money, Free Money ou par Carte Bancaire (Visa / Mastercard) via notre infrastructure de paiement sécurisée en FCFA.'
        },
        {
          q: 'Est-ce un paiement unique ou un abonnement mensuel ?',
          a: 'C’est un paiement unique à vie. Une fois l’accès débloqué, vous ne paierez plus jamais rien, et vous profiterez de toutes les futures mises à jour.'
        },
        {
          q: 'Quand reçois-je mes identifiants de connexion ?',
          a: 'Instantanément. Votre compte est créé lors de la commande et vos accès aux modules sont débloqués dès la validation bancaire officielle.'
        }
      ]
    },
    {
      category: 'Quiz & Certificat',
      items: [
        {
          q: 'Comment obtenir le certificat officiel TikTok Mastery ?',
          a: 'Le certificat officiel est accessible avec les formules PRO et PREMIUM. Il nécessite de terminer toutes les leçons des 8 modules et de valider les quiz associés avec un score supérieur à 70%.'
        },
        {
          q: 'Puis-je repasser un quiz si j’échoue ?',
          a: 'Oui, vous pouvez recommencer les quiz autant de fois que nécessaire jusqu’à maîtriser les concepts clés.'
        }
      ]
    }
  ];

  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Centre d’Aide</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Questions Fréquentes
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
          Retrouvez les réponses aux questions les plus courantes sur le programme, l’accès et le paiement.
        </p>
      </div>

      <div className="space-y-8">
        {faqCategories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h3 className="text-base font-bold text-rose-400 uppercase tracking-wider text-xs px-1">
              {cat.category}
            </h3>
            <div className="space-y-3">
              {cat.items.map((item, itemIdx) => {
                const uniqueKey = catIdx * 10 + itemIdx;
                const isOpen = openIndex === uniqueKey;
                return (
                  <div
                    key={itemIdx}
                    className="rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : uniqueKey)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-zinc-100 hover:text-white"
                    >
                      <span className="text-sm sm:text-base">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 transition-transform ${
                          isOpen ? 'rotate-180 text-rose-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 text-center space-y-3">
        <Mail className="w-6 h-6 text-rose-400 mx-auto" />
        <h4 className="text-lg font-bold text-white">Vous avez une question spécifique ?</h4>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Notre équipe pédagogique est à votre écoute pour vous orienter vers la formule la plus adaptée.
        </p>
        <div className="pt-2">
          <a
            href="mailto:contact@tiktokmastery.sn"
            className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300"
          >
            contact@tiktokmastery.sn
          </a>
        </div>
      </div>
    </div>
  );
};
