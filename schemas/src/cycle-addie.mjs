// n° 8. Le cycle ADDIE itératif
// Anneau en cinq secteurs, colorés selon qui décide (orange) ou qui produit
// sous contrôle (bleu), avec les itérations observées en pointillé.
// La géométrie (PHASES, angles) est partagée avec la roue interactive du site.

import { svg, R, INK, MUTE, rect, text, tblock, path, arc, polar, sector } from './lib.mjs';

export const alt =
	"Cycle ADDIE en cinq phases : Analyse, Design, Développement, Implémentation, Évaluation. L'enseignant·e décide en Analyse, Design et Évaluation ; l'IA produit sous son contrôle en Développement et Implémentation. Des retours en pointillé montrent les itérations : support simplifié, seuils recalibrés, séquence suivante.";

export const PHASES = [
	{ n: 1, name: 'Analyse', role: 'ens', lines: ['besoins, contraintes,', 'données'] },
	{ n: 2, name: 'Design', role: 'ens', lines: ['problématique,', 'grille, feedback'] },
	{ n: 3, name: 'Développement', role: 'ia', lines: ["supports produits", "avec l'IA, filtrés"] },
	{ n: 4, name: 'Implémentation', role: 'ia', lines: ['correction et', 'feedback validé'] },
	{ n: 5, name: 'Évaluation', role: 'ens', lines: ['le feedback', 'a-t-il servi ?'] },
];
// Analyse centrée en haut, sens horaire
export const angleOf = (i) => -90 + i * 72;

export default function () {
	const W = 960;
	const H = 800;
	const cx = 480;
	const cy = 392;
	const r0 = 104;
	const r1 = 268;
	let b = '';

	b += text(40, 46, 'Le cycle ADDIE, version itérative', { size: 20, weight: 700 });
	b += text(40, 72, 'Comment se lit le guide', { fill: MUTE });

	PHASES.forEach((p, i) => {
		const a = angleOf(i);
		const r = R[p.role];
		b += `<path d="${sector(cx, cy, r0, r1, a - 35, a + 35)}" fill="${r.f}" stroke="${r.s}" stroke-width="2"/>`;
		const [tx, ty] = polar(cx, cy, (r0 + r1) / 2 + 2, a);
		b += tblock(tx, ty, [{ t: `${p.n}. ${p.name}`, size: 20, weight: 700, fill: r.t }, ...p.lines]);
		// Chevron de progression entre deux secteurs
		const [hx, hy] = polar(cx, cy, (r0 + r1) / 2, a + 36);
		b += `<g transform="translate(${hx.toFixed(1)} ${hy.toFixed(1)}) rotate(${a + 36 + 90})"><circle r="13" fill="#fff" stroke="${MUTE}" stroke-width="1.5"/><path d="M-4,-5 L3,0 L-4,5" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
	});

	// Centre
	b += tblock(cx, cy, [
		{ t: 'ADDIE', size: 20, weight: 700 },
		{ t: 'itératif', fill: MUTE },
	]);

	// Itérations observées (retours en arrière, pointillés)
	const back = (from, to, label, side) => {
		const a0 = angleOf(from) - 8;
		const a1 = angleOf(to) + 8;
		const rr = r1 + 26;
		let s = path(arc(cx, cy, rr, a0, a1), { color: INK, marker: 'ink', dash: '6 6', sw: 2 });
		const [lx, ly] = polar(cx, cy, rr + 22, (angleOf(from) + angleOf(to)) / 2);
		s += tblock(lx, ly, [{ t: label, weight: 700 }], { anchor: side });
		return s;
	};
	b += back(2, 1, 'support simplifié', 'start');
	b += back(3, 2, 'seuils recalibrés', 'middle');
	const [sx, sy] = polar(cx, cy, r1 + 22, -126);
	b += tblock(sx, sy, [{ t: 'séquence suivante', weight: 700 }], { anchor: 'end' });

	// Légende
	const ly = H - 60;
	b += rect(60, ly - 12, 24, 24, { fill: R.ens.f, stroke: R.ens.s, rx: 6 });
	b += text(94, ly + 6, "L'enseignant·e décide");
	b += rect(318, ly - 12, 24, 24, { fill: R.ia.f, stroke: R.ia.s, rx: 6 });
	b += text(352, ly + 6, "L'IA produit, l'enseignant·e filtre et valide");
	b += path(`M738,${ly} H782`, { color: INK, dash: '6 6', marker: 'ink' });
	b += text(792, ly + 6, 'itérations');

	return svg({ w: W, h: H, title: 'Le cycle ADDIE, version itérative', desc: alt, body: b });
}
