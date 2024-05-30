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

  const data = fetchNoCache(url);

  // Cache the response
  localStorage.setItem(cacheKey, JSON.stringify(data));
  localStorage.setItem(
    cacheExpiryKey,
    (new Date().getTime() + 5 * 60 * 1000).toString(),
  ); // Cache for 5 minutes

  return data;
};

export const fetchNoCache = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

const cardFields = [
  "id",
  "name",
  "supertype",
  "subtypes",
  "hp",
  "types",
  "evolvesTo",
  "abilities",
  "attacks",
  "weaknesses",
  "resistances",
  "retreatCost",
  "convertedRetreatCost",
  "images",
];
export const findCards = async (searchTerm: string) => {
  return fetchNoCache(
    `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}*&select=${cardFields.join(",")}`,
  );
};
