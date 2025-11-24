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

  // Fråga användaren om vilket län som ska kontrolleras
  rl.question('Ange namnet på länet du vill söka efter: ', async (lan) => {
    try {
      // Leta upp länet (case-insensitive)
      const result = await User.findOne({ lista: new RegExp(`^${lan}$`, 'i') });

      if (!result) {
        console.log(`\nInget län hittades med namnet "${lan}".`);
        await mongoose.disconnect();
        rl.close();
        return;
      }

      // Visa information om hittat län
      console.log(`\nHittade län: ${result.lista}`);
      console.log(`Residensstad: ${result.lista2}`);

      // Fråga om användaren vill ta bort länet
      rl.question('\nVill du ta bort detta län? (ja/nej): ', async (svar) => {
        if (svar.toLowerCase() === 'ja' || svar.toLowerCase() === 'j') {
          try {
            //Här sker db anrop för att kunna ta bort dokumentet
            await User.deleteOne({ _id: result._id });
            console.log(`\nLänet "${result.lista}" har tagits bort från databasen.`);
          } catch (err) {
            console.error('Fel vid borttagning:', err);
          }
        } else {
          console.log('\nLänet har inte tagits bort.');
        }

        await mongoose.disconnect();
        rl.close();
      });

    } catch (err) {
      console.error('Fel uppstod:', err);
      await mongoose.disconnect();
      rl.close();
    }
  });
}

main().catch((err) => {
  console.error('Fel vid anslutning:', err);
});