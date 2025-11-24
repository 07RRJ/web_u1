const mongoose = require('mongoose');
const readline = require('readline');
const User = require('./models/User'); // samma modell som du redan har

// Din MongoDB Atlas-sträng
const MONGODB_URI = 'mongodb+srv://07RRJ:meow@meow.4yx6anm.mongodb.net/?retryWrites=true&w=majority&appName=MEOW';

// Skapa ett interface för att läsa från konsolen
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Ansluten till MongoDB\n');

  // Fråga användaren om ett län
  rl.question('Ange ett län: ', async (lan) => {
    try {
      // Sök i databasen (case-insensitive)
//obs viktigt här sker databasanropet och jag använder User som är mitt schema som finns i models/User.js
      const result = await User.findOne({ lista: new RegExp(`^${lan}$`, 'i') });

      if (result) {
        console.log(`\nHittade:`);
        console.log(`Län: ${result.lista}`);
        console.log(`Residensstad: ${result.lista2}`);
      } else {
        console.log(`\nInget län hittades med namnet "${lan}".`);
      }
    } catch (err) {
      console.error('Fel uppstod:', err);
    } finally {
      await mongoose.disconnect();
      rl.close();
    }
  });
}

main().catch((err) => {
  console.error('Fel vid anslutning:', err);
});