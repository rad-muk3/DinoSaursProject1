//Constant Variables
const GRIDTILES = 9;
//Get the grid element to help with creating Grid Tiles
const grid = document.getElementById('grid');
const gridItem = document.querySelector('.grid-item');

/**
 * @description Represents all dinosaurs as WildReptiles
 * @constructor
 * @param {string} title - The species Name
 * @param {lbs} weight - The weight of the species
 * @param {inches} height - Height of the species
 * @param {string} diet - Diet of the species
 * @param {picture} image - species image
 */
function WildReptiles(species, weight, height, diet, image) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.image = image;
}

/**
 * @description Represents Dino obejects that extends WildReptiles
 * @constructor
 * @param {string} species - The species Name
 * @param {lbs} weight - The weight of the species
 * @param {inches} height - Height of the species
 * @param {string} diet - Diet of the species
 * @param {string} where - where species is from
 * @param {string} when - time era of the species
 * @param {string} fact - Facts about the species
 */
function Dino(species, weight, height, diet, where, when, fact, image) {
  WildReptiles.call(this, species, weight, height, when, diet, image)
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = image;
}

/**
 * @description Represents Human obejects that extends WildReptiles
 * @constructor
 * @param {string} name - The species Name
 * @param {lbs} weight - The weight of the species
 * @param {inches} height - Height of the species inches
 * @param {inches} feet - Height of the species in feet which is 1 * 12inches
 * @param {string} diet - species diet
 * @param{picture} image - species image
 */
function Human(species, weight, feet, inches, diet, image) {
  WildReptiles.call(this, species, weight, diet, image)
  this.species = species;
  this.weight = weight;
  this.height = feet;
  this.where = inches;
  this.diet = diet;
  this.image = image;
}


// Idea got from https://knoweledge.udacity.com
/**
 * @description fetches DINO species array from json and stores in an object
 * @description createGridCard to append grid tiles with title, image and facts to the DOM
 * @description compare methods for comapring weight, height and diet between Human and Dino species
 * @decriotion getRandom facts for each species everytime the user clicks button
 */
const createDinoInfoGraph = () => {
  (async () => {
    const dino = await fetch("dino.json")
      .then(result => result.json())
      .then(result => result.Dinos);

    // store the Dino Objects that was fetched from JSON
    const dinos = dino.map(dinos => new Dino(
      dinos.species,
      dinos.weight,
      dinos.height,
      dinos.diet,
      dinos.where,
      dinos.when,
      dinos.fact,
      dinos.image));

    //Get Random facts for each Dino species
    Dino.prototype.getRandom = function() {
      return this.fact[Math.floor(Math.random() * this.fact.length)];
    };

    //facts from 3 compare methods and 3 more facts to be stored in facts array
    Dino.prototype.addFact = function(fact) {
      this.fact.push(fact);
    };


    // Instantiate a new Human Object
    const human = new Human();
    // use IIFE to get user input from the Form data
    const getHumanData = () => {
      (function(human) {
        human.image = "images/human.png";
        human.species = document.getElementById('name').value;
        human.diet = document.getElementById('diet').value;
        human.weight = document.getElementById('weight').value;
        human.feet = document.getElementById('feet').value;
        human.inches = document.getElementById('inches').value;
        human.fact = "";
      })(human);
    };

    //Add human species to dinos array that has Dino species fectched from json
    //Idea got from https://knoweledge.udacity.com
    dinos.splice(4, 0, human);

    // Craete Grid Tile Items (Cards) with each tile having a title , image and facts
    // and add them dynamically to the base Grid Div Element
    const createGridCard = () => {

      for (let i = 0; i < GRIDTILES; i++) {
        const gridTilesDiv = document.createElement('div');
        const titleDiv = document.createElement('h3');
        const imgDiv = document.createElement('img');
        const factDiv = document.createElement('p');

        gridTilesDiv.className = 'grid-item';
        grid.appendChild(gridTilesDiv);
        gridTilesDiv.appendChild(titleDiv);
        gridTilesDiv.appendChild(imgDiv);
        gridTilesDiv.appendChild(factDiv);

        titleDiv.innerHTML = dinos[i].species;
        imgDiv.setAttribute('src', dinos[i].image);



        //Create Compare methods for Weight, Height and Diet properties for Human and DinoSpecies
        const dinoObj = dinos[i];
        let wtFact = "";
        let htFact = "";
        let dietFact = "";

        //compareWeight compares Human weight with Dino Species
        //and returns the Weight Fact
        Dino.prototype.compareWeight = function() {
          if (human.weight < dinoObj.weight) {
            wtFact = `The ${dinoObj.species} weighs ${dinoObj.weight - human.weight} lbs more than ${human.species}!`;
          } else if (dinoObj.weight < human.weight) {
            wtFact = `The ${dinoObj.species} weighs ${human.weight - dinoObj.weight} lbs less than ${human.species}!`;
          }

          return wtFact;
        };

        //compareHeight compares Human height in Inches  with Dino Species
        //and returns the height Fact
        Dino.prototype.compareHeight = function() {
          const humanInches = parseInt(human.feet * 12) + parseInt(human.inches);
          if (humanInches < dinoObj.height) {
            htFact = `${human.species} is ${dinoObj.height - humanInches} inches shorter than ${dinoObj.species}!`;
          } else if (dinoObj.height < humanInches) {
            htFact = `${human.species} is ${humanInches - dinoObj.height} inches taller than ${dinoObj.species}!`;
          }
          return htFact;
        };

        //compareDiet compares Human diet with Dino Species
        //and returns the diet Fact
        Dino.prototype.compareDiet = function() {
          if (human.diet === "Carnivor" && dinoObj.diet === "carnivor") {
            dietFact = `${human.species} has the same diet as a ${dinoObj.species}!`;
          } else if (human.diet === "Herbavor" && dinoObj.diet === "herbavor") {
            dietFact = `${human.species} has the same diet as a ${dinoObj.species}!`;
          } else {
            dietFact = `${human.species}'s diet doesn't match this Dinosaur.`;
          }
          return dietFact;

        };

        //Add the compare Facts from the above compare Methods to the Dinos array
        if (typeof dinos[i].fact === 'string') {
          factDiv.innerHTML = "";
        } else {

          dinos[i].fact.push(dinoObj.compareWeight(), dinoObj.compareDiet(), dinoObj.compareHeight());

          //The Bird Species should not have random Facts
          //It should only have always one fact "All Birds are Dinosaurs"
          dinos[GRIDTILES - 1].fact.splice(1, 3);

          factDiv.innerHTML = dinos[i].getRandom();
        }
      }
    };
    // create Grid Cards of 9 tiles , each tile displaying Dino Species, images
    // title and random facts and with human species name and image in the center tile
    //Pigeon Bird showing only its name and one fact All birds are Dinosaurs.”
    //Refreshing screen with new human input data shows new set of facts.
    return createGridCard(getHumanData());
  })();
};

/**
 * @description Hide the form from displaying
 *
 */
function hideForm() {

  document.getElementById("dino-compare").style.display = "none";
};

/**
 * @description Generate a Button Click event to create and display Grid Infograph for each Dinos
 * @description And Hide Human Data Form
 *
 */
document.getElementById("btn")
  .addEventListener("click", function() {
    hideForm();
    createDinoInfoGraph();
  });
