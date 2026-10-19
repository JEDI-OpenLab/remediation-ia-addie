// n° 1. La vie d'une copie (schéma phare)
// Trois couloirs : Élève en haut, Enseignant·e au milieu, IA en bas.
// Placer l'enseignant·e entre l'IA et l'élève rend visible l'idée forte :
// rien ne va de l'IA à l'élève sans passer par l'enseignant·e.

import { svg, R, INK, MUTE, rect, node, path, badge, text, tblock, roleIcon, lock } from './lib.mjs';

export const alt =
	"Parcours d'une copie en trois couloirs : l'élève produit, l'IA prépare le feedback et une note confidentielle, l'enseignant·e calibre, valide et envoie ; l'élève réécrit en classe. Aucun élément ne va de l'IA à l'élève sans validation de l'enseignant·e.";

export default function () {
	const W = 1200;
	const H = 712;
	const lanes = {
		el: { y: 100, h: 140 },
		ens: { y: 252, h: 150 },
		ia: { y: 414, h: 270 },
	};
	const c = [256, 423, 560, 758, 925, 1104];
	const BW = 150;

	let b = '';
	b += text(40, 48, "La vie d'une copie", { size: 22, weight: 700 });
	b += text(40, 76, "De la production de l'élève à sa réécriture : qui fait quoi ?", { fill: MUTE });

	for (const [role, { y, h }] of Object.entries(lanes)) {
		const r = R[role];
		b += rect(24, y, 1152, h, { fill: r.f, rx: 14, extra: 'fill-opacity="0.45"' });
		b += rect(24, y, 132, h, { fill: r.f, rx: 14 });
		b += roleIcon[role](90, y + h / 2 - 14, r.s, 1.35);
		b += text(90, y + h / 2 + 30, r.label, { weight: 700, fill: r.t, anchor: 'middle' });
	}

	const elY = 170;
	const ensY = 327;
	const iaUp = 470;
	const iaLow = 572;
	const iaMid = 521;

	// Flèches (dessinées avant les boîtes pour passer dessous)
	b += path(`M${c[0]},212 V${ensY} H${c[1] - BW / 2 - 3}`, { color: R.el.s, marker: 'el' });
	b += path(`M${c[1] + BW / 2},${ensY} H${c[2]} V${iaMid - 63}`, { color: R.ens.s, marker: 'ens' });
	b += path(`M${c[2] + BW / 2},${iaMid} H659 V${iaUp} H${c[3] - BW / 2 - 3}`, { color: R.ia.s, marker: 'ia' });
	b += path(`M659,${iaMid} V${iaLow} H${c[3] - BW / 2 - 3}`, { color: R.ia.s, marker: 'ia' });
	b += path(`M${c[3]},${iaUp - 37} V${ensY + 51}`, { color: R.conf.s, marker: 'conf' });
	b += path(`M${c[3] + BW / 2},${iaLow} H${c[4] - 20} V${ensY + 51}`, { color: R.ia.s, marker: 'ia' });
	b += path(`M${c[4] + 20},${ensY + 48} V640 H${c[2]} V${iaMid + 63}`, { color: R.ens.s, marker: 'ens', dash: '7 6' });
	b += path(`M${c[4] + BW / 2},${ensY} H${c[5] - 65 - 3}`, { color: R.ens.s, marker: 'ens' });
	b += path(`M${c[5]},${ensY - 48} V${elY + 44}`, { color: R.ens.s, marker: 'ens' });

	b += tblock(c[3], 664, [{ t: "seuils ajustés : l'IA régénère tout le lot", fill: R.ens.t }]);

	// Étapes
	b += node(c[0], elY, BW, 84, 'el', 'Écrit sa copie', ['en classe, texte', 'ou photo']);
	b += node(c[1], ensY, BW, 96, 'ens', 'Pseudonymise', ['remplace les noms', 'par des numéros']);
	b += node(c[2], iaMid, BW, 122, 'ia', ['Transcrit', 'et corrige'], ['applique la grille', 'à chaque copie']);
	b += node(c[3], iaUp, BW, 74, 'conf', ['Note', 'confidentielle'], ["pour l'enseignant·e"], { fill: R.conf.f });
	b += node(c[3], iaLow, BW, 74, 'ia', 'Fichier élève', ['projet de feedback']);
	b += node(c[3], ensY, BW, 96, 'conf', ['Tranche les', 'cas sensibles'], ['entretien, réponse', 'humaine'], { fill: R.conf.f });
	b += node(c[4], ensY, BW, 96, 'ens', ['Calibre', 'puis valide'], ['3 copies, puis', 'chaque fichier']);
	b += node(c[5], ensY, 130, 96, 'ens', 'Envoie', ['le message', 'individuel']);
	b += node(c[5], elY, 130, 84, 'el', 'Lit et réécrit', ['en classe']);

	const corner = (cx, cy, w, h) => [cx - w / 2 + 4, cy - h / 2 + 4];
	b += badge(...corner(c[0], elY, BW, 84), 1, 'el');
	b += badge(...corner(c[1], ensY, BW, 96), 2, 'ens');
	b += badge(...corner(c[2], iaMid, BW, 122), 3, 'ia');
	b += badge(...corner(c[3], iaLow, BW, 74), 4, 'ia');
	b += badge(...corner(c[4], ensY, BW, 96), 5, 'ens');
	b += badge(...corner(c[5], ensY, 130, 96), 6, 'ens');
	b += badge(...corner(c[5], elY, 130, 84), 7, 'el');
	for (const [cx, cy, h] of [
		[c[3], iaUp, 74],
		[c[3], ensY, 96],
	]) {
		const [x, y] = corner(cx, cy, BW, h);
		b += `<circle cx="${x}" cy="${y}" r="13" fill="${R.conf.s}"/>` + lock(x, y - 1, '#fff', 0.72);
	}

	// Barrière : la note confidentielle ne rejoint jamais le couloir élève
	b += path(`M${c[3]},${ensY - 48} V258`, { color: R.conf.s, end: false });
	b += `<circle cx="${c[3]}" cy="246" r="12" fill="#fff" stroke="${R.conf.s}" stroke-width="2.5"/><path d="M${c[3] - 8},${246 - 8} L${c[3] + 8},${246 + 8}" stroke="${R.conf.s}" stroke-width="2.5"/>`;
	b += text(c[3] + 20, 230, "jamais transmise à l'élève", { fill: R.conf.t, weight: 700 });

	b += tblock(320, iaMid, [
		{ t: "L'IA ne reçoit que des copies", fill: R.ia.t },
		{ t: 'pseudonymisées, avec la grille', fill: R.ia.t },
		{ t: 'et le document source.', fill: R.ia.t },
	]);

	// L'idée forte, dans l'espace libre du couloir élève
	b += tblock(660, 162, [
		{ t: "Aucune flèche ne va de l'IA à l'élève.", weight: 700, fill: INK },
		{ t: "Tout passe par l'enseignant·e, qui valide et envoie.", fill: INK },
	]);

	return svg({ w: W, h: H, title: "La vie d'une copie", desc: alt, body: b });
}
