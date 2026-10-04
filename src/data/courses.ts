import { Course, Lesson } from '../types';

export const COURSES: Course[] = [
  {
    id: 'module-1',
    title: 'MODULE 1 — Les Bases de TikTok',
    description: 'Comprendre l’algorithme, l’anatomie du flux Pour Toi (FYP), les métriques déterminantes et les pièges fatals pour débuter fort.',
    order: 1,
    duration: '1h 15m',
    badge: 'Fondations',
    iconName: 'Zap'
  },
  {
    id: 'module-2',
    title: 'MODULE 2 — Trouver sa Niche',
    description: 'Identifier votre zone d’excellence, étudier vos concurrents et façonner un profil optimisé pour convertir chaque visiteur en abonné.',
    order: 2,
    duration: '1h 30m',
    badge: 'Stratégie',
    iconName: 'Target'
  },
  {
    id: 'module-3',
    title: 'MODULE 3 — Trouver des Idées',
    description: 'Ne plus jamais manquer d’inspiration : détecter les trends précoces, hacker l’onglet recherche et bâtir un stock infini d’idées.',
    order: 3,
    duration: '1h 20m',
    badge: 'Créativité',
    iconName: 'Lightbulb'
  },
  {
    id: 'module-4',
    title: 'MODULE 4 — Écrire des Scripts',
    description: 'La science du hook parfait (3 premières secondes), le storytelling hypnotique, le maintien de la rétention et les CTA qui convertissent.',
    order: 4,
    duration: '1h 45m',
    badge: 'Copywriting',
    iconName: 'PenTool'
  },
  {
    id: 'module-5',
    title: 'MODULE 5 — Créer ses Vidéos',
    description: 'Tournage face caméra décontracté, voix-off captivante, vidéos faceless, montage CapCut pro, sound design et accélération par IA.',
    order: 5,
    duration: '2h 10m',
    badge: 'Production',
    iconName: 'Video'
  },
  {
    id: 'module-6',
    title: 'MODULE 6 — Publier',
    description: 'Timing parfait, descriptions calibrées SEO, stratégie de hashtags ciblée, analyse chirurgicale des métriques et tests A/B de formats.',
    order: 6,
    duration: '1h 10m',
    badge: 'Croissance',
    iconName: 'Share2'
  },
  {
    id: 'module-7',
    title: 'MODULE 7 — Monétiser',
    description: 'Transformer vos vues en revenus : Programme Récompenses Créateurs, affiliation, vente de produits digitaux, consulting et sponsoring de marques.',
    order: 7,
    duration: '2h 00m',
    badge: 'Business',
    iconName: 'DollarSign'
  },
  {
    id: 'module-8',
    title: 'MODULE 8 — Plan 30 Jours',
    description: 'Votre feuille de route pas-à-pas jour après jour : organisation semaine 1 à 4, recalibrage continu et transition vers un business pérenne.',
    order: 8,
    duration: '1h 30m',
    badge: 'Action Rapide',
    iconName: 'Calendar'
  }
];

