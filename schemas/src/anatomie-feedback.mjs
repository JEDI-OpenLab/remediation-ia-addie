// n° 2. Anatomie d'un fichier de feedback
// Maquette du fichier reçu par l'élève, annotée en marge avec les trois
// questions du feedback efficace (Hattie et Timperley, 2007). Exemple fictif.

import { svg, R, INK, MUTE, rect, text, tblock, path } from './lib.mjs';

export const alt =
	"Maquette d'un fichier de feedback inventé, sans lien avec les copies de la classe : le texte de l'élève annoté, une ligne par critère, une réussite nommée et une priorité. Les annotations relient chaque partie aux trois questions du feedback efficace.";

const RED = '#C62828';
const GREY = '#8C8C8C';

// Fragments de texte : [texte, style] ; style 'x' = barré, 'c' = correction
function rich(x, y, parts) {
	const spans = parts
		.map(([t, s]) => {
			const e = t.replace(/&/g, '&amp;');
			if (s === 'x') return `<tspan fill="${GREY}" text-decoration="line-through">${e}</tspan>`;
			if (s === 'c') return `<tspan fill="${RED}" font-weight="700">${e}</tspan>`;
			return `<tspan>${e}</tspan>`;
		})
		.join('');
	return `<text x="${x}" y="${y}" font-size="16" fill="${INK}" xml:space="preserve">${spans}</text>`;
}

function bracket(x, y0, y1, side, color) {
	const d = side === 'left' ? -8 : 8;
	return path(`M${x - d},${y0} H${x} V${y1} H${x - d}`, { color, end: false, sw: 2.2 });
}

function callout(x, cy, anchor, q, lines, color) {
	return tblock(x, cy, [{ t: q, size: 20, weight: 700, fill: color }, ...lines.map((t) => ({ t, fill: INK }))], { anchor });
}

export default function () {
	const W = 960;
	const H = 650;
	const X = 250; // marge gauche du texte dans la maquette
	let b = '';

	b += text(40, 46, "Anatomie d'un fichier de feedback", { size: 20, weight: 700 });
	b += text(40, 72, 'Ce que reçoit chaque élève, et pourquoi sous cette forme', { fill: MUTE });

	// Feuille
	b += rect(228, 96, 504, 512, { fill: '#fff', stroke: '#D6D6D6', sw: 1.2, rx: 10, extra: 'filter="url(#shadow)"' });

	b += text(X, 130, 'Ton texte', { weight: 700, fill: MUTE });
	b += rich(X, 160, [['Dear Sam, yesterday we '], ['watch', 'x'], [' '], ['watched', 'c'], [' a short']]);
	b += rich(X, 184, [['film about a man who '], ['search', 'x'], [' '], ['is searching', 'c']]);
	b += rich(X, 208, [['for happiness. Although he '], ['buy', 'x'], [' '], ['buys', 'c'], [' many']]);
	b += rich(X, 232, [['things, he is never happy. If I '], ['am', 'x'], [' '], ['were', 'c'], [' him,']]);
	b += rich(X, 256, [['I would stop '], ['to buy', 'x'], [' '], ['buying', 'c'], [' things.']]);

	b += `<line x1="${X}" y1="280" x2="710" y2="280" stroke="#E2E2E2" stroke-width="1.5"/>`;
	b += text(X, 312, 'Ton évaluation', { weight: 700, fill: MUTE });

	const rows = [
		['Réalisation de la tâche', '3/4', 'Lettre bien adressée.'],
		['Appui sur le document', '2/4', 'Cite une scène précise.'],
		['Structure étudiée', '1/3', 'Prétérit après « if ».'],
		['Correction de la langue', '2/4', 'Revois les verbes en -ed.'],
		['Lexique', '2/3', 'Simple et juste.'],
		['Organisation', '1/2', 'Plus de connecteurs.'],
	];
	// Le fichier présente l'évaluation dans un tableau, une ligne par critère
	b += rect(X - 8, 324, 476, rows.length * 25 + 4, { fill: 'none', stroke: '#CFCFCF', sw: 1.2, rx: 4 });
	for (let i = 1; i < rows.length; i++) b += `<line x1="${X - 8}" y1="${326 + i * 25}" x2="${X + 468}" y2="${326 + i * 25}" stroke="#E2E2E2"/>`;
	for (const vx of [442, 482]) b += `<line x1="${vx}" y1="324" x2="${vx}" y2="${328 + rows.length * 25}" stroke="#E2E2E2"/>`;
	rows.forEach(([crit, note, com], i) => {
		const y = 342 + i * 25;
		b += text(X, y, crit, { weight: 600 });
		b += text(450, y, note, { weight: 700 });
		b += text(492, y, com);
	});
	b += text(X, 502, 'Total : 11/20 (note bonus)', { weight: 700 });

	b += `<text x="${X}" y="540" font-size="16" fill="${INK}"><tspan font-weight="700" fill="${INK}">Well done</tspan> : « although » oppose bien deux idées.</text>`;
	b += `<text x="${X}" y="574" font-size="16" fill="${INK}"><tspan font-weight="700" fill="${INK}">Next time</tspan> : après « If », mets le prétérit.</text>`;

	// Annotations, marge gauche
	b += bracket(238, 146, 262, 'left', LINE_A);
	b += callout(222, 204, 'end', 'Son texte', ['erreurs barrées,', 'corrections en rouge'], MUTE);

	b += bracket(238, 328, 472, 'left', INK);
	b += callout(222, 400, 'end', 'Où vais-je ?', ['les critères', 'de la grille, connus', 'avant d\'écrire'], INK);

	b += bracket(238, 526, 546, 'left', LINE_A);
	b += tblock(222, 536, ['une réussite nommée'], { anchor: 'end' });

	// Annotations, marge droite
	b += bracket(722, 328, 510, 'right', INK);
	b += callout(738, 419, 'start', 'Où en suis-je ?', ['une note et une phrase', 'par critère, puis', 'le total'], INK);

	b += bracket(722, 558, 582, 'right', INK);
	b += callout(738, 562, 'start', 'Et ensuite ?', ['une seule priorité,', 'formulée comme', 'une action'], INK);

	b += text(480, 634, "Exemple inventé, sans lien avec les copies de la classe. Questions d'après Hattie et Timperley (2007).", { fill: MUTE, anchor: 'middle' });

	return svg({ w: W, h: H, title: "Anatomie d'un fichier de feedback", desc: alt, body: b });
}

const LINE_A = '#9A9A9A';
