import { Quiz } from '../types';

export const MODULE_QUIZZES: Quiz[] = [
  {
    id: 'quiz-module-1',
    courseId: 'module-1',
    title: 'Quiz de Validation — Les Bases de TikTok',
    description: 'Vérifiez vos connaissances sur l’algorithme, la distribution par cohortes et les métriques de rétention avant de passer à la suite.',
    passingScore: 70,
    questions: [
      {
        id: 'q1-1',
        question: 'Quelle métrique est la plus lourdement pondérée par l’algorithme de recommandation TikTok ?',
        options: [
          'Le nombre total de likes sur la vidéo',
          'Le taux de complétion et le watch time moyen',
          'Le nombre de hashtags utilisés dans la description',
          'Le nombre de followers du compte au moment de la publication'
        ],
        correctAnswer: 1,
        explanation: 'TikTok valorise avant tout le temps que l’utilisateur passe sur la plateforme. Une vidéo vue en entier ou revisionnée reçoit le score de distribution le plus élevé.'
      },
      {
        id: 'q1-2',
        question: 'Comment s’appelle le mécanisme par lequel TikTok teste une nouvelle vidéo auprès d’un petit groupe initial ?',
        options: [
          'La distribution par cohortes (batch testing)',
          'Le shadowban préventif',
          'Le push organique aléatoire',
          'Le filtrage par géolocalisation stricte'
        ],
        correctAnswer: 0,
        explanation: 'TikTok teste chaque vidéo auprès d’un premier échantillon d’environ 250-300 utilisateurs ciblés pour mesurer ses métriques avant de décider de l’élargir.'
      },
      {
        id: 'q1-3',
        question: 'Combien de temps avez-vous en moyenne pour capter l’attention avant qu’un utilisateur ne swipe vers le bas ?',
        options: [
          'Environ 10 secondes',
          'Entre 1.5 et 3 secondes maximum',
          '30 secondes',
          'Tant que le titre de la vidéo est joli'
        ],
        correctAnswer: 1,
        explanation: 'L’attention sur mobile est ultra-volatile : si le spectateur n’est pas intrigué dès les 2 à 3 premières secondes, il passe à la vidéo suivante.'
      },
      {
        id: 'q1-4',
        question: 'Pourquoi ne faut-il JAMAIS supprimer brutalement une vidéo qui a fait peu de vues ?',
        options: [
          'Parce que TikTok va prélever de l’argent sur votre compte',
          'Parce que cela envoie un signal négatif à l’algorithme (préférez la passer en Privé si besoin)',
          'Parce que c’est interdit par la loi',
          'Parce que les commentaires seront envoyés par email'
        ],
        correctAnswer: 1,
        explanation: 'Des suppressions massives peuvent déclencher des alertes de sécurité dans le système d’analyse. Si une vidéo ne vous convient plus, passez-la simplement en mode Privé.'
      },
      {
        id: 'q1-5',
        question: 'Quelle est la proportion idéale de trafic provenant du flux "Pour Toi" pour une vidéo virale ?',
        options: [
          'Moins de 10%',
          'Entre 20% et 30%',
          'Plus de 75% à 85%',
          '100% obligatoire'
        ],
        correctAnswer: 2,
        explanation: 'Un ratio FYP (Pour Toi) supérieur à 75-80% indique que l’algorithme pousse activement votre vidéo auprès de parfaits inconnus en dehors de votre base d’abonnés.'
      }
    ]
  },
  {
    id: 'quiz-module-2',
    courseId: 'module-2',
    title: 'Quiz de Validation — Trouver sa Niche & Positionnement',
    description: 'Testez la solidité de votre stratégie de positionnement et l’optimisation de votre profil créateur.',
    passingScore: 70,
    questions: [
      {
        id: 'q2-1',
        question: 'Quels sont les 3 piliers essentiels pour définir une niche rentable sur TikTok ?',
        options: [
          'Chance + Musique virale + Quantité',
          'Compétence / Passion + Forte Demande du Marché + Potentiel de Monétisation',
          'Acheter des abonnés + Copier mot à mot + Publier 10 fois par jour',
          'Matériel coûteux + Décor de luxe + Danse'
        ],
        correctAnswer: 1,
        explanation: 'Une niche durable repose sur ce que vous savez faire, ce que le public cherche avidement, et la capacité à y vendre des produits, services ou du contenu.'
      },
      {
        id: 'q2-2',
        question: 'Quel est le rôle principal de la biographie TikTok (Bio) ?',
        options: [
          'Raconter toute sa biographie depuis l’enfance',
          'Montrer immédiatement qui vous aidez, comment, et inciter à un clic précis vers votre lien',
          'Mettre un maximum d’emojis sans aucun texte',
          'Ne rien écrire pour entretenir le mystère'
        ],
        correctAnswer: 1,
        explanation: 'La bio sert de passerelle de conversion : le visiteur doit comprendre en 3 secondes pourquoi s’abonner et sur quel lien cliquer.'
      },
      {
        id: 'q2-3',
        question: 'Quelles sont les 3 vidéos idéales à épingler en haut de votre profil ?',
        options: [
          'Les 3 vidéos les plus courtes possibles',
          '1 vidéo de présentation/histoire + Votre plus gros carton viral + Votre offre ou ressource clé',
          '3 vidéos humoristiques sans rapport avec votre sujet',
          'Vos 3 premières vidéos publiées chronologiquement'
        ],
        correctAnswer: 1,
        explanation: 'Ces 3 vidéos épinglées accueillent les nouveaux visiteurs, prouvent votre autorité et orientent le trafic vers votre tunnel.'
      }
    ]
  },
  {
    id: 'quiz-module-4',
    courseId: 'module-4',
    title: 'Quiz de Validation — Écriture & Scripts Hypnotiques',
    description: 'Validez votre compréhension des hooks, du storytelling court et des appels à l’action.',
    passingScore: 70,
    questions: [
      {
        id: 'q4-1',
        question: 'Qu’est-ce qu’un "Pattern Interrupt" (rupture de motif) dans une vidéo TikTok ?',
        options: [
          'Une panne de connexion internet pendant le stream',
          'Un changement inattendu visuel, sonore ou narratif qui réveille le cerveau du spectateur',
          'Une musique très forte qui sature les haut-parleurs',
          'Un écran noir de 10 secondes'
        ],
        correctAnswer: 1,
        explanation: 'Le pattern interrupt casse la monotonie du scroll passif et force l’attention à se focaliser sur ce que vous dites.'
      },
      {
        id: 'q4-2',
        question: 'Quelle est la règle d’or pour un Call-To-Action (CTA) efficace à la fin d’une vidéo ?',
        options: [
          'Demander en même temps de liker, commenter, partager, s’abonner et cliquer en bio',
          'Ne donner qu’un seul appel à l’action clair et spécifique pour ne pas disperser l’attention',
          'Ne rien demander du tout pour rester modeste',
          'Menacer le spectateur s’il ne s’abonne pas'
        ],
        correctAnswer: 1,
        explanation: 'Quand vous demandez 4 choses à la fois, le spectateur n’en fait aucune. Choisissez UN SEUL objectif par vidéo.'
      },
      {
        id: 'q4-3',
        question: 'Quelle technique permet d’augmenter naturellement les réécoutes (rewatches) d’une vidéo ?',
        options: [
          'Le looping seamless (la fin de la phrase finale s’enchaîne parfaitement avec le début)',
          'Parler très vite sans respirer pour qu’on ne comprenne rien',
          'Écrire en texte microscopique illisible',
          'Mettre une musique assourdissante'
        ],
        correctAnswer: 0,
        explanation: 'La boucle invisible fait que la vidéo recommence avant que l’utilisateur ne s’en rende compte, faisant grimper la rétention à plus de 100%.'
      }
    ]
  },
  {
    id: 'quiz-module-7',
    courseId: 'module-7',
    title: 'Quiz de Validation — Monétisation & Business',
    description: 'Assurez-vous de maîtriser les mécanismes de revenus : affiliation, produits digitaux et partenariats.',
    passingScore: 70,
    questions: [
      {
        id: 'q7-1',
        question: 'Pourquoi vendre des produits numériques (PDF, templates, formations) est-il l’un des modèles les plus rentables ?',
        options: [
          'Parce qu’il n’y a aucun stock physique, pas de logistique de livraison et une marge brute proche de 95%',
          'Parce que TikTok paye une prime spéciale pour chaque PDF vendu',
          'Parce que vous n’avez pas besoin d’avoir de clients pour encaisser',
          'Parce que c’est obligatoire pour garder son compte créateur'
        ],
        correctAnswer: 0,
        explanation: 'Les produits digitaux offrent un effet de levier exceptionnel : vous produisez la ressource une fois et pouvez la commercialiser indéfiniment.'
      },
      {
        id: 'q7-2',
        question: 'Quelle est la condition minimale pour monétiser efficacement son compte TikTok ?',
        options: [
          'Avoir obligatoirement 1 million d’abonnés',
          'Avoir une audience ciblée, engagée et un mécanisme de conversion vers une offre adaptée (même avec 1 000 abonnés)',
          'Payer de la publicité tous les jours',
          'Être certifié avec un badge bleu'
        ],
        correctAnswer: 1,
        explanation: 'Même avec un compte de 1 000 ou 2 000 abonnés ultra-qualifiés dans une niche précise, on peut générer d’excellents revenus en vendant du service, coaching ou produits de niche.'
      }
    ]
  }
];
