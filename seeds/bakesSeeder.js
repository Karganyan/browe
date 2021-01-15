require('dotenv').config();

// console.log(process.env.DB_URL);
const mongoose = require('mongoose');
const Bake = require('../models/bake');

mongoose.connect('mongodb+srv://Artem:Artem@cluster0.o3cuc.mongodb.net/BroWe?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const bakes = [
  {
    title: 'Киш',
    desctription: 'Киш с курицей и брокколи (вес 1200 гр, диаметр 25 см)',
    imgURL: 'https://i.ibb.co/x81MTt6/photo5413884260785434681.jpg',
  },
  {
    title: 'Киш',
    desctription: 'Киш со шпинатом и сулугуни (вес 1200 гр, диаметр 25 см)',
    imgURL: 'https://i.ibb.co/1GXZ03q/photo5345994885263635053.jpg',
  },
  {
    title: 'Киш',
    desctription: 'Киш луковый (вес 1200 гр, диаметр 25 см)',
    imgURL: 'https://i.ibb.co/m9vxxPy/8fb37bce-55d7-4728-8fae-caa56312513e.jpg',
  },
  {
    title: 'Киш',
    desctription: 'Киш с курицей карри (вес 1200 гр, диаметр 25 см)',
    imgURL: 'https://i.ibb.co/bd2Dpw0/7dcc8297-ad93-4d75-a33a-44f7b7737e29.jpg',
  },
  {
    title: 'Киш',
    desctription: 'Киш с тунцом и каперсами (вес 1200 гр, диаметр 25 см)',
    imgURL: 'https://i.ibb.co/b21czbK/c4d08a9f-33b8-46c9-aa7b-8c144fabfc2c.jpg',
  },
];

Bake.insertMany(bakes).then(() => {
  mongoose.connection.close();
});
