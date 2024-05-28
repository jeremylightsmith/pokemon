import { BoardT, CardT, ColorT, PlayerT } from "../types";

import "./board.css";

const DiscardPile = ({ cards }: { cards: CardT[] }) => (
  <div className="DiscardPile">
    <Card card="discards" />
  </div>
);

const Deck = ({ cards }: { cards: CardT[] }) => (
  <div className="Deck">
    <Card card="deck" />
  </div>
);

const Card = ({ card }: { card: String }) => {
  return (
    <div className="Card w-16 h-24 bg-white border border-gray-400">{card}</div>
  );
};

const PrizeCards = () => {
  return (
    <div className="PrizeCards grid grid-rows-3 grid-flow-col gap-1">
      <Card card="r1" />
      <Card card="r2" />
      <Card card="r3" />
      <Card card="r4" />
      <Card card="r5" />
      <Card card="r6" />
    </div>
  );
};

const ActiveSpot = () => {
  return (
    <div className="ActiveSpot justify-center flex">
      <Card card="active" />
    </div>
  );
};

const Bench = () => {
  return (
    <div className="Bench grid grid-rows-1 grid-flow-col gap-1">
      <Card card="r1" />
      <Card card="r2" />
      <Card card="r3" />
      <Card card="r4" />
      <Card card="r5" />
    </div>
  );
};

const PokeBoard = ({ board }: { board: BoardT }) => {
  return (
    <div className="border border-green-500 flex gap-4">
      <PrizeCards />
      <div className="flex flex-col justify-between">
        <ActiveSpot />
        <Bench />
      </div>
      <div className="flex flex-col justify-between">
        <Deck cards={[]} />
        <DiscardPile cards={[]} />
      </div>
    </div>
  );
};

export default PokeBoard;
