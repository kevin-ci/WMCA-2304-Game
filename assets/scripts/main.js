const titleElement = document.getElementById("title");
const heroNameElement = document.getElementById("hero-name");
const villainNameElement = document.getElementById("villain-name");
const heroHealthElement = document.getElementById("hero-health");
const villainHealthElement = document.getElementById("villain-health");
const heroImageElement = document.getElementById("hero-image");
const villainImageElement = document.getElementById("villain-image");
const buttonElements = document.getElementsByTagName("button");
const statusAreaElement = document.getElementById("status-area");
let playerTurn = true;
let gameRunning = true;

let villain = {
    name: "Sub-Zero",
    health: 50,
    image: "https://upload.wikimedia.org/wikipedia/en/9/9d/Sub-Zero_%28MK11%29.png",
    attacks: [
        {
            name: "Driving Glacier",
            dialogue: "Put some ice on it",
        },
        {
            name: "Deadly Vapors",
            dialogue: "You have yet to prove yourself",
        },
        {
            name: "Ice Slide",
            dialogue: "Sub-Zero always wins",
        },
    ],
    takeTurn() {
        let damage = Math.ceil(Math.random() * 10);
        let attack = Math.floor(Math.random() * 3);
        return [this.attacks[attack].name, damage];
    },
    die() {
        statusAreaElement.innerText = `Quick as lightning, Dogtanian drove his sword through Sub-Zero's chest, impaling him. "I have failed in the lin kuei," he croaked, before falling down dead. "Oh Dogtanian, my hero," Rebecca said.`;
    },
    displayHealth() {
        villainHealthElement.innerHTML = `${this.health}`;
    }
};

let hero = {
    name: "Dogtanian",
    health: 50,
    image: "https://assets.pippa.io/shows/61883052ddc1b500199b57d2/1680286317032-33b127388ba348790d922a24c877e578.jpeg",
    attacks: [
        {
            name: "Spinning Slash",
            dialogue: "All for one and one for all",
        },
        {
            name: "Musket",
            dialogue: "Fire in the hole!",
        },
        {
            name: "Sword Drive",
            dialogue: "I think you got the point",
        },
    ],
    die() {
        statusAreaElement.innerText = `In a flash, Sub-Zero unleashed his deadly mountain punch on Dogtanian. "Arf arf," wailed the stricken Musketeer, before dying. "Oh Sub-Zero, my hero," Kashif said.`;
    },
    takeTurn() {
        let damage = Math.floor(Math.random() * 10 + 1);
        return damage;
    },
    displayHealth() {
        heroHealthElement.innerHTML = `${this.health}`;
    }
};

titleElement.innerText = `${hero.name} vs ${villain.name}`;
heroNameElement.innerText = hero.name;
villainNameElement.innerText = villain.name;
hero.displayHealth();
villain.displayHealth();
heroImageElement.src = hero.image;
villainImageElement.src = villain.image;

for (let i = 0; i < buttonElements.length; i++) {
    buttonElements[i].innerText = hero.attacks[i].name;
    buttonElements[i].setAttribute("data-id", i);

    buttonElements[i].addEventListener('click', function () {
        if (playerTurn && gameRunning) {
            let damage = hero.takeTurn();
            villain.health -= damage;
            villain.displayHealth();
            let attackId = this.dataset.id;
            let attackName = hero.attacks[attackId].name;
            let output = `${hero.name} used his ${attackName} attack and dealt ${damage} damage!`;
            statusAreaElement.innerText = output;
            playerTurn = false;
            checkGameOver();
            setTimeout(villainTurn, 5000);
        }
    });
}

function villainTurn() {
    if (gameRunning) {
        let damage = villain.takeTurn();
        hero.health -= damage[1];
        hero.displayHealth();
        let output = `${villain.name} used his ${damage[0]} attack and dealt ${damage[1]} damage!`;
        statusAreaElement.innerText = output;
        playerTurn = true;
        checkGameOver();
    }
}

function checkGameOver() {
    if (hero.health <= 0) {
        hero.die();
        gameRunning = false;
    }
    else if (villain.health <= 0) {
        villain.die();
        gameRunning = false;
    }
}