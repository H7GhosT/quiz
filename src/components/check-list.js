import { ULTextField } from "./text-field";
import { createElementFrom, genId } from "./utils";

export class CheckList {
  /**
   *
   * @param {HTMLElement} $target
   * @param {{
   *  name: string,
   *  multiple: boolean,
   *  items: Array<{key: any, value: string, checked: boolean}>,
   *  editable?: boolean
   * }} param1
   */
  constructor($target, { name, multiple, items, editable = false }) {
    this.$element = document.createElement("div");
    this.multiple = multiple;
    this.editable = editable;
    this.name = name || "checklist_" + genId();

    /**
     * @type {Array<{
     *  key: string|number,
     *  value: string,
     *  checked: boolean,
     *  $input: HTMLInputElement,
     *  textField?: ULTextField,
     *  $element: HTMLInputElement
     * }>}
     */
    this.items = [];
    $target.replaceWith(this.$element);

    this.onChange = () => {};
    this.onRemove = () => {};

    for (const i of items) this.addItem(i);
    return this;
  }

  /**
   *
   * @param {{
   *  value: string,
   *  checked: boolean
   * }} param0
   * @returns
   */
  addItem({ value, checked = false }) {
    const type = this.multiple ? "checkbox" : "radio";
    let key = "item_" + genId();
    const newItem = {
      key,
      value,
      get checked() { return !!this.$input.checked; },
      set checked(v) { this.$input.checked = v; },
      $input: null,
      textField: null,
      $element: createElementFrom(`
        <div>
          <label
            for="${key}"
            class="checklist-item ${this.editable ? "editable" : ""}">

              <input
                ${checked ? "checked" : ""}
                type="${type}"
                name="${this.name}"
                id="${key}"
              />

              <div class="${type}__mark"></div>
              <div class="checklist-item__value">${value}</div>
              ${this.editable
                  ? `<span class="spacex-1"></span>
                    <button type="button" class="checklist-item__remove cross-btn secondary small"></button>`
                  : ``}

          </label>
        </div>
    `),
    };

    newItem.$input = newItem.$element.querySelector("input");
    newItem.checked = checked;

    newItem.$input.addEventListener(
      "change",
      () => {
        this.onChange({ ...newItem });
    });

    this.$element.appendChild(newItem.$element);
    this.items.push(newItem);

    if (this.editable) {
      newItem.textField = new ULTextField(
        newItem.$element.querySelector(".checklist-item__value"),
        {
          multiline: true,
          placeholder: "Option",
          value: newItem.value,
          required: true,
        }
      );
      newItem.textField.onInput = () => {
        newItem.value = newItem.textField.value;
        this.onChange({ ...newItem });
      };
      newItem.$element
        .querySelector(".checklist-item__remove")
        .addEventListener(
          "click",
          () => { this.removeItem(newItem); }
      );
    }

    return newItem;
  }

  /**
   *
   * @param {{
   *  key: string|number,
   *  value: string,
   *  $element: HTMLElement
   * }} param0
   */
  removeItem({ key = null, value = null, $element = null }) {
    let removed = null;
    this.items.splice(
      this.items.findIndex((item) => {
        if ( item.key == key || item.value == value || item.$element == $element ) {
          removed = item;
          item.$element.remove();
          return true;
        }
      }),
      1
    );
    if (removed) this.onRemove({ ...removed });
  }

  reportValidity() {
    let valid = this.items.every(i => i.textField.reportValidity());
    if (valid) {
      valid = this.items.findIndex(i => i.$input.checked) != -1;
      
      if (!valid) {
        this.items[0].$input.setCustomValidity("Please check at least 1 item");
        this.items[0].$input.reportValidity();
        this.items[0].$input.scrollIntoView({ block: "center", behavior: "smooth" })
      }
    }
    return valid;
  }
}
