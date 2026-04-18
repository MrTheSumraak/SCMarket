export const AuthData = {
  urlAuth: 'https://exbo.net/oauth/authorize',
  clientId: '1362',
  redirectUri: 'http://localhost:5173/code',
  response_type: 'code',
  state: crypto.randomUUID(),
  secretCode: "asCsLzMqvvrzsnIFRQXITmA0rthqtAEnjIke0Dej"
};

//Перенести secret code в env