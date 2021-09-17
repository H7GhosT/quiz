import { Select } from "./select";
import { OLTextField, ULTextField } from "./text-field";
import { createElementFrom } from "./utils";

/**
 *
 * @param {string} what
 * @param {{
 *  multiline: boolean,
 *  placeholder: string,
 *  value: string,
 *  required: boolean
 * }} param1
 * @returns
 */

export function promptModal(
  what,
  { multiline = false, placeholder = "", value = "", required = false }
) {
  let $modal = createModal(what);

  const input = new ULTextField($modal.querySelector("#content"), {
    multiline,
    placeholder,
    value,
    required,
  });
  return runModal($modal).then(() => input.value);
}

/**
 *
 * @param {string} what
 * @param {{
 *  label: string,
 *  required: boolean,
 *  options: import("./select").Option[]
 * }}
 * @returns
 */

export function selectModal(what, { label = "", required = false, options }) {
  let $modal = createModal(what);
  
  const select = new Select($modal.querySelector("#content"), {
    label,
    required,
    options,
  });

  return runModal($modal).then(() => select.selected);
}

/**
 *
 * @param {string} title
 * @returns
 */

function createModal(title) {
  return createElementFrom(`
    <div class="modal">
      <div class="modal__overlay">
        <form class="modal__content paper-1">
          <div class="modal__header">
            <div class="modal__title subtitle">${title}</div>
          </div>
          <div class="spacey-1"></div>
          <div id="content"></div>
          <div class="spacey-1"></div>
          <div class="modal__bottom">
            <button type="button" class="modal__cancel text-button secondary">cancel</button>
            <span class="spacex-1"></span>
            <button type="submit" class="modal__submit filled-button primary">ok</button>
          </div>
        </form>
      </div>
    </div>
  `);
}

/**
 *
 * @param {HTMLElement} $modal
 * @returns
 */

function runModal($modal) {
  const $main = document.querySelector("main");
  $main.classList.add("blured");
  document.body.classList.add("hide-overflow");

  document.body.appendChild($modal);

  setTimeout(() => {
    $modal.classList.add("modal--open");
  }, 20);

  let closed = false;

  function close(fn) {
    if (closed) return;
    closed = true;
    $modal.classList.remove("modal--open");
    $main.classList.remove("blured");
    setTimeout(() => {
      $modal.remove();
      document.body.classList.remove("hide-overflow");
      fn();
    }, 300);
  }

  return new Promise((resolve, reject) => {
    const $overlay = $modal.querySelector(".modal__overlay");
    $overlay.addEventListener("click", (e) => {
      if (e.target == $overlay) close(reject);
    });

    const $form = $modal.querySelector("form");

    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      if ($form.checkValidity()) {
        close(resolve);
      }
    });

    $modal.querySelector(".modal__cancel").addEventListener("click", () => {
      close(reject);
    });
  });
}
