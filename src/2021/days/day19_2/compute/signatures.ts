export type Signature = [
  number | null,
  number | null,
  number | null,
  number | null,
  number | null,
  number | null
];

export function compare_signature(
  signature_1: Signature,
  signature_2: Signature
): boolean {
  return compare_values(
    {
      values: signature_1.filter((item): item is number => item !== null),
      tokens: signature_1.filter((item) => item === null).length,
    },
    {
      values: signature_2.filter((item): item is number => item !== null),
      tokens: signature_2.filter((item) => item === null).length,
    }
  );
}

function compare_values(
  list_1: {
    values: Array<number>;
    tokens: number;
  },
  list_2: {
    values: Array<number>;
    tokens: number;
  }
): boolean {
  if (list_1.tokens < 0) return false;
  if (list_2.tokens < 0) return false;
  if (
    list_1.values.length + list_1.tokens !==
    list_2.values.length + list_2.tokens
  )
    return false;
  if (list_1.values.length === 0) return true;
  if (list_2.values.length === 0) return true;

  const sorted_1 = list_1.values.sort((a, b) => a - b);
  const sorted_2 = list_2.values.sort((a, b) => a - b);
  if (sorted_1[0] === sorted_2[0])
    return compare_values(
      {
        values: sorted_1.slice(1),
        tokens: list_1.tokens,
      },
      {
        values: sorted_2.slice(1),
        tokens: list_2.tokens,
      }
    );
  if (sorted_1[0] < sorted_2[0])
    return compare_values(
      {
        values: sorted_1.slice(1),
        tokens: list_1.tokens,
      },
      {
        values: sorted_2,
        tokens: list_2.tokens - 1,
      }
    );
  return compare_values(
    {
      values: sorted_1,
      tokens: list_1.tokens - 1,
    },
    {
      values: sorted_2.slice(1),
      tokens: list_2.tokens,
    }
  );
}

// Tests

function tests() {
  // Tokens
  if (!compare_signature([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]))
    throw new Error(`Error test 1`);
  if (!compare_signature([1, 2, 3, 4, 5, 6], [6, null, 4, 3, 2, 1]))
    throw new Error(`Error test 2`);
  if (!compare_signature([1, 2, null, 4, 5, 6], [6, null, 4, 3, 2, 1]))
    throw new Error(`Error test 3`);
  if (
    !compare_signature([1, 2, 3, 4, 5, 6], [null, null, null, null, null, null])
  )
    throw new Error(`Error test 4`);
  if (compare_signature([1, 2, 3, 4, 5, 6], [null, 7, null, null, null, null]))
    throw new Error(`Error test 5`);
}
