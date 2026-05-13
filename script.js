document.addEventListener('DOMContentLoaded', function() {
    // Update footer year dynamically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- IRC Chat Feature ---
    // Integrating a fully functional IRC client directly into a static HTML page
    // without a server-side component is not straightforward.
    //
    // Option 1: Embed a third-party web IRC client service (Recommended for simplicity)
    // Many services allow you to embed their chat client via an iframe or JavaScript widget.
    // You'll need to find a service that supports this and configure it for your IRC server/channel.
    //
    // Example using an iframe (replace with actual service URL):
    const ircContainer = document.getElementById('irc-container');
    if (ircContainer) {
        // *** IMPORTANT ***
        // Replace this URL with the actual embed code or URL from a web IRC client provider.
        // Search for "web irc client embed" or "online irc client" to find services.
        // Some popular options might include:
        // - https://kiwiirc.com/ (offers embeddable clients)
        // - Or other dedicated web IRC platforms.
        const embedUrl = 'https://kiwiirc.com/client/irc.libera.chat/#your-channel-name'; // Example, replace with your IRC server and channel
        ircContainer.innerHTML = `
            <iframe
                src="${embedUrl}"
                style="width: 100%; height: 400px; border: none;"
                title="IRC Chat">
                Your browser does not support iframes. You can visit our IRC channel directly at <a href="${embedUrl}">${embedUrl}</a>.
            </iframe>
        `;
        // If the service provides a JS widget, you'd use that instead of an iframe.
    }

    // Option 2: Build a custom IRC client (Highly complex, requires server-side)
    // This involves using WebSockets or a Node.js server to connect to an IRC server,
    // parse IRC protocol messages, and render them in your HTML. This is beyond
    // a simple HTML/CSS/JS-only solution for a beginner.
    //
    // For a 60yo male who loves tech and a good chat, embedding a pre-built client
    // is the most practical approach. You can guide users to connect to your
    // chosen IRC server and channel.

    console.log("Website loaded. Welcome!");
});
