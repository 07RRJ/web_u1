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
  console.log('✅ Ansluten till MongoDB\n');

  // Fråga användaren om vilket län som ska uppdateras
  rl.question('Ange namnet på länet du vill uppdatera: ', async (lan) => {
    try {
      // Sök efter länet
      const result = await User.findOne({ lista: new RegExp(`^${lan}$`, 'i') });

      if (!result) {
        console.log(`\n❌ Inget län hittades med namnet "${lan}".`);
        await mongoose.disconnect();
        rl.close();
        return;
      }

      console.log(`\n✅ Hittade län: ${result.lista}`);
      console.log(`Residensstad: ${result.lista2}`);

      // Fråga användaren om nytt namn
      rl.question('\nAnge det nya namnet för länet: ', async (nyttNamn) => {
        try {
          // Gör själva uppdateringen direkt i databasen
          //
          const updateResult = await User.findOneAndUpdate(
            { _id: result._id },          // vilket dokument som ska uppdateras
            { $set: { lista: nyttNamn }}, // vad som ska ändras
            { new: true }                 // returnera det uppdaterade dokumentet
          );

          console.log(`\n✅ Länets namn har uppdaterats till: ${updateResult.lista}`);
        } catch (err) {
          console.error('❌ Fel vid uppdatering:', err);
        } finally {
          await mongoose.disconnect();
          rl.close();
        }
      });

    } catch (err) {
      console.error('❌ Fel uppstod:', err);
      await mongoose.disconnect();
      rl.close();
    }
  });
}

main().catch((err) => {
  console.error('Fel vid anslutning:', err);
});
