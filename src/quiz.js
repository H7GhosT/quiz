import { QuizSection } from "./components/quiz-section";
import { createElementFrom } from "./components/utils";

let quiz = {
  name: "My first quiz",
  quests: [
    {
      title: "Answer the question",
      type: "question",
      question:
        "What is the name of the first function called when executing a C++ program?",
      correctAnswers: ["main"],
      answer: "",
    },
    {
      title: "Choose the right answer",
      type: "choose one",
      question: "What is the time complexity of 'Binary search'?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      correctAnswers: [3],
    },
    {
      title: "Choose the right answers",
      type: "choose multiple",
      question:
        "What may be the result of a sorting algorithm applied on an set of numbers?",
      options: [
        "[1, 4, 5, 3, 10, 14]",
        "[55, 90, 91, 123, 241]",
        "[62, 42, -1, -2, -99]",
      ],
      correctAnswers: [2, 3],
    },
    {
      title: "Complete empty spaces",
      type: "complete",
      question:
        'Write a function named "Hello" that prints "Hello world" to the console and something more here',
      text: `<pre>function <span><c id="1" width="5" /></span>() {
  console.<span><c id="2" width="3"/></span>(<span><c id="3" width="13"/></span>);
}</pre>`,
      correctAnswers: {
        1: "Hello",
        2: "log",
        3: '"Hello world"',
      },
    },
    {
      title: "Match the sides",
      type: "match",
      question: "Match the size of given types",
      left: ["int", "char", "short"],
      right: ["8 bits", "16 bits", "32 bits"],
      correctAnswers: [
        [1, 3],
        [2, 1],
        [3, 2],
      ],
    },
  ],
};


for (const q of quiz.quests) {
  q.answer = null;
  q.answers = null;
}

function main() {
  const $quiz = document.querySelector("#quiz");
  function makeQuest(idx) {
    const $placeholder = document.createElement("div");
    $quiz.innerHTML = "";
    $quiz.appendChild($placeholder);
    const ret = {
      quizSection: new QuizSection($placeholder, {
        progress: {
          value: idx + 1,
          total: quiz.quests.length,
        },
        quest: quiz.quests[idx],
        onPrev: () => {
          if (current.questIdx > 0) {
            current = makeQuest(current.questIdx - 1);
          }
        },
        onNext: () => {
          if (current.questIdx < quiz.quests.length - 1) {
            current = makeQuest(current.questIdx + 1);
          }
        },
      }),
      questIdx: idx,
    };

    return ret;
  }

  let current = makeQuest(0);
}

main();
