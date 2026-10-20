// Génère les schémas SVG du guide dans schemas/.
// Usage : npm run schemas (ou node schemas/src/build.mjs)
// Chaque schéma répond à une seule question ; le texte alternatif est repris
// dans le <title>/<desc> du SVG et dans le fichier Markdown qui l'affiche.

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vieCopie from './vie-copie.mjs';
import anatomieFeedback from './anatomie-feedback.mjs';
import quiFaitQuoi from './qui-fait-quoi.mjs';
import doubleBoucle from './double-boucle.mjs';
import curseurCorrection from './curseur-correction.mjs';
import troisNiveaux from './trois-niveaux.mjs';
import cycleAddie from './cycle-addie.mjs';
import suiviPriorites from './suivi-priorites.mjs';

const out = join(dirname(fileURLToPath(import.meta.url)), '..');
const schemas = {
	'01-vie-d-une-copie': vieCopie,
	'02-anatomie-feedback': anatomieFeedback,
	'03-qui-fait-quoi': quiFaitQuoi,
	'04-double-boucle': doubleBoucle,
	'05-curseur-correction': curseurCorrection,
	'06-differencier-individualiser-personnaliser': troisNiveaux,
	'08-cycle-addie': cycleAddie,
	'09-suivi-priorites': suiviPriorites,
};

for (const [name, make] of Object.entries(schemas)) {
	writeFileSync(join(out, `${name}.svg`), make());
}
console.log(`schemas : ${Object.keys(schemas).length} SVG générés dans schemas/`);
