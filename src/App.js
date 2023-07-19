import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { getCssClassForCharacter } from "./common/utils/get-css-class-for-character";
import { ParagraphToLineByLineLength } from "./common/utils/paragraph-to-line-by-line-length";
import { ParagraphToCharacterArrayConversion } from "./common/utils/paragraph -to-character-array-conversion";

let data =
  "monkeytype clone is a remarkable typing tool that assists in honing your typing speed and precision it presents a simple yet sleek interface along with a diverse selection of unique texts quotes and paragraphs to practice on by monitoring your words per minute and providing visual feedback on your performance this clone allows you to track your progress over time with its comprehensive statistics and engaging approach it serves as an excellent resource for individuals aiming to improve their typing skills effectively and enjoyably";

function App() {
  const [characterArray, setCharacterArray] = useState(
    ParagraphToCharacterArrayConversion(data)
  );

  const [lines, setLines] = useState(
    ParagraphToLineByLineLength(characterArray, 84)
  );

  useEffect(() => {
    setLines(ParagraphToLineByLineLength(characterArray, 84));
  }, [characterArray]);

  const [globalIndex, setGlobalIndex] = useState(0);

  function handleKeyboardEvent(key, index) {
    let newCharacterState;
    if (!key) return;
    if (characterArray[index].character === key) {
      newCharacterState = "CORRECT";
    } else {
      newCharacterState = "INCORRECT";
    }
    console.log(characterArray, index);
    setCharacterArray((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        state: newCharacterState,
      };
      return copy;
    });
    setGlobalIndex(index + 1);
  }

  const trigger = useRef({ key: "", index: -1 });

  function handleTrigger(event) {
    trigger.current = {
      key: event.key,
      index: trigger.current.index + 1,
    };
    handleKeyboardEvent(event.key, trigger.current.index);
  }

  function getVisibleLines() {
    const currentLineIndex = Math.floor(globalIndex / 84);
    if (currentLineIndex > 1) {
      return lines.slice(currentLineIndex - 1, currentLineIndex + 2);
    } else {
      return lines.slice(0, 3);
    }
  }

  useEffect(() => {
    setCharacterArray(ParagraphToCharacterArrayConversion(data));
    if (document) {
      document.addEventListener("keydown", handleTrigger);
    }
    return () => {
      document.removeEventListener("keydown", handleTrigger);
    };
  }, []);

  useEffect(() => {
    handleKeyboardEvent(trigger.current.key, trigger.current.index);
  }, [trigger.current.index]);

  return (
    <>
      <div className="container">
        <h1 className="titleBox">MonkeyType</h1>
        <div className="textBox">
          {getVisibleLines().map((line, lineIndex) => (
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
