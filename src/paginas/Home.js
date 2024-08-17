import '../App.css';
import Header from '../Header.js';
import Footer from '../Footer.js';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <Header title="Home"/>
      <header className="App-header">
        <p>Práticas Avançadas em desenvolvimento web</p>
        <Link to="/cadastro">Acessar Cadastro de Fornecedores</Link>
        <Link to="/entrada">Acessar Cadastro de Entrada</Link>
        <Link to="/itensentrada">Acessar Cadastro de Itens de Entrada</Link>
      </header>
      <Footer/>
    </div>
  );
}

export default Home;