import { configureStore } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import reducer, { addCard, saveDeck, loadDeck } from "../deck/deck_slice";
import { findCards } from "../pokemon/card_api";

const Card: React.FC<{ card: any }> = ({ card }) => {
  const dispatch = useDispatch();

  return (
    <div className="Card" onClick={() => dispatch(addCard(card))}>
      <img className="w-48" src={card.images.small} alt={card.name} />
    </div>
  );
};

const CardSearcher: React.FC = () => {
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
      <div className="flex gap-2 pb-4 content-center">
        <div className="mt-1">Search</div>
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded py-1 px-2"
        />
      </div>

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

const Deck: React.FC = () => {
  const cards = useSelector((state: any) => state.openDeck);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex justify-between">
        <div>Deck ({cards.length})</div>
        <div>
          <button
            onClick={() => dispatch(saveDeck())}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {cards.map((card: any, index: number) => (
          <Card card={card} key={index} />
        ))}
      </div>
    </div>
  );
};

const BuildDeck: React.FC = () => {
  const store = configureStore({
    reducer: reducer,
  });
  store.dispatch(loadDeck());
  return (
    <Provider store={store}>
      <div className="flex">
        <div className="w-1/2 py-2 px-4">
          <Deck />
        </div>
        <div className="w-1/2 bg-gray-200 py-2 px-4">
          <CardSearcher />
        </div>
      </div>
    </Provider>
  );
};

export default BuildDeck;
