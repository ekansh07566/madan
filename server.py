import asyncio
import websockets

connected_clients = set()

async def handler(websocket, path):
    # Register client
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            # Broadcast received messages to all clients
            for client in connected_clients:
                if client != websocket:
                    await client.send(message)
    except websockets.exceptions.ConnectionClosed:
        print("Connection closed")
    finally:
        # Unregister client
        connected_clients.remove(websocket)

# Start the server
async def main():
    async with websockets.serve(handler, "localhost", 8765):
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except OSError as e:
        print(f"Failed to start server: {e}")
