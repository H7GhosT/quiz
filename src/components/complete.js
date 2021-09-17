import { createElementFrom } from "./utils";

export class Complete {
  /**
   * @param {HTMLElement} $target
   * @param {{
   *  text: string,
   *  values: {[key: string]: string},
   *  disabled: boolean
   * }} param1
   */
  constructor($target, { text = "", values = {}, disabled = false }) {
    this.$element = document.createElement("div");

    this.onInput = () => {};
    this._disabled = disabled;
    this.setText({ text, values });

    $target.replaceWith(this.$element);
  }

  /**
   *
   * @param {{
   *  text: string
   *  values: {[key: string]: string}
   * }} param0
   */
  setText({ text, values }) {
    this.$element.innerHTML = "";
    this.text = text;
    this.values = { ...values };
    this.$content = createElementFrom(text);

    if (this.$content) {
      this.$content.querySelectorAll("c").forEach((c) => {
        const w = c.getAttribute("width");
        const id = c.getAttribute("id");
        const $span = document.createElement("span");
        const $inp = createElementFrom(
          `<input data-id="${id}" class="inline-text-field" type="text" maxlength="${w}" ${
            this._disabled ? "disabled" : ""
          } />`
        );
        $span.style.visibility = "hidden";
        $span.style.position = "absolute";
        $span.innerText = "m".repeat(w);
        $span.style.fontSize = $inp.style.fontSize = "1rem";
        $span.style.fontFamily = $inp.style.fontFamily = "monospace";

        document.body.appendChild($span);
        $inp.style.width = $span.clientWidth + "px";

        $inp.value = values[id] || "";
        $inp.addEventListener("input", () => {
          this.values[id] = $inp.value;
          this.onInput({ id, value: $inp.value });
        });
        c.replaceWith($inp);
        $span.remove();
      });

      this.$element.appendChild(this.$content);

      this.$content.style.whiteSpace = "pre-wrap";
      this.$content.style.wordWrap = "break-word";
    }
  }
}

/**
 *
 * @param {string} text
 */
export function parseText(text) {
  const $pre = document.createElement("pre");
  let currentId = 1;
  const values = {};

  let toComplete = "";
  let mode = false;

  function put() {
    if (toComplete) {
      $pre.append(
        createElementFrom(
          `<span><c id="${currentId}" width="${toComplete.length}" /></span>`
        )
      );
      values[currentId] = toComplete;
      currentId++;
      toComplete = "";
    }
    mode = false;
  }

  for (let i = 0; i < text.length; i++) {
    if (text[i] == "\\") {
      if (i == text.length - 1) continue;
      i++;
      if (text[i] == "\n") continue;
      if (mode) toComplete += text[i];
      else $pre.append(document.createTextNode(text[i]));
    } else if (text[i] == "\n") {
      put();
      $pre.append(document.createTextNode("\n"));
    } else if (mode) {
      if (text[i] == "]") {
        put();
      } else {
        toComplete += text[i];
      }
    } else if (text[i] == "[") {
      mode = true;
    } else {
      $pre.append(document.createTextNode(text[i]));
    }
  }
  put();
  return { parsedText: $pre.outerHTML, values };
}

export function unParseText({ parsedText, values }) {
  const replace = (s) =>
    s.replaceAll("\\", "\\\\").replaceAll("[", "\\[").replaceAll("]", "\\]");
  const $pre = createElementFrom(replace(parsedText));
  $pre.querySelectorAll("c").forEach((c) => {
    const id = c.getAttribute("id");
    c.replaceWith(document.createTextNode(`[${replace(values[id] || "")}]`));
  });
  return $pre.innerText;
}
