// n° 5. Le curseur de correction
// De la correction directe à la correction indirecte : plus on va vers la
// droite, plus l'élève fait lui-même le travail de correction.

import { svg, R, INK, MUTE, rect, text, tblock } from './lib.mjs';

export const alt =
	"Échelle de correction, de directe à indirecte : plus la correction est indirecte, plus l'élève fait lui-même le travail de correction.";

const RED = '#C62828';
const GREY = '#8C8C8C';

export default function () {
	const W = 960;
	const H = 545;
	const xs = [330, 585, 840];
	let b = '';

	b += text(40, 46, 'Le curseur de correction', { size: 20, weight: 700 });
	b += text(40, 72, 'Pourquoi ne pas tout corriger pour tout le monde ?', { fill: MUTE });

	// Échelle
	b += `<defs><linearGradient id="g5" x1="0" x2="1"><stop offset="0" stop-color="${R.el.f}"/><stop offset="1" stop-color="${R.el.s}"/></linearGradient></defs>`;
	b += rect(xs[0] - 30, 140, xs[2] - xs[0] + 60, 10, { fill: 'url(#g5)', rx: 5 });
	const names = ['Directe', 'Mixte', 'Indirecte'];
	xs.forEach((x, i) => {
		b += `<circle cx="${x}" cy="145" r="13" fill="#fff" stroke="${R.el.s}" stroke-width="3"/>`;
		b += text(x, 118, names[i], { size: 20, weight: 700, anchor: 'middle' });
	});

	// Exemples de correction
	const ex = [
		`we <tspan fill="${GREY}" text-decoration="line-through">watch</tspan> <tspan fill="${RED}" font-weight="700">watched</tspan>`,
		`<tspan fill="${GREY}" text-decoration="line-through">watch</tspan> <tspan fill="${RED}" font-weight="700">watched</tspan> · If I <tspan text-decoration="underline">am</tspan> [S]`,
		`we <tspan text-decoration="underline">watch</tspan> <tspan font-weight="700">[T]</tspan>`,
	];
	const exNote = ['erreur barrée, correction donnée', 'directe hors programme, codée sur la structure étudiée', 'erreur soulignée et codée'];
	xs.forEach((x, i) => {
		b += rect(x - 118, 176, 236, 46, { fill: '#fff', stroke: '#D6D6D6', sw: 1.2, rx: 8 });
		b += `<text x="${x}" y="205" text-anchor="middle" font-size="16" fill="${INK}" xml:space="preserve">${ex[i]}</text>`;
	});
	b += tblock(xs[0], 246, [{ t: exNote[0], fill: MUTE }]);
	b += tblock(xs[1], 256, [{ t: 'directe hors programme,', fill: MUTE }, { t: 'codée sur la structure étudiée', fill: MUTE }]);
	b += tblock(xs[2], 246, [{ t: exNote[2], fill: MUTE }]);

	// Lignes : pour qui, ce que fait l'élève
	const rowsY = [318, 384];
	b += `<line x1="40" y1="290" x2="920" y2="290" stroke="#E6E6E6"/>`;
	b += `<line x1="40" y1="352" x2="920" y2="352" stroke="#E6E6E6"/>`;
	b += `<line x1="40" y1="416" x2="920" y2="416" stroke="#E6E6E6"/>`;
	b += tblock(40, rowsY[0], [{ t: 'Pour qui ?', weight: 700 }], { anchor: 'start' });
	b += tblock(40, rowsY[1], [{ t: "Ce que fait", weight: 700 }, { t: "l'élève", weight: 700 }], { anchor: 'start' });
	const who = ['Élève en difficulté', 'Élève intermédiaire', 'Élève avancé·e'];
	const does = [
		['Recopie le passage', 'corrigé et l\'explique'],
		['Corrige seul·e', 'les erreurs signalées'],
		['Corrige seul·e', 'et justifie'],
	];
	xs.forEach((x, i) => {
		b += tblock(x, rowsY[0], [{ t: who[i], fill: R.el.t, weight: 600 }]);
		b += tblock(x, rowsY[1], does[i]);
	});

	// Effort de l'élève : un coin qui s'élargit vers la droite
	b += `<path d="M${xs[0] - 30},466 L${xs[2] + 40},446 L${xs[2] + 40},486 Z" fill="url(#g5)"/>`;
	b += `<path d="M${xs[2] + 40},440 L${xs[2] + 70},466 L${xs[2] + 40},492 Z" fill="${R.el.s}"/>`;
	b += tblock(40, 466, [{ t: "Effort de", weight: 700, fill: R.el.t }, { t: "l'élève", weight: 700, fill: R.el.t }], { anchor: 'start' });
	b += text(xs[1], 520, "plus la correction est indirecte, plus l'élève corrige lui-même", { anchor: 'middle', fill: INK, weight: 600 });

	return svg({ w: W, h: H, title: 'Le curseur de correction', desc: alt, body: b });
}
