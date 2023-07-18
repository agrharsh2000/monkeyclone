export function getCssClassForCharacter(character) {
  switch (character.state) {
    case "NOT_TYPED":
      return "";

    case "CORRECT":
      return "correct";

    case "INCORRECT":
      return "incorrect";
  }
}
