import { Bot } from "lucide-react";

export default function HowToInviteCard() {
  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        How to invite the bot
      </h2>

      <div className="bg-base-300 rounded-2xl p-6">
        <p className="text-sm text-base-content/70 mb-7">
          You must grant the &quot;Administrator&quot; permission so the bot
          can configure your server. If you&apos;re not comfortable with this,
          you can remove the bot after using it.
        </p>

        <a
          href="https://discord.com/oauth2/authorize?client_id=1332423617761509398&permissions=8&integration_type=0&scope=bot"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-full sm:w-auto"
        >
          <Bot className="w-4 h-4" />
          Invite Discly
        </a>
      </div>
    </div>
  );
}
