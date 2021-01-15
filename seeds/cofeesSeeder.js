const mongoose = require('mongoose');
const Coffee = require('../models/cofee');

mongoose.connect('mongodb+srv://Artem:Artem@cluster0.o3cuc.mongodb.net/BroWe?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const coffes = [
  {
    title: 'Эспрессо',
    desctription: '160',
    imgURL: 'https://i.ibb.co/gRMVq19/d708968e-bda2-4c66-9183-4b754d087b90.png',
  },
  {
    title: 'Черный',
    desctription: '160/280',
    imgURL: 'https://i.ibb.co/DkZrWFP/75630796-a17b-4f63-a16d-9bab13a4f6c4.jpg',
  },
  {
    title: 'Пуровер (воронка)',
    desctription: '240',
    imgURL: 'https://i.ibb.co/2yfL3pf/08888479-571b-4256-9240-c01697bf6697.jpg',
  },
  {
    title: 'Латте',
    desctription: '200/240',
    imgURL: 'https://i.ibb.co/K5Yh5Ys/d65b79eb-8602-45b5-95e0-cbb6d86eca47.jpg',
  },
  {
    title: 'Капучино',
    desctription: '200/240',
    imgURL: 'https://i.ibb.co/k1zSKhs/248a9bf8-946f-40f4-bddd-1deb2953092f.jpg',
  },
];

Coffee.insertMany(coffes).then(() => {
  mongoose.connection.close();
});
