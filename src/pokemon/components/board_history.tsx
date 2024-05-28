import React, { PureComponent } from "react";
import { useSelector } from "react-redux";
import type { BoardT } from "../types";

import Board from "./board";

import "./board_history.css";

const HistoryLink = ({ board, index }: { board: BoardT; index: number }) => {
  const toString = (move) => {
    if (!move) return "initial board";
    switch (move.type) {
      case "play":
        return `P${move.player}: play ${move.card}`;
      case "discard":
        return `P${move.player}: discard ${move.card}`;
      case "hint":
        return `P${move.player}: hint ${JSON.stringify(move.hint)}`;
    }
  };

  return <div className="history-link">{toString(board.lastMove)}</div>;
};

const BoardHistory: React.FC = () => {
  const { currentBoard, boards } = useSelector((state: any) => state);

  return (
    <div className="board-history">
      <div className="board-container">
        <Board board={currentBoard} />
      </div>

      <div className="history-container">
        <div className="history">
          {boards.map((board, i) => (
            <HistoryLink key={i} board={board} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardHistory;
