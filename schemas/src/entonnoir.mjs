// n° 7. L'IA enrichit, l'enseignant·e réduit
// Un entonnoir : la proposition chargée de l'IA passe trois filtres de
// l'enseignant·e ; la version retenue est la plus simple.

import { svg, R, INK, MUTE, rect, text, tblock, path, spark, teacher } from './lib.mjs';

export const alt =
	"Entonnoir : la proposition de l'IA, chargée de groupes, de rôles, de cartes et d'un tournoi, passe trois filtres de l'enseignant·e (simplicité, faisabilité, vérification). La version retenue est une fiche unique ; la version 1 est refusée, la version 3 décline la version retenue à distance.";

export default function () {
	const W = 960;
	const H = 690;
	let b = '';

	b += text(40, 46, "L'IA enrichit, l'enseignant·e réduit", { size: 20, weight: 700 });
	b += text(40, 72, "Une séance de reprise, trois versions en une heure", { fill: MUTE });

	// Proposition de l'IA
	const chips = ['groupes', 'rôles', 'cartes', 'mur', 'tournoi de questions', 'diaporama'];
	b += rect(220, 96, 520, 112, { fill: R.ia.f, stroke: R.ia.s, rx: 14 });
	b += spark(248, 124, R.ia.s, 0.85);
	b += text(268, 130, "Proposition de l'IA, enrichie", { weight: 700, fill: R.ia.t });
	let x = 244;
	let y = 152;
	for (const c of chips) {
		const w = c.length * 8.4 + 26;
		if (x + w > 724) {
			x = 244;
			y += 34;
		}
		b += rect(x, y, w, 26, { fill: '#fff', stroke: R.ia.s, sw: 1.2, rx: 13 });
		b += text(x + w / 2, y + 18, c, { anchor: 'middle', fill: R.ia.t });
		x += w + 8;
	}

	// Entonnoir
	const top = 226;
	const bot = 494;
	const xl0 = 220;
	const xr0 = 740;
	const xl1 = 404;
	const xr1 = 556;
	const at = (yy) => {
		const k = (yy - top) / (bot - top);
		return [xl0 + (xl1 - xl0) * k, xr0 + (xr1 - xr0) * k];
	};
	b += `<path d="M${xl0},${top} L${xr0},${top} L${xr1},${bot} L${xl1},${bot} Z" fill="${R.ens.f}" stroke="${R.ens.s}" stroke-width="2"/>`;
	b += teacher(480, top + 34, R.ens.s, 1);
	b += text(480, top + 74, "Les filtres de l'enseignant·e", { anchor: 'middle', weight: 700, fill: R.ens.t });

	const filters = [
		[318, 'Simple ?', 'une tâche par bloc', ['tournoi', 'rôles']],
		[384, 'Faisable en classe ?', 'temps, absents', ['groupes', 'mur']],
		[450, 'Contenus vérifiés ?', "documents lus par l'IA", ['cartes']],
	];
	for (const [fy, q, d, out] of filters) {
		const [l, r] = at(fy);
		b += `<line x1="${l + 6}" y1="${fy}" x2="${r - 6}" y2="${fy}" stroke="${R.ens.s}" stroke-width="2" stroke-dasharray="6 5"/>`;
		b += tblock(r + 22, fy, [{ t: q, weight: 700, fill: R.ens.t }, { t: d, fill: INK }], { anchor: 'start' });
		// Éléments écartés, à gauche
		let ox = l - 22;
		for (const o of out.slice().reverse()) {
			const w = o.length * 8.4 + 26;
			ox -= w;
			b += rect(ox, fy - 13, w, 26, { fill: '#fff', stroke: '#BDBDBD', sw: 1.2, rx: 13, dash: '4 4' });
			b += `<text x="${ox + w / 2}" y="${fy + 5}" text-anchor="middle" font-size="16" fill="${MUTE}" text-decoration="line-through">${o}</text>`;
			ox -= 8;
		}
	}

	// Version refusée
	b += rect(36, 96, 168, 112, { fill: R.conf.f, stroke: R.conf.s, rx: 14 });
	b += tblock(120, 152, [
		{ t: 'Version 1', weight: 700, fill: R.conf.t },
		{ t: 'groupes, cartes,', fill: INK },
		{ t: 'mur, tournoi', fill: INK },
		{ t: '« on ne comprend rien »', fill: R.conf.t, italic: true },
	]);
	b += path(`M120,208 V250`, { color: R.conf.s, end: false, sw: 2 });
	b += `<circle cx="120" cy="262" r="12" fill="#fff" stroke="${R.conf.s}" stroke-width="2.5"/><path d="M112,254 L128,270" stroke="${R.conf.s}" stroke-width="2.5"/>`;
	b += text(140, 268, 'refusée', { weight: 700, fill: R.conf.t });

	// Version retenue
	b += path(`M480,${bot} V${bot + 26}`, { color: R.ens.s, marker: 'ens', sw: 2.5 });
	b += rect(330, bot + 30, 300, 78, { fill: R.el.f, stroke: R.el.s, rx: 14 });
	b += tblock(480, bot + 69, [
		{ t: 'Version 2, retenue', weight: 700, fill: R.el.t },
		{ t: 'une fiche unique,', fill: INK },
		{ t: 'les documents un par un', fill: INK },
	]);
	b += path(`M630,${bot + 69} H690`, { color: R.ens.s, marker: 'ens', sw: 2 });
	b += rect(694, bot + 40, 210, 58, { fill: '#fff', stroke: R.el.s, rx: 14, dash: '6 5' });
	b += tblock(799, bot + 69, [{ t: 'Version 3', weight: 700, fill: R.el.t }, { t: 'variante à distance', fill: INK }]);

	b += text(480, H - 26, "La version la plus simple est presque toujours celle qui est retenue.", { anchor: 'middle', weight: 700 });

	return svg({ w: W, h: H, title: "L'IA enrichit, l'enseignant·e réduit", desc: alt, body: b });
}