export const LESSONS: Lesson[] = [
  // MODULE 1
  {
    id: 'm1-l1',
    courseId: 'module-1',
    title: '1. Comment fonctionne TikTok',
    description: 'Découvrez la philosophie de la plateforme, l’intelligence du flux Pour Toi et pourquoi TikTok diffère radicalement d’Instagram ou YouTube.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 14,
    order: 1,
    keyPoints: [
      'TikTok privilégie l’intérêt instantané de chaque vidéo plutôt que le nombre initial d’abonnés.',
      'Le flux Pour Toi (FYP) fonctionne par batch de distribution progressive (100 vues -> 1 000 vues -> 10 000 vues...).',
      'La session watch time globale de l’utilisateur prime sur toutes les métriques secondaires.'
    ],
    actionItem: 'Créez un compte TikTok vierge dédié à votre veille concurrentielle et observez ce que l’algorithme vous propose lors des 30 premières minutes.',
    content: `
### Ce qui rend TikTok unique au monde

Contrairement aux réseaux sociaux traditionnels basés sur le "Social Graph" (où vous voyez le contenu des gens que vous suivez), TikTok est propulsé par un **Interest Graph** ultra-rapide.

#### 1. Le principe du test par cohortes
Quand vous publiez une vidéo :
- TikTok la diffuse immédiatement à un échantillon test (environ 250 à 300 personnes ciblées).
- L'algorithme calcule le ratio de complétion, les likes, les partages et les réécoutes.
- Si le score dépasse le seuil critique, la vidéo passe au palier supérieur (1 500 personnes), puis 10 000, puis 100 000+.

#### 2. Pourquoi un compte à 0 abonné peut faire 1 million de vues
Sur TikTok, votre historique d'abonnés ne bloque pas votre viralité. Chaque vidéo est jugée sur sa valeur intrinsèque et sa capacité à captiver immédiatement un public inconnu.
    `
  },
  {
    id: 'm1-l2',
    courseId: 'module-1',
    title: '2. Comprendre l\'algorithme',
    description: 'Les rouages secrets de l\'algorithme de recommandation, le système de scoring et comment optimiser chaque signal.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 18,
    order: 2,
    keyPoints: [
      'Le taux de complétion (> 60%) et les re-boucles (rewatches) ont le coefficient de scoring le plus fort.',
      'Le partage direct (envoi privé ou WhatsApp) indique à l’IA une valeur émotionnelle ou pratique extrême.',
      'Les commentaires génèrent du temps de lecture supplémentaire pendant que l’utilisateur tape sa réponse.'
    ],
    actionItem: 'Notez les 3 indicateurs clés que vous surveillerez systématiquement dans vos analyses de vidéos cette semaine.',
    content: `
### La hiérarchie secrète des signaux algorithmiques

TikTok applique un système de points pondérés sur chaque visionnage :

1. **Watch time total & Taux de complétion** (Pondération x10)
2. **Re-boucles (Rewatches)** (Pondération x8)
3. **Partages (Shares / Reposts)** (Pondération x7)
4. **Sauvegardes en favoris** (Pondération x5)
5. **Commentaires constructifs** (Pondération x4)
6. **Likes simples** (Pondération x2)

L'objectif numéro 1 est d'éviter le "skip" dès les 2 premières secondes.
    `
  },
  {
    id: 'm1-l3',
    courseId: 'module-1',
    title: '3. Les métriques importantes',
    description: 'Savoir lire son tableau de bord d’analytics : taux de complétion, rétention moyenne, sources de trafic et abonnés actifs.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 15,
    order: 3,
    keyPoints: [
      'Courbe de rétention : repérer immédiatement les chutes brutales d’attention.',
      'Source de trafic : viser un ratio Pour Toi supérieur à 80% pour la viralité.',
      'Heures d’activité des abonnés pour calibrer les lancements stratégiques.'
    ],
    actionItem: 'Activez immédiatement votre compte Créateur dans les paramètres TikTok pour débloquer l’onglet Statistiques.',
    content: `
### Décoder votre tableau de bord statistiques

Deux statistiques comptent plus que toutes les autres :
- **Pourcentage de spectateurs ayant regardé la vidéo en entier** : si ce chiffre dépasse 40% sur une vidéo de 30 secondes, l'algorithme va pousser votre contenu.
- **Durée moyenne de visionnage** : elle doit idéalement s'approcher ou dépasser 100% (signe de revisionnage).
    `
  },
  {
    id: 'm1-l4',
    courseId: 'module-1',
    title: '4. Pourquoi certaines vidéos deviennent virales',
    description: 'Analyse anatomique de 5 vidéos virales ayant dépassé 1 million de vues : schéma narratif, tension dramatique et boucle infinie.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 20,
    order: 4,
    keyPoints: [
      'L’élément de curiosité irrésistible (l’open loop cérébrale).',
      'Le rythme visuel soutenu : changement de plan ou d’élément graphique toutes les 2,5 secondes.',
      'La conclusion en boucle (looping seamless) qui pousse à revoir la vidéo sans s’en apercevoir.'
    ],
    actionItem: 'Enregistrez 3 vidéos virales dans votre niche et notez précisément ce qui se passe à la seconde 1, la seconde 15 et la fin.',
    content: `
### Les 3 ingrédients de la viralité moderne

1. **La clarté radicale** : dès la première seconde, l'utilisateur comprend exactement ce qu'il va gagner ou ressentir.
2. **Le micro-twist** : introduire une surprise, une idée contre-intuitive ou une révélation inattendue au milieu.
3. **Le déclencheur de partage** : l'envie irrépressible de dire "Regarde ça" à un ami ou un collègue.
    `
  },
  {
    id: 'm1-l5',
    courseId: 'module-1',
    title: '5. Les erreurs à éviter',
    description: 'Les pièges fatals des débutants : intros lentes, logos au début, suppressions massives et non-respect des règles de la communauté.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 16,
    order: 5,
    keyPoints: [
      'Ne JAMAIS commencer par "Bonjour tout le monde" ou "Aujourd’hui on va parler de...".',
      'Ne supprimez pas une vidéo qui fait peu de vues, passez-la en privé pour ne pas perturber l’historique d’apprentissage.',
      'Évitez d’acheter de faux abonnés ou de participer à des groupes d’engagement artificiels (pod).'
    ],
    actionItem: 'Passez en revue vos anciennes vidéos et identifiez celles qui ont violé la règle des 3 secondes d’intro.',
    content: `
### Les 5 erreurs qui tuent un compte dans l'œuf

1. **L'intro polie mais mortelle** : les internautes sont impatients. Vous avez 1.5 seconde avant le swipe.
2. **Le son de mauvaise qualité** : une mauvaise vidéo avec un bon son passe, une vidéo 4K avec un son étouffé est immédiatement balayée.
3. **Le manque de constance au lancement** : les 15 premiers jours demandent une présence soutenue.
    `
  },

  // MODULE 2
  {
    id: 'm2-l1',
    courseId: 'module-2',
    title: '1. Choisir sa niche',
    description: 'Comment trouver le croisement parfait entre vos compétences, votre passion et la rentabilité commerciale sur TikTok.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 19,
    order: 1,
    keyPoints: ['Formule de la niche rentable = Compétence + Demande forte + Potentiel de monétisation.', 'Les 4 macro-niches les plus lucratives : Argent/Business, Santé/Fitness, Relations/Développement, Loisirs/Divertissement spécialisé.'],
    actionItem: 'Remplissez la matrice de sélection de niche fournie en bonus dans l’onglet Ressources.',
    content: `### Comment choisir une niche durable sur TikTok\nNe vous enfermez pas dans une niche trop étroite dès le jour 1, mais commencez par un angle précis où vous pouvez produire au moins 50 sujets sans fatigue.`
  },
  {
    id: 'm2-l2',
    courseId: 'module-2',
    title: '2. Trouver son positionnement',
    description: 'Définir votre proposition de valeur unique (UVP) pour ne plus être une simple copie de ce qui existe déjà.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 17,
    order: 2,
    keyPoints: ['L’angle différenciateur : le ton (ironique, pédagogique, motivant) et le format récurrent.', 'Le client idéal TikTok : qui voulez-vous aider précisément ?'],
    actionItem: 'Rédigez votre énoncé de mission en une seule phrase : "J’aide [cible] à [résultat] grâce à [méthode]."',
    content: `### Votre signature de marque\nLe positionnement est ce qui fait qu'une personne clique sur "S'abonner" plutôt que de simplement liker votre vidéo et repartir.`
  },
  {
    id: 'm2-l3',
    courseId: 'module-2',
    title: '3. Étudier la concurrence',
    description: 'Méthodologie pour espionner intelligemment les meilleurs créateurs francophones et anglophones de votre thématique.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 21,
    order: 3,
    keyPoints: ['Identifier les 10 comptes leaders mondiaux de votre secteur.', 'Filtrer leurs vidéos les plus vues des 3 derniers mois pour isoler les déclencheurs universels.'],
    actionItem: 'Créez un tableau Notion ou Excel avec 10 concurrents directs et analysez leurs 3 vidéos les plus populaires.',
    content: `### L’analyse concurrentielle éthique\nNe copiez pas : déconstruisez les mécaniques qui ont fait mouche pour les réadapter à votre culture et votre touche personnelle.`
  },
  {
    id: 'm2-l4',
    courseId: 'module-2',
    title: '4. Construire son identité',
    description: 'Définir une signature visuelle, un gimmick verbal et des repères mémorisables qui créent un sentiment de familiarité immédiat.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 16,
    order: 4,
    keyPoints: ['L’élément visuel distinctif (casquette, mug, arrière-plan signature, néon).', 'Le gimmick d’accroche ou de fin récurrent.'],
    actionItem: 'Définissez les 2 éléments graphiques et sonores qui constitueront votre signature sur vos 10 prochaines vidéos.',
    content: `### L'ancrage mental chez le spectateur\nQuand votre vidéo apparaît dans le flux, le spectateur doit vous identifier en 0.5 seconde avant même d’entendre votre voix.`
  },
  {
    id: 'm2-l5',
    courseId: 'module-2',
    title: '5. Optimiser son profil',
    description: 'Transformer votre page de profil en machine à convertir : photo de profil nette, bio percutante, liens stratégiques et vidéos épinglées.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 18,
    order: 5,
    keyPoints: ['Photo avec contraste élevé ou visage détouré sur fond vibrant.', 'Bio en 3 lignes : Qui vous êtes, ce que vous partagez, appel à l’action vers votre lien.', 'Les 3 vidéos épinglées : Qui je suis, la meilleure vidéo virale, et l’offre/ressource.'],
    actionItem: 'Mettez à jour votre profil TikTok selon la checklist d’optimisation téléchargeable.',
    content: `### La formule de bio irrésistible\nLigne 1 : Ce que vous apportez à l'audience.\nLigne 2 : Votre autorité ou preuve sociale.\nLigne 3 : CTA flèche vers votre offre gratuite ou payante.`
  },

  // MODULE 3
  {
    id: 'm3-l1',
    courseId: 'module-3',
    title: '1. Où trouver des idées',
    description: 'Les 6 sources inépuisables de sujets de vidéos : Reddit, AnswerThePublic, commentaires TikTok, Google Trends et podcasts.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 15,
    order: 1,
    keyPoints: ['Fouiller la section commentaires des vidéos virales de concurrents pour trouver les questions sans réponse.', 'Recherche TikTok : exploiter les suggestions de recherche automatique (TikTok SEO).'],
    actionItem: 'Listez 15 questions posées dans les commentaires de 3 vidéos de votre secteur.',
    content: `### La recherche d'idées basée sur la douleur réelle\nLes meilleures vidéos répondent à une frustration intense, une curiosité inavouée ou une croyance limitante.`
  },
  {
    id: 'm3-l2',
    courseId: 'module-3',
    title: '2. Repérer les tendances',
    description: 'Identifier les audios et formats émergents AVANT qu’ils ne deviennent saturés par tout le monde.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 14,
    order: 2,
    keyPoints: ['Comment repérer un audio qui grimpe : moins de 10 000 vidéos créées avec courbe exponentielle.', 'Utiliser le Creative Center officiel de TikTok.'],
    actionItem: 'Allez sur le TikTok Creative Center et répertoriez 3 sons tendances dans votre région géographique.',
    content: `### Le timing des tendances\nUtiliser une tendance à 5 000 utilisations donne un effet levier x10. L’utiliser à 500 000 utilisations vous noie dans la masse.`
  },
  {
    id: 'm3-l3',
    courseId: 'module-3',
    title: '3. Transformer une tendance',
    description: 'Adapter n’importe quel mème ou audio viral à votre niche professionnelle sans décrédibiliser votre image.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 16,
    order: 3,
    keyPoints: ['Conserver l’émotion centrale du son (ironie, soulagement, choc) et transposer le texte sur votre métier.'],
    actionItem: 'Prenez le son le plus en vogue aujourd’hui et écrivez 2 variations adaptées à votre sujet.',
    content: `### La métaphore de niche\nComment un comptable, un coach sportif ou un e-commerçant peuvent utiliser le même son d'humour en générant des leads qualifiés.`
  },
  {
    id: 'm3-l4',
    courseId: 'module-3',
    title: '4. Créer 30 idées rapidement',
    description: 'La technique du "Mind Mapping Matriciel" pour générer 1 mois de contenu complet en moins de 45 minutes.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 20,
    order: 4,
    keyPoints: ['La matrice 5 Piliers x 6 Angles narratifs = 30 concepts validés.'],
    actionItem: 'Appliquez la matrice et remplissez votre grille de 30 titres de vidéos dès aujourd’hui.',
    content: `### Les 6 angles narratifs universels\n1. L'erreur commune\n2. Le secret méconnu\n3. L'histoire personnelle / échec\n4. Le tutoriel pas-à-pas\n5. La comparaison A vs B\n6. La prédiction future`
  },
  {
    id: 'm3-l5',
    courseId: 'module-3',
    title: '5. Construire une banque d\'idées',
    description: 'Mettre en place un système de capture immédiate (Notion, Google Keep, Notes) pour ne plus jamais perdre un éclair de génie.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 12,
    order: 5,
    keyPoints: ['Workflow en 3 colonnes : Idée brute -> Script prêt -> Tourné & Planifié.'],
    actionItem: 'Installez le widget de capture de notes sur l’écran d’accueil de votre smartphone.',
    content: `### Ne comptez jamais sur votre mémoire\nLes meilleures idées surviennent sous la douche, en marchant ou au milieu d'une conversation. Capturez-les en moins de 10 secondes.`
  },

  // MODULE 4
  {
    id: 'm4-l1',
    courseId: 'module-4',
    title: '1. Comprendre le hook',
    description: 'L’accroche des 3 premières secondes : pourquoi 80% du succès d’une vidéo se joue avant même que vous respiriez.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 17,
    order: 1,
    keyPoints: ['Le double hook : l’accroche visuelle (texte à l’écran + mouvement) et l’accroche auditive.'],
    actionItem: 'Choisissez 3 de vos prochaines vidéos et écrivez 3 hooks différents pour chacune.',
    content: `### L'anatomie d'un hook puissant\nLe hook ne doit pas résumer la vidéo : il doit créer une tension que seul le visionnage complet peut apaiser.`
  },
  {
    id: 'm4-l2',
    courseId: 'module-4',
    title: '2. Capturer l\'attention',
    description: 'Techniques psychologiques avancées : contradiction, curiosité ouverte, menace imminente et bénéfice immédiat.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 19,
    order: 2,
    keyPoints: ['Le schéma de perturbation (Pattern Interrupt).', 'L’affirmation provocante suivie d’une preuve indiscutable.'],
    actionItem: 'Enregistrez un hook avec une rupture de mouvement (saut de plan, geste rapide vers l’objectif).',
    content: `### Les 4 déclencheurs émotionnels majeurs\nLa peur de passer à côté (FOMO), le gain rapide, le choc intellectuel et le sentiment d'appartenance à un groupe privilégié.`
  },
  {
    id: 'm4-l3',
    courseId: 'module-4',
    title: '3. Construire un storytelling',
    description: 'La structure narrative en 3 actes adaptée aux formats courts de 30 à 90 secondes.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 22,
    order: 3,
    keyPoints: ['Situation initiale -> Obstacle dramatique -> Révélation et transformation.'],
    actionItem: 'Scénarisez une anecdote vécue en moins de 120 mots.',
    content: `### Le storytelling express\nPas besoin de 2 heures de film pour émouvoir ou captiver : un bon micro-récit commence directement au milieu de l'action ("In media res").`
  },
  {
    id: 'm4-l4',
    courseId: 'module-4',
    title: '4. Augmenter la rétention',
    description: 'Comment maintenir le spectateur scotché du début à la fin sans le moindre temps mort.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 18,
    order: 4,
    keyPoints: ['Suppression totale des respirations et des bafouillages.', 'La technique de la récompense différée : "Et le numéro 3 va changer votre façon de penser."'],
    actionItem: 'Éditez un script en coupant 20% des mots inutiles.',
    content: `### La chasse aux temps morts\nChaque phrase doit mériter sa place. Si une phrase n'apporte ni valeur, ni divertissement, supprimez-la impitoyablement.`
  },
  {
    id: 'm4-l5',
    courseId: 'module-4',
    title: '5. Créer un CTA',
    description: 'Les appels à l’action qui convertissent sans paraître agressifs ni mendier des likes.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 14,
    order: 5,
    keyPoints: ['Un seul CTA par vidéo : abonnement OU commentaire OU clic en bio.', 'Inciter au débat dans les commentaires en posant une question binaire stimulante.'],
    actionItem: 'Rédigez 3 CTA différents adaptés respectivement à la notoriété, à l’engagement et à la vente.',
    content: `### Le CTA à valeur perçue\nAu lieu de dire "Abonne-toi", dites "Abonne-toi si tu veux maîtriser l’algorithme avant qu'il ne change le mois prochain".`
  },
  {
    id: 'm4-l6',
    courseId: 'module-4',
    title: '6. Modèles de scripts',
    description: 'Étude détaillée et application directe de nos 5 frameworks de scripts clés-en-main prêts à l’emploi.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 25,
    order: 6,
    keyPoints: ['Script 1 : Le mythe déconstruit.', 'Script 2 : Le tutoriel en 3 étapes.', 'Script 3 : L’étude de cas secrète.'],
    actionItem: 'Téléchargez le pack de 30 scripts dans les Bonus et personnalisez-en 2 immédiatement.',
    content: `### Les frameworks à copier-coller\nUtilisez les structures éprouvées pour gagner du temps et vous concentrer sur l'énergie de votre prestation.`
  },

  // MODULE 5
  {
    id: 'm5-l1',
    courseId: 'module-5',
    title: '1. Face caméra',
    description: 'Vaincre la timidité, soigner le regard (regarder l’objectif, pas l’écran !), la posture et l’énergie vocale.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 21,
    order: 1,
    keyPoints: ['Règle des 120% d’énergie : la caméra absorbe 20% de votre dynamisme naturel.'],
    actionItem: 'Enregistrez 3 prises d’un même texte en montant l’énergie d’un cran à chaque fois.',
    content: `### Dompter l'objectif du téléphone\nParlez à la lentille comme si vous parliez à votre meilleur ami assis en face de vous autour d'un café.`
  },
  {
    id: 'm5-l2',
    courseId: 'module-5',
    title: '2. Voix off',
    description: 'Créer des vidéos dynamiques avec enregistrement vocal clair, intonation travaillée et micro cravate économique.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 16,
    order: 2,
    keyPoints: ['Enregistrer sa voix dans une pièce feutrée (chambre avec rideaux ou dressing).'],
    actionItem: 'Testez la prise de son avec un micro cravate branché directement sur votre smartphone.',
    content: `### L'art de la voix off engageante\nModulez votre voix, marquez de légers silences dramatiques et souriez en parlant (cela s'entend distinctement).`
  },
  {
    id: 'm5-l3',
    courseId: 'module-5',
    title: '3. Contenu sans visage',
    description: 'Comment monter une chaîne TikTok rentable à 100% sans jamais montrer son visage (Faceless TikTok).',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 24,
    order: 3,
    keyPoints: ['Banques de vidéos libres de droits (Pexels, Storyblocks).', 'Vidéos de gameplay, b-roll esthétique ou animations graphiques.'],
    actionItem: 'Créez un premier prototype de vidéo faceless de 20 secondes sur CapCut.',
    content: `### Le modèle Faceless qui cartonne\nDes comptes dans la motivation, les anecdotes historiques ou les conseils tech génèrent des millions de vues sans qu'on ne connaisse jamais le créateur.`
  },
  {
    id: 'm5-l4',
    courseId: 'module-5',
    title: '4. Montage avec CapCut',
    description: 'Maîtriser CapCut sur mobile et desktop : découpes rapides, zooms dynamiques, transitions et keyframes.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 32,
    order: 4,
    keyPoints: ['Raccourcis indispensables de cut.', 'Effets de zoom avant/arrière sur les mots clés pour relancer l’attention.'],
    actionItem: 'Suivez le pas-à-pas vidéo et montez une séquence complète de 30 secondes.',
    content: `### Le montage au millimètre près\nUn bon montage TikTok est chirurgical : chaque seconde où rien ne change visuellement est une seconde à risque de départ.`
  },
  {
    id: 'm5-l5',
    courseId: 'module-5',
    title: '5. Sous-titres',
    description: 'La science des sous-titres animés et contrastés : 70% des utilisateurs regardent les vidéos sans le son au démarrage.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 15,
    order: 5,
    keyPoints: ['Génération automatique dans CapCut.', 'Mise en valeur de mots clés en couleur vive (jaune ou vert TikTok).'],
    actionItem: 'Appliquez le template de sous-titres animés TikTok Mastery à votre dernier montage.',
    content: `### Pourquoi les sous-titres sont non-négociables\nIls augmentent la rétention moyenne de 28% et permettent à l'algorithme d'indexer le texte pour la recherche.`
  },
  {
    id: 'm5-l6',
    courseId: 'module-5',
    title: '6. Musique et sound design',
    description: 'Sublimer vos cuts avec des effets sonores (whoosh, pop, ding) et choisir la bonne musique de fond au volume parfait.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 17,
    order: 6,
    keyPoints: ['Régler la musique de fond entre 8% et 15% pour qu’elle n’étouffe jamais la voix.', 'Placer un bruitage précis à chaque changement de texte.'],
    actionItem: 'Téléchargez le pack de sons SFX inclus dans vos ressources bonus.',
    content: `### L'immersion auditive\nLe sound design discret mais percutant donne immédiatement un rendu broadcast professionnel à une vidéo filmée avec un simple téléphone.`
  },
  {
    id: 'm5-l7',
    courseId: 'module-5',
    title: '7. Utiliser l\'IA intelligemment',
    description: 'Accélérer votre production par 5 grâce aux prompts IA pour scripts, voix synthétiques ultra-réalistes et génération de b-rolls.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 22,
    order: 7,
    keyPoints: ['Les prompts structurés pour générer des hooks percutants.', 'Comment garder une authenticité humaine sans tomber dans le spam générique.'],
    actionItem: 'Testez la liste de 25 prompts IA fournie dans votre espace élève.',
    content: `### L'IA comme copilote, pas comme remplaçant\nL'intelligence artificielle vous épargne la page blanche, mais c'est votre direction éditoriale qui fera la différence.`
  },

  // MODULE 6
  {
    id: 'm6-l1',
    courseId: 'module-6',
    title: '1. Préparer une publication',
    description: 'Checklist complète des 7 vérifications avant d’appuyer sur Publier : audio, cadrage, zone sécurisée UI TikTok.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 13,
    order: 1,
    keyPoints: ['Respecter les zones réservées aux boutons likes, commentaires et à la description pour ne rien masquer.'],
    actionItem: 'Imprimez ou enregistrez la grille de zone sécurisée sur votre smartphone.',
    content: `### La zone sécurisée TikTok\nNe placez jamais de texte en bas à droite (masqué par les icônes) ni tout en bas (masqué par la description).`
  },
  {
    id: 'm6-l2',
    courseId: 'module-6',
    title: '2. Description',
    description: 'Rédiger une description optimisée pour le SEO TikTok et incitant au débat sans spoiler la vidéo.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 14,
    order: 2,
    keyPoints: ['Placer 2 à 3 mots-clés exacts que les utilisateurs tapent dans la barre de recherche.', 'Formuler une question engageante.'],
    actionItem: 'Rédigez la description SEO de votre prochaine vidéo en respectant les consignes.',
    content: `### TikTok est devenu un moteur de recherche\nLa description aide l'IA à catégoriser immédiatement votre vidéo dans le bon cluster d'audience.`
  },
  {
    id: 'm6-l3',
    courseId: 'module-6',
    title: '3. Hashtags',
    description: 'La vérité sur #fyp et #pourtoi : stratégie réelle des 3 à 5 hashtags de niche pour guider l’algorithme.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 12,
    order: 3,
    keyPoints: ['Bannir les hashtags génériques inutiles (#viral, #foryou).', 'Utiliser la règle : 2 hashtags de niche précise + 2 hashtags de thématique large.'],
    actionItem: 'Sélectionnez vos 10 hashtags récurrents les plus performants.',
    content: `### Le vrai rôle des hashtags aujourd'hui\nIls ne rendent pas une vidéo virale par magie, ils indiquent à l'algorithme à qui la montrer en premier.`
  },
  {
    id: 'm6-l4',
    courseId: 'module-6',
    title: '4. Fréquence',
    description: 'À quelle fréquence publier ? Analyse du compromis entre volume, qualité et fatigue créative.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 15,
    order: 4,
    keyPoints: ['1 excellente vidéo par jour bat toujours 4 vidéos médiocres bâclées.', 'Rythme recommandé pour débuter : 5 à 7 vidéos par semaine pendant le premier mois.'],
    actionItem: 'Planifiez vos créneaux de tournage hebdomadaires (batching).',
    content: `### La régularité avant tout\nL'algorithme valorise les créateurs fiables qui alimentent continuellement la plateforme.`
  },
  {
    id: 'm6-l5',
    courseId: 'module-6',
    title: '5. Tester différents formats',
    description: 'Le protocole de test pour alterner entre vidéos courtes (15s), vidéos moyennes (45s) et formats longs (2min+).',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 16,
    order: 5,
    keyPoints: ['Formats courts pour générer de l’abonnements massifs.', 'Formats longs (> 1 min) pour bâtir de la confiance et monétiser via le fonds créateur.'],
    actionItem: 'Programmez un test sur 2 semaines alternant 1 format court et 1 format long.',
    content: `### Le mix éditorial parfait\nNe faites pas toujours le même type de contenu : variez les rythmes pour surprendre votre communauté.`
  },
  {
    id: 'm6-l6',
    courseId: 'module-6',
    title: '6. Lire ses statistiques',
    description: 'Interpréter les résultats après 24h, 48h et 7 jours : quand considérer qu’une vidéo a décollé et comment réagir.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 18,
    order: 6,
    keyPoints: ['La courbe de vie d’un TikTok peut s’étaler sur plusieurs semaines grâce au SEO et à la distribution lente.'],
    actionItem: 'Analysez vos 3 dernières vidéos et déduisez-en une leçon d’amélioration concrète.',
    content: `### Les chiffres ne mentent pas\nDéveloppez un regard clinique : si une vidéo stagne à 200 vues, identifiez précisément à quelle seconde l'audience a décroché.`
  },

  // MODULE 7
  {
    id: 'm7-l1',
    courseId: 'module-7',
    title: '1. Les différentes sources de revenus',
    description: 'Panorama complet des 5 leviers pour transformer ses abonnés TikTok en cash-flow régulier.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 22,
    order: 1,
    keyPoints: ['Ne jamais dépendre d’une seule source de revenu.', 'Comprendre la valeur vie (LTV) d’un abonné engagé.'],
    actionItem: 'Identifiez laquelle des 5 sources vous déploierez en priorité sur votre compte.',
    content: `### L'écosystème financier du créateur\nLes vues sont une monnaie d'attention. Votre mission est de convertir cette attention en valeur économique durable.`
  },
  {
    id: 'm7-l2',
    courseId: 'module-7',
    title: '2. Affiliation',
    description: 'Recommander des logiciels, outils ou produits physiques et toucher des commissions récurrentes tous les mois.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 20,
    order: 2,
    keyPoints: ['Choisir des programmes d’affiliation avec commissions récurrentes mensuelles (SaaS).', 'Créer des démonstrations d’utilisation honnêtes.'],
    actionItem: 'Inscrivez-vous à 2 programmes d’affiliation pertinents pour votre audience.',
    content: `### L'affiliation éthique\nNe recommandez que des produits que vous utilisez réellement. Votre crédibilité est votre actif le plus précieux.`
  },
  {
    id: 'm7-l3',
    courseId: 'module-7',
    title: '3. Produits numériques',
    description: 'Créer et vendre des ebooks, templates Notion, guides PDF ou mini-formations avec marge à 95% sans stock physique.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 26,
    order: 3,
    keyPoints: ['La création d’un produit à faible barrière à l’entrée (prix entre 5 000 et 15 000 FCFA).', 'Mettre en place une page de vente épurée et responsive.'],
    actionItem: 'Rédigez le plan de votre premier produit numérique en 5 chapitres.',
    content: `### Le produit digital : liberté absolue\nVous créez le produit une fois, vous le vendez des milliers de fois sans coût marginal supplémentaire.`
  },
  {
    id: 'm7-l4',
    courseId: 'module-7',
    title: '4. Services',
    description: 'Comment vendre du coaching, de la prestation freelance ou du consulting à haute valeur ajoutée dès vos 1 000 premiers abonnés.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 24,
    order: 4,
    keyPoints: ['Utiliser TikTok comme vitrine d’autorité.', 'Le tunnel simple : Vidéo TikTok -> WhatsApp / Calendly -> Appel de clôture.'],
    actionItem: 'Créez votre lien Calendly ou formulaire de qualification client.',
    content: `### Vous n'avez pas besoin de 100 000 abonnés\nAvec seulement 500 abonnés ultra-qualifiés dans une thématique B2B, vous pouvez signer des contrats à plusieurs centaines de milliers de FCFA.`
  },
  {
    id: 'm7-l5',
    courseId: 'module-7',
    title: '5. Sponsoring',
    description: 'Négocier des collaborations avec des marques : kit média, grille tarifaire, prospection et signature de partenariats rémunérés.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 23,
    order: 5,
    keyPoints: ['Calculer son tarif au CPM (coût pour mille vues garanties).', 'Le contrat type de sponsoring et les droits d’utilisation.'],
    actionItem: 'Téléchargez le modèle de Media Kit créateur dans vos ressources.',
    content: `### Traiter d'égal à égal avec les annonceurs\nPrésentez des données concrètes d'engagement plutôt que de simples chiffres de followers pour négocier les meilleurs tarifs.`
  },
  {
    id: 'm7-l6',
    courseId: 'module-7',
    title: '6. Monétisation TikTok',
    description: 'Le Programme Récompenses pour les Créateurs (ex-fonds créateur) : critères d’éligibilité, vidéos de + d’une minute et RPM moyen.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 21,
    order: 6,
    keyPoints: ['Critères officiels : 10 000 abonnés et 100 000 vues sur les 30 derniers jours.', 'Comprendre le RPM (Revenu pour 1000 vues qualifiées).'],
    actionItem: 'Vérifiez les critères d’éligibilité de votre région et configurez votre profil fiscal.',
    content: `### Maximiser son RPM officiel\nPour obtenir un RPM élevé (souvent entre 0,40€ et 1,20€ pour 1 000 vues), visez une audience adulte dans des pays à fort pouvoir d'achat.`
  },
  {
    id: 'm7-l7',
    courseId: 'module-7',
    title: '7. Construire un business',
    description: 'Sécuriser votre audience : rediriger vos spectateurs TikTok vers une liste email ou un canal Telegram / WhatsApp privé.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 25,
    order: 7,
    keyPoints: ['Les algorithmes changent, votre liste de contacts vous appartient pour toujours.', 'Offrir un "Lead Magnet" gratuit irrésistible en bio.'],
    actionItem: 'Créez votre page de capture simple pour récolter les adresses email ou numéros de vos plus grands fans.',
    content: `### Ne bâtissez pas sur du sable\nTikTok est le haut de votre entonnoir. Le véritable business pérenne s'opère dans votre propre base de données.`
  },

  // MODULE 8
  {
    id: 'm8-l1',
    courseId: 'module-8',
    title: '1. Préparer son plan',
    description: 'Organisation de votre calendrier, mise en place de votre espace de travail et élimination de la procrastination.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 16,
    order: 1,
    keyPoints: ['Bloquer 2 demi-journées par semaine dédiées exclusivement à TikTok.'],
    actionItem: 'Imprimez votre calendrier de 30 jours et fixez vos dates limites.',
    content: `### Votre engagement solennel pour les 30 prochains jours\nLa motivation fait commencer, la discipline fait durer. Suivez le plan jour après jour sans vous poser de questions existentielles.`
  },
  {
    id: 'm8-l2',
    courseId: 'module-8',
    title: '2. Première semaine',
    description: 'Jours 1 à 7 : Fondations, configuration chirurgicale du compte et publication des 5 premières vidéos de test.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 19,
    order: 2,
    keyPoints: ['Tester 3 angles différents pour observer la réactivité de l’audience.'],
    actionItem: 'Publiez vos 5 premières vidéos en suivant strictement les modèles du Module 4.',
    content: `### Semaine 1 : Briser la glace\nNe cherchez pas la perfection absolue. L'objectif de la première semaine est d'éliminer la peur de publier et de valider votre workflow.`
  },
  {
    id: 'm8-l3',
    courseId: 'module-8',
    title: '3. Deuxième semaine',
    description: 'Jours 8 à 14 : Accélération du rythme, premiers ajustements d’accroches et test des tendances sonores.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 18,
    order: 3,
    keyPoints: ['Isoler la vidéo qui a fait le plus de vues et en produire une suite directe.'],
    actionItem: 'Identifiez votre meilleure vidéo de la semaine 1 et créez un "Partie 2" ou un approfondissement.',
    content: `### Semaine 2 : Le premier effet de levier\nQuand un sujet fonctionne, doublez la mise immédiatement. N'hésitez pas à exploiter la même idée sous plusieurs angles différents.`
  },
  {
    id: 'm8-l4',
    courseId: 'module-8',
    title: '4. Troisième semaine',
    description: 'Jours 15 à 21 : Perfectionnement du montage, introduction du storytelling plus personnel et engagement communautaire intense.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 20,
    order: 4,
    keyPoints: ['Répondre aux commentaires avec des vidéos vidéo-réponses pour créer des mini-séries.'],
    actionItem: 'Tournez au moins 2 vidéos en réponse directe à des commentaires de vos spectateurs.',
    content: `### Semaine 3 : Bâtir une véritable communauté\nLes vidéos en réponse à des commentaires bénéficient d'un capital sympathie énorme et poussent les autres spectateurs à commenter.`
  },
  {
    id: 'm8-l5',
    courseId: 'module-8',
    title: '5. Quatrième semaine',
    description: 'Jours 22 à 28 : Intégration du premier appel à l’action commercial ou inscription à votre ressource gratuite.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 21,
    order: 5,
    keyPoints: ['Lancement de votre lead magnet ou offre starter.', 'Mesure du taux de conversion clic en bio.'],
    actionItem: 'Insérez votre lien optimisé dans votre bio et mesurez les clics quotidiens.',
    content: `### Semaine 4 : La première monétisation\nC'est le moment de tester l'appétence de votre audience pour aller plus loin avec vous.`
  },
  {
    id: 'm8-l6',
    courseId: 'module-8',
    title: '6. Analyser ses résultats',
    description: 'Bilan des 30 jours : décortiquer les 30 vidéos publiées, identifier les formats gagnants et éliminer ce qui ne marche pas.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 23,
    order: 6,
    keyPoints: ['La règle 80/20 appliquée à vos publications : 20% de vos vidéos apportent 80% de vos abonnés.'],
    actionItem: 'Complétez votre bilan de performance mensuel.',
    content: `### L'audit sans complaisance\nVous disposez désormais d'un échantillon statistique solide. Vous savez exactement ce qui plaît à votre audience et ce qu'elle ignore.`
  },
  {
    id: 'm8-l7',
    courseId: 'module-8',
    title: '7. Continuer après les 30 jours',
    description: 'Passer du statut de créateur amateur à celui d’entrepreneur des médias : automatisation, délégation du montage et expansion multi-plateformes.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    durationMinutes: 25,
    order: 7,
    keyPoints: ['Recruter un monteur vidéo dédié pour décupler votre cadence.', 'Recycler ses TikToks sur Instagram Reels, YouTube Shorts et Pinterest.'],
    actionItem: 'Finalisez votre certification TikTok Mastery et préparez vos objectifs pour les 90 prochains jours.',
    content: `### La suite de votre aventure\nVous avez désormais toutes les armes en main. Le monde appartient à ceux qui créent, partagent et persévèrent.`
  }
];

