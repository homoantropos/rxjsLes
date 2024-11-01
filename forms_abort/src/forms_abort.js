import "./forms_abort.scss";
import "../assets/logo-javascript.png";

import { fromEvent } from "rxjs";

import formsAbortLessonApp from "./js/classes/app.js";

document.addEventListener("DOMContentLoaded", () =>
	formsAbortLessonApp
		.initApplication()
		.then(() => console.log("app started"))
		.catch((error) => console.error("Error while app start: ", error)),
);

export const online$ = fromEvent(window, "online");

export const offline$ = fromEvent(window, "offline");


