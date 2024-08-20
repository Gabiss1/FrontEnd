import logo from '../logo.svg';
import '../App.css';
import Header from '../Header.js';
import Footer from '../Footer.js';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <Header title="Home"/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Práticas Avançadas em desenvolvimento web</p>
        <Link to="/cadastro">Acessar Cadastro</Link>
        <Link to="/listar">Listar Registros</Link>
        <Link to="/upload">Upload de Arquivos</Link>
      </header>
      <Footer/>
    </div>
  );
}

export default Home;
