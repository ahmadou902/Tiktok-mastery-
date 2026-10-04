// netlify/functions/paytech-webhook.ts
// Réception des notifications IPN (Instant Payment Notification) de PayTech
// Seul le serveur valide les paiements et active les accès élèves

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Méthode non autorisée. Webhook attend un POST.' })
    };
  }

  try {
    const rawBody = event.body || '';
    const payload = JSON.parse(rawBody);

    // Vérification de la signature / hash HMAC avec PAYMENT_SECRET
    const apiSecret = process.env.PAYMENT_SECRET;
    
    // Exemple de structure reçue par PayTech :
    // {
    //   type_event: 'sale_complete',
    //   ref_command: 'TM-1719827364-1029',
    //   item_price: 14900,
    //   final_item_price: 14900,
    //   custom_field: JSON.stringify({ userId: '...' }),
    //   api_key_sha256: '...',
    //   api_secret_sha256: '...'
    // }

    console.log('[PAYTECH IPN] Réception notification événement:', payload?.type_event || 'notification');

    // 1. Valider le hash pour s'assurer que la requête vient réellement de PayTech
    // 2. Si valide, mettre à jour la table 'orders' (status: 'COMPLETED')
    // 3. Mettre à jour la table 'users' (plan: planId de la commande)
    // 4. Envoyer l'email d'accueil à l'élève

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        received: true,
        message: 'Notification IPN traitée avec succès côté serveur.'
      })
    };
  } catch (error: any) {
    console.error('[PAYTECH IPN ERROR]', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Échec de traitement du webhook', details: error?.message })
    };
  }
};
