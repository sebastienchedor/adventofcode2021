import { InputModel } from "../models/InputModel";

const charCodeA = `A`.charCodeAt(0);
const charCodeZ = `Z`.charCodeAt(0);

export function parse_entry(entry: string): InputModel {
  const response: InputModel = {
    vertices: [],
    edges: [],
  };

  entry.split(`\n`).forEach((line) => {
    const parts = line.split(`-`);
    response.edges.push({
      start: parts[0],
      end: parts[1],
    });
    response.edges.push({
      start: parts[1],
      end: parts[0],
    });

    const vertex1 = extractVertex(parts[0]);
    const vertex2 = extractVertex(parts[1]);
    if (!isExtracted(response.vertices, vertex1))
      response.vertices.push(vertex1);
    if (!isExtracted(response.vertices, vertex2))
      response.vertices.push(vertex2);
  });

  return response;
}

function extractVertex(value: string): InputModel[`vertices`][number] {
  const currentCharCode = value.charCodeAt(0);
  return {
    name: value,
    type:
      charCodeA <= currentCharCode && currentCharCode <= charCodeZ
        ? `big`
        : `small`,
  };
}

function isExtracted(
  vertices: InputModel[`vertices`],
  vertex: InputModel[`vertices`][number]
): boolean {
  for (const current_vertex of vertices) {
    if (current_vertex.name === vertex.name) return true;
  }
  return false;
}
