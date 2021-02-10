const blue = document.getElementById("blue");
const prurple = document.getElementById("prurple");
const orange = document.getElementById("orange");
const green = document.getElementById("green");
const btnstart = document.getElementById("btnStart");
const MAX_LEVEL = 5;

class Game {
  constructor() {

    this.initialize = this.initialize.bind(this);
    this.initialize();
    this.generateSequence();
    setTimeout(() => {
      this.nextLevelUp();
    }, 500);
  }

  initialize() {
    this.pickColor = this.pickColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.nextLevelUp = this.nextLevelUp.bind(this);

    this._this = this
    this.toggleBtnStart();
    this.level = 1;
    this.colors = {
      blue,
      purple,
      orange,
      green,
    };
  }
  toggleBtnStart() {
    if (btnstart.classList.contains("hide")) btnstart.classList.remove("hide");
    else
      setTimeout(() => {
        btnstart.classList.add("hide");
      }, 200);
  }

  generateSequence() {
    this.sequence = new Array(MAX_LEVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.generateSequence();
    this.subLevel = 0;
    this.iluminateSequence();
    this.addClickEvents();
  }

  transformNumberToColor(num) {
    switch (num) {
      case 0:
        return "blue";
      case 1:
        return "purple";
      case 2:
        return "orange";
      case 3:
        return "green";
    }
  }

  transformColorToNumber(color) {
    switch (color) {
      case "blue":
        return 0;
      case "purple":
        return 1;
      case "orange":
        return 2;
      case "green":
        return 3;
    }
  }

  addClickEvents() {
    this.colors.purple.addEventListener("click", this.pickColor);
    this.colors.green.addEventListener("click", this.pickColor);
    this.colors.blue.addEventListener("click", this.pickColor);
    this.colors.orange.addEventListener("click", this.pickColor);
  }

  deleteClickEvents() {
    this.colors.purple.removeEventListener("click", this.pickColor);
    this.colors.green.removeEventListener("click", this.pickColor);
    this.colors.blue.removeEventListener("click", this.pickColor);
    this.colors.orange.removeEventListener("click", this.pickColor);
  }

  iluminateSequence() {
    for (let index = 0; index < this.level; index++) {
      let color = this.transformNumberToColor(this.sequence[index]);
      setTimeout(() => this.ilumanteColor(color), 1000 * index);
    }
  }

  ilumanteColor(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.turnOffColor(color), 350);
  }

  turnOffColor(color) {
    this.colors[color].classList.remove("light");
  }

  nextLevelUp() {
    if(this.level === 1) this.nextLevel()
    else swal(`Level ${this.level - 1} passed`, `Next Level: ${this.level}`, `success` )
         .then(this.nextLevel)    
  }

  winnerGame() {
    swal("Color Game", "Congrats!!! you won the game", "success").then(
      this.initialize()
    );
  }

  gameOver() {
    swal("Color Game", "Sorry, you lost the game :(", "error").then(() => {
      this.deleteClickEvents();
      this.initialize();
    });
  }

  pickColor(ev) {
    const colorName = ev.target.dataset.color;
    const colorNumber = this.transformColorToNumber(colorName);
    this.ilumanteColor(colorName);
    if (colorNumber === this.sequence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel === this.level) {
        this.level++;
        this.deleteClickEvents();
        if (this.level === MAX_LEVEL + 1) {
          this.winnerGame();
        } else {
          setTimeout(() => this.nextLevelUp(), 1000);
        }
      }
    } else {
      this.gameOver();
    }
  }
}

function startGame() {
  window.game = new Game();
}
