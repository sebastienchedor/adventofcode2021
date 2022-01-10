import { InputModel } from "../models/InputModel";

type Visited = Map<string, boolean>;

export function compute(input: InputModel): number {
  return countPaths(new Map<string, boolean>(), input, `start`);
}

function countPaths(
  currentState: Visited,
  graph: InputModel,
  current_vertex: string
): number {
  if (current_vertex === `end`) return 1;
  const current_size = graph.vertices.filter(
    (vertex) => vertex.name === current_vertex
  )[0].type;
  if (currentState.get(current_vertex) === true && current_size === `small`)
    return 0;

  return graph.edges
    .filter((edge) => edge.start === current_vertex)
    .reduce((acc, edge) => {
      const newState = new Map<string, boolean>();
      Array.from(currentState.entries()).forEach((entry) => {
        if (entry[1] === true) {
          newState.set(entry[0], true);
        }
      });
      newState.set(edge.start, true);
      return acc + countPaths(newState, graph, edge.end);
    }, 0);
}
