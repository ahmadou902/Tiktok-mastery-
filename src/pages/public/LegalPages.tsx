import React from 'react';

export const MentionsLegalesPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Mentions Légales</h1>
        <p className="text-zinc-400 text-sm mt-2">Dernière mise à jour : Février 2026</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-8 rounded-3xl border border-zinc-800">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Éditeur de la plateforme</h2>
          <p>
            La plateforme de formation <strong>TikTok Mastery</strong> est éditée par la structure académique indépendante TikTok Mastery, dédiée à la formation professionnelle aux métiers des médias numériques et de la création de contenu.
          </p>
          <p>Email de contact : <span className="text-rose-400">contact@tiktokmastery.sn</span></p>
          <p>Siège opérationnel : Dakar, Sénégal</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Hébergement & Infrastructure</h2>
          <p>
            La plateforme est hébergée sur l'infrastructure cloud haute disponibilité de <strong>Netlify, Inc.</strong>, située au 44 Montgomery Street, Suite 300, San Francisco, CA 94104, États-Unis.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus, vidéos, fiches méthodologiques, quiz, scripts et marques présents sur ce site relèvent de la législation internationale sur le droit d’auteur et la propriété intellectuelle. Toute reproduction, distribution ou diffusion sans autorisation écrite préalable est strictement interdite.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Indépendance vis-à-vis de TikTok</h2>
          <p>
            TikTok Mastery est un programme de formation indépendant. La plateforme n’est ni affiliée, ni sponsorisée, ni gérée directement par ByteDance Ltd ou TikTok Inc.
          </p>
        </section>
      </div>
    </div>
  );
};

export const ConfidentialitePage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Politique de Confidentialité</h1>
        <p className="text-zinc-400 text-sm mt-2">Protection de vos données personnelles</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-8 rounded-3xl border border-zinc-800">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Données collectées</h2>
          <p>
            Nous collectons uniquement les informations indispensables au suivi de votre apprentissage et à l’émission de votre certificat : nom, prénom, adresse email, historique de progression des leçons et scores aux quiz.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Confidentialité des paiements</h2>
          <p>
            Les transactions bancaires et Mobile Money (Wave, Orange Money) sont traitées par des passerelles de paiement cryptées certifiées PCI-DSS. Nous ne stockons aucun numéro de carte ou code secret de mobile money sur nos serveurs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Vos droits</h2>
          <p>
            Vous disposez à tout moment d’un droit d’accès, de rectification et de suppression totale de vos données sur simple demande par email à contact@tiktokmastery.sn.
          </p>
        </section>
      </div>
    </div>
  );
};

export const ConditionsPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Conditions Générales de Vente (CGV)</h1>
        <p className="text-zinc-400 text-sm mt-2">Modalités d'accès et d'utilisation de la plateforme</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-8 rounded-3xl border border-zinc-800">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Objet</h2>
          <p>
            Les présentes conditions générales régissent l'accès aux modules de formation, bonus téléchargeables, quiz et certificats délivrés par la plateforme TikTok Mastery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Modalités de paiement & Activation</h2>
          <p>
            L’accès à l'espace élève est subordonné à la réception effective du règlement correspondant à l'offre choisie (Starter, Pro ou Premium). Tout accès délivré en mode test/démonstration est soumis aux conditions d'évaluation de la plateforme.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Accès strictement personnel</h2>
          <p>
            Les identifiants d’accès à l'espace membre sont strictement personnels et nominatifs. Le partage de compte avec des tiers non autorisés entraîne la révocation immédiate des accès sans remboursement.
          </p>
        </section>
      </div>
    </div>
  );
};
