import { EditableQuizSection } from "./components/editable-quiz-section";
import { promptModal, selectModal } from "./components/modal";
import { ULTextField } from "./components/text-field";
import { createElementFrom } from "./components/utils";

const quiz = {
  name: "Quiz",
  quests: [
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
      answers: [2, 3],
    },
    {
      title: "Match the sides",
      type: "match",
      question: "Match the size of given types",
      left: ["int", "char", "short"],
      right: ["8 bits", "16 bits", "32 bits"],
      answers: [
        [1, 3],
        [2, 1],
        [3, 2],
      ],
      correctAnswers: [
        [1, 3],
        [2, 1],
        [3, 2],
      ],
    },
        {
          title: "Complete empty spaces",
          type: "complete",
          question:
            'Write a function named "Hello" that prints "Hello world" to the console and something more here',
          text: `<pre>function <span><c id="1" width="7" /></span>() {
      console.<span><c id="2" width="3"/></span>(<span><c id="3" width="13"/></span>);
    }</pre>`,
          answers: {
            1: "Hello",
            2: "log",
            3: '"Hello world"',
          },
        },
        {
          title: "Complete empty spaces",
          type: "complete",
          question:
            'Write a function named "Hello" that prints "Hello world" to the console and something more here',
          text: `<pre>&lt;div class="<span><c id="1" width="12" /></span>"&gt;
          <span><c id="2" width="7" /></span>
&lt;/div&gt;</pre>`,
          answers: {
            1: "something",
            2: "another"
          },
        },
  ],
};

// quiz.name = "";
// quiz.quests = [];

const titleMap = {
  question: "Answer the question",
  "choose one": "Choose the right answer",
  "choose multiple": "Choose the right answers",
  complete: "Complete the empty spaces",
  match: "Match the sides",
};

function Init(quiz) {
  if (!quiz.name) quiz.name = "";
  if (!quiz.quests) quiz.quests = [];

  window["quiz"] = quiz;

  const $quiz = document.querySelector("#quiz");
  $quiz.innerHTML = "";
  const $quizName = createElementFrom(`
    <div class="paper-6">
      <div class="title accent big">
        <div id="quiz-name"></div>
      </div>
    </div>
  `);
  const $questsContainer = document.createElement("div");
  const $btnWrap = createElementFrom(`
    <div class="flex-end">
      <button class="filled-button primary quiz__add">Add quest</button>
      <div class="spacex-1"></div>
      <button class="filled-button success quiz__submit">submit</button>
    </div>
  `);
  const $addQuestBtn = $btnWrap.querySelector(".quiz__add");
  const $submitBtn = $btnWrap.querySelector(".quiz__submit");
  $quiz.append(
    createElementFrom(`<div class="spacey-2"></div>`),
    $quizName,
    createElementFrom(`<div class="spacey-2"></div>`),
    $questsContainer,
    createElementFrom(`<span class="spacex-3"></span>`),
    $btnWrap,
    createElementFrom(`<div class="spacey-4"></div>`)
  );

  const quizNameInput = new ULTextField($quizName.querySelector("#quiz-name"), {
    value: quiz.name,
    placeholder: "Quiz name",
    required: true,
    multiline: true,
  });
  quizNameInput.onInput = () => {
    quiz.name = quizNameInput.value;
  };
  quizNameInput.focus();

  let quizSections = [];

  $addQuestBtn.addEventListener("click", () => {
    selectModal("Choose the type of the quest", {
      label: "Type",
      required: true,
      options: [
        ["question", "Question"],
        ["choose one", "Choose one"],
        ["choose multiple", "Choose multiple"],
        ["complete", "Complete text"],
        ["match", "Match sides"],
      ].map((o) => ({
        key: o[0],
        value: o[1],
      })),
    }).then(
      ({ key: type }) => {
        const $placeholder = document.createElement("div");
        $questsContainer.appendChild($placeholder);
        const newQuest = {
          type,
          title: titleMap[type],
        };
        quiz.quests.push(newQuest);
        const eqs = new EditableQuizSection($placeholder, {
          quest: newQuest,
        });
        quizSections.push(eqs);
        eqs.onRemove = () => {
          quiz.quests = quiz.quests.filter((q) => q != newQuest);
          quizSections = quizSections.filter((qs) => qs != eqs);
        };
      },
      () => {}
    );
  });

  $submitBtn.addEventListener("click", () => {
    let valid = quizNameInput.reportValidity();

    if (valid) valid &&= quizSections.every((qs) => qs.reportValidity());

    if (valid && !quizSections.length) {
      valid = false;
      $addQuestBtn.setCustomValidity("There should be at least 1 quest");
      $addQuestBtn.reportValidity();
    }
  });

  for (const quest of quiz.quests) {
    const $placeholder = document.createElement("div");
    $questsContainer.appendChild($placeholder);
    const eqs = new EditableQuizSection($placeholder, {
      quest,
    });
    quizSections.push(eqs);
    eqs.onRemove = () => {
      quiz.quests = quiz.quests.filter((q) => q != quest);
      quizSections = quizSections.filter((qs) => qs != eqs);
    };
  }
}

// quiz.quests = []

Init(quiz);

window["Init"] = Init;

// ?_id=skdfjas-asdfkljasdfp-asdfaslkdfj-asdfklj
