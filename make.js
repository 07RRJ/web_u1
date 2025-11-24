const mongoose = require('mongoose');
const User = require('./models/User');

// Byt ut mot din riktiga Atlas-sträng:
const MONGODB_URI = 'mongodb+srv://07RRJ:meow@meow.4yx6anm.mongodb.net/?retryWrites=true&w=majority&appName=MEOW';

const data = [
    { lista: 'Blekinge',        lista2: 'Karlskrona' },
    { lista: 'Dalarna',         lista2: 'Falun' },
    { lista: 'Gotland',         lista2: 'Visby' },
    { lista: 'Gävleborg',       lista2: 'Gävle' },
    { lista: 'Halland',         lista2: 'Halmstad' },
    { lista: 'Jämtland',        lista2: 'Östersund' },
    { lista: 'Jönköping',       lista2: 'Jönköping' },
    { lista: 'Kalmar',          lista2: 'Kalmar' },
    { lista: 'Kronoberg',       lista2: 'Växjö' },
    { lista: 'Norrbotten',      lista2: 'Luleå' },
    { lista: 'Skåne',           lista2: 'Malmö' },
    { lista: 'Stockholm',       lista2: 'Stockholm' },
    { lista: 'Södermanland',    lista2: 'Nyköping' },
    { lista: 'Uppsala',         lista2: 'Uppsala' },
    { lista: 'Värmland',        lista2: 'Karlstad' },
    { lista: 'Västerbotten',    lista2: 'Umeå' },
    { lista: 'Västernorrland',  lista2: 'Sundsvall' },
    { lista: 'Västmanland',     lista2: 'Västerås' },
    { lista: 'Västra Götaland', lista2: 'Gothenburg' },
    { lista: 'Örebro',          lista2: 'Örebro' },
    { lista: 'Östergötland',    lista2: 'Linköping' },
];

async function main() {
    console.log('Ansluter till MongoDB...');
    await mongoose.connect(MONGODB_URI);

  // Valfritt: börja om varje gång
  // await User.deleteMany({});

const result = await User.insertMany(data);
console.log(`Klart! Lagrade ${result.length} rader.`);

  // Snabb kontroll
const sample = await User.findOne({});
console.log('Exempelpost:', sample);

    await mongoose.disconnect();
    console.log('Frånkopplad.');
}

main().catch(async (err) => {
    console.error('Fel uppstod:', err);
    try { await mongoose.disconnect(); } catch {}
    process.exit(1);
});