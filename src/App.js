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
  let currentLength = 0;

  characterImps.forEach((characterImp, index) => {
    const characterLength = characterImp.character === " " ? 1 : 0;

    if (currentLength + characterLength <= lineLength) {
      currentLine.push(characterImp);
      currentLength += characterLength;
    } else {
      lines.push(currentLine);
      currentLine = [characterImp];
      currentLength = characterLength;
    }

    if (index === characterImps.length - 1) {
      lines.push(currentLine);
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
    "the sign made it clear that they didnt want anyone around that wasnt going to stop jack jack always lived with the notion that signs were mere suggestions not actually absolute rules Thats why the moment jack looked at the sign made it clear that they didnt want anyone around That wasnt going to stop jack jack always lived with the notion that signs were mere suggestions not actually absolute rules Thats why the moment jack looked at";

  const [globalIndex, setGlobalIndex] = useState(0);

  const [characterArray, setCharacterArray] = useState(
    ParagraphToCharacterArrayConversion(data)
  );

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
    trigger.current = {
      key: event.key,
      index: trigger.current.index + 1,
    };
    handleKeyboardEvent(event.key, trigger.current.index);
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
    setCharacterArray(ParagraphToCharacterArrayConversion(data));
  }, []);

  const lines = ParagraphToLineByLineLength(characterArray, 80);

  const trigger = useRef({ key: "", index: 0 });

  useEffect(() => {
    handleKeyboardEvent(trigger.current.key, trigger.current.index);
    console.log(trigger.current, "he");
  }, [trigger.current.index]);

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
