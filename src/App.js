
import './App.css';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

function App() {
  return (
    <main style={{padding: '20px'}}>
      <Header />
      <TodoList />
      <Footer />
    </main>
  );
}

export default App;
