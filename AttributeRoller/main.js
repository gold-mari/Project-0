const defaultAttributeScores = [15, 14, 13, 12, 10, 8];

function shuffleArray(sourceArray)
{
    // Fisher-Yates algorithm for returning a shuffled copy of a const list.
    // Originally adapted from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj.
    // ================

    let shuffled = Array.from(sourceArray); // create a duplicate to work with.
    for (let i = shuffled.length - 1; i > 0; i-- )
    {
        const j = Math.floor(Math.random() * (i+1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

function diceRoller(times, diceSides)
{
    // Rolls dice with {diceSides} number of sides, {times} number of times.
    // rollDice(4,6) rolls 4d6.
    // ================

    let results = [];
    for (let i = 0; i < times; i++)
    {
        results.push(Math.floor((Math.random() * diceSides) + 1))
    }

    return results;
}

function sumArrayElements(ourArray)
{
    // Iterates item-by-item, front to back, where each iteration loads the newest value into newValue.
    // Runs the operation to the right of =>. Returns sum.
    return ourArray.reduce((sum, newValue) => sum + newValue);
}

class Player
{
    constructor(characterName="Hana Yomejifezhiji")
    {
        this.name = characterName;
        this.attributes = // encoded as key-value pairs
        {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };

        let shuffledResult = shuffleArray(defaultAttributeScores);
        for (const [key, value] of Object.entries(this.attributes))
        {
            this.attributes[key] = shuffledResult.pop();
        }
    }

    rollAttributes() 
    {
        console.log("Rolling dice...");
        for (const key in this.attributes)
        {
            let results = diceRoller(4,6);
            results.sort(function(a,b){return a-b}) // Sort numerically, lowest to greatest.
            results.shift(); // Drop the first index, ie the lowest value.
            this.attributes[key] = sumArrayElements(results);
        }
    }

    printPlayer()
    {
        console.log(`NAME: ${this.name}`); 
        for (const [key, value] of Object.entries(this.attributes))
        {
            console.log(`${key.slice(0,3).toUpperCase()}: ${value}`)
        }
    }
}

const player01 = new Player();
player01.printPlayer();
const player02 = new Player("Ika Laujifezhiji");
player02.rollAttributes();
player02.printPlayer();