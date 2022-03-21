let fs;
let fiel;
let idea;
let predefined;
let ul;
(async function start() {
	const but = document.getElementById("generate");
	const history = document.getElementById("clear-history");
	but.addEventListener("click", generate);
	history.addEventListener("click", clearHistory);
	idea = document.getElementById("idea");
	predefined = document.getElementById("predefined");
	// fiel = require('./defined_ideas.json');
	fiel = await (await fetch('./defined_ideas.json')).json();
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
	console.log('shite');
	if (predefined.checked == true) {
		console.log('checked');
	}
	console.log(fiel.Ideas);
	const ideas = fiel.Ideas;
	const randomIdea = arrRan(ideas);
	idea.innerHTML = randomIdea;
	const li = document.createElement("li");
	li.appendChild(document.createTextNode(randomIdea));
	ul.appendChild(li);
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

