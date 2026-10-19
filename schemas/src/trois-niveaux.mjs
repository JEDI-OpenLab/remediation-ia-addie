// n° 6. Différencier, individualiser, personnaliser
// Trois niveaux d'adaptation, du moins au plus coûteux en temps pour
// l'enseignant·e ; le troisième devient accessible avec l'IA, à condition
// de valider.

import { svg, R, INK, MUTE, rect, text, tblock, person, doc, spark, teacher } from './lib.mjs';

export const alt =
	"Trois niveaux d'adaptation : différencier selon des profils, individualiser par groupes de besoin, personnaliser pour chaque élève, le plus coûteux en temps et celui que l'IA rend accessible.";

export default function () {
	const W = 960;
	const H = 540;
	const cards = [
		{ x: 30, title: 'Différencier', sub: ['des supports variés', 'pour des profils'], cost: 1, costTxt: 'quelques supports' },
		{ x: 340, title: 'Individualiser', sub: ['des groupes de besoin', '(un Error Hunt pour la classe)'], cost: 2, costTxt: 'une activité par groupe' },
		{ x: 650, title: 'Personnaliser', sub: ['une réponse par élève,', 'sur son propre texte'], cost: 3, costTxt: '10 à 15 min par copie' },
	];
	const CW = 280;
	let b = '';

	b += text(40, 46, 'Différencier, individualiser, personnaliser', { size: 20, weight: 700 });
	b += text(40, 72, "Pourquoi l'IA change-t-elle quelque chose ici ?", { fill: MUTE });

	cards.forEach((c, i) => {
		const ia = i === 2;
		b += rect(c.x, 96, CW, 410, { fill: '#fff', stroke: ia ? R.ia.s : '#D6D6D6', sw: ia ? 2 : 1.3, rx: 16 });
		b += text(c.x + CW / 2, 134, c.title, { size: 20, weight: 700, anchor: 'middle' });
		b += tblock(c.x + CW / 2, 172, c.sub);

		// Illustration
		const ox = c.x + 30;
		const oy = 214;
		b += rect(ox - 10, oy - 10, CW - 40, 128, { fill: '#F7F7F5', rx: 12 });
		if (i === 0) {
			const tints = [R.ens.f, '#FFFFFF', '#F3D9B5'];
			[0, 1, 2].forEach((k) => {
				const gx = ox + 18 + k * 76;
				b += doc(gx + 6, oy + 6, R.ens.s, { w: 30, h: 38, fill: tints[k], lines: 0 });
				b += text(gx + 21, oy + 32, 'ABC'[k], { anchor: 'middle', weight: 700, fill: R.ens.t });
				for (let p = 0; p < 2; p++) b += person(gx + 8 + p * 22, oy + 82, R.el.s, 0.9);
			});
		} else if (i === 1) {
			[0, 1, 2].forEach((k) => {
				const gx = ox + 38 + k * 76;
				b += `<ellipse cx="${gx}" cy="${oy + 72}" rx="34" ry="30" fill="${R.el.f}"/>`;
				for (let p = 0; p < 3; p++) b += person(gx - 16 + p * 16, oy + 72 + (p === 1 ? -10 : 6), R.el.s, 0.75);
				b += doc(gx - 11, oy + 2, R.ens.s, { w: 22, h: 28, fill: R.ens.f, lines: 2 });
			});
		} else {
			for (let r = 0; r < 3; r++)
				for (let k = 0; k < 6; k++) {
					const gx = ox + 10 + k * 36;
					const gy = oy + 12 + r * 38;
					b += person(gx + 4, gy + 12, R.el.s, 0.6);
					b += doc(gx + 13, gy + 1, R.ia.s, { w: 13, h: 17, fill: R.ia.f, lines: 1 });
				}
		}

		// Coût en temps pour l'enseignant·e
		b += text(c.x + 24, 378, "Temps pour l'enseignant·e", { weight: 700 });
		for (let k = 0; k < 3; k++) b += rect(c.x + 24 + k * 78, 392, 72, 14, { fill: k < c.cost ? R.ens.s : '#ECECEC', rx: 7 });
		b += text(c.x + 24, 432, c.costTxt, { fill: MUTE });
	});

	// Bandeau IA sur la troisième carte
	const c3 = cards[2].x;
	b += rect(c3 + 14, 446, CW - 28, 48, { fill: R.ia.f, stroke: R.ia.s, sw: 1.5, rx: 10 });
	b += spark(c3 + 36, 470, R.ia.s, 0.8);
	b += tblock(c3 + 54, 470, [{ t: "Possible avec l'IA, si l'on", fill: R.ia.t, weight: 700 }, { t: 'valide : 2 à 3 min / fichier', fill: R.ia.t, weight: 700 }], { anchor: 'start' });

	return svg({ w: W, h: H - 10, title: 'Différencier, individualiser, personnaliser', desc: alt, body: b });
}
