'use strict';
// generator stuff wrapper
let generator_stuff;

// file
let fiel;

// generated idea
let idea;

// ideas from file
let preDefIdeas,
	sittingIdeas,
	objectIdeas,
	locationIdeas,
	charactersIdeas;

// prompt options
let prWriting,
	prDrawing;

// idea options
let predefined,
	sitting;

// list
let ul;

// themeing
let oThemeToggle,
	oThemeWholesome,
	themeingOptions;

// drawing style thing
let drToggle,
	drawingStyleOptions,
	drPixel,
	drNormal,
	drToon,
	drReal;

// random stuff
let ideaCounter,
	ideaCount,
	currentIdeaCounter,
	curIdeaCount,
	unIdeaCount,
	unIdeaCurrCount;
const uniqueIdeas = [];
let uniqueIdeasCurr = [];
let historyUniqueToggle;

// document start basically.
// i know im using it on chrome so... i dont need to check "derp is this old ie derp"
(async function start() {
	try {
		//generator
		generator_stuff = document.getElementById("generator-stuff");

		// butttons
		const but = document.getElementById("generate");
		const history = document.getElementById("clear-history");
		but.addEventListener("click", generate);
		history.addEventListener("click", clearHistory);

		// generated idea
		idea = document.getElementById("idea");

		// prompts
		prWriting = document.getElementById("prWriting");
		prDrawing = document.getElementById("prDrawing");

		// options
		// predefined = document.getElementById("predefined");
		// sitting = document.getElementById("sitting");
		// predefined.checked = true;

		// list
		ul = document.getElementById("history-list");

		// file
		fiel = await (await fetch('./ideas.json')).json();
		// had to convert from promise to an async/await to resovle the response instantly.
		// .then(res => {
		// 	// fiel = Promise.resolve(res.json());
		// 	fiel = res.json();
		// 	console.log(fiel);
		// }).then(jdata => {
		// 	// fiel = jdata;
		// 	console.log(jdata);
		// });
		// console.log(fiel);
		// ideas = fiel.predefined;
		// idea.innerHTML = arrRan(ideas);

		// add ideas from file
		preDefIdeas = fiel.predefined;
		sittingIdeas = fiel.sitting;
		objectIdeas = fiel.objects;
		locationIdeas = fiel.locations;
		charactersIdeas = fiel.characters;
		console.log(fiel);

		// themeing
		oThemeToggle = document.getElementById("oThemeToggle");
		oThemeToggle.addEventListener("change", themeToggler);
		oThemeWholesome = document.getElementById("oThemeWholesome");
		themeingOptions = document.getElementById("themeing");

		// random stuff
		ideaCounter = 0;
		currentIdeaCounter = 0;
		ideaCount = document.getElementById("ideaCount");
		curIdeaCount = document.getElementById("curIdeaCount");
		unIdeaCount = document.getElementById("unIdeaCount");
		historyUniqueToggle = document.getElementById("historyUniqueToggle");
		historyUniqueToggle.checked = true;
		unIdeaCurrCount = document.getElementById("unIdeaCurrCount");

		// drawing styles
		drToggle = document.getElementById("drToggle");
		drToggle.addEventListener("click", drawingStyleToggle);
		drawingStyleOptions = document.getElementById("drawingStyleOptions");
		drawingStyleOptions.style.display = 'none';
		drPixel = document.getElementById("drPixel");
		drPixel.disabled = true;
		drPixel.checked = false;
		drNormal = document.getElementById("drNormal");
		drNormal.disabled = true;
		drNormal.checked = false;
		drToon = document.getElementById("drToon");
		drToon.disabled = true;
		drToon.checked = false;
		drReal = document.getElementById("drReal");
		drReal.disabled = true;
		drReal.checked = false;

		// run generation
		generate();
	} catch (e) {
		return errorPrint(e);
	}
})();
function generate() {
	try {
		// create new predefined idea
		let randomIdea;
		let generatedIdea;
		const prompts = ['Draw', 'Write about'];
		let prompt1, prompt2;

		// handle prompts
		if (prDrawing.checked == true && prWriting.checked == false) {
			prompt1 = "Draw";
		} else if (prDrawing.checked == false && prWriting.checked == true) {
			prompt1 = "Write about";
		} else if (prDrawing.checked == true && prWriting.checked == true) {
			prompt1 = arrRan(prompts);
			do {
				prompt2 = arrRan(prompts);
			} while (prompt2 == prompt1);
		}

		// get random ideas based on chosen options.
		randomIdea = arrRan(preDefIdeas);
		// switch (predefined.checked) {
		// 	case true:
		// 		randomIdea = arrRan(preDefIdeas);
		// 		break;
		// 	default:
		// 		break;
		// }
		// switch (sitting.checked) {
		// 	case true:
		// 		randomIdea = `${arrRan(charactersIdeas)} sitting ${arrRan(objectIdeas)} ${arrRan(locationIdeas)}`;
		// 		break;
		// 	default:
		// 		break;
		// }

		// combine it all
		// prompts of eitehr drawing or writing.
		/// somethin like
		// Write, then draw
		// ------------------
		// style: ASD
		// action: sitting
		// person/scenery: Sugar
		// Summary: Sugar sitting in a tree
		// --------------------
		// Challenge: time limit 3
		generatedIdea = prompt1 + " " + randomIdea;
		if (prompt2 == prompts[0]) {
			generatedIdea += " then " + prompt2 + " it";
		} else if (prompt2 == prompts[1]) {
			generatedIdea += " then " + prompt2 + " about it";
		}

		// add to unique list
		if (!uniqueIdeas.includes(generatedIdea)) {
			uniqueIdeas.push(generatedIdea);
			unIdeaCount.textContent = uniqueIdeas.length;
		}

		// create new list element and add it to the history list
		// had to move adding to current unique list into same as adding new element.
		// otehrwise it had issues.
		const li = document.createElement("li");
		if (historyUniqueToggle.checked == true && !uniqueIdeasCurr.includes(generatedIdea)) {
			// console.log('it does not iunclude');
			uniqueIdeasCurr.push(generatedIdea);
			unIdeaCurrCount.textContent = uniqueIdeasCurr.length;
			li.appendChild(document.createTextNode(generatedIdea));
			li.classList.add("list-group-item");
			ul.appendChild(li);
		} else if (historyUniqueToggle.checked == false) {
			switch (uniqueIdeasCurr.includes(generatedIdea)) {
				case false:
					uniqueIdeasCurr.push(generatedIdea);
					unIdeaCurrCount.textContent = uniqueIdeasCurr.length;
					break;
				default:
					break;
			}
			li.appendChild(document.createTextNode(generatedIdea));
			li.classList.add("list-group-item");
			ul.appendChild(li);
		}

		// print result
		idea.innerHTML = generatedIdea;

		// count ideas up
		ideaCounter++;
		currentIdeaCounter = ul.children.length;
		ideaCount.textContent = ideaCounter;
		curIdeaCount.textContent = currentIdeaCounter;
		return;
	} catch (e) {
		return errorPrint(e);
	}
}
function clearHistory() {
	try {
		console.log('clearing history');

		while (ul.firstChild) {
			ul.removeChild(ul.lastChild);
		}
		currentIdeaCounter = 0;
		curIdeaCount.textContent = currentIdeaCounter;
		uniqueIdeasCurr = [];
		unIdeaCurrCount.textContent = uniqueIdeasCurr.length;

		console.log('cleared');
	} catch (e) {
		return errorPrint(e);
	}
}
function arrRan(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function themeToggler() {
	try {
		switch (this.checked) {
			case true:
				themeingOptions.style.display = "block";
				oThemeWholesome.disabled = false;
				break;
			default:
				themeingOptions.style.display = "none";
				oThemeWholesome.disabled = true;
				break;
		}
	} catch (e) {
		return errorPrint(e);
	}
}
function drawingStyleToggle() {
	try {
		switch (this.checked) {
			case true:
				console.log('checked');
				drawingStyleOptions.style.display = "none";
				drNormal.disabled = true;
				drToon.disabled = true;
				drPixel.disabled = true;
				drReal.disabled = true;
				break;
			default:
				drawingStyleOptions.style.display = "block";
				drNormal.disabled = false;
				drToon.disabled = false;
				drPixel.disabled = false;
				drReal.disabled = false;
				break;
		}
	} catch (e) {
		return errorPrint(e);
	}
}
function errorPrint(e) {
	generator_stuff.innerHTML = "stuff broke.<br/>Check:<br/>" + e;
	return;
}