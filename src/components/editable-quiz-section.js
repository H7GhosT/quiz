import { CheckList } from "./check-list";
import { Complete, parseText, unParseText } from "./complete";
import { Match } from "./match";
import { OLTextField, ULTextField } from "./text-field";
import { createElementFrom } from "./utils";

export class EditableQuizSection {
  /**
   *
   * @param {HTMLElement} $target
   */
  constructor($target, { quest }) {
    this.$element = createElementFrom(`
      <div class="quiz-section">
        <div class="quiz-section__remove-wrapper">
          <button type="button" class="quiz-section__remove cross-btn secondary"></button>
        </div>
        <div class="paper-4 quiz-section__wrapper">
          <div class="title primary">
            <div id="title-input"></div>
          </div>
          <div class="spacey-2"></div>
          <div class="subtitle">
            <div id="question-input"></div>
          </div>
          <div class="spacey-1"></div>
          <div class="quiz-section__content"></div>
        </div>
        
      </div>
    `);

    if (!quest.title) quest.title = "";
    if (!quest.question) quest.question = "";

    $target.replaceWith(this.$element);
    const titleInput = new ULTextField(
      this.$element.querySelector("#title-input"),
      {
        value: quest.title,
        multiline: true,
        placeholder: "Quest title",
        required: true,
      }
    );
    titleInput.onInput = () => {
      quest.title = titleInput.value;
    };
    const questionInput = new ULTextField(
      this.$element.querySelector("#question-input"),
      {
        value: quest.question,
        multiline: true,
        placeholder: "Your question",
        required: true,
      }
    );
    questionInput.onInput = () => {
      quest.question = questionInput.value;
    };

    this.onRemove = () => {};
    const $removeBtn = this.$element.querySelector(".quiz-section__remove");
    $removeBtn.addEventListener("click", () => {
      this.$element.remove();
      this.onRemove();
    });

    this.$content = this.$element.querySelector(".quiz-section__content");

    this._validityHandlers = [
      () => titleInput.reportValidity() && questionInput.reportValidity(),
    ];
    this.reportValidity = () => this._validityHandlers.every((fn) => fn());

    const typeHandlers = {
      question: () => {
        if (!quest.answer) quest.answer = "";

        const $placeholder = document.createElement("div");
        this.$content.appendChild($placeholder);
        const input = new OLTextField($placeholder, {
          value: quest.answer,
          label: "Correct answer",
          required: true,
        });
        input.onInput = () => {
          quest.answer = input.value;
        };

        this._validityHandlers.push(() => input.reportValidity());
      },
      choose: (multiple) => {
        const $form = document.createElement("form");
        $form.onsubmit = (e) => e.preventDefault();
        const $placeholder = document.createElement("div");
        const $addBtn = createElementFrom(
          `<button type="button" class="filled-button secondary small">add option</button>`
        );
        this.$content.append(
          $form,
          createElementFrom(`<span class="spacex-2"></span>`),
          $addBtn
        );
        $form.appendChild($placeholder);

        if (!quest.answers) quest.answers = [];
        if (!quest.options) quest.options = [];

        const checklist = new CheckList($placeholder, {
          multiple,
          items: quest.options.map((o, i) => ({
            value: o,
            checked: quest.answers.includes(i + 1),
          })),
          editable: true,
        });

        checklist.onChange = checklist.onRemove = () => {
          quest.answers = [];
          quest.options = checklist.items.map((i, idx) => {
            if (i.checked) quest.answers.push(idx + 1);
            return i.value;
          });
          if (!checklist.items.length) {
            $addBtn.click();
          }
        };

        this._validityHandlers.push(() => checklist.reportValidity());

        $addBtn.addEventListener("click", () => {
          checklist.addItem({ value: "" }).textField.focus();
        });
        if (!quest.answers.length) checklist.addItem({ value: "" });
      },
      "choose one": function () {
        this.choose(false);
      },
      "choose multiple": function () {
        this.choose(true);
      },
      complete: () => {
        if (!(quest.text && quest.answers)) {
          quest.text = "";
          quest.answers = {};
        }

        const $completePlaceholder = document.createElement("div");
        const $inputPlaceholder = document.createElement("div");
        /**
         * @type {HTMLButtonElement}
         */
        const $editBtn = createElementFrom(
          `<button type="button" class="filled-button secondary small">edit</button>`
        );
        this.$content.append(
          $completePlaceholder,
          $inputPlaceholder,
          createElementFrom(`<div class="spacey-1"></div>`),
          $editBtn
        );

        const complete = new Complete($completePlaceholder, {
          values: quest.answers,
          text: quest.text,
          disabled: true,
        });

        const input = new ULTextField($inputPlaceholder, {
          placeholder: "Text [to complete]",
          multiline: true,
          required: true
        });

        if (quest.text && quest.answers) {
          input.value = unParseText({
            parsedText: quest.text,
            values: quest.answers,
          });
          input.$element.hidden = true;
        } else {
          input.focus();
          complete.$element.hidden = true;
        }

        complete.$element.style.cursor = "pointer";
        const edit = () => {
          complete.$element.hidden = true;
          input.$element.hidden = false;
          input.focus();
          input.value = unParseText({
            parsedText: complete.text,
            values: { ...complete.values },
          });
        };

        complete.$element.addEventListener("click", () => edit());
        $editBtn.addEventListener("click", () => edit());

        input.onBlur = () => {
          const p = parseText(input.value);
          complete.setText({ text: p.parsedText, values: { ...p.values } });
          quest.text = p.parsedText;
          quest.answers = { ...p.values };
          if (!input.value) return;

          input.$element.hidden = true;
          complete.$element.hidden = false;
        };

        this._validityHandlers.push(() => {
          if (!complete.$content.querySelectorAll("input").length) {
            edit();
            input.$input.setCustomValidity("The text should have at least 1 field to complete");
            input.$input.reportValidity()
            return false;
          }
          return true;
        });
      },
      match: () => {
        if (!quest.answers) quest.answers = [];
        if (!quest.left) quest.left = [];
        if (!quest.right) quest.right = [];

        const $placeholder = document.createElement("div");
        this.$content.appendChild($placeholder);

        const match = new Match($placeholder, {
          left: quest.left,
          right: quest.right,
          connections: quest.answers.map(([l, r]) => [l - 1, r - 1]),
          editable: true,
        });

        match.onChange = match.onRemove = match.onNewConnection = match.onRemoveConnection = () => {
          quest.left = match.left.map((i) => i.value);
          quest.right = match.right.map((i) => i.value);
          quest.answers = match.connections.map((c) => [c[0] + 1, c[1] + 1]);

          if (!match.left.length) {
            $addLeft.click();
          }
          if (!match.right.length) {
            $addRight.click();
          }
        };

        const $btnWrap = document.createElement("div");
        const $addLeft = createElementFrom(
          `<button type="button" class="filled-button small secondary">add left</button>`
        );
        const $addRight = createElementFrom(
          `<button type="button" class="filled-button small secondary">add right</button>`
        );
        $btnWrap.append(
          $addLeft,
          createElementFrom(`<span class="spacex-1"></span>`),
          $addRight
        );
        this.$content.append(
          createElementFrom(`<div class="spacey-1"></div>`),
          $btnWrap
        );

        $addLeft.addEventListener("click", () => {
          match.addLeft("").textField.focus();
        });

        $addRight.addEventListener("click", () => {
          match.addRight("").textField.focus();
        });

        if (!quest.left.length) $addLeft.click();
        if (!quest.right.length) $addRight.click();

        this._validityHandlers.push(() => match.reportValidity())
      },
    };

    typeHandlers[quest.type] && typeHandlers[quest.type]();

    questionInput.focus();
  }
}
