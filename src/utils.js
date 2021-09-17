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