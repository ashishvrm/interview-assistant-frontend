import WebSocket from 'isomorphic-ws';

let socket: WebSocket | null = null;

export const connectWebSocket = (onMessage: (message: string) => void) => {
  socket = new WebSocket('ws://localhost:3001'); // Point to your backend WebSocket server

  socket.onopen = () => {
    console.log('WebSocket connection established.');
  };

  socket.onmessage = (event: MessageEvent) => {  // Explicitly type the event as MessageEvent
    console.log('Received message from server:', event.data);
    onMessage(event.data as string);  // Cast data to string explicitly
  };

  socket.onerror = (error: Event) => {  // Explicitly type the error as Event
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed.');
  };
};

export const sendMessage = (message: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.error('WebSocket connection is not open.');
  }
};
