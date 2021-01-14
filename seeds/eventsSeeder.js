const mongoose = require('mongoose');
const Event = require('../models/event');

mongoose.connect('mongodb+srv://Artem:Artem@cluster0.o3cuc.mongodb.net/BroWe?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const events = [
  {
    title: 'Книжный клуб',
    theme: 'Theme',
    desctription: 'Наше маленькое сообщество читателей',
    descriptionDate: 'Встречи проходят в выходные дни',
    imgURL: 'https://i.ibb.co/cQNgRBv/f9ed7fb2-d097-406e-8fff-39d45cc6b1aa.jpg',
    urlChat: 'https://t.me/joinchat/FbasW53dZYR1wgiT',
  },
  {
    title: 'Психоклуб',
    theme: 'Theme',
    desctription: 'Клуб о важном с практикующим психотерапевтом',
    descriptionDate: 'Встречи проходят раз в месяц по вторникам или четвергам в 19:00',
    imgURL: 'https://i.ibb.co/ys70Qs9/d6f643ed-5235-4743-80db-2095de34f6e1.jpg',
    urlChat: 'https://t.me/joinchat/U5xgMFj742bnNWme',
  },
  {
    title: 'Киноклуб',
    theme: 'Theme',
    desctription: 'Обсуждаем мэтров и разные метры',
    descriptionDate: 'Встречи проходят в выходные дни',
    imgURL: 'https://i.ibb.co/ys70Qs9/d6f643ed-5235-4743-80db-2095de34f6e1.jpg',
    urlChat: 'https://t.me/browecinema',
  },
];

Event.insertMany(events).then(() => {
  mongoose.connection.close();
});
// console.log(Event.find().then((e) => { console.log(e, 'OK'); }));
