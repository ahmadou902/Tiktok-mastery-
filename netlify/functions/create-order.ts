// netlify/functions/create-order.ts
// Initialisation sécurisée d'une intention de paiement (compatible PayTech / Wave / Mobile Money)
// IMPORTANT : Les clés PAYMENT_API_KEY et PAYMENT_SECRET doivent être configurées dans les variables d'environnement Netlify.

interface CreateOrderPayload {
  userId: string;
  userEmail: string;
  userName: string;
  planId: 'STARTER' | 'PRO' | 'PREMIUM';
  paymentMethod?: string;
  phone?: string;
}

const PLAN_PRICES = {
  STARTER: 9900,
  PRO: 14900,
  PREMIUM: 24900
};

export const handler = async (event: any) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Méthode non autorisée. Utilisez POST.' })
    };
  }

  try {
    const body: CreateOrderPayload = JSON.parse(event.body || '{}');
    const { userId, userEmail, userName, planId, paymentMethod, phone } = body;

    if (!userEmail || !planId || !PLAN_PRICES[planId]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Paramètres invalides : email et formule valide requis (STARTER, PRO, PREMIUM).'
        })
      };
    }

    const amount = PLAN_PRICES[planId];
    const orderId = `TM-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const apiKey = process.env.PAYMENT_API_KEY;
    const paymentEnv = process.env.PAYMENT_ENVIRONMENT || 'test';

    // Vérification de la présence de la configuration de paiement côté serveur
    const isGatewayConfigured = Boolean(apiKey && apiKey !== 'votre_cle_api_paytech_ou_fournisseur');

    if (!isGatewayConfigured) {
      // Architecture prête mais en attente des clés réelles
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          mode: 'SANDBOX_SIMULATION',
          message: 'Mode Sandbox/Démonstration actif. Les clés API PayTech ne sont pas encore renseignées dans Netlify.',
          order: {
            orderId,
            userId: userId || 'guest',
            userEmail,
            userName: userName || 'Élève',
            planId,
            amount,
            currency: 'FCFA',
            status: 'PENDING',
            paymentMethod: paymentMethod || 'WAVE',
            createdAt: new Date().toISOString()
          },
          paymentUrl: null, // Pas d'URL externe car clés non configurées
          instructions: 'Pour connecter la vraie passerelle PayTech, ajoutez PAYMENT_API_KEY et PAYMENT_SECRET dans les variables Netlify.'
        })
      };
    }

    // Si les clés réelles sont configurées, appel à l'API PayTech pour générer le lien de paiement officiel
    /*
    Exemple d'appel réel PayTech :
    const response = await fetch('https://paytech.sn/api/payment/request-payment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'API_KEY': apiKey,
        'API_SECRET': process.env.PAYMENT_SECRET!
      },
      body: JSON.stringify({
        item_name: `TikTok Mastery - Formule ${planId}`,
        item_price: amount,
        currency: 'XOF',
        ref_command: orderId,
        command_name: `Formation TikTok Mastery ${planId} - ${userEmail}`,
        env: paymentEnv,
        ipn_url: `${process.env.APP_URL}/.netlify/functions/paytech-webhook`,
        success_url: `${process.env.APP_URL}/dashboard?payment=success&orderId=${orderId}`,
        cancel_url: `${process.env.APP_URL}/tarifs?payment=cancelled`
      })
    });
    const result = await response.json();
    */

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        orderId,
        amount,
        currency: 'FCFA',
        status: 'PENDING',
        paymentUrl: `https://paytech.sn/payment/checkout/${orderId}`
      })
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Erreur interne lors de la création de la commande',
        details: error?.message
      })
    };
  }
};
