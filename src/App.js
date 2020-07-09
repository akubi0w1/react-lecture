import React from 'react';
import './assets/css/App.css'
import Container from './components/Container';
import Header from './components/Header'

const App = () => (
  <>
    <Header />
    <Container items={TODO_LIST}/>
  </>
);

export default App;

// sample data
const TODO_LIST = [
  {
    id: 1,
    todo: 'something',
    isDone: false,
  },
  {
    id: 2,
    todo: 'something',
    isDone: false,
  },
  {
    id: 3,
    todo: 'something',
    isDone: false,
  },
  {
    id: 4,
    todo: 'something',
    isDone: true,
  },
  {
    id: 5,
    todo: 'something',
    isDone: true,
  },
]
