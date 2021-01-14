const mongoose = require('mongoose');
const Bake = require('../models/bake');

mongoose.connect('mongodb+srv://Artem:Artem@cluster0.o3cuc.mongodb.net/BroWe?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const bakes = [
  {
    title: 'Киш',
    desctription: 'Киш с курицей и брокколи (вес 1200 гр, диаметр 25 см)',
    imgURL: 'https://drive.google.com/file/d/1m4lIpbh05tBe56dhxvacWenipzr9MDWI/view?usp=sharing',
  },
  {
    title: 'Киш',
    desctription: 'Киш со шпинатом и сулугуни (вес 1200 гр, диаметр 25 см)',
    imgURL: 'https://drive.google.com/file/d/1i70sZwxPZ0YUtZXZYYaAWii6cAkdiuBC/view?usp=sharing',
  },
  {
    title: 'Киш',
    desctription: 'Киш луковый (вес 1200 гр, диаметр 25 см)',
    imgURL: 'https://drive.google.com/file/d/16CoEEw4lBSOOSfBCj9mgj5fD27Lr3b7y/view?usp=sharing',
  },
  {
    title: 'Киш',
    desctription: 'Киш с курицей карри (вес 1200 гр, диаметр 25 см)',
    imgURL: 'https://drive.google.com/file/d/1L-5C434b54W-VFnaJM2c_X-Sw0Z8DyvY/view?usp=sharing',
  },
  {
    title: 'Киш',
    desctription: 'Киш с тунцом и каперсами (вес 1200 гр, диаметр 25 см)',
    imgURL: 'https://drive.google.com/file/d/1L-5C434b54W-VFnaJM2c_X-Sw0Z8DyvY/view?usp=sharing',
  },
];

// Bake.insertMany(bakes).then(() => {
//   mongoose.connection.close();
// });
