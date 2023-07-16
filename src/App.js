import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function getCssClassForCharacter(character) {
  switch (character.state) {
    case "NOT_TYPED":
      return "";

    case "CORRECT":
      return "correct";

    case "INCORRECT":
      return "incorrect";
  }
}

const ParagraphToLineByLineLength = (characterImps, lineLength) => {
  const lines = [];
  let currentLine = [];
  characterImps.forEach((characterImp, index) => {
    currentLine.push(characterImp);

    if (
      currentLine.length === lineLength ||
      index === characterImps.length - 1
    ) {
      lines.push(currentLine);
      currentLine = [];
    }
  });
  return lines;
};

const ParagraphToCharacterArrayConversion = (text) => {
  const characters = text.split("");
  return characters.map((character) => ({
    character: character,
    state: "NOT_TYPED",
  }));
};

function App() {
  let data =
    "the sign made it clear that they didnt want anyone around That wasnt going to stop Jack Jack always lived with the notion that signs were mere suggestions not actually absolute rules Thats why the moment Jack looked at ";

  const [globalIndex, setGlobalIndex] = useState(0);

  const [characterArray, setCharacterArray] = useState(
    ParagraphToCharacterArrayConversion(data)
  );

  const trigger = useRef({ key: "", index: 0 });

  function handleKeyboardEvent(key, index) {
    let newCharacterState;
    if (characterArray[index].character === key) {
      newCharacterState = "CORRECT";
    } else {
      newCharacterState = "INCORRECT";
    }
    setCharacterArray((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        state: newCharacterState,
      };
      return copy;
    });
    setGlobalIndex(index + 1);
    console.log(characterArray, index);
  }

  function handleTrigger(event) {
    handleKeyboardEvent(event.key, trigger.current.index);
    trigger.current = {
      key: event.key,
      index: trigger.current.index + 1,
    };
    console.log(trigger.current);
  }

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", handleTrigger);
    }
    return () => {
      document.removeEventListener("keydown", handleTrigger);
    };
  }, []);

  useEffect(() => {
    handleKeyboardEvent(trigger.current.key, trigger.current.index);
    console.log(trigger.current, "he");
  }, [trigger.current.index]);

  const lines = ParagraphToLineByLineLength(characterArray, 80);

  return (
    <>
      <div className="container">
        <h1 className="titleBox">MonkeyType</h1>
        <div className="textBox">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="line1">
              {line.map((character, characterIndex) => (
                <span
                  key={characterIndex}
                  className={`character ${getCssClassForCharacter(character)}`}
                >
                  {character.character}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
