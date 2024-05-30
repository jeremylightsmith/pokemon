import React from "react";
import { useSelector } from "react-redux";
import type { BoardT, AllBoardsT } from "../types";

import Board from "./board";
import { reverse } from "ramda";

const HistoryLink: React.FC<{ board: BoardT }> = ({ board }) => {
  // const toString = (move: MoveT | undefined) => {
  //   if (!move) return "initial board";
  //   switch (move.type) {
  //     case "play":
  //       return `P${move.player}: play ${move.card}`;
  //     case "discard":
  //       return `P${move.player}: discard ${move.card}`;
  //     case "hint":
  //       return `P${move.player}: hint}`;
  //   }
  // };

  return (
    <div className="bg-white text-black rounded px-1 mb-2">
      {board.log.map((move, i) => (
        <div key={i}>
          {move.player}: {move.move}
        </div>
      ))}
    </div>
  );
};

const BoardHistory: React.FC = () => {
  const currentBoard = useSelector((state: AllBoardsT) => state.currentBoard);
  const boards = useSelector((state: AllBoardsT) => state.boards);

  return (
    <div className="BoardHistory flex">
      <div className="board-container flex-auto overflow-auto">
        <Board board={currentBoard} />
      </div>

      <div className="bg-red-800 w-60 flex-none py-1 px-2">
        <div className="text-white pb-1">History</div>
        {reverse(boards).map((board, i) => (
          <HistoryLink key={i} board={board} />
        ))}
      </div>
    </div>
  );
};

export default BoardHistory;
