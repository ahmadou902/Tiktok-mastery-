# TikTok Mastery — Plateforme Professionnelle de Formation SaaS

Plateforme complète de formation en ligne conçue pour apprendre à développer son audience TikTok, créer des vidéos virales à forte rétention et mettre en place des méthodes de monétisation pérennes.

Architecture moderne, responsive (mobile-first), certifiante, et optimisée pour un déploiement fluide sur **Netlify**.

---

## 1. Arborescence du Projet

```
tiktok-mastery/
├── netlify/
│   └── functions/
│       ├── create-order.ts        # Initialisation sécurisée de commande et passerelle PayTech
│       ├── verify-payment.ts      # Contrôle serveur officiel du statut de paiement
│       └── paytech-webhook.ts     # IPN / Webhook de validation automatique des accès
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Logo.tsx           # Logo minimaliste moderne TikTok Mastery
│   │   │   └── DemoBanner.tsx     # Bascule 1-clic entre rôles (Élève / Admin)
│   │   └── navigation/
│   │       ├── Navbar.tsx         # Navigation publique avec drawer responsive
│   │       └── Footer.tsx         # Pied de page & badges de paiement Sénégal
│   ├── context/
│   │   ├── AuthContext.tsx        # Gestion session, rôles (STUDENT/ADMIN), persistance
│   │   └── CourseContext.tsx      # Gestion cours, progression (%), quiz, certificats, commandes
│   ├── data/
│   │   ├── courses.ts             # 8 modules complets & 48 leçons détaillées
│   │   ├── resources.ts           # 7 bonus téléchargeables (Hooks, scripts, CapCut...)
│   │   ├── quizzes.ts             # QCM avec explications pédagogiques
│   │   └── demo.ts                # Données de test transparentes (élèves démo, transactions)
│   ├── layouts/
│   │   ├── PublicLayout.tsx       # Layout pages vitrines
│   │   ├── StudentLayout.tsx      # Espace membre avec barre latérale et navigation mobile basse
│   │   └── AdminLayout.tsx        # Espace administrateur sécurisé (rôle ADMIN strict)
│   ├── pages/
│   │   ├── public/                # Landing, Formation, Tarifs, FAQ, Auth, CGV, Checkout
│   │   ├── student/               # Dashboard, Cours, Leçon (lecteur vidéo), Ressources, Quiz, Certificat
│   │   └── admin/                 # Vue d'ensemble, Élèves, Cours/Leçons, Ressources, Ventes, Paramètres
│   ├── types/
│   │   └── index.ts               # Schémas TypeScript (User, Course, Lesson, Order, Quiz, Certificate)
│   ├── App.tsx                    # Routeur React Router complet
│   ├── main.tsx
│   └── index.css                  # Tailwind CSS, scrollbars et styles d'impression diplôme
├── .env.example                   # Documentation des variables d'environnement
├── netlify.toml                   # Configuration build, redirects SPA et headers Netlify
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 2. Installation & Démarrage Local

### Prérequis
- Node.js (version 18 ou 20+)
- npm ou pnpm

### Commandes
```bash
# 1. Cloner et installer les dépendances
git clone <url-du-repo>
cd tiktok-mastery
npm install

# 2. Copier l'environnement d'exemple
cp .env.example .env

# 3. Lancer en local
npm run dev
```

L'application s'ouvre sur `http://localhost:3000` (ou port spécifié par Vite).

---

## 3. Variables d'Environnement

Configurez les variables suivantes dans votre fichier `.env` ou sur le tableau de bord Netlify (**Site configuration > Environment variables**) :

| Variable | Description | Exemple |
|---|---|---|
| `APP_URL` | URL publique de votre application | `https://tiktok-mastery.netlify.app` |
| `PAYMENT_API_KEY` | Clé API publique du fournisseur de paiement (ex: PayTech) | `paytech_live_xxx` |
| `PAYMENT_SECRET` | Clé secrète serveur PayTech (**JAMAIS dans le frontend**) | `sec_xxx_backend_only` |
| `PAYMENT_ENVIRONMENT` | Environnement du paiement (`test` pour sandbox, `prod` pour réel) | `test` |
| `PAYMENT_WEBHOOK_SECRET` | Secret de vérification HMAC des webhooks IPN | `whsec_xxx` |
| `DATABASE_URL` | Chaîne de connexion PostgreSQL (Supabase / Neon / Cloud SQL) | `postgresql://...` |
| `JWT_SECRET` | Clé secrète pour signer les tokens de session | `votre_cle_secrete_ultra_robuste` |

---

## 4. Déploiement sur Netlify

Le projet inclut un fichier `netlify.toml` pré-configuré :

1. Connectez votre dépôt Git à votre compte **Netlify**.
2. Paramètres de build détectés automatiquement :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
   - **Functions directory** : `netlify/functions`
