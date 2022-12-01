export type InputModel = {
  vertices: Array<{
    name: string;
    type: `big` | `small`;
  }>;
  edges: Array<{
    start: string;
    end: string;
  }>;
};
