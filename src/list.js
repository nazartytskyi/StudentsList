/*
submit.addEventListener('click',getFile);

var inputString;




function getFile () {
	inputFile = document.getElementById('file-input').files;

	var file = inputFile[0];
	var reader = new FileReader;

	reader.onloadend = function (evt) {
	  inputString = evt.target.result; // file content
	};

	reader.readAsText(file);

}
inputString = inputString.replace(/(\r\n|\n|\r)/gm, "<br />"); //replaces enters with <br/>
*/
const listName = 'c';
const submit = document.getElementById('submit-btn');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const date = document.getElementById('date');
const marks = document.getElementById('marks');
const list = document.getElementById('list');
const form = document.getElementById('form');
const sortBtn = document.getElementById('sort-btn');
const hideBtn = document.getElementById('hide-btn');
const showAllBtn = document.getElementById('show-all-btn');
const removeSomeBtn = document.getElementById('remove-some-btn');
const showYoungOldBtn = document.getElementById('show-young-old');
let hidden = false;

showYoungOldBtn.addEventListener('click', showYoungOld);
removeSomeBtn.addEventListener('click', removeSomeStudents);
showAllBtn.addEventListener('click', showAll);
hideBtn.addEventListener('click', hideWhoHas5);
sortBtn.addEventListener('click', sortByAvgMark);
form.addEventListener('submit', saveInCacheManual);

reloadList();

function saveInCacheManual() {
	let newList = [];
	let marksArr = [];

	for (let i = 0; i < marks.value.length; i = i+2) {
		marksArr.push(parseInt(marks.value[i]));
	}

	const student = {
		name: name.value,
		surname: surname.value,
		date: date.value,
		marks: marksArr,
		display: true
	};

	if (!isEmpty(listName)) {
		newList = JSON.parse(localStorage.getItem(listName));
	}

	newList.push(student);
	localStorage.setItem(listName, JSON.stringify(newList));

	reloadList();
}

function isEmpty(listName) { 
	return (localStorage.getItem(listName) === null || localStorage.getItem(listName) === '[]');
}

function reloadList() {
	list.innerHTML = '';

	if (isEmpty(listName)) {
		return false;
	}

	const cacheList = JSON.parse(localStorage.getItem(listName));

	for (let i = 0; i < cacheList.length; i++) {
		if (cacheList[i].display === false) {
			continue;
		}

		addNewListItem(cacheList[i].name, cacheList[i].surname, cacheList[i].date, cacheList[i].marks, cacheList[i].display)
	}
}

function addNewListItem(name, surname, date, marksArr) {
	const li = document.createElement('li');
	list.appendChild(li);
	
	for (let i = 0; i < 4; i++) {
		const p = document.createElement('p');
		li.appendChild(p);
		p.innerText = arguments[i];
	}

	const img = document.createElement('img')
	img.setAttribute('src', 'assets/img/x-button.png');
	li.appendChild(img);
	img.addEventListener('click', removeItem)
}

function removeItem() {
	if (hidden) {
		showAll();
		hidden = true;
	}

	let liArr = document.getElementsByTagName('li');

	for (let i in liArr) {
		if (this.parentNode.innerHTML === liArr[i].innerHTML) {
			var index = i;
			break;
		}
	}

	const cacheList = JSON.parse(localStorage.getItem(listName));

	let newList = [];

	for (let i in cacheList) {
		if (i === index) {
			continue;
		}

		newList.push(cacheList[i]);
	}

	localStorage.setItem(listName, JSON.stringify(newList));
	
	if (hidden) {
		hideWhoHas5();
	}

	reloadList();
}

function sortByAvgMark() {
	let cacheList = JSON.parse(localStorage.getItem(listName));

	cacheList.sort(function(a, b){
		let aAvg = 0;
		let bAvg = 0;

		for (let i in a.marks) {
			aAvg += a.marks[i];
		} 
		aAvg /= a.marks.length;

		for (let i in b.marks) {
			bAvg += b.marks[i];
		} 
		bAvg /= b.marks.length;

		return bAvg - aAvg;
	});	

	localStorage.setItem(listName, JSON.stringify(cacheList));
	reloadList();
}

function hideWhoHas5() {
	let cacheList = JSON.parse(localStorage.getItem(listName));

	for (let i in cacheList) {
		for (let j in cacheList[i].marks) {
			if (cacheList[i].marks[j] === 5) {
				cacheList[i].display = false;
				break;
			}
		}
	}

	hidden = true;
	localStorage.setItem(listName, JSON.stringify(cacheList));
	reloadList();
}

function showAll() {
	let cacheList = JSON.parse(localStorage.getItem(listName));

	for (let i in cacheList) {
		cacheList[i].display = true;
	}

	hidden = false;
	localStorage.setItem(listName, JSON.stringify(cacheList));
	reloadList();
}

function removeSomeStudents() {
	const cacheList = JSON.parse(localStorage.getItem(listName));
	let newList = []

	for (let i in cacheList) {
		if (cacheList[i].marks[0] === 3 && cacheList[i].marks[2] === 3) {
			continue;
		} else {
			newList.push(cacheList[i]);
		}
	}

	localStorage.setItem(listName, JSON.stringify(newList));
	reloadList();
}

function showYoungOld() {
	const cacheList = JSON.parse(localStorage.getItem(listName));

	for (let i in cacheList) {
		if (cacheList[i].display === false) {
			continue;
		}
		var minDate = cacheList[i].date;
		var maxDate = cacheList[i].date;
		break;
	}

	for (let i in cacheList) {
		if (cacheList[i].display === false) {
			continue;
		}

		if (cacheList[i].date > maxDate) {
			maxDate = cacheList[i].date;
		}

		if (cacheList[i].date < minDate) {
			minDate = cacheList[i].date;
		}
	}

	let liArr = document.getElementsByTagName('li');

	for (let i in liArr) {
		if (liArr[i].children[2].innerText === minDate || liArr[i].children[2].innerText === maxDate) {
			liArr[i].style.color  = 'red';
		}
	}
}




