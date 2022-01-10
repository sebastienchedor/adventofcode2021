export type InputModel = {
  state: Array<Array<boolean>>;
  instructions: Array<{
    axe: `x` | `y`;
    value: number;
  }>;
};
