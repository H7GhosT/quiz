import { createElementFrom } from "./utils";

export class Select {
  /**
   * @typedef {{key:number|string, value:string}} Option
   */
  /**
   * @param {HTMLElement} $target
   * @param {{
   *  label: string,
   *  options: Option[],
   * }} param1
   */
  constructor(
    $target,
    { label = "", options = [], required = false }
  ) {
    this.$element = createElementFrom(`
      <div class="ol-text-field select">
        <input class="ol-text-field__input" type="text" ${
          required ? "required" : ""
        } />
        ${label ? `<span class="ol-text-field__label">${label}</span>` : ""}
        <button class="select__trigger" type="button">
          <div class="select__options"></div>
        </button>
      </div>
    `);
    this.$trigger = this.$element.querySelector(".select__trigger");
    this.$options = this.$element.querySelector(".select__options");
    this.$input = this.$element.querySelector("input");
    this.options = [];
    this.onSelect = () => {};
    this.selected = null;

    this.$trigger.addEventListener("focus", () => {
      this.$element.classList.add("has-text", "active");
    });

    this.$trigger.addEventListener("blur", () => {
      this.$element.classList.remove("active");
      if (!this.$input.value) {
        this.$element.classList.remove("has-text");
      }
    });

    this.$input.addEventListener("focus", () => {
      this.$input.blur();
      this.$trigger.focus();
    });

    $target.replaceWith(this.$element);

    for (const o of options) this.addOption(o);
  }
  /**
   *
   * @param {Option} o
   */
  addOption(o) {
    const $option = createElementFrom(`
      <div class="select__option">${o.value}</div>
    `);
    $option.addEventListener("click", () => {
      this.$input.value = o.value;
      if (o.value) {
        this.$element.classList.add("has-text");
      }
      this.selected = o;
      this.$trigger.blur();
      this.onSelect();
    });

    this.$options.appendChild($option);
    this.options.push({
      key: o.key,
      value: o.value,
      el: $option,
    });
  }
}
