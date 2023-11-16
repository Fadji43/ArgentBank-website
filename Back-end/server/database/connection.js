const mongoose = require('mongoose');
const databaseUrl = "mongodb+srv://SteveRogers:password456@argentbank.gqfqj7y.mongodb.net/?retryWrites=true&w=majority" // process.env.DATABASE_URL ;
console.log(databaseUrl)

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error(`Erreur de connexion à la base de données : ${error}`);
    throw new Error(error);
  }
};
