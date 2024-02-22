export const toBearerToken = (token: string) => (token.startsWith("Bearer ") ? token : `Bearer ${token.trim()}`);
