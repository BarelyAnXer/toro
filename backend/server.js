import express from 'express';
import morgan from 'morgan';
import { sequelize } from './database.js';
import cors from 'cors';
import { accountRoutes } from './routes/accountRoutes.js';
import { employeeRoutes } from './routes/employeeRoutes.js';
// import * as path from 'path';
// s;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'build')));
//
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

sequelize.authenticate()
.then(() => {
  console.log('connected to db');
})
.catch((error) => {
  console.log(error);
});

await sequelize.sync({ alter: true });
// remove this when in prod

app.get('/', function (req, res) {
  res.send('api is up');
});

app.use('/api/management/account', accountRoutes);
app.use('/api/management/employee', employeeRoutes);

app.listen(5000, () => {
  console.log(`Connected successfully on port ${5000}`);
});
