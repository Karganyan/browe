const mongoose = require('mongoose');
const Coffee = require('../models/cofee');

mongoose.connect('mongodb+srv://Artem:Artem@cluster0.o3cuc.mongodb.net/BroWe?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const coffes = [
  {
    title: 'Эспрессо',
    imgURL: 'https://drive.google.com/file/d/1JSdm01H_4LbUH9R4uHvOIhZIfO_LoRIY/view?usp=sharing',
  },
  {
    title: 'Черный',
    imgURL: 'https://drive.google.com/file/d/1yLPH1UX1H7D4W1waBCHIZaFXwUDpcpxf/view?usp=sharing',
  },
  {
    title: 'Пуровер (воронка)',
    imgURL: 'https://drive.google.com/file/d/1niJAftT5QbolCPuVrnB1ipyiJTnukiGH/view?usp=sharing',
  },
  {
    title: 'Латте',
    imgURL: 'https://drive.google.com/file/d/12oMVwbpaZ7BRBWHXXH18VQLsBlPZSotj/view?usp=sharing',
  },
  {
    title: 'Капучино',
    imgURL: 'https://drive.google.com/file/d/1PFbVYlxfarqSwwmUHz7jo1TsdeQ0MKjG/view?usp=sharing',
  },
];

// Coffee.insertMany(coffes).then(() => {
//   mongoose.connection.close();
// });
