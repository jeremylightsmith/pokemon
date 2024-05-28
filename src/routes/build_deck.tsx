import { configureStore } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import reducer, {
  addCard,
  removeCard,
  saveDeck,
  loadDeck,
} from "../deck/deck_slice";
import { findCards } from "../pokemon/card_api";
import { CardT } from "../pokemon/types";
import { Button } from "../components/core_components";

interface CardProps {
  card: CardT;
  index: number;
  showAdd?: boolean;
  showRemove?: boolean;
}
const Card: React.FC<CardProps> = ({ card, index, ...props }) => {
  const dispatch = useDispatch();

  return (
    <div className="Card relative group">
      <img className="w-48" src={card.images.small} alt={card.name} />
      <div className="absolute bottom-2 right-2 invisible group-hover:visible">
        {props.showAdd && (
          <Button onClick={() => dispatch(addCard(card))} text="Add" />
        )}
        {props.showRemove && (
          <Button onClick={() => dispatch(removeCard(index))} text="Remove" />
        )}
      </div>
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
        {results.map((result, index) => (
          <Card card={result} key={index} index={index} showAdd />
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
      <div className="flex justify-between mb-2">
        <div>Deck ({cards.length})</div>
        <div>
          <Button primary onClick={() => dispatch(saveDeck())} text="Save" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {cards.map((card: any, index: number) => (
          <Card card={card} key={index} index={index} showRemove />
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
