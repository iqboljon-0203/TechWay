/**
 * Telegram Notification Utility
 * Sends data to a specified Telegram Chat/Group via Bot API.
 */

export async function sendTelegramNotification(data: {
  name: string;
  service: string;
  phone?: string;
  message: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[Telegram] Skipping notification: Missing token or chatId env vars.');
    return;
  }

  const text = `
🆕 *Yangi murojaat!*

👤 *Ism:* ${data.name}
🛠 *Xizmat:* ${data.service}
📞 *Telefon:* ${data.phone || 'Ko\'rsatilmadi'}
💬 *Xabar:*
${data.message}

---
🌐 _TechWay IT Solutions_
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Telegram] API Error:', errorData);
    } else {
      console.log('[Telegram] Notification sent successfully.');
    }
  } catch (err) {
    console.error('[Telegram] Unexpected error:', err);
  }
}
