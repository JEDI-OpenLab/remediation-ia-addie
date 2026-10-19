// Copie le guide (fichiers Markdown à la racine du dépôt) vers src/content/docs/
// pour le site Starlight. Les fichiers de la racine restent la seule source :
// ils sont lisibles tels quels sur GitHub, et ce script les adapte au site.
//
// Adaptations : titre H1 → frontmatter, liens de navigation retirés (le site a
// sa propre pagination), liens .md → routes du site, schémas SVG → figures,
// blocs Mermaid → <pre class="mermaid"> rendus côté navigateur.

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, statSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src/content/docs');
const BASE = '/remediation-ia-addie';

// Fichier source → route du site
const pages = {
	'README.md': 'presentation',
	'00-retour-experience.md': 'retour-experience',
	'01-analyse.md': 'analyse',
	'02-design.md': 'design',
	'03-developpement.md': 'developpement',
	'04-implementation.md': 'implementation',
	'05-evaluation.md': 'evaluation',
	'gabarits/prompts.md': 'gabarits/prompts',
	'gabarits/grille-criteriee.md': 'gabarits/grille-criteriee',
	'gabarits/modele-feedback.md': 'gabarits/modele-feedback',
	'gabarits/checklist-validation.md': 'gabarits/checklist-validation',
	'gabarits/suivi-priorites.md': 'gabarits/suivi-priorites',
	'references.md': 'references',
};
// Le dossier gabarits/ n'a pas de page d'index : on renvoie vers les consignes.
const folders = { 'gabarits/': 'gabarits/prompts' };

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function resolveTarget(fromFile, href) {
	if (/^(https?:|mailto:|#)/.test(href)) return null;
	const [path, hash] = href.split('#');
	const target = posix.normalize(posix.join(posix.dirname(fromFile), path));
	const key = target === '.' ? 'README.md' : target;
	const route = pages[key] ?? folders[key.endsWith('/') ? key : key + '/'];
	if (route) return `${BASE}/${route}/${hash ? '#' + hash : ''}`;
	if (key.startsWith('schemas/')) return `${BASE}/${key}`;
	return null;
}

function transform(file, src) {
	let lines = src.split('\n');

	// Titre H1 → frontmatter
	const h1 = lines.findIndex((l) => l.startsWith('# '));
	const title = lines[h1].slice(2).replace(/^\d+\.\s*/, '').trim();
	lines.splice(h1, 1);

	// Ligne de navigation « [← …] » en tête de fichier
	const nav = lines.findIndex((l, i) => i < 4 && l.startsWith('[←'));
	if (nav !== -1) lines.splice(nav, 1);

	let body = lines.join('\n').replace(/^\n+/, '');

	// Blocs Mermaid → <pre class="mermaid"> (sans ligne vide, pour rester un bloc HTML)
	body = body.replace(/```mermaid\n([\s\S]*?)```/g, (_, code) => {
		const compact = code.split('\n').filter((l) => l.trim()).join('\n');
		return `<pre class="mermaid">${escapeHtml(compact)}</pre>`;
	});

	// Schémas SVG → figure cliquable (ouvre le schéma en grand)
	body = body.replace(/!\[([^\]]*)\]\(([^)]+\.svg)\)/g, (m, alt, href) => {
		const url = resolveTarget(file, href);
		if (!url) return m;
		const a = alt.replace(/"/g, '&quot;');
		return `<figure class="schema"><a href="${url}" target="_blank" rel="noopener" title="Ouvrir le schéma en grand"><img src="${url}" alt="${a}" loading="lazy" /></a></figure>`;
	});

	// Liens vers les autres fichiers du guide
	body = body.replace(/\]\(([^)\s]+)\)/g, (m, href) => {
		const url = resolveTarget(file, href);
		return url ? `](${url})` : m;
	});

	const fm = [`---`, `title: ${JSON.stringify(title)}`, `---`, ``].join('\n');
	return fm + body;
}

rmSync(outDir, { recursive: true, force: true });
for (const [file, route] of Object.entries(pages)) {
	const src = readFileSync(join(root, file), 'utf8');
	const dest = join(outDir, route + '.md');
	mkdirSync(dirname(dest), { recursive: true });
	writeFileSync(dest, transform(file, src));
}

// Schémas publiés tels quels
const publicSchemas = join(root, 'public/schemas');
rmSync(publicSchemas, { recursive: true, force: true });
if (existsSync(join(root, 'schemas'))) {
	mkdirSync(publicSchemas, { recursive: true });
	cpSync(join(root, 'schemas'), publicSchemas, {
		recursive: true,
		filter: (p) => (statSync(p).isDirectory() ? !p.endsWith('/src') : p.endsWith('.svg')),
	});
}

console.log(`sync-content : ${Object.keys(pages).length} pages copiées dans src/content/docs/`);
