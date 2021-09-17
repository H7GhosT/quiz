import { ULTextField } from "./text-field";
import { createElementFrom } from "./utils";

export class Match {
  /**
   * @param {HTMLElement} $target
   * @param {{
   *  left: string[],
   *  right: string[],
   *  connections: number[][],
   *  editable: boolean
   * }} param1
   */
  constructor(
    $target,
    { left = [], right = [], connections = [], editable = false }
  ) {
    this._canvasWidth = 100;
    this.$element = createElementFrom(`
      <div class="match">
        <div class="match__side match__side--left"></div>
        <canvas class="match__middle" width="${this._canvasWidth}" height="0"></canvas>
        <div class="match__side match__side--right"></div>
      </div>
    `);
    $target.replaceWith(this.$element);

    this.$left = this.$element.querySelector(".match__side--left");
    this.$right = this.$element.querySelector(".match__side--right");
    /**
     * @type {HTMLCanvasElement}
     */
    this.$middle = this.$element.querySelector(".match__middle");
    this._selected = [null, null];

    this._ctx = this.$middle.getContext("2d");

    /**
     * @type {number[][]}
     */
    this._connections = [];

    /**
     * @typedef {{
     *  value: string,
     *  $element: HTMLElement,
     *  $btn: HTMLButtonElement,
     *  textField?: ULTextField}} _Item
     */
    /**
     * @type {Array<_Item>}
     */
    this.left = [];
    /**
     * @type {Array<_Item>}
     */
    this.right = [];
    this.editable = editable;

    for (let item of left) {
      this.addLeft(item);
    }
    for (let item of right) {
      this.addRight(item);
    }

    this.connections = connections.map((c) => [...c]);

    this.onNewConnection = ([_, __]) => {};
    this.onRemoveConnection = ([_, __]) => {};
    this.onRemove = ({ sideName, item }) => {};
    this.onChange = ({ sideName, item }) => {};
  }

  _drawConnections() {
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

    for (const c of this._connections) {
      if (!this.left[c[0]] || !this.right[c[1]]) {
        continue;
      }
      const $lel = this.left[c[0]].$btn;
      const $rel = this.right[c[1]].$btn;
      const lbr = $lel.getBoundingClientRect();
      const rbr = $rel.getBoundingClientRect();
      const top = this.$middle.getBoundingClientRect().top;
      const y1 = lbr.top + lbr.height / 2 - top;
      const y2 = rbr.top + rbr.height / 2 - top;

      this._ctx.lineWidth = 4;
      this._ctx.strokeStyle = "#00a8a8";
      this._ctx.beginPath();
      this._ctx.moveTo(0, y1);
      this._ctx.lineTo(this._ctx.canvas.width, y2);
      this._ctx.stroke();

      $lel.classList.add("match-button--active");
      $rel.classList.add("match-button--active");

      $lel.blur();
      $rel.blur();
    }
  }

  set connections(v) {
    this._connections = v;
    this._drawConnections();
  }

  get connections() {
    return this._connections;
  }

  /**
   *
   * @param {number[]} c
   * @returns
   */
  addConnection(connection) {
    this._removeConnectionHelper(connection);
    this._connections.push([...connection]);
    this.connections = this._connections;
    this.onNewConnection([...connection]);
  }

  /**
   *
   * @param {Array<number?>} connection
   */
  removeConnection(connection) {
    const rc = this._removeConnectionHelper(connection);
    this.connections = this._connections;
    this.onRemoveConnection(rc);
  }

  _removeConnectionHelper(connection) {
    let ret = [];
    this._connections = this._connections.filter((c) => {
      if (c[0] == connection[0] || c[1] == connection[1]) {
        ret = [...c];
        this.left[c[0]].$btn.classList.remove("match-button--active");
        this.right[c[1]].$btn.classList.remove("match-button--active");
        return false;
      }
      return true;
    });
    return ret;
  }

