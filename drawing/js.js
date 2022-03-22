'use strict';
// initialize some reusables
// fs is not needed casue we are not doing express stuff. Yet. Might in the future
// let fs;

// generator stuff wrapper
let generator_stuff;

// file
let fiel;

// generated idea
let idea;

// ideas from file
let preDefIdeas;
let sittingIdeas;
let objectIdeas;
let locationIdeas;
let charactersIdeas;

// prompt options
let prWriting;
let prDrawing;

// idea options
let predefined;
let sitting;

// list
let ul;

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
		// give the idea to the html... Buuuut... to smooth transition, we gonna do some retarded shit here.
		// idea.style.transform = "scale(0, 0)";

		// okay so smooth transition didnt work out...
		// setTimeout(changeIdea(), 1000);
		// idea.style.transform = "scale(1, 1)";
		// if (predefined.checked == true) {
		// 	randomIdea = arrRan(preDefIdeas);
		// }

		// generate idea based on the options
		// switch (prDrawing.checked) {
		// 	case true:
		// 		randomIdea += "Write about";
		// 		break;
		// }

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
		} else {
			generatedIdea += " then " + prompt2 + " about it";
		}

		// print result
		idea.innerHTML = generatedIdea;

		// create new list element and add it to the history list
		const li = document.createElement("li");
		li.appendChild(document.createTextNode(randomIdea));
		li.classList.add("list-group-item");
		ul.appendChild(li);
		return;
	}
	catch (e) {
		generator_stuff.innerHTML = "stuff broke. Check: <br/>" + e;
	}
}
function clearHistory() {
	console.log('clearing');
	while (ul.firstChild) {
		ul.removeChild(ul.lastChild);
	}
}
function arrRan(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}