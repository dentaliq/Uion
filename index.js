export default {
  async fetch(request, env, ctx) {
    const BOT_TOKEN = env.BOT_TOKEN;   // التوكن محفوظ كـ Secret في Cloudflare
    const CHAT_ID  = env.CHAT_ID;      // الشات ID محفوظ كـ Secret

    const url = new URL(request.url);

    // رابط تجربة سريع: /send?text=مرحبا
    if (url.pathname === "/send") {
      const text = url.searchParams.get("text") || "Hello from Cloudflare Worker!";
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text })
      });
      return new Response("تم الإرسال بنجاح");
    }

    // افتراضي
    return new Response("Worker يعمل بشكل صحيح");
  }
}