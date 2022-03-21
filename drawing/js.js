// initialize some reusables
// fs is not needed casue we are not doing express stuff. Yet. Might in the future
// let fs;
let fiel;
let idea;
let predefined;
let ul;

// document start basically.
// i know im using it on chrome so... i dont need to check "derp is this old ie derp"
(async function start() {
	const but = document.getElementById("generate");
	const history = document.getElementById("clear-history");
	but.addEventListener("click", generate);
	history.addEventListener("click", clearHistory);
	idea = document.getElementById("idea");
	predefined = document.getElementById("predefined");
	// fiel = require('./defined_ideas.json');
	fiel = await (await fetch('./defined_ideas.json')).json();
	// had to convert from promise to an async/await to resovle the response instantly. 

	// .then(res => {
	// 	// fiel = Promise.resolve(res.json());
	// 	fiel = res.json();
	// 	console.log(fiel);
	// }).then(jdata => {
	// 	// fiel = jdata;
	// 	console.log(jdata);
	// });
	console.log(fiel);
	idea.innerHTML = arrRan(fiel.Ideas);
	predefined.checked = true;
	ul = document.getElementById("history-list");
})();
function generate() {
	// console.log('shite');
	// if (predefined.checked == true) {
	// 	console.log('checked');
	// }
	// console.log(fiel.Ideas);

	// create new predefined idea
	const ideas = fiel.Ideas;
	const randomIdea = arrRan(ideas);
	idea.innerHTML = randomIdea;
	const li = document.createElement("li");
	li.appendChild(document.createTextNode(randomIdea));
	ul.appendChild(li);

	// to create a smooth transition, we need to create 2 texts. One that will be overriden... orrrrrrr....... orrr....
}
function clearHistory() {
	console.log('clearing');
	// ul.textContent = "";
	while (ul.firstChild) {
		ul.removeChild(ul.lastChild);
	}
}
function arrRan(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

