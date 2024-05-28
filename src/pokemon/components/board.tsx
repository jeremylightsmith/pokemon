import { BoardT, CardT } from "../types";

const DiscardPile = ({ cards }: { cards: CardT[] }) => (
  <div className="DiscardPile">
    <Card card={`discards (${cards.length})`} />
  </div>
);

const Deck = ({ cards }: { cards: CardT[] }) => (
  <div className="Deck">
    <Card card={`deck (${cards.length})`} />
  </div>
);

const Card = ({ card }: { card: String }) => {
  return (
    <div className="Card w-16 h-24 bg-white border border-gray-400">{card}</div>
  );
};

const PrizeCards = () => {
  return (
    <div className="PrizeCards">
      <div className="grid grid-rows-6 grid-flow-col h-24">
        <Card card="r1" />
        <Card card="r2" />
        <Card card="r3" />
        <Card card="r4" />
        <Card card="r5" />
        <Card card="r6" />
      </div>
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

const Hand = () => {
  return (
    <div className="Hand">
      <div className="text-left text-xs">Hand</div>
      <div className="Hand grid grid-rows-2 grid-flow-col gap-x-1 gap-y-1">
        <Card card="r1" />
        <Card card="r2" />
        <Card card="r3" />
        <Card card="r4" />
        <Card card="r5" />
        <Card card="r6" />
        <Card card="r7" />
      </div>
    </div>
  );
};
const Board = ({ board }: { board: BoardT }) => {
  const { you, me } = board;
  console.log("you", you);
  console.log("me", me);
  return (
    <div className="p-4 gap-4 flex flex-col">
      <div className="flex gap-8">
        <div className="flex gap-4">
          <div className="flex flex-col justify-between gap-4">
            <DiscardPile cards={[]} />
            <Deck cards={[]} />
          </div>
          <div className="flex flex-col justify-between">
            <Bench />
            <ActiveSpot />
          </div>
          <PrizeCards />
        </div>
        <Hand />
      </div>
      <hr />
      <div className="flex gap-8">
        <div className="flex gap-4">
          <PrizeCards />
          <div className="flex flex-col justify-between">
            <ActiveSpot />
            <Bench />
          </div>
          <div className="flex flex-col justify-between gap-4">
            <Deck cards={[]} />
            <DiscardPile cards={[]} />
          </div>
        </div>
        <Hand />
      </div>
    </div>
  );
};

export default Board;
