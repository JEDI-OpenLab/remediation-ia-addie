// Petite boîte à outils pour dessiner les schémas en SVG.
// Code couleur constant, lié aux rôles (voir README des schémas) :
// orange enseignant·e, bleu IA, vert élève, rouge confidentiel.

export const R = {
	ens: { s: '#B5762A', f: '#FDF1E3', t: '#7E4E14', label: 'Enseignant·e' },
	ia: { s: '#4A6FA5', f: '#E8F0FE', t: '#2D5089', label: 'IA' },
	el: { s: '#2E7D4A', f: '#E3F4E6', t: '#1F6136', label: 'Élève' },
	conf: { s: '#A33333', f: '#FBE4E4', t: '#922B2B', label: 'Confidentiel' },
};
export const INK = '#1A1A1A';
export const MUTE = '#5E5E5E';
export const LINE = '#8A8A8A';
export const FONT = "'Inter','Segoe UI',system-ui,-apple-system,Roboto,'Helvetica Neue',Arial,sans-serif";

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Document SVG complet, fond blanc explicite (lisible en mode sombre). */
export function svg({ w, h, title, desc, body }) {
	const markers = Object.entries({ ...Object.fromEntries(Object.entries(R).map(([k, v]) => [k, v.s])), line: LINE, ink: INK })
		.map(
			([k, c]) =>
				`<marker id="ah-${k}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0.8 L9.5,5 L0,9.2 z" fill="${c}"/></marker>`,
		)
		.join('');
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d" font-family="${esc(FONT)}">
<title id="t">${esc(title)}</title>
<desc id="d">${esc(desc)}</desc>
<defs>${markers}
<filter id="shadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000" flood-opacity="0.12"/></filter>
</defs>
<rect width="${w}" height="${h}" rx="18" fill="#FFFFFF"/>
${body}
</svg>
`;
}

/**
 * Bloc de texte centré verticalement sur cy.
 * lines : [{ t, size, weight, fill, italic }] ou chaînes (taille par défaut).
 */
export function tblock(x, cy, lines, { anchor = 'middle', size = 16, fill = INK, weight = 400, lh = 1.28 } = {}) {
	const items = lines.map((l) => (typeof l === 'string' ? { t: l } : l)).map((l) => ({ size, fill, weight, ...l }));
	const heights = items.map((l) => l.size * lh);
	const total = heights.reduce((a, b) => a + b, 0);
	let y = cy - total / 2;
	return items
		.map((l, i) => {
			const base = y + heights[i] / 2 + l.size * 0.35;
			y += heights[i];
			const it = l.italic ? ' font-style="italic"' : '';
			return `<text x="${x}" y="${base.toFixed(1)}" text-anchor="${anchor}" font-size="${l.size}" font-weight="${l.weight}" fill="${l.fill}"${it}>${l.raw ?? esc(l.t)}</text>`;
		})
		.join('');
}

export function text(x, y, t, { size = 16, weight = 400, fill = INK, anchor = 'start', italic = false, raw = false } = {}) {
	const it = italic ? ' font-style="italic"' : '';
	return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}"${it}>${raw ? t : esc(t)}</text>`;
}

export function rect(x, y, w, h, { fill = '#fff', stroke = 'none', sw = 2, rx = 12, dash = '', extra = '' } = {}) {
	const d = dash ? ` stroke-dasharray="${dash}"` : '';
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${d} ${extra}/>`;
}

/** Boîte d'étape : titre en gras, détail en gris. cx, cy = centre. */
export function node(cx, cy, w, h, role, title, detail = [], { fill, titleSize = 16, size = 16, dash = '' } = {}) {
	const r = R[role];
	const lines = [
		...[].concat(title).map((t) => ({ t, weight: 700, size: titleSize, fill: r.t })),
		...[].concat(detail).map((t) => ({ t, size, fill: INK })),
	];
	return rect(cx - w / 2, cy - h / 2, w, h, { fill: fill ?? '#fff', stroke: r.s, dash }) + tblock(cx, cy, lines);
}

export function path(d, { color = LINE, marker = 'line', sw = 2, dash = '', end = true, start = false } = {}) {
	const m = (end ? ` marker-end="url(#ah-${marker})"` : '') + (start ? ` marker-start="url(#ah-${marker})"` : '');
	const da = dash ? ` stroke-dasharray="${dash}"` : '';
	return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${da}${m}/>`;
}

