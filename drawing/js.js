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

// random stuff
let ideaCounter,
	ideaCount,
	currentIdeaCounter,
	curIdeaCount,
	unIdeaCount;
const uniqueIdeas = [];

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

		// random stuff
		ideaCounter = 0;
		currentIdeaCounter = 0;
		ideaCount = document.getElementById("ideaCount");
		curIdeaCount = document.getElementById("curIdeaCount");
		unIdeaCount = document.getElementById("unIdeaCount");

		// run generation
		generate();
	}
	catch (e) {
		generator_stuff.innerHTML = "Site broke. Check: <br/>" + e;
		// alert('Site broke. Check: \n' + e);
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
		console.log(prompt1);
		console.log(prompt2);

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

		// print result
		idea.innerHTML = generatedIdea;

		// create new list element and add it to the history list
		const li = document.createElement("li");
		li.appendChild(document.createTextNode(randomIdea));
		li.classList.add("list-group-item");
		ul.appendChild(li);

		// count ideas up
		ideaCounter++;
		currentIdeaCounter++;
		ideaCount.textContent = ideaCounter;
		curIdeaCount.textContent = currentIdeaCounter;
		return;
	}
	catch (e) {
		generator_stuff.innerHTML = "stuff broke. Check: <br/>" + e;
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
		// alert('History cleared');
		console.log('cleared');
	}
	catch (e) {
		generator_stuff.innerHTML = "stuff broke. Check: <br/>" + e;
	}
}
function arrRan(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}