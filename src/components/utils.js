import * as uuid from "uuid";

/**
 * 
 * @param {string} str 
 * @returns {HTMLElement}
 */

export function createElementFrom(str) {
  /**
   * @type {HTMLTemplateElement}
   */
  const template = document.createElement("template");
  str = str.trim();
  template.innerHTML = str;
  return template.content.firstChild;
}

export function genId() {
  return uuid.v1();
}


