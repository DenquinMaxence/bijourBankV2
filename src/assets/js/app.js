function isDefaultDataValid() {
	const localOperationData = JSON.parse(localStorage.getItem('operationData'));
	if (
		localOperationData !== null &&
		typeof localOperationData === 'object' &&
		localOperationData.length > 0
	)
		return localOperationData;
	else
		return [
			{
				operator: 'credit',
				titre: 'Réalisation de site web',
				desc: 'ma mairie',
				montant: 1800,
			},
			{
				operator: 'debit',
				titre: 'Restaurant',
				desc: 'mc do',
				montant: 15,
			},
			{
				operator: 'credit',
				titre: 'Vente Boncoin',
				desc: 'jeu PS5',
				montant: 25,
			},
			{
				operator: 'debit',
				titre: 'Loyer',
				desc: "mois d'août",
				montant: 450,
			},
			{
				operator: 'credit',
				titre: 'Salaire',
				desc: 'mois de septembre',
				montant: 1200,
			},
		];
}
const operationData = isDefaultDataValid();

const form = document.getElementById('operationForm');
const operationBlock = document.querySelector('main div.grid-container');

/**
 * Allows you to calculate the total amount of the balance and then display it with a status
 *
 * @return void
 */
function calculSold() {
	const soldText = document.getElementById('solde');
	const soldStatus = document.getElementById('status');

	let creditTotal = 0;
	let debitTotal = 0;
	operationData.forEach((item) => {
		item.operator === 'credit'
			? (creditTotal = creditTotal + item.montant)
			: (debitTotal = debitTotal + item.montant);
	});

	const soldTotal = creditTotal - debitTotal;

	soldText.innerHTML = soldTotal.toLocaleString('fr') + '.00€';

	soldTotal > 0
		? ((soldStatus.classList = 'good'), (soldStatus.innerHTML = 'On est bien 😃'))
		: ((soldStatus.classList = 'bad'), (soldStatus.innerHTML = "C'est la merde 🔥"));
}

/**
 * Display new operation & store it in localStorage
 *
 * @param {Object} Object Operation object
 * @param {Boolean} addItToLocalStorage Boolean param to define if we add it in localStorage
 */
function createNewOperation({ operator, titre, desc, montant }, addItToLocalStorage) {
	addItToLocalStorage = addItToLocalStorage || false;

	const img =
		operator === 'credit' ? './assets/images/sac-dargent.png' : './assets/images/depenses.png';

	// _________________________________________________________________________________________________
	/* First possibility to insert a new operation */

	// const container = document.createElement('div');
	// container.setAttribute('class', `operation ${operator}`);

	// const gridData = document.createElement('div');
	// gridData.setAttribute('class', 'grid-x grid-padding-x align-middle');

	// /* ---------- First column ---------- */
	// const firstCol = document.createElement('div');
	// firstCol.setAttribute('class', 'cell shrink');

	// const firstColPicto = document.createElement('div');
	// firstColPicto.setAttribute('class', 'picto');

	// const firstColPictoImg = document.createElement('img');
	// firstColPictoImg.setAttribute('src', img);
	// firstColPictoImg.setAttribute('alt', operator);

	// firstColPicto.appendChild(firstColPictoImg);

	// firstCol.appendChild(firstColPicto);
	// gridData.appendChild(firstCol);

	// /* ---------- Second column ---------- */
	// const secondCol = document.createElement('div');
	// secondCol.setAttribute('class', 'cell auto');

	// const secondColBlock = document.createElement('div');

	// // Create h2 element & insert it
	// const secondColTitle = document.createElement('h2');
	// const secondColTitleText = document.createTextNode(titre);
	// secondColTitle.appendChild(secondColTitleText);
	// secondColBlock.appendChild(secondColTitle);

	// // Create small element & insert it
	// const secondColDesc = document.createElement('small');
	// const secondColDescText = document.createTextNode(desc);
	// secondColDesc.appendChild(secondColDescText);
	// secondColBlock.appendChild(secondColDesc);

	// secondCol.appendChild(secondColBlock);
	// gridData.appendChild(secondCol);

	// /* ---------- Third column ---------- */
	// const thirdCol = document.createElement('div');
	// thirdCol.setAttribute('class', 'cell small-3 text-right');

	// const thirdColBlock = document.createElement('div');

	// // Create p element & insert it
	// const thirdColParagraph = document.createElement('p');
	// thirdColParagraph.setAttribute('class', 'count');
	// const thirdColParagraphText = document.createTextNode(montant + ' €');
	// thirdColParagraph.appendChild(thirdColParagraphText);
	// thirdColBlock.appendChild(thirdColParagraph);

	// // Create small element & insert it
	// const thirdColPercentage = document.createElement('small');
	// const thirdColPercentageText = document.createTextNode('changeit' + ' %');
	// thirdColPercentage.appendChild(thirdColPercentageText);
	// thirdColBlock.appendChild(thirdColPercentage);

	// thirdCol.appendChild(thirdColBlock);
	// gridData.appendChild(thirdCol);

	// /* ---------- Insert operation in container ---------- */
	// container.appendChild(gridData);
	// operationBlock.prepend(container);

	// _________________________________________________________________________________________________
	/* Second possibility to insert a new operation */

	const html = `
		<div class="operation ${operator}">
			<div class="grid-x grid-padding-x align-middle">
				<div class="cell shrink">
					<div class="picto">
						<img src="${img}" alt="${operator}" />
					</div>
				</div>
				<div class="cell auto">
					<div>
						<h2>${titre}</h2>
						<small>${desc}</small>
					</div>
				</div>
				<div class="cell small-3 text-right">
					<div>
						<p class="count">${montant} €</p>
						<small>100%</small>
					</div>
				</div>
			</div>
		</div>
  	`;

	operationBlock.insertAdjacentHTML('afterbegin', html);

	/* ---------- Update operationData localStorage ---------- */
	if (addItToLocalStorage) operationData.push({ operator, titre, desc, montant });
	localStorage.setItem('operationData', JSON.stringify(operationData));

	calculSold();
}

'hashchange DOMContentLoaded'.split(' ').forEach((listener) => {
	window.addEventListener(listener, () => {
		const categorySwitch = (operator) => {
			let link = document.querySelector(`[href="#${operator}"]`);
			if (link.classList.value === '') {
				document.querySelectorAll('a.active').forEach((item) => {
					item.classList.remove('active');
				});
				link.classList.add('active');
			}
			operationBlock.innerHTML = '';

			if (operator !== '') {
				operationData.forEach((value, key) => {
					if (operationData[key].operator === operator)
						createNewOperation(operationData[key]);
				});
			}
		};

		switch (window.location.hash) {
			case '':
				categorySwitch('');
				init();
				break;

			case '#credit':
				categorySwitch('credit');
				break;

			case '#debit':
				categorySwitch('debit');

				break;

			default:
				break;
		}
	});
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const formData = new FormData(form);
	const dataToInsert = {};

	formData.forEach((value, key) => {
		if (key === 'montant' && value !== '') value = parseInt(value);
		dataToInsert[key] = value;
	});

	createNewOperation(dataToInsert, true);

	// Use to reset form when submited
	form.reset();
	location.reload();
});

function init() {
	if (operationData.length > 0) {
		operationData.forEach((value, key) => {
			createNewOperation(operationData[key]);
		});
	}
}

init();

/**
 * init foundation
 */
$(document).ready(function () {
	$(document).foundation();
});
