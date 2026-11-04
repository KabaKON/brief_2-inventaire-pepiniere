// Ajouter et lister les plants.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { estDateValide, versNombre } from './outils.js';

// Liste fermée des groupes botaniques acceptés, fournie et validée par le coach agronomie.
export const GROUPES = ['angiosperme', 'gymnosperme'];


// Renvoie une ligne de texte qui décrit le plant.
// Exemple : 'N09 | pin | gymnosperme | 8 plants | 2026-10-24'
export function formaterPlant(plant) {
  return `${plant.id} | ${plant.nomCommun} | ${plant.groupe} | ${plant.nombrePlants} plants | ${plant.dateReleve}`;
}

// Renvoie un texte avec un plant par ligne (lignes séparées par '\n'),
// ou 'Aucun plant enregistré.' si la liste est vide.
export function listerPlants(plants) {
  if(plants.length === 0) {
    return 'Aucun plant enregistré.';
  }
  return plants.map((p) => formaterPlant(p)).join('\n');
}

// Renvoie le plant qui a ce code (identifiant), ou undefined s'il n'existe pas.
export function trouverParId(plants, id) {
  return plants.find((p) => p.id ===id);
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'N11', nomCommun: 'papayer', groupe: 'angiosperme', nombrePlants: '15', dateReleve: '2026-10-27' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · nomCommun obligatoire · groupe présent dans GROUPES
// · nombrePlants nombre ENTIER positif ou nul · dateReleve réelle au format AAAA-MM-JJ.
export function verifierPlant(saisie, plants) {
  const erreurs =
  [];
  if (saisie.id.trim()=== '') {
    erreurs.push('le code obligatoire.');
    } else if (trouverParId(plants, saisie.id) !== undefined) {
      erreurs.push(`le code ${saisie.id} est déjà utilisé.`);

    }
if(saisie.nomCommun.trim() === '') {
  erreurs.push('le nom commun est obligatoire.');

}
if (!GROUPES.includes(saisie.groupe)) {
  erreurs.push(`le groupe doit être : ${GROUPES.join(' ou ')}.`);
}
const nombre = versNombre(saisie.nombrePlants);
if (!Number.isInteger(nombre) || nombre < 0) {
  erreurs.push('Le nombre de plants doit être un nombre entier positif ou nul.');
}
if(!estDateValide(saisie.dateReleve)) {
  erreurs.push('La date doit être une date réelle au format AAAA-MM-JJ.');
}
return erreurs;
  }


// Fabrique le plant à enregistrer à partir d'une saisie VALIDE : nombrePlants devient un nombre.
export function creerPlant(saisie) {
  return {
    id: saisie.id,
    nomCommun: saisie.nomCommun,
    groupe: saisie.groupe,
    nombrePlants: versNombre(saisie.nombrePlants),
    dateReleve : saisie.dateReleve

  };
}

// Ajoute la saisie à l'inventaire si elle est valide (verifierPlant, puis creerPlant).
// Renvoie les erreurs : [] si le plant a été ajouté ; sinon les messages, et rien n'est ajouté.
export function ajouterPlant(plants, saisie) {
  const erreurs = verifierPlant(saisie, plants);
  if (erreurs.length > 0) {
    return erreurs;
  }
plants.push(creerPlant(saisie));
return [];
}
