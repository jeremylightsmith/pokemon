import React from "react";
import { findCards } from "../pokemon/card_api";
import { useEffect, useState } from "react";

const Card: React.FC<{ card: any }> = ({ card }) => {
  return (
    <div className="Card">
      <img src={card.images.small} alt={card.name} />
    </div>
  );
};

const BuildDeck: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await findCards(searchTerm);
        setResults(response.data); // Adjust according to the structure of your API response
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else setError("An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchData();
    }, 500); // Debounce to avoid making too many requests

    return () => clearTimeout(debounceFetch); // Cleanup on unmount or searchTerm change
  }, [searchTerm]);

  return (
    <div>
      <h1>Build Deck</h1>

      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="flex gap-2 flex-wrap">
        {results.map((result, _index) => (
          <Card card={result} key={result.id} />
        ))}
      </div>
    </div>
  );
};

export default BuildDeck;
