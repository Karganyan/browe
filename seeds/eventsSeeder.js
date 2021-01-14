const mongoose = require('mongoose');
const Event = require('../models/event');

mongoose.connect('process.env.DB_URL', { useNewUrlParser: true, useUnifiedTopology: true });

const events = [
  {
    title: 'Книжный клуб',
    theme: 'Theme',
    desctription: 'Наше маленькое сообщество читателей',
    descriptionDate: 'Встречи проходят в выходные дни',
    imgURL: 'https://drive.google.com/file/d/1Hh3yYXiiDWxxcxCfotyGXX2DsTIerOzx/view?usp=sharing',
    urlChat: 'https://t.me/joinchat/FbasW53dZYR1wgiT',
  },
  {
    title: 'Психоклуб',
    theme: 'Theme',
    desctription: 'Клуб о важном с практикующим психотерапевтом',
    descriptionDate: 'Встречи проходят раз в месяц по вторникам или четвергам в 19:00',
    imgURL: 'https://drive.google.com/file/d/1wcH40OsX9rPbAABH3mQh9_C4KeVZZ8pD/view?usp=sharing',
    urlChat: 'https://t.me/joinchat/U5xgMFj742bnNWme',
  },
  {
    title: 'Киноклуб',
    theme: 'Theme',
    desctription: 'Обсуждаем мэтров и разные метры',
    descriptionDate: 'Встречи проходят в выходные дни',
    imgURL: 'https://drive.google.com/file/d/1-T-w1M3Sn7uSkEdIiLZ3W46c9G5Kkxdx/view?usp=sharing',
    urlChat: 'https://t.me/browecinema',
  },
];

// Event.insertMany(events).then(() => {
//   mongoose.connection.close();
// });
// console.log(Event.find().then((e) => { console.log(e, 'OK'); }));
