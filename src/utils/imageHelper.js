export const getFullImageUrl = (path) => {
  if (!path) return "";
  // Si le path est déjà une URL complète (ex: via un CDN), on le laisse tel quel
  if (path.startsWith('http')) return path;
  
  const baseURL = import.meta.env.VITE_API_URL;
  return `${baseURL}${path}`;
};