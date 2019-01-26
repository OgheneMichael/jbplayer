import { elements } from "./base";

export function renderPlayIcon() {
	const markup = `
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="23">
      <path fill="#5D91BF" fill-rule="evenodd" d="M19.472 10.404L1.895.257C.93-.301.129.082.015 1.097A2.28 2.28 0 0 0 0 1.351V21.65c0 1.202.853 1.694 1.894 1.094l17.243-9.958.336-.194c1.042-.6 1.042-1.585 0-2.188z"/>
    </svg>
  `;

	elements.iconWrapper.innerHTML = "";
	elements.iconWrapper.insertAdjacentHTML("afterbegin", markup);
}

export function renderPauseIcon() {
	const markup = `
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="23">
    <path fill="#5D91BF" fill-rule="evenodd" d="M.02 19.16V3.855a3.848 3.848 0 0 1 7.695 0V19.16a3.848 3.848 0 1 1-7.695 0zm12.725 0V3.855a3.848 3.848 0 0 1 7.695 0V19.16a3.848 3.848 0 1 1-7.695 0z"/>
  </svg>
  `;

	elements.iconWrapper.innerHTML = "";
	elements.iconWrapper.insertAdjacentHTML("afterbegin", markup);
}