/** Pastille numérotée. */
export function badge(cx, cy, n, role, r = 13) {
	return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${R[role].s}"/>` + text(cx, cy + 5.5, String(n), { size: 16, weight: 700, fill: '#fff', anchor: 'middle' });
}

// ── Pictogrammes (environ 24 × 24, centrés) ──────────────────────────────

export function person(x, y, color, s = 1) {
	return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-5.5" r="5" fill="${color}"/><path d="M-9,11 C-9,3 -5,0.5 0,0.5 C5,0.5 9,3 9,11 Z" fill="${color}"/></g>`;
}

export function teacher(x, y, color, s = 1) {
	return (
		person(x, y, color, s) +
		`<g transform="translate(${x + 8 * s} ${y + 5 * s}) scale(${s})"><circle r="6" fill="${color}" stroke="#fff" stroke-width="1.6"/><path d="M-3,0.2 L-0.8,2.4 L3.2,-2" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></g>`
	);
}

export function spark(x, y, color, s = 1) {
	return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-1,-11 C0,-3.5 2.5,-1 10,0 C2.5,1 0,3.5 -1,11 C-2,3.5 -4.5,1 -12,0 C-4.5,-1 -2,-3.5 -1,-11 Z" fill="${color}"/><path d="M8,-11 C8.4,-8.4 9.4,-7.4 12,-7 C9.4,-6.6 8.4,-5.6 8,-3 C7.6,-5.6 6.6,-6.6 4,-7 C6.6,-7.4 7.6,-8.4 8,-11 Z" fill="${color}"/></g>`;
}

export function lock(x, y, color, s = 1) {
	return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-5,-2 V-6 a5,5 0 0 1 10,0 V-2" fill="none" stroke="${color}" stroke-width="2.4"/><rect x="-8" y="-2" width="16" height="13" rx="2.5" fill="${color}"/><circle cx="0" cy="4" r="1.8" fill="#fff"/></g>`;
}

export function doc(x, y, color, { w = 22, h = 28, fill = '#fff', lines = 3 } = {}) {
	const f = 7;
	let l = '';
	for (let i = 0; i < lines; i++) l += `<line x1="${x + 4}" y1="${y + 10 + i * 5}" x2="${x + w - 5 - (i === lines - 1 ? 5 : 0)}" y2="${y + 10 + i * 5}" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/>`;
	return `<path d="M${x},${y} H${x + w - f} L${x + w},${y + f} V${y + h} H${x} Z" fill="${fill}" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/><path d="M${x + w - f},${y} V${y + f} H${x + w}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linejoin="round"/>${l}`;
}

export const roleIcon = { el: person, ens: teacher, ia: spark, conf: lock };

/** Coordonnées polaires (degrés, 0 = droite, sens horaire à l'écran). */
export function polar(cx, cy, r, deg) {
	const a = (deg * Math.PI) / 180;
	return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

export function arc(cx, cy, r, a0, a1) {
	const [x0, y0] = polar(cx, cy, r, a0);
	const [x1, y1] = polar(cx, cy, r, a1);
	const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
	const sweep = a1 > a0 ? 1 : 0;
	return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} ${sweep} ${x1.toFixed(1)},${y1.toFixed(1)}`;
}

/** Secteur d'anneau entre les rayons r0 et r1. */
export function sector(cx, cy, r0, r1, a0, a1) {
	const p = (r, a) => polar(cx, cy, r, a).map((v) => v.toFixed(1)).join(',');
	const large = a1 - a0 > 180 ? 1 : 0;
	return `M${p(r1, a0)} A${r1},${r1} 0 ${large} 1 ${p(r1, a1)} L${p(r0, a1)} A${r0},${r0} 0 ${large} 0 ${p(r0, a0)} Z`;
}
