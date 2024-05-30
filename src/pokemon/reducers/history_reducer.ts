import { append } from "ramda";
import boardReducer, {
  initialState as INITIAL_BOARD_STATE,
} from "../board_slice";

const INITIAL_STATE = {
  currentBoard: INITIAL_BOARD_STATE,
  boards: [INITIAL_BOARD_STATE],
};

export default function historyReducer(state = INITIAL_STATE, action: any) {
  if (action.type.startsWith("board/")) {
    const newBoard = boardReducer(state.currentBoard, action);
    return {
      currentBoard: { ...newBoard, log: [] },
      boards: append(newBoard, state.boards),
    };
  } else {
    return state;
  }
}
