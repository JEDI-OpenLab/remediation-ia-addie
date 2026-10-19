// n° 3. Qui fait quoi : l'IA prépare, l'enseignant·e décide
// Deux colonnes face à face ; chaque tâche préparée par l'IA pointe vers
// la décision correspondante de l'enseignant·e.

import { svg, R, INK, MUTE, rect, text, tblock, path, spark, teacher } from './lib.mjs';

export const alt =
	"Répartition des tâches : l'IA transcrit, corrige, applique la grille et signale ; l'enseignant·e fixe la grille, calibre, tranche, valide et envoie.";

export default function () {
	const W = 960;
	const rows = [
		['Transcrit les copies manuscrites', 'Vérifie la transcription sur 2 ou 3 copies'],
		['Applique la grille à chaque copie', 'Fixe la grille et calibre les seuils'],
		['Repère les erreurs, rédige les commentaires', 'Valide chaque fichier avec la checklist'],
		['Signale les cas sensibles', 'Tranche : entretien, réponse humaine'],
		['Vérifie les contenus cités', 'Contrôle les repères, ou rédige le corrigé'],
		[null, 'Envoie le message, anime la boucle de classe'],
	];
	const top = 168;
	const step = 74;
	const H = top + rows.length * step + 56;
	const L = { x: 40, w: 390 };
	const Rt = { x: 530, w: 390 };
	let b = '';

	b += text(40, 46, 'Qui fait quoi ?', { size: 20, weight: 700 });
	b += text(40, 72, "Chaque tâche préparée par l'IA aboutit à une décision de l'enseignant·e.", { fill: MUTE });

	// En-têtes de colonnes
	b += rect(L.x, 96, L.w, 50, { fill: R.ia.s, rx: 12 });
	b += spark(L.x + 32, 121, '#fff', 0.95);
	b += text(L.x + 56, 128, "L'IA prépare", { size: 20, weight: 700, fill: '#fff' });
	b += rect(Rt.x, 96, Rt.w, 50, { fill: R.ens.s, rx: 12 });
	b += teacher(Rt.x + 30, 121, '#fff', 0.95);
	b += text(Rt.x + 56, 128, "L'enseignant·e décide", { size: 20, weight: 700, fill: '#fff' });

	rows.forEach(([ia, ens], i) => {
		const y = top + i * step;
		const cy = y + 29;
		if (ia) {
			b += rect(L.x, y, L.w, 58, { fill: R.ia.f, stroke: R.ia.s, sw: 1.5 });
			b += tblock(L.x + 20, cy, [ia], { anchor: 'start' });
			b += path(`M${L.x + L.w + 8},${cy} H${Rt.x - 10}`, { color: MUTE, marker: 'ink', sw: 2 });
		} else {
			b += rect(L.x, y, L.w, 58, { fill: '#fff', stroke: R.ia.s, sw: 1.5, dash: '6 6' });
			b += tblock(L.x + 20, cy, ["Rien : l'IA ne s'adresse jamais à l'élève"], { anchor: 'start', fill: R.ia.t });
		}
		b += rect(Rt.x, y, Rt.w, 58, { fill: R.ens.f, stroke: R.ens.s, sw: 1.5 });
		b += tblock(Rt.x + 20, cy, [{ t: ens, weight: 600 }], { anchor: 'start' });
	});

	b += text(480, H - 24, "L'IA ne prend aucune décision qui atteint l'élève sans l'enseignant·e.", { anchor: 'middle', fill: INK, weight: 700 });

	return svg({ w: W, h: H, title: "Qui fait quoi : l'IA prépare, l'enseignant·e décide", desc: alt, body: b });
}
