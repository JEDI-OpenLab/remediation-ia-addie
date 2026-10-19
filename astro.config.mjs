// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://jedi-openlab.github.io',
	base: '/remediation-ia-addie',
	integrations: [
		starlight({
			title: 'Remédiation personnalisée assistée par IA',
			description:
				"Guide ouvert tiré d'un retour d'expérience : concevoir, corriger et faire un feedback individuel avec une IA, relus avec le modèle ADDIE.",
			defaultLocale: 'root',
			locales: { root: { label: 'Français', lang: 'fr' } },
			logo: { src: './src/assets/jedi-openlab.png', alt: 'JEDI-OpenLab' },
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/JEDI-OpenLab/remediation-ia-addie' },
			],
			customCss: ['./src/styles/custom.css'],
			components: { Head: './src/components/Head.astro' },
			lastUpdated: false,
			sidebar: [
				{ label: 'Accueil', link: '/' },
				{ label: 'Présentation', link: '/presentation/' },
				{ label: 'Le retour d’expérience', link: '/retour-experience/' },
				{
					label: 'Les cinq phases ADDIE',
					items: [
						{ label: '1. Analyse', link: '/analyse/' },
						{ label: '2. Design', link: '/design/' },
						{ label: '3. Développement', link: '/developpement/' },
						{ label: '4. Implémentation', link: '/implementation/' },
						{ label: '5. Évaluation', link: '/evaluation/' },
					],
				},
				{
					label: 'Gabarits',
					items: [
						{ label: 'Consignes pour l’IA', link: '/gabarits/prompts/' },
						{ label: 'Grille critériée', link: '/gabarits/grille-criteriee/' },
						{ label: 'Modèle de feedback', link: '/gabarits/modele-feedback/' },
						{ label: 'Checklist de validation', link: '/gabarits/checklist-validation/' },
						{ label: 'Suivi des priorités', link: '/gabarits/suivi-priorites/' },
					],
				},
				{ label: 'Références', link: '/references/' },
			],
		}),
	],
});
