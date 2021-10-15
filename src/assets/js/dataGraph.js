// <block:setup:1>
const operationsObject = JSON.parse(localStorage.getItem('operationData')) || [];
const datapoints = [];
if (operationsObject.length > 0) {
	operationsObject.forEach((item, key) => {
		console.log(item, key);
		if (datapoints.length > 0) {
			datapoints[key] =
				item.operator === 'credit'
					? datapoints[key - 1] + item.montant
					: datapoints[key - 1] - item.montant;
		} else {
			datapoints[key] = item.operator === 'debit' ? -item.montant : item.montant;
		}
	});
}
const DATA_COUNT = datapoints.length + 2;
const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
	labels.push(operationsObject[i] !== undefined ? operationsObject[i].titre : i.toString());
}
const data = {
	labels: labels,
	datasets: [
		{
			label: 'Compte',
			data: datapoints,
			borderColor: 'purple',
			// fill: true,
			cubicInterpolationMode: 'monotone',
		},
	],
};
// </block:setup>

// <block:config:0>
const config = {
	type: 'line',
	data: data,
	options: {
		elements: {
			point: {
				radius: 0,
			},
		},
		responsive: true,
		plugins: {
			legend: false,
			//   title: {
			//     display: true,
			//     text: "Chart.js Line Chart - Cubic interpolation mode",
			//   },
		},
		interaction: {
			intersect: false,
		},
		scales: {
			x: {
				display: false,
			},
			y: {
				display: false,
			},
		},
	},
};

/*Le contexte du canevas HTML */
const context = document.getElementById('myChart').getContext('2d');
/* Création du graphique */
const chart = new Chart(context, config);

/* Générer des données aléatoires */
function generateData() {
	let randomTemperature = (Math.random() * Math.floor(50)).toFixed(2); // Deux chiffres après la virgule
	addTemperature(new Date().toLocaleTimeString(), randomTemperature);
}

function addTemperature(time, temperature) {
	/* Ajoute la valeur en X */
	config.data.labels.push(time);

	/* Ajoute la valeur */
	config.data.datasets[0].data.push(temperature);

	/* Rafraichir le graphique */
	chart.update();
}
