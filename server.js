const socket = new WebSocket('ws://localhost:8765');

// Reconnection logic
socket.addEventListener('close', () => {
    console.warn('WebSocket closed. Attempting to reconnect...');
    setTimeout(() => {
        window.location.reload();
    }, 3000); // Wait 3 seconds before reloading
});

socket.addEventListener('error', (err) => {
    console.error('WebSocket error:', err);
});

socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
});

socket.addEventListener('message', (event) => {
    try {
        const message = JSON.parse(event.data);
        handleIncomingMessage(message);
    } catch (err) {
        console.error('Failed to process message:', err);
    }
});

// Send a message
function sendMessage(type, data) {
    const message = { type, data };
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not open');
    }
}
