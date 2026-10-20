# Gabarits de consignes pour l'IA

[← Sommaire](../README.md)

Ces consignes s'inspirent de celles qui ont servi dans le cas, réécrites et complétées pour être réutilisables. Trois ne viennent pas du cas, ce sont des pistes pour prolonger le dispositif : « Repérer les erreurs récurrentes », « Boucle de classe » et « Coder la reprise des priorités ». Elles sont courtes parce que les consignes efficaces données à l'IA ressemblent aux consignes efficaces données aux élèves : une intention, des contraintes, un format de sortie.

Les éléments entre crochets sont à remplacer.

## Analyse

### Cadrer la séquence

> Je prépare une séquence de [discipline] pour une classe de [niveau], sur [thème ou axe du programme]. Voici le programme concerné et les documents disponibles. Contraintes : [nombre] séances de [durée], dont [nombre] à distance ; les élèves rendent leur travail par [moyen]. Liste les compétences que ces documents permettent de travailler et signale ce qui te manque pour proposer une progression.

## Design

### Concevoir une séquence cohérente

> Voici la problématique de ma séquence et les documents. Propose une sous-question par semaine ; chaque sous-question doit être traitée par les documents de la semaine et apporter une réponse partielle à la problématique. Explique en deux lignes comment chaque semaine nourrit la réponse finale.

### Rédiger les descripteurs d'une grille

> Voici les critères de ma grille et la tâche demandée aux élèves. Pour chaque critère, propose quatre descripteurs (insuffisant, partiel, atteint, dépassé), observables dans une copie et compréhensibles par un·e élève de [niveau]. N'ajoute pas de critère.

## Développement

### Produire un lot de séance

> Pour cette séance de [durée], produis : une fiche élève simple (une tâche par bloc, consignes en [langue] de deux lignes maximum), un déroulé minuté avec les phrases exactes que je dis, un diaporama de dix diapositives maximum qui annonce en diapositive 2 les compétences et la tâche évaluée, et un corrigé. Police [taille], interligne [valeur].

### Simplifier

> C'est trop complexe. Une tâche par bloc, des consignes de deux lignes maximum, rien qui demande du matériel ou une organisation qu'on n'a pas le temps d'installer. Garde l'essentiel : ce que les élèves doivent produire.

### Vérifier un contenu

> Avant de rédiger le corrigé, lis ou regarde le document lui-même et donne-moi les repères (minutage, citations) que tu as effectivement vérifiés. Signale ce que tu n'as pas pu vérifier.

### Adapter au travail à distance

> Transforme cette séance en travail à la maison : consignes en [langue], courtes, sans référence au manuel ; rien à envoyer sauf la production finale, par [moyen], avant [jour et heure] ; remplace toute interaction avec un voisin par une tâche faisable seul·e ou un contact à distance avec un·e camarade.

## Implémentation

### Transcrire

> Voici les photos de productions manuscrites, identifiées par un numéro. Transcris chaque texte tel quel, sans corriger aucune erreur. Signale entre crochets chaque mot que tu n'arrives pas à lire avec certitude.

### Remédiation personnalisée

> Voici la grille sur [barème], le document source et les textes des élèves, identifiés par un numéro. Pour chaque élève, produis un fichier : le texte intégral avec [en correction directe : chaque erreur barrée et la correction en rouge] [ou, en correction indirecte : chaque erreur de langue soulignée avec son code, sans la correction, et chaque problème d'organisation ou de cohérence signalé par une phrase de commentaire sur le passage concerné] ; puis l'évaluation dans un tableau, une ligne par critère : chaque critère avec la note et un commentaire d'une phrase, le total, une ligne Well done qui nomme une réussite précise, et une ligne Next time avec une seule priorité formulée comme une action. Applique les mêmes seuils à toutes les copies. Ne corrige pas ce qui relève du style si l'énoncé est correct.
>
> À part, pour moi seulement : les dix erreurs les plus fréquentes, les contenus inventés par rapport au document source, les copies qui posent question, et les textes qui abordent un thème personnel sensible. N'écris rien de tout cela dans les fichiers des élèves.

Les codes d'erreur ne conviennent qu'aux erreurs de **microstructure**, celles qui se repèrent dans une phrase : temps, accord, ordre des mots, préposition, orthographe, structure étudiée. Les erreurs de **macrostructure** (organisation du texte, enchaînement des idées, cohérence, réponse à la consigne) ne se réduisent pas à un code : elles demandent une phrase de commentaire. Toute liste de codes reste donc réductrice. Mieux vaut en garder peu, ceux que les élèves connaissent déjà, et les fournir à l'IA avec leur définition. Exemple à adapter : **T** temps, **A** accord, **O** ordre des mots, **V** vocabulaire, **P** préposition, **S** structure étudiée, **Orth** orthographe.

### Repérer les erreurs récurrentes

> Voici, pour chaque élève identifié par un numéro, ses productions successives. Relève les erreurs qui reviennent d'une production à l'autre, classe-les de la plus fréquente à la moins fréquente, et donne pour chacune un exemple tiré de ses textes. Signale la plus saillante, celle qui pourrait devenir sa priorité Next time.

Cette consigne ne vient pas du cas : c'est une piste pour aider chaque élève à prendre conscience de ses erreurs les plus fréquentes.

### Ajouter des copies après coup

> Voici de nouvelles copies. Garde les évaluations déjà faites, applique exactement la même grille et les mêmes seuils, et refais le fichier de classe.

## Évaluation

### Boucle de classe

> À partir des erreurs relevées dans toutes les copies, construis un Error Hunt de dix phrases (une erreur par phrase, les plus fréquentes d'abord) avec son corrigé, et choisis trois extraits réussis anonymisés à lire en classe, chacun illustrant un critère de la grille.

### Coder la reprise des priorités

> Voici, pour chaque élève, la priorité Next time de la production précédente et sa nouvelle production. Pour chaque élève, indique si la priorité est absente (le problème n'est pas traité), présente (l'élève essaie, avec des erreurs) ou corrigée (le problème est résolu), avec la phrase du texte qui le montre.

À la main, ce codage serait trop long pour une classe entière. Vérifier le codage de quelques élèves, puis reporter le résultat dans le [tableau de suivi des priorités](suivi-priorites.md).
