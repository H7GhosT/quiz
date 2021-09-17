import { createElementFrom } from "./utils";

class TextFieldBase {
  /**
   *
   * @param {HTMLElement} $target
   * @param {HTMLElement} $element
   */
  constructor($target, $element, { required, placeholder, value }) {
    this.$element = $element;
    /**
     * @type {HTMLTextAreaElement | HTMLInputElement}
     */
    this.$input = this.$element.querySelector("[data-input]");

    this.$input.required = required;
    if (placeholder) this.placeholder = placeholder;
    if (value) this.value = value;

    this.$input.addEventListener("focus", () => {
      this.$element.classList.add("has-text", "active");
    });

    this.$input.addEventListener("blur", () => {
      if (!this.value && !this.placeholder) {
        this.$element.classList.remove("has-text");
      }
      this.$element.classList.remove("active");
      this.onBlur();
    });

    this.onInput = () => {};
    this.onBlur = () => {};

    this.$element
      .querySelector("[data-input]")
      .addEventListener("input", () => {
        this.multiline && this._resize();
        this.onInput();
      });

    $target.replaceWith(this.$element);
  }

  set value(v) {
    this.$input.value = v;
    if (v) this.$element.classList.add("has-text");
    else this.$element.classList.remove("has-text");
    this.multiline && this._resize();
  }
  get value() {
    return this.$input.value;
  }
  set placeholder(v) {
    this.$input.placeholder = v;
    if (v) this.$element.classList.add("has-text");
    else this.$element.classList.remove("has-text");
  }
  get placeholder() {
    return this.$input.placeholder;
  }

  focus() {
    this.$input.focus();
    this.$input.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }
  blur() {
    this.$input.blur();
  }

  reportValidity() {
    const valid = this.$input.reportValidity();
    if (!valid)
      this.$input.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    return valid;
  }
}

export class OLTextField extends TextFieldBase {
  /**
   *
   * @param {HTMLElement} $target
   * @param {{
   *  placeholder: string,
   *  value: string,
   *  label: string,
   *  required: boolean
   * }} param1
   */
  constructor(
    $target,
    { placeholder = "", value = "", label = "", required = false }
  ) {
    super(
      $target,
      createElementFrom(`
        <div class="ol-text-field">
          <input class="ol-text-field__input" type="text" data-input />
          ${label ? `<span class="ol-text-field__label">${label}</span>` : ""}
        </div>
    `),
      { required, value, placeholder }
    );
  }
}

export class ULTextField extends TextFieldBase {
  /**
   *
   * @param {HTMLElement} $target
   * @param {{
   *  placeholder: string,
   *  value: string,
   *  multiline: boolean,
   *  required: boolean
   *  disableEnter: boolean
   * }} param1
   */
  constructor(
    $target,
    {
      placeholder = "",
      value = "",
      multiline = false,
      required = false,
      disableEnter = false,
    }
  ) {
    super(
      $target,
      createElementFrom(`
        <div class="ul-text-field">
        ${
          multiline
            ? `<textarea role="textbox" class="ul-text-field__input" data-input ></textarea>`
            : `<input class="ul-text-field__input" type="text" data-input />`
        }
        </div>
    `),
      {
        required,
        placeholder,
      }
    );
    this.multiline = multiline;
    this.value = value;

    if (this.multiline && disableEnter) {
      this.$input.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
          e.preventDefault();
        }
      });
    }
  }

  _resize() {
    const $wrap = createElementFrom(`<div><pre></pre></div>`);
    const $pre = $wrap.querySelector("pre");
    const style = window.getComputedStyle(this.$input);

    $pre.innerText = this.value + " ";
    $pre.style.fontSize = style.fontSize;
    $pre.style.fontFamily = style.fontFamily;
    $pre.style.fontWeight = style.fontWeight;
    $wrap.style.width = this.$input.clientWidth + "px";
    $pre.style.whiteSpace = "pre-wrap";
    $pre.style.wordWrap = "break-word";
    $wrap.style.visibility = "hidden";

    document.body.appendChild($wrap);
    this.$input.style.height = $pre.clientHeight + "px";
    $wrap.remove();
  }
}
