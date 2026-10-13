# MeowSMS Mini — Netlify Demo

This is a static frontend demo intended for Netlify. It has sample services, sample orders, a demo wallet, promo code `DEMO10`, and mobile/Telegram Mini App-friendly navigation.

## Deploy
1. Download and extract the ZIP.
2. Open Netlify and choose **Add new site → Deploy manually** (or drag the extracted folder into the deploy area).
3. Upload the folder contents; `index.html` must be at the site root.
4. Open the generated HTTPS URL to preview.
5. To open inside Telegram, configure your bot's Mini App URL to the Netlify HTTPS URL using BotFather.

## Demo limitations
- No PHP, MySQL, server-side admin panel, real wallet, real payments, real number purchases, or real OTPs.
- Data is held in browser memory and resets on refresh.
- To make it fully working later, connect a PHP/MySQL backend on PHP hosting or a suitable API backend. Netlify static hosting cannot run PHP/MySQL directly.
- Do not enter real payment credentials or provider secrets into frontend JavaScript.
