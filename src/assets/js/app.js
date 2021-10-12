const form = document.getElementById('operationForm');
const operationBlock = document.querySelector('.grid-container');

function createNewOperation(params) {
	const container = document.createElement('div');
	container.setAttribute('class', 'operation credit');

	const gridData = document.createElement('div');
	gridData.setAttribute('class', 'grid-x grid-padding-x align-middle');

	/* ---------- First column ---------- */
	const firstCol = document.createElement('div');
	firstCol.setAttribute('class', 'cell shrink');

	const firstColPicto = document.createElement('div');
	firstColPicto.setAttribute('class', 'picto');

	const firstColPictoImg = document.createElement('img');
	firstColPictoImg.setAttribute('src', params);
	firstColPictoImg.setAttribute('alt', params);

	firstColPicto.appendChild(firstColPictoImg);

	firstCol.appendChild(firstColPicto);
	gridData.appendChild(firstCol);

	/* ---------- Second column ---------- */
	const secondCol = document.createElement('div');
	secondCol.setAttribute('class', 'cell auto');

	const secondColBlock = document.createElement('div');

	// Create h2 element & insert it
	const secondColTitle = document.createElement('h2');
	const secondColTitleText = document.createTextNode(params);
	secondColTitle.appendChild(secondColTitleText);
	secondColBlock.appendChild(secondColTitle);

	// Create small element & insert it
	const secondColDesc = document.createElement('small');
	const secondColDescText = document.createTextNode(params);
	secondColDesc.appendChild(secondColDescText);
	secondColBlock.appendChild(secondColDesc);

    secondCol.appendChild(secondColBlock);
	gridData.appendChild(secondCol);

	/* ---------- Third column ---------- */
	const thirdCol = document.createElement('div');
	thirdCol.setAttribute('class', 'cell small-3 text-right');

	const thirdColBlock = document.createElement('div');

	// Create p element & insert it
	const thirdColParagraph = document.createElement('p');
	thirdColParagraph.setAttribute('class', 'count');
	const thirdColParagraphText = document.createTextNode(params + ' €');
	thirdColParagraph.appendChild(thirdColParagraphText);
	thirdColBlock.appendChild(thirdColParagraph);

	// Create small element & insert it
	const thirdColPercentage = document.createElement('small');
	const thirdColPercentageText = document.createTextNode(params + ' %');
	thirdColPercentage.appendChild(thirdColPercentageText);
	thirdColBlock.appendChild(thirdColPercentage);

    thirdCol.appendChild(thirdColBlock);
	gridData.appendChild(thirdCol);
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const formData = new FormData(form);
	console.log(formData);

	// for (var value of formData.values()) {
	//     console.log(value);
	//  }

	formData.forEach((value, key) => {
		if (key === 'montant' && value !== '') value = parseInt(value);
		console.log(value, typeof value, key);
	});

	operationBlock;

	// window.location = './';
	console.log('submit', e);
});
/**
 * init foundation
 */
$(document).ready(function () {
	$(document).foundation();
});
