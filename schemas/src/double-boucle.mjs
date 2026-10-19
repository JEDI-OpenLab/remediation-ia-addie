// n° 4. La double boucle
// Deux cercles concentriques : au centre la boucle de l'élève (d'une
// production à la suivante), autour la boucle du dispositif (d'une séquence
// à la suivante), nourrie par les indicateurs.

import { svg, R, INK, MUTE, rect, text, tblock, path, arc, polar } from './lib.mjs';

export const alt =
	"Deux boucles emboîtées : la boucle de l'élève, d'une production à la suivante, et la boucle du dispositif, d'une séquence à la suivante, nourrie par les indicateurs.";

export default function () {
	const W = 960;
	const H = 850;
	const cx = 480;
	const cy = 462;
	const ri = 160;
	const ro = 345;
	let b = '';

	b += text(40, 46, 'La double boucle', { size: 20, weight: 700 });
	b += text(40, 72, "Comment le feedback d'aujourd'hui prépare la production de demain", { fill: MUTE });

	// Anneaux
	b += `<circle cx="${cx}" cy="${cy}" r="${ro}" fill="${R.ens.f}" fill-opacity="0.45"/>`;
	b += `<circle cx="${cx}" cy="${cy}" r="${ri + 40}" fill="#fff"/>`;
	b += `<circle cx="${cx}" cy="${cy}" r="${ri}" fill="${R.el.f}" fill-opacity="0.7"/>`;

	// Boucle de l'élève, sens horaire : haut → droite → bas → gauche
	const inner = [
		{ a: -90, w: 170, lines: [{ t: 'Production n', weight: 700 }] },
		{ a: 0, w: 150, lines: [{ t: 'Feedback', weight: 700 }, 'Next time'] },
		{ a: 90, w: 170, lines: [{ t: 'Réécriture', weight: 700 }, 'en classe'] },
		{ a: 180, w: 160, lines: [{ t: 'Production n+1', weight: 700 }, 'priorité reprise ?'] },
	];
	const gapI = { '-90': 33, 0: 11, 90: 33, 180: 11 };
	for (let i = 0; i < 4; i++) {
		const a0 = inner[i].a + gapI[inner[i].a];
		const a1 = inner[i].a + 90 - gapI[inner[(i + 1) % 4].a];
		b += path(arc(cx, cy, ri, a0, a1), { color: R.el.s, marker: 'el', sw: 3 });
	}

	// Boucle du dispositif, sens antihoraire : gauche → bas → droite → haut
	const outer = [
		{ a: 180, w: 180, lines: [{ t: 'Indicateurs', weight: 700 }, 'reprise, réécriture,', 'fidélité, temps'], h: 82 },
		{ a: 90, w: 230, lines: [{ t: 'Ajustements', weight: 700 }, 'grille, critères de refus'], h: 58 },
		{ a: 0, w: 170, lines: [{ t: "Retour à l'Analyse", weight: 700 }], h: 48 },
		{ a: -90, w: 200, lines: [{ t: 'Séquence suivante', weight: 700 }], h: 48 },
	];
	const gapO = { 180: 8, 90: 20, 0: 4, '-90': 17 };
	for (let i = 0; i < 3; i++) {
		const a0 = outer[i].a - gapO[outer[i].a];
		const a1 = outer[i + 1].a + gapO[outer[i + 1].a];
		b += path(arc(cx, cy, ro, a0, a1), { color: R.ens.s, marker: 'ens', sw: 3 });
	}
	// Quart restant, non parcouru
	b += path(arc(cx, cy, ro, -90 - gapO['-90'], -180 + gapO[180]), { color: R.ens.s, sw: 2, dash: '2 7', end: false });

	// Passages d'une boucle à l'autre
	const [ix] = polar(cx, cy, ri, 180);
	b += path(`M${ix - 80},${cy + 20} C${ix - 110},${cy + 60} ${cx - ro + 60},${cy + 70} ${cx - ro + 20},${cy + 42}`, {
		color: R.ens.s,
		marker: 'ens',
		sw: 2.5,
	});
	b += path(`M${cx},${cy - ro + 24} V${cy - ri - 30}`, { color: R.ens.s, marker: 'ens', sw: 2.5 });
	b += tblock(cx + 14, cy - ri - 74, [{ t: 'la priorité devient', fill: R.ens.t }, { t: 'un critère', fill: R.ens.t }], { anchor: 'start' });
	b += tblock(ix - 30, cy + 98, [{ t: 'codage de la reprise', fill: R.ens.t }], { anchor: 'middle' });

	// Nœuds
	const pill = (a, r, w, h, lines, role) => {
		const [x, y] = polar(cx, cy, r, a);
		return rect(x - w / 2, y - h / 2, w, h, { fill: '#fff', stroke: R[role].s, sw: 2, rx: h / 2 }) + tblock(x, y, lines);
	};
	for (const n of inner) b += pill(n.a, ri, n.w, n.lines.length > 1 ? 54 : 42, n.lines, 'el');
	for (const n of outer) b += pill(n.a, ro, n.w, n.h, n.lines, 'ens');

	// Libellés des boucles
	b += tblock(cx, cy, [
		{ t: 'Boucle', size: 20, weight: 700, fill: R.el.t },
		{ t: "de l'élève", size: 20, weight: 700, fill: R.el.t },
		{ t: "d'une production", fill: INK },
		{ t: 'à la suivante', fill: INK },
	]);
	const [lx, ly] = polar(cx, cy, ro - 92, -135);
	b += tblock(lx + 6, ly + 4, [
		{ t: 'Boucle du dispositif', size: 20, weight: 700, fill: R.ens.t },
		{ t: "d'une séquence", fill: INK },
		{ t: 'à la suivante', fill: INK },
	]);

	return svg({ w: W, h: H, title: 'La double boucle', desc: alt, body: b });
}
