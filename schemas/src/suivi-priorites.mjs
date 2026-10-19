// n° 9. Exemple de suivi des priorités (données fictives)
// Barres empilées à 100 % : pour chaque production, la priorité Next time
// de la production précédente est-elle absente, présente ou corrigée ?
// Rampe séquentielle d'une seule teinte (vert élève), du clair au foncé,
// avec étiquettes directes : la couleur n'est jamais seule.

import { svg, INK, MUTE, rect, text } from './lib.mjs';

export const alt =
	"Graphique à barres empilées, données fictives pour une classe de 20 élèves : de la production 2 à la production 4, la part des priorités Next time corrigées passe de 4 à 10 élèves, et la part des priorités absentes de 9 à 3.";

const DATA = [
	{ label: 'Production 2', v: [9, 7, 4] },
	{ label: 'Production 3', v: [6, 8, 6] },
	{ label: 'Production 4', v: [3, 7, 10] },
];
const KEYS = ['absente', 'présente', 'corrigée'];
const FILL = ['#CBE6D2', '#6FB283', '#2E7D4A'];
const LABEL = [INK, INK, '#FFFFFF'];

export default function () {
	const W = 960;
	const H = 420;
	const x0 = 200;
	const x1 = 900;
	const total = 20;
	let b = '';

	b += text(40, 46, 'Reprise des priorités Next time', { size: 20, weight: 700 });
	b += text(40, 72, "Classe de 20 élèves, trois productions successives. Données fictives.", { fill: MUTE });

	// Légende
	let lx = x0;
	KEYS.forEach((k, i) => {
		b += rect(lx, 98, 18, 18, { fill: FILL[i], rx: 4 });
		b += text(lx + 26, 112, k);
		lx += 26 + k.length * 9 + 34;
	});

	DATA.forEach((d, row) => {
		const y = 140 + row * 72;
		b += text(x0 - 16, y + 29, d.label, { anchor: 'end', weight: 600 });
		let x = x0;
		d.v.forEach((n, i) => {
			const w = ((x1 - x0) * n) / total;
			const gap = i < d.v.length - 1 ? 2 : 0;
			const r = i === 0 || i === d.v.length - 1 ? 4 : 0;
			b += `<rect x="${x.toFixed(1)}" y="${y}" width="${(w - gap).toFixed(1)}" height="44" rx="${r}" fill="${FILL[i]}"><title>${d.label} · ${KEYS[i]} : ${n} élèves</title></rect>`;
			if (n >= 3) b += text(x + (w - gap) / 2, y + 28, `${n} ${KEYS[i]}${n > 1 ? 's' : ''}`, { anchor: 'middle', fill: LABEL[i], weight: 600 });
			x += w;
		});
	});

	b += `<line x1="${x0}" y1="132" x2="${x0}" y2="356" stroke="#BDBDBD" stroke-width="1"/>`;
	b += text(40, 396, 'Lecture attendue : la part des priorités corrigées augmente d\'une production à la suivante.', { weight: 600 });

	return svg({ w: W, h: H, title: 'Reprise des priorités Next time (données fictives)', desc: alt, body: b });
}
