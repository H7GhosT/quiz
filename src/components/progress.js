import { createElementFrom } from "./utils";

export class Progress {
  /**
   * 
   * @param {HTMLElement} $target 
   * @param {{value: number, total: number}} param1 
   */
  constructor($target, { value, total }) {
    this._value = value;
    this._total = total;

    this.$element = createElementFrom(`
    <div class="progress">
      <div class="progress__text">
      </div>
      <div class="progress__bar">
      </div>
    </div>
  `);

    this._updateProgress();
    $target.replaceWith(this.$element);
  }
  set value(v) {
    this._value = v;
    this._updateProgress();
  }
  get value() {
    return this._value;
  }
  set total(v) {
    this._total = v;
    this._updateProgress();
  }
  get total() {
    return this._total;
  }

  _updateProgress() {
    const $ptext = this.$element.querySelector(".progress__text");
    const $pbar = this.$element.querySelector(".progress__bar");

    $ptext.innerText = `${this.value} of ${this.total}`;
    $pbar.innerHTML = "";

    for (let i = 1; i <= this.value; i++) {
      $pbar.append(
        createElementFrom(
          `<div class="progress__bit progress__bit--done"></div>`
        ),
        createElementFrom(`<div class="spacex-1px"></div>`)
      );
    }
    for (let i = this.value + 1; i < this.total; i++) {
      $pbar.append(
        createElementFrom(`<div class="progress__bit"></div>`),
        createElementFrom(`<div class="spacex-1px"></div>`)
      );
    }
    if (this.value < this.total) {
      $pbar.append(createElementFrom(`<div class="progress__bit"></div>`));
    }
  }
}
