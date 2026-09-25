import { useEffect } from "react";

export default function BotpressChat() {
  useEffect(() => {
    const inject = document.createElement("script");
    inject.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
    inject.async = true;

    inject.onload = () => {
      const bot = document.createElement("script");
      bot.src =
        "https://files.bpcontent.cloud/2026/06/29/15/20260629155104-NYQ6XFHJ.js";
      bot.defer = true;

      document.body.appendChild(bot);
    };

    document.body.appendChild(inject);

    return () => {
      document
        .querySelectorAll(
          'script[src*="botpress"], script[src*="bpcontent"]'
        )
        .forEach((script) => script.remove());
    };
  }, []);

  return null;
}