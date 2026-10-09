// Basic Chat Bot Template - C++
// Created with Comprehensive Bot Builder

#include <iostream>
#include <string>
#include <vector>
#include <curl/curl.h>
#include <nlohmann/json.hpp>

// Callback function for curl
size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* response) {
    size_t totalSize = size * nmemb;
    response->append((char*)contents, totalSize);
    return totalSize;
}

class ChatBot {
private:
    std::string botToken;
    std::string apiBaseUrl;
    CURL* curl;

public:
    ChatBot(const std::string& token) : botToken(token) {
        apiBaseUrl = "https://discord.com/api/v10";
        curl_global_init(CURL_GLOBAL_DEFAULT);
        curl = curl_easy_init();
    }

    ~ChatBot() {
        if (curl) {
            curl_easy_cleanup(curl);
        }
        curl_global_cleanup();
    }

    void sendMessage(const std::string& channelId, const std::string& message) {
        if (!curl) return;

        std::string url = apiBaseUrl + "/channels/" + channelId + "/messages";
        std::string postData = "{"content":"" + message + ""}";

        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, ("Authorization: Bot " + botToken).c_str());
        headers = curl_slist_append(headers, "Content-Type: application/json");

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        CURLcode res = curl_easy_perform(curl);

        if (res != CURLE_OK) {
            std::cerr << "Failed to send message: " << curl_easy_strerror(res) << std::endl;
        }

        curl_slist_free_all(headers);
    }

    void handleMessage(const std::string& message) {
        std::cout << "Received: " << message << std::endl;

        // Simple command handling
        if (message == "!ping") {
            std::cout << "Sending: Pong! 🏓" << std::endl;
        } else if (message.find("!hello") == 0) {
            std::cout << "Sending: Hello! 👋" << std::endl;
        } else if (message == "!help") {
            std::cout << "Sending: Available commands: !ping, !hello, !help" << std::endl;
        }
    }
};

int main() {
    const char* token = std::getenv("BOT_TOKEN");
    if (!token) {
        std::cerr << "❌ BOT_TOKEN environment variable not set!" << std::endl;
        return 1;
    }

    ChatBot bot(token);

    std::cout << "🤖 C++ Chat Bot is running!" << std::endl;
    std::cout << "Bot Token: " << std::string(token).substr(0, 10) << "..." << std::endl;

    // Example usage
    bot.handleMessage("!ping");
    bot.handleMessage("!hello");
    bot.handleMessage("!help");

    return 0;
}