3. Dans **Site configuration > Environment variables**, ajoutez vos clés `PAYMENT_API_KEY`, `PAYMENT_SECRET`, et `PAYMENT_ENVIRONMENT`.
4. Cliquez sur **Deploy Site**. Netlify compile le frontend et déploie les fonctions serverless sans configuration supplémentaire.

### Configuration du Domaine Personnalisé
1. Dans Netlify, rendez-vous dans **Domain management > Add custom domain**.
2. Entrez votre nom de domaine (ex: `academie.tiktokmastery.sn`).
3. Ajoutez les enregistrements DNS chez votre registrar :
   - CNAME vers votre sous-domaine Netlify (`votre-site.netlify.app`)
   - Ou enregistrement A vers l'IP Netlify (`75.2.60.5`)
4. Le certificat SSL/TLS HTTPS est généré gratuitement et automatiquement par Netlify (Let's Encrypt).

---

## 5. Configuration de la Base de Données

Les interfaces types sont définies dans `src/types/index.ts`. La base recommandée est PostgreSQL (via Supabase ou Neon).

### Schéma SQL Minimaliste :
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'STUDENT', -- 'STUDENT' | 'ADMIN'
  plan VARCHAR(50) DEFAULT 'NONE',    -- 'STARTER' | 'PRO' | 'PREMIUM'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE courses (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "order" INTEGER NOT NULL
);

CREATE TABLE lessons (
  id VARCHAR(50) PRIMARY KEY,
  course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  content TEXT,
  duration_minutes INTEGER DEFAULT 15,
  "order" INTEGER NOT NULL
);

CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id VARCHAR(50) REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE orders (
  id VARCHAR(100) PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  user_email VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  plan VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(10) DEFAULT 'FCFA',
  status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING' | 'COMPLETED' | 'FAILED'
  payment_method VARCHAR(50),
  payment_reference VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);
```

---

## 6. Configuration du Paiement Sénegal (PayTech / Mobile Money)

### Règle d'or de sécurité
**Le frontend ne décide jamais seul qu'une commande est payée.**

### Flux transactionnel :
1. L'élève sélectionne sa formule (Starter 9 900 F, Pro 14 900 F, Premium 24 900 F) sur `/tarifs` ou `/commander/:planId`.
2. Le formulaire appelle `/.netlify/functions/create-order` avec le montant et l'email.
3. La fonction Netlify initie la demande auprès de l'API PayTech et retourne l'URL de paiement Wave / Orange Money / Carte.
4. L'élève effectue son paiement.
5. PayTech notifie le serveur via `/.netlify/functions/paytech-webhook` (IPN).
6. La fonction vérifie la signature HMAC, passe la commande en statut `COMPLETED`, et active l'accès dans la table `users`.
7. L'élève est redirigé vers son `/dashboard` avec tous les cours débloqués.

En mode Bac à Sable / Démo, l'interface propose un bouton transparent de simulation sans débit réel afin de tester le parcours élève de bout en bout.

---

## 7. Fonctionnalités Implémentées

- [x] **Site Public Complet** : Landing page (13 sections complètes), Programme détaillé (/formation), Tarifs (/tarifs), FAQ (/faq), Mentions légales, Confidentialité, CGV.
- [x] **Espace Élève Responsive** : Salutation dynamique, calcul automatique du pourcentage de progression, suivi des leçons terminées, reprise instantanée du dernier cours.
- [x] **Lecteur de Cours Pédagogique** : Player vidéo avec URL configurable (Cloudflare Stream, Bunny, YouTube, MP4), fiches de révision, points clés, action du jour, boutons précédent/suivant et bouton persistant "Marquer comme terminée".
- [x] **7 Bonus Téléchargeables** : Visionneuse modale intégrée + téléchargement réel de fichiers Markdown / texte (100 Hooks, 50 idées, 30 scripts, checklist, calendrier 30 jours, guide CapCut, 25 prompts IA).
- [x] **Système de Quiz** : QCM interactifs par module avec score en temps réel, calcul du pourcentage (ex: "8/10 — 80%"), explications détaillées et persistance des notes.
- [x] **Certificat Numérique Officiel** : Émission du diplôme officiel nominatif avec identifiant unique vérifiable, date et mise en page haute définition prête pour impression / PDF (`window.print()`).
- [x] **Authentification & Rôles (RBAC)** : Gestion des sessions élève et administrateur, protection stricte des routes privées.
- [x] **Panneau Administrateur Complet** : Tableau de bord des statistiques, gestion des élèves, éditeur de modules/leçons (ajout, modification, suppression en direct), gestion des bonus, historique des commandes et panneau de configuration des API.
- [x] **Bandeau Démo Interactif** : Sélecteur 1-clic permettant de tester instantanément l'expérience du point de vue d'un élève (Amadou Diallo) ou de l'administrateur (Awa Ndiaye).
