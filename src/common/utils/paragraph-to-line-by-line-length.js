export const ParagraphToLineByLineLength = (characterImps, lineLength) => {
  const lines = [];
  let currentLine = [];

  characterImps.forEach((characterImp, index) => {
    currentLine.push(characterImp);

    if (characterImp.character === " " && currentLine.length == lineLength) {
      lines.push(currentLine);
      currentLine = [];
    } else if (
      currentLine.length === lineLength &&
      characterImp.character != " "
    ) {
      const lastSpaceIndex = currentLine
        .map((charImp) => charImp.character)
        .lastIndexOf(" ");
      if (lastSpaceIndex !== -1) {
        const nextLineStartingIndex = lastSpaceIndex + 1;
        const nextLine = currentLine.splice(nextLineStartingIndex);
        lines.push(currentLine);
        currentLine = nextLine;
      } else {
        lines.push(currentLine);
        currentLine = [characterImp];
      }
    }

    if (index === characterImps.length - 1) {
      lines.push(currentLine);
    }
  });
  return lines;
};
