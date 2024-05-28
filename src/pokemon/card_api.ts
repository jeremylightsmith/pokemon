export const fetchWithCache = async (url: string) => {
  const cacheKey = `cache_${url}`;
  const cacheExpiryKey = `cache_expiry_${url}`;

  // Check if there's a cached response and it's still valid
  const cachedData = localStorage.getItem(cacheKey);
  const cacheExpiry = localStorage.getItem(cacheExpiryKey);

  if (
    cachedData &&
    cacheExpiry &&
    new Date().getTime() < parseInt(cacheExpiry, 10)
  ) {
    return JSON.parse(cachedData);
  }

  // If no cached data or cache is expired, fetch from the network
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  // Cache the response
  localStorage.setItem(cacheKey, JSON.stringify(data));
  localStorage.setItem(
    cacheExpiryKey,
    (new Date().getTime() + 5 * 60 * 1000).toString(),
  ); // Cache for 5 minutes

  return data;
};

export const findCards = async (searchTerm: string) => {
  return fetchWithCache(
    `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}*&select=id,name,images`,
  );
};