  /**
   *
   * @param {string} value
   * @returns {_Item}
   */
  addLeft(value) {
    return this._addToSide(value, "left");
  }

  /**
   *
   * @param {string} value
   * @returns {_Item}
   */
  addRight(value) {
    return this._addToSide(value, "right");
  }

  removeLeft(idx) {
    const removed = this._removeSide(idx, "left");
    this.onRemove({ sideName: "left", removed });
    return removed;
  }

  removeRight(idx) {
    const removed = this._removeSide(idx, "right");
    this.onRemove({ sideName: "right", removed });
    return removed;
  }

  _removeSide(idx, sideName) {
    let sideItems = this[sideName];
    let ci = sideName == "left" ? 0 : 1;

    this.removeConnection(sideName == "left" ? [idx, null] : [null, idx]);

    for (const c of this._connections) {
      if (c[ci] > idx) c[ci]--;
    }

    if (this._selected[ci] == idx) {
      this._selected[ci] = null;
    }

    const removed = sideItems.splice(idx, 1)[0];
    removed.$element.remove();
    for (let i = idx; i < sideItems.length; i++) {
      sideItems[i].key--;
    }
    this._adjustHeight();
    return removed;
  }

  _addToSide(value, sideName) {
    const $side = this["$" + sideName];
    const sideItems = this[sideName];
    let [ci1, ci2] = sideName == "left" ? [0, 1] : [1, 0];

    const newItem = {
      key: sideItems.length,
      value,
      $element: createElementFrom(`
        <div class="match-button__wrapper match-button__wrapper--${sideName}">
          <button class="match-button match-button--${sideName}">
            <div class="match-button__value">${value}</div>
          </button>
          ${
            this.editable
              ? `<button type="button" class="match-button__remove cross-btn secondary x-small"></button>`
              : ""
          }
        </div>
      `),
      $btn: null,
    };
    newItem.$btn = newItem.$element.querySelector(".match-button");
    $side.appendChild(newItem.$element);
    if (this.editable) {
      newItem.textField = new ULTextField(
        newItem.$btn.querySelector(".match-button__value"),
        {
          multiline: true,
          disableEnter: true,
          value,
          placeholder: sideName.charAt(0).toUpperCase() + sideName.slice(1),
          required: true,
        }
      );
      newItem.textField.onInput = () => {
        newItem.value = newItem.textField.value;
        this._adjustHeight();
        this.onChange({ sideName, item: newItem });
      };
      newItem.$element
        .querySelector(".match-button__remove")
        .addEventListener("click", () => {
          const r = this._removeSide(newItem.key, sideName);
          this.onRemove({ item: r, sideName });
        });
    }

    newItem.$btn.addEventListener("focus", (e) => {
      this._selected[ci1] = newItem.key;
      this.removeConnection(
        sideName == "left" ? [newItem.key, null] : [null, newItem.key]
      );
      if (this._selected[ci2] != null) {
        this.addConnection([this._selected[0], this._selected[1]]);
        this._selected = [null, null];
      }
    });
    newItem.$btn.addEventListener("blur", () => {
      setTimeout(() => {
        if (this._selected[ci1] == newItem.key) this._selected[ci1] = null;
      }, 10);
    });
    this._adjustHeight();
    sideItems.push(newItem);

    return newItem;
  }

  _adjustHeight() {
    this.$middle.height = 0;
    this.$middle.height = this.$element.clientHeight;
    this._drawConnections();
  }

  reportValidity() {
    if (this.editable) {
      let valid =
        this.left.every((i) => i.textField.reportValidity()) &&
        this.right.every((i) => i.textField.reportValidity());
      if (valid && !this._connections.length) {
        valid = false;
        this.left[0].$btn.setCustomValidity(
          "There should be at least 1 connection"
        );
        this.left[0].$btn.reportValidity();
        this.left[0].$btn.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
      return valid;
    }
    return true;
  }
}
