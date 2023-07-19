export const ParagraphToCharacterArrayConversion = (text) => {
  const characters = text.split("");
  return characters.map((character) => ({
    character: character,
    state: "NOT_TYPED",
  }));
};
