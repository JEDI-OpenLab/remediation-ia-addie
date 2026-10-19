# 05. Évaluation

[← Implémentation](04-implementation.md) · [Sommaire](README.md) · [Retour à l'Analyse ↺](01-analyse.md)

**Question de la phase : le dispositif a-t-il servi aux élèves, et que faut-il changer pour la prochaine fois ?**

Dans ADDIE, l'évaluation porte sur le **dispositif**, pas seulement sur les élèves. Les copies ont été évaluées en phase d'implémentation ; ici, on se demande si ce travail a produit des apprentissages.

## Dans le cas

Le cas prévoyait une boucle : chaque élève reprend sa production à partir du corrigé, la classe travaille sur ses propres erreurs (Error Hunt), quelques extraits réussis sont lus, et la prochaine production reprend les critères. Il ne disposait pas encore de mesure de ce que cette boucle a produit.

## Recommandations

Deux boucles s'emboîtent : celle de l'élève, d'une production à la suivante, et celle du dispositif, d'une séquence à la suivante.

```mermaid
flowchart LR
    subgraph eleve["Boucle de l'élève"]
        P1["Production n"] --> FB["Feedback<br/>Next time"]
        FB --> R["Réécriture<br/>en classe"]
        R --> P2["Production n+1<br/>la priorité est-elle reprise ?"]
        P2 -.-> P1
    end
    subgraph disp["Boucle du dispositif"]
        Ind["Indicateurs<br/>reprise, réécriture,<br/>fidélité, temps"] --> Aj["Ajustements<br/>grille, critères de refus,<br/>priorités de classe"]
    end
    P2 --> Ind
    Aj --> Seq["Séquence suivante<br/>retour à l'Analyse"]
```

### 1. Boucler en classe

Un temps de cours, à placer dans la semaine qui suit l'envoi :

1. chaque élève lit son fichier et réécrit le passage le plus faible (en corrigeant lui-même ce qui était seulement signalé) ;
2. la classe corrige un Error Hunt de dix phrases construit sur ses propres erreurs, les plus fréquentes d'abord ;
3. deux ou trois extraits réussis, anonymisés, sont lus, chacun illustrant un critère de la grille.

### 2. Évaluer en continu, pas seulement à la fin

Le cas montre une évaluation formative du dispositif à chaque itération : chaque version refusée est une évaluation. Garder une trace simple de ces décisions (ce qui a été refusé, pourquoi) nourrit l'analyse de la séquence suivante.

### 3. Mesurer quelques indicateurs simples

| Indicateur | Comment le mesurer | Ce qu'il dit |
|---|---|---|
| **Reprise des priorités** | Pour chaque élève, la priorité Next time est-elle absente, présente ou corrigée dans la production suivante ? | Le feedback a-t-il servi ? |
| **Réécriture effective** | Proportion d'élèves qui ont réellement réécrit le passage faible | Le feedback a-t-il été lu ? |
| **Fidélité des notes** | Un échantillon de copies noté par l'IA et par un·e collègue ; écarts par critère | Sur quels critères l'IA dérive-t-elle ? |
| **Temps enseignant** | Minutes par copie, avant et après | Le gain de temps est-il réel ? |
| **Réception par les élèves** | Quelques questions courtes : avez-vous lu ? compris ? utilisé ? | Le feedback est-il crédible à leurs yeux ? |

Le premier indicateur est le plus important et le plus simple : il se lit directement dans le [tableau de suivi des priorités](gabarits/suivi-priorites.md).

### 4. Revenir à l'analyse

Les résultats nourrissent la séquence suivante :

- les priorités Next time non reprises deviennent des critères ou des exercices de la production suivante ;
- les critères sur lesquels les notes dérivent sont réécrits ;
- les critères de refus de la phase Développement sont complétés.

C'est ce retour qui transforme ADDIE en cycle.

## Pour aller plus loin : un protocole de recherche-développement

Le cas se prête à une recherche-développement (design-based research) menée avec des enseignant·es :

- **Effet sur l'apprentissage** : comparer, à grille et tâches égales, un groupe recevant le feedback personnalisé et un groupe recevant seulement la correction collective, à partir du codage de la reprise des priorités.
- **Réception du feedback** : les élèves accordent-ils la même crédibilité à un feedback préparé avec une IA et validé par l'enseignant·e ? Le lisent-ils davantage parce qu'il est individuel, ou moins parce qu'ils le jugent automatique ?
- **Fidélité des notes** : double correction d'un échantillon pour estimer l'accord inter-juges, critère par critère.
- **Transformation du travail enseignant** : que devient le temps gagné ? Lecture plus fine des copies, boucle de classe mieux préparée, ou simple compression ?
- **Écriture assistée côté élèves** : un premier jet personnel en classe, puis une révision assistée dont l'élève justifie chaque modification. Le feedback personnalisé donne alors un point de comparaison entre ce que l'élève sait faire seul·e et ce qu'il ou elle obtient avec l'outil.

## Outils

- [gabarits/suivi-priorites.md](gabarits/suivi-priorites.md)
- Dans [gabarits/prompts.md](gabarits/prompts.md) : « Boucle de classe »

## Checklist de sortie

- [ ] Le temps de classe consacré au feedback a eu lieu.
- [ ] La reprise des priorités est codée pour chaque élève à la production suivante.
- [ ] Au moins un autre indicateur est mesuré.
- [ ] Les ajustements pour la séquence suivante sont notés (grille, critères de refus, priorités de classe).
