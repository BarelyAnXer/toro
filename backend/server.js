import express from 'express';
import morgan from 'morgan';

const app = express();

// app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('api is up');
});

app.listen(5000, () => {
  console.log(`Connected successfully on port ${5000}`);
});