export const PRICING_PLANS = [
  {
    id: 'STARTER' as const,
    name: 'STARTER',
    price: 9900,
    currency: 'FCFA',
    badge: 'Essentiel',
    isPopular: false,
    description: 'Pour lancer sereinement son compte TikTok avec toutes les fondations nécessaires.',
    features: [
      'Accès complet aux 8 modules de formation',
      'Accès permanent et à vie',
      'Mises à jour incluses des cours de base',
      'Accès aux fiches résumées de chaque leçon',
      'Support par email standard'
    ],
    notIncluded: [
      'Pack complet des 7 bonus créateurs',
      'Système de quiz & validation',
      'Certificat officiel de réussite',
      'Outils et prompts IA exclusifs'
    ],
    ctaText: 'Choisir l’offre Starter'
  },
  {
    id: 'PRO' as const,
    name: 'PRO',
    price: 14900,
    currency: 'FCFA',
    badge: 'LE PLUS POPULAIRE',
    isPopular: true,
    description: 'La solution la plus complète pour exploser son audience et obtenir sa certification reconnue.',
    features: [
      'Formation complète (8 modules, 48 leçons)',
      'Accès permanent et illimité 24/7',
      'Tous les 7 bonus créateurs téléchargeables',
      'Système de quiz interactifs par module',
      'Certificat numérique officiel TikTok Mastery',
      'Toutes les futures mises à jour algorithmiques',
      'Accès prioritaire à la communauté d’entraide'
    ],
    ctaText: 'Commencer en PRO'
  },
  {
    id: 'PREMIUM' as const,
    name: 'PREMIUM',
    price: 24900,
    currency: 'FCFA',
    badge: 'VIP & BUSINESS',
    isPopular: false,
    description: 'Pour les créateurs et entrepreneurs exigeants voulant un accompagnement poussé et des outils exclusifs.',
    features: [
      'Tout le contenu et avantages de l’offre PRO',
      'Ressources & templates avancés supplémentaires',
      'Boîte à outils complète pour créateurs (Notion OS)',
      'Revue personnalisée de votre compte TikTok',
      'Session de questions/réponses collective mensuelle',
      'Accompagnement VIP dédié par canal direct'
    ],
    ctaText: 'Obtenir l’accès Premium'
  }
];
