export interface GlobalState {
  readonly antibiotic1?: number;
}

const INITIAL_STATE = {
  antibiotic1: undefined
};

export function global(
  state: GlobalState = INITIAL_STATE,
  _: any
): GlobalState {
  return state;
}
