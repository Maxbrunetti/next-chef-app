export function convertArrayIntoKeyValue(
  ingredients: string[][]
): Record<string, Record<string, number>> {
  const result: Record<string, Record<string, number>> = {};

  for (const key in ingredients) {
    const ingredientKey = ingredients[key];
    const keyValuePairs: Record<string, number> = {};

    ingredientKey.forEach(value => {
      keyValuePairs[value] = 0;
    });

    result[key] = keyValuePairs;
  }

  return result;
}
