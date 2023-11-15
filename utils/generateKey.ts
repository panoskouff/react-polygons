export const generateKey = (userId: string, sessionId: string) =>
  `${userId}-${sessionId}-${Date.now()}-${Math.random()}`;
