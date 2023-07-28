const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function markMatched(str, fruit) {
	const index = fruit.toUpperCase().indexOf(str.toUpperCase());
	const beforeSlice = fruit.slice(0,index);
	const afterSlice = fruit.slice(index+str.length);
	const midSlice = fruit.slice(index,index+str.length);
	// console.log('before', beforeSlice, 'after', afterSlice);
	markedFruit = beforeSlice + '<span class="mark">' + midSlice +  '</span>' + afterSlice;
	// console.log(newFruit);
	return(markedFruit);
}

function search(str) {
	const strUpper = str.toUpperCase();
	const results = fruit.filter(aFruit => (aFruit.toUpperCase().indexOf(strUpper) !== -1));
	const markedResults = results.map(function (res) { return (markMatched(str, res));});
	return markedResults;
}

function searchHandler(e) {
	// console.log(input.value);
	let results = [];
	if (input.value !== "") {                /* if no input text, then no suggestions */
		results = search(input.value);
	}
	showSuggestions(results, null);
}

function addSuggestion(suggestionText) {
	const suggestionLi = document.createElement('li');
	suggestionLi.innerHTML = suggestionText;
	suggestions.appendChild(suggestionLi);
}

function removeSuggestions() {
	const items = suggestions.querySelectorAll('li');
	items.forEach(function (suggestion) {
		// console.log('need to remove', suggestion);
		suggestion.remove();
	})
}

function showSuggestions(results, inputVal) {
	removeSuggestions();
	results.forEach(function (suggestionText) {
		// console.log('need to add', suggestionText);
		addSuggestion(suggestionText);
	})
}

function useSuggestion(e) {
	if (e.target.tagName === 'LI') {
		input.value = e.target.innerText;
		removeSuggestions();
	}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);