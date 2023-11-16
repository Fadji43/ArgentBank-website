const mongoose = require('mongoose');
const databaseUrl = process.env.DATABASE_URL || 'mongodb+srv://<username>:<password>@argentbank.gqfqj7y.mongodb.net/?retryWrites=true&w=majority';

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error(`Erreur de connexion à la base de données : ${error}`);
    throw new Error(error);
  }
};
