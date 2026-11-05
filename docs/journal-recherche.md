# Journal de recherche

> Chaque recherche utile : ce que vous cherchiez, où (cours, [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript), [Node.js](https://nodejs.org/api/), un camarade, une IA…), ce que vous avez compris. Ce que vous gardez, vous devez pouvoir l'expliquer.

| Ce que je cherchais | Où | Ce que j'ai compris | Utilisé dans |
| --- | --- | --- | --- |
| function OuvrirSaisie |src/saisie.js |elle branche le clavier. On l'appelle une seule fois, au début |app.js |
| async function demander | src/saisie.js| elle pose la question et renvoie ce que l'utilisateur a tapé, ou null avec ctrl+C. il faut await car on attend la frappe |app.js |
| function FermerSaisie |src/saisie.js |elle éteint le clavier. On l'appelle une seule fois, avant de quitter |app.js |
|function versNombre   |src/outils.js| elle transforme un texte en nombre. Elle renvoie NaN si le texte est vide ou n'est pas un nombre| src/registre.js
|function est DateValide | src/outils.js elle dit si le texte est une vraie date au format AAAA/MM/JJ|src/registre.js
|Q