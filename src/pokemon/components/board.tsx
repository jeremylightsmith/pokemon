import { useDispatch } from "react-redux";
import { Button } from "../../components/core_components";
import { BoardT, CardT } from "../types";
import { startGame, advance } from "../board_slice";
import cardBackImage from "../../assets/back-small.png";

const DiscardPile: React.FC<CardsProps> = ({ cards }) => (
  <div className="DiscardPile">
    <Card card={`discards (${cards.length})`} />
  </div>
);

const offsets = [
  "top-0 left-0",
  "top-1 left-1 -z-1",
  "top-2 left-2 -z-2",
  "top-3 left-3 -z-3",
  "top-4 left-4 -z-4",
];
const Deck: React.FC<CardsProps> = ({ cards }) => (
  <div className="Deck relative w-36 h-48">
    {cards.length === 0 ? (
      <Card card="deck" />
    ) : (
      cards.map((card, i) => (
        <Card
          card={card}
          key={i}
          flipped
          className={`absolute ${offsets[Math.min(i, 4)]}`}
        />
      ))
    )}
  </div>
);
interface CardProps {
  card: CardT | string;
  flipped?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({ card, ...props }) => {
  let classes = "Card w-32 h-44 text-black bg-white border border-gray-400";
  if (props.className) classes += ` ${props.className}`;
  if (props.flipped) {
    return (
      <div className={classes}>
        <img src={cardBackImage} className="w-full" />
      </div>
    );
  } else if (typeof card === "string") {
    return (
      <div className={classes}>
        <div className="w-full p-4 text-center">{card}</div>
      </div>
    );
  } else {
    return (
      <div className={classes}>
        <img src={card.images.small} className="w-full" />
      </div>
    );
  }
};

// const CardOrPlaceholder = ({ card }: { card?: CardT }) => {
//   if (card) {
//     return <Card card={card} />;
//   } else {
//     return <Card card="?" />;
//   }
// };

interface CardsProps {
  cards: CardT[];
}

const PrizeCards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className="PrizeCards">
      <div className="grid grid-rows-6 grid-flow-col h-56">
        {cards.map((card, i) => (
          <Card card={card} key={i} flipped />
        ))}
      </div>
    </div>
  );
};

interface ActiveSpotProps {
  turn: string | undefined;
}
const ActiveSpot: React.FC<ActiveSpotProps> = ({ turn }) => {
  return (
    <div className="ActiveSpot relative justify-center flex">
      {turn && <div className="absolute top-0 left-0">{turn}</div>}
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

const Hand: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className="Hand">
      <div className="text-left text-xs">Hand</div>
      <div className="Hand grid grid-rows-2 grid-flow-col gap-x-1 gap-y-1">
        {cards.map((card, i) => (
          <Card card={card} key={i} />
        ))}
      </div>
    </div>
  );
};
const Board = ({ board }: { board: BoardT }) => {
  const { you, me } = board;
  const myTurn = board.currentPlayer == "me";
  const yourTurn = board.currentPlayer == "you";
  const dispatch = useDispatch();

  return (
    <div className="p-4 gap-4 flex flex-col">
      <div className="flex justify-between">
        <h1>Play!</h1>
        <div className="flex gap-4">
          <Button onClick={() => dispatch(startGame())} text="Start" />
          <Button onClick={() => dispatch(advance())} text="Advance" />
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex gap-4">
          <div className="flex flex-col justify-between gap-4">
            <DiscardPile cards={[]} />
            <Deck cards={you.deck} />
          </div>
          <div className="flex flex-col justify-between">
            <Bench />
            <ActiveSpot turn={yourTurn ? "Your turn" : undefined} />
          </div>
          <PrizeCards cards={you.prizeCards} />
        </div>
        <Hand cards={you.hand} />
      </div>
      <hr />
      <div className="flex gap-8">
        <div className="flex gap-4">
          <PrizeCards cards={me.prizeCards} />
          <div className="flex flex-col justify-between">
            <ActiveSpot turn={myTurn ? "My turn" : undefined} />
            <Bench />
          </div>
          <div className="flex flex-col justify-between gap-4">
            <Deck cards={me.deck} />
            <DiscardPile cards={[]} />
          </div>
        </div>
        <Hand cards={me.hand} />
      </div>
    </div>
  );
};

export default Board;
