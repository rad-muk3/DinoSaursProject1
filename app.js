/**
 * @description Represents all dinosaurs as WildReptiles
 * @constructor
 * @param {string} species - The species Name
 * @param {number} weight - The weight of the species
 * @param {number} height - Height of the species
 * @param {string} facts - Dinosaur Species  Facts
 * @param {string} diet  - Diet of the species
 * @param {string} image - species image
 */
function WildReptiles(species, weight, height, facts, diet, image) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.facts = facts;
  this.image = 'images/' + species.toLowerCase() + '.png';
}

/**
 * @description adds all facts including compared facts between Human and Dino Species
 * @param {string} fact - Species facts
 *
 */
WildReptiles.prototype.addFact = function(fact) {
  this.facts.push(fact);
};

/**
 * @description compareDietFacts compares human diet with Dino Species diet
 * @param {string} diet - human diet
 */
WildReptiles.prototype.compareDietFacts = function(diet) {

  let fact = '';
  if (diet === 'Carnivor' && this.diet === 'carnivor') {
    fact = 'Our diets match!';
  } else if (this.diet === 'herbavor' && diet === 'Herbavor') {
    fact = 'Our diets match!';
  } else {
    fact = 'We have different diets!';
  }

  this.addFact(fact);
};

/**
 * @description compareWeightFacts compares human weight with Dino Species weight
 * @param {number} weight - human weight
 */
WildReptiles.prototype.compareWeightFacts = function(weight) {
  let fact = 'We both weigh the same!';
  if (this.weight > weight) {
    fact = 'I weigh more than Human';
  } else if (this.weight < weight) {
    fact = 'Wow!Human, you weigh more than me!';
  }
  this.addFact(fact);
};

/**
 * @description compareHeightFacts compares human height with Dino Species height
 * @param {number} height - human height
 */
WildReptiles.prototype.compareHeightFacts = function(height) {
  let fact = 'Our heights are the same!';
  if (this.height > height) {
    fact = 'I am taller than Human!';
  } else if (this.height < height) {
    fact = 'Wow!Human, you are way taller than me!';
  }
  this.addFact(fact);
};

/**
 * @description getRandomFact to get facts randomly of each Dino Species
 * @returns random facts of dino species
 */
WildReptiles.prototype.getRandomFact = function() {
  return this.facts[Math.floor(Math.random() * this.facts.length)];
};

/**
 * @description Represents Dino obejects that extends WildReptiles
 * @constructor
 * @param {string} species - The species Name
 * @param {number} weight - The weight of the species
 * @param {number} height - Height of the species
 * @param {string} diet - Diet of the species
 * @param {string} facts - Facts about the species
 */
function Dino(species, weight, height, diet, facts) {
  WildReptiles.call(this, species, weight, height, diet, facts);

}

//Createa a new instance of Dino Object from the WildReptiles protoype object
Dino.prototype = Object.create(WildReptiles.prototype);
Dino.prototype.constructor = Dino;


/**
 * @description Represents Human obejects that extends WildReptiles
 * @constructor
 * @param {string} species - Human Name
 * @param {number} feet - Human height in feet
 * @param {number} inches - Human height in inches
 * @param {number} weight - Human weight in lbs
 * @param {string} diet - HUman diet
 * @param {number} height - Human Height convert feet to inches which is 1 * 12inches + inches
 * @param {string} image - human image
 */
function Human(species, weight, feet, inches, diet, height, image) {
  WildReptiles.call(this, species, weight, height);
  this.species = species,
    this.feet = feet,
    this.inches = inches,
    this.weight = weight,
    this.diet = diet,
    this.height = height,
    this.image = 'images/human.png';
}

//A new instance of Human obejct from the specified WildReptiles prototype
Human.prototype = Object.create(WildReptiles.prototype);
Human.prototype.constructor = Human;

let dinos = [];
//fetches DINO species array from json and stores in an object
fetch("dino.json")
  .then(response => response.json())
  .then(json => dinos = json.Dinos.map(dino => new Dino(dino.species, dino.weight, dino.height, dino.fact, dino.diet, dino.where, dino.when, dino.image)));

/**
 * @description getHuman gets all the form input data for human . Uses IIFE
 * @returns human object with data
 */
function getHuman() {
  return (function() {

    let name = getFormInput('name');
    let heightFeet = parseFloat(getFormInput('feet'));
    let heightInches = parseFloat(getFormInput('inches'));
    let weight = parseFloat(getFormInput('weight'));
    let diet = getFormInput('diet');
    let humanHt = (heightFeet * 12) + heightInches;

    const human = new Human(name, weight, heightFeet, heightInches, diet, humanHt);

    return human;
  }());
};

/**
 * @description Generate a Button Click event to create and display Grid Infograph for each Dinos
 *
 */
document.getElementById('btn')
  .addEventListener('click', function() {
    human = getHuman();

    dinos.forEach(dino => {
      dino.compareHeightFacts(human.height);
      dino.compareDietFacts(human.diet);
      dino.compareWeightFacts(human.weight);
    });
    // Hide Form to display the Dino-Infograph
    document.getElementById('dino-compare').style.display = 'none';

    // Generate Grid Tiles for each Dino species and append to DOM
    for (let dIndex in dinos) {
      let dino = dinos[dIndex];
      let fact = dino.getRandomFact();
      //The Bird Species should not have random Facts
      //It should only have always one fact "All Birds are Dinosaurs"
      if (dino.weight < 1) {
        fact = 'All Birds are Dinosaurs.'
      }

      let dinoTilesDiv = createGridTiles(dino.species, dino.image, fact);

      document.getElementById('grid')
        .appendChild(dinoTilesDiv);

      if (dIndex == 3) {
        // Position human tile in the center of the Grid
        let humanTileDiv = createGridTiles(human.species, human.image);

        document.getElementById('grid')
          .appendChild(humanTileDiv);
      }
    }
  });


/**
 * @description getFormInput get form element values
 * @param {id}elem - each input element by their id
 * @returns the value of the input elements
 */
function getFormInput(elem) {
  return document.getElementById(elem).value;
}

/**
 * @description createGridTiles Craete Grid Tile with each tile having a title , image and facts
 * @param {string} species - name of the species
 * @param {string} img  - species image
 * @param {string} fact  - species facts
 * @returns the grid tiles with their items appended to DOM
 */
function createGridTiles(species, img, fact) {
  let gridTilesItemDiv = document.createElement('div');
  gridTilesItemDiv.className = 'grid-item';

  // append  species title
  let speciesTitleDiv = document.createElement('h3');
  speciesTitleDiv.innerText = species;
  gridTilesItemDiv.appendChild(speciesTitleDiv);

  // append species image
  let speciesimgDiv = document.createElement('img');
  speciesimgDiv.src = img;
  gridTilesItemDiv.appendChild(speciesimgDiv);

  //append species fact
  if (fact) {
    // for humans,there are no facts requored
    let speciesfactDiv = document.createElement('p');
    speciesfactDiv.innerText = fact;
    gridTilesItemDiv.appendChild(speciesfactDiv);
  }

  return gridTilesItemDiv;
}
