import React from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import type { BoardT, AllBoardsT, MoveT } from "../types";

import Board from "./board";

const HistoryLink: React.FC<{ board: BoardT; index: number }> = ({
  board,
  index: _,
}) => {
  const toString = (move: MoveT | undefined) => {
    if (!move) return "initial board";
    switch (move.type) {
      case "play":
        return `P${move.player}: play ${move.card}`;
      case "discard":
        return `P${move.player}: discard ${move.card}`;
      case "hint":
        return `P${move.player}: hint}`;
    }
  };

  return (
    <div className="bg-white text-black rounded px-1 mb-2">
      {toString(board.lastMove)}
    </div>
  );
};

const BoardHistory: React.FC = () => {
  const useTypedSelector: TypedUseSelectorHook<AllBoardsT> = useSelector;

  const { currentBoard, boards } = useTypedSelector((state) => state);

  return (
    <div className="BoardHistory flex">
      <div className="board-container flex-auto overflow-auto">
        <Board board={currentBoard} />
      </div>

      <div className="bg-red-800 w-60 flex-none py-1 px-2">
        <div className="text-white pb-1">History</div>
        {boards.map((board, i) => (
          <HistoryLink key={i} board={board} index={i} />
        ))}
      </div>
    </div>
  );
};

export default BoardHistory;
