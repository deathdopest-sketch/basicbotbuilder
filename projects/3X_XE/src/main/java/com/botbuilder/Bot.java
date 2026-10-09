// Basic Chat Bot Template - Java
// Created with Comprehensive Bot Builder

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.requests.GatewayIntent;

import javax.security.auth.login.LoginException;

public class Bot extends ListenerAdapter {
    private static final String TOKEN = System.getenv("BOT_TOKEN");
    private static final String PREFIX = "!";

    public static void main(String[] args) throws LoginException {
        if (TOKEN == null || TOKEN.isEmpty()) {
            System.err.println("❌ BOT_TOKEN environment variable not set!");
            System.exit(1);
        }

        JDA jda = JDABuilder.createDefault(TOKEN)
                .enableIntents(GatewayIntent.MESSAGE_CONTENT)
                .addEventListeners(new Bot())
                .build();

        try {
            jda.awaitReady();
            System.out.println("🤖 Bot is online!");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        Message message = event.getMessage();
        String content = message.getContentRaw();

        // Ignore bot messages
        if (message.getAuthor().isBot()) return;

        // Check for command prefix
        if (!content.startsWith(PREFIX)) return;

        String[] parts = content.substring(PREFIX.length()).trim().split("\s+");
        String command = parts[0].toLowerCase();

        // Handle commands
        switch (command) {
            case "ping":
                message.reply("Pong! 🏓").queue();
                break;
            case "hello":
                message.reply("Hello " + message.getAuthor().getName() + "! 👋").queue();
                break;
            case "help":
                message.reply("Available commands: !ping, !hello, !help").queue();
                break;
            default:
                message.reply("Unknown command. Use !help for available commands.").queue();
        }
    }
}