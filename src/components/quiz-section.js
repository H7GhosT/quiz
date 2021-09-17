import { CheckList } from "./check-list";
import { Complete } from "./complete";
import { Match } from "./match";
import { Progress } from "./progress";
import { OLTextField, ULTextField } from "./text-field";
import { createElementFrom } from "./utils";

export class QuizSection {
  /**
   *
   * @param {HTMLElement} $target
   * @param {{progress: {value: number, total: number}}} param1
   */
  constructor($target, { quest, progress, onNext, onPrev, onFinish }) {
    this.$element = createElementFrom(`
      <div class="quiz-section">
        <div class="paper-4 quiz-section__wrapper">
          <div class="title primary">
            ${quest.title}
          </div>
          <div class="spacey-2"></div>
          <div class="subtitle">
            ${quest.question}
          </div>
          <div class="spacey-1"></div>
          <div class="quiz-section__content"></div>
          <div class="spacey-2"></div>
          <div class="space-between">
            <div class="progress"></div>
            <div class="quiz-section__buttons"></div>
          </div>
        </div>
      </div>
    `);

    $target.replaceWith(this.$element);

    this.$quizSectionWrap = this.$element.querySelector(".quiz-section__wrapper");
    this.$buttonsContainer = this.$element.querySelector(
      ".quiz-section__buttons"
    );

    this.updateProgress(progress.value, progress.total);

    this.onNext = onNext || (() => {});
    this.onPrev = onPrev || (() => {});
    this.onFinish = onFinish || (() => {});

    this.$content = this.$element.querySelector(".quiz-section__content");

    const typeHandlers = {
      question: () => {
        const $placeholder = document.createElement("div");
        this.$content.appendChild($placeholder);
        const input = new OLTextField($placeholder, {
          value: quest.answer || "",
          label: "Your answer",
        });
        input.onInput = () => {
          quest.answer = input.value;
        };
      },
      choose: (multiple) => {
        const $form = document.createElement("form");
        $form.onsubmit = (e) => e.preventDefault();
        const $placeholder = document.createElement("div");
        this.$content.appendChild($form);
        $form.appendChild($placeholder);

        if (!quest.answers) quest.answers = [];

        const checklist = new CheckList($placeholder, {
          multiple,
          items: quest.options.map((o, i) => ({
            value: o,
            checked: quest.answers.includes(i + 1),
          })),
        });

        checklist.onChange = () => {
          quest.answers = [];
          checklist.items.forEach((i, idx) => {
            if (i.checked) quest.answers.push(idx + 1);
          });
        };
      },
      "choose one": function () {
        this.choose(false);
      },
      "choose multiple": function () {
        this.choose(true);
      },
      complete: () => {
        if (!quest.answers) quest.answers = {};
        const $placeholder = document.createElement("div");
        this.$content.append($placeholder);
        const complete = new Complete($placeholder, {
          values: quest.answers,
          text: quest.text,
        });
        complete.onInput = ({ id, value }) => {
          quest.answers[id] = value;
        };
      },
      match: () => {
        if (!quest.answers) quest.answers = [];

        const $placeholder = document.createElement("div");
        this.$content.appendChild($placeholder);

        const match = new Match($placeholder, {
          left: quest.left,
          right: quest.right,
          connections: quest.answers.map(([l, r]) => [l - 1, r - 1]),
        });

        match.onChange = match.onRemove = match.onNewConnection = match.onRemoveConnection = () => {
          quest.left = match.left.map((i) => i.value);
          quest.right = match.right.map((i) => i.value);
          quest.answers = match.connections.map((c) => [c[0] + 1, c[1] + 1]);
        };
      },
    };

    typeHandlers[quest.type] && typeHandlers[quest.type]();
  }

  updateProgress(value, total) {
    this.progress = new Progress(this.$element.querySelector(".progress"), {
      value,
      total,
    });

    this.$buttonsContainer.innerHTML = "";

    let $prev;
    let $next;
    let $finish;

    if (value > 1) {
      this.$buttonsContainer.append(
        ($prev = createElementFrom(
          `<button class="text-button secondary">prev</button>`
        )),
        createElementFrom(`<span class="spacex-1"></span>`)
      );
    }

    if (value < total) {
      this.$buttonsContainer.appendChild(
        ($next = createElementFrom(
          `<button class="filled-button primary">next</button>`
        ))
      );
    }
    if (value == total) {
      this.$buttonsContainer.appendChild(
        ($finish = createElementFrom(
          `<button class="filled-button success">finish</button>`
        ))
      );
    }

    if ($prev) $prev.addEventListener("click", () => this.onPrev());
    if ($next) $next.addEventListener("click", () => this.onNext());
    if ($finish) $finish.addEventListener("click", () => this.onFinish());
  }

  remove() {
    this.$element.remove();
  }
}
