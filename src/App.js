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

  console.log(lines);
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
    "monkeytype clone is a remarkable typing tool that assists in honing your typing speed and precision it presents a simple yet sleek interface along with a diverse selection of unique texts quotes and paragraphs to practice on by monitoring your words per minute and providing visual feedback on your performance this clone allows you to track your progress over time with its comprehensive statistics and engaging approach it serves as an excellent resource for individuals aiming to improve their typing skills effectively and enjoyably";

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

  const lines = ParagraphToLineByLineLength(characterArray, 84);

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
