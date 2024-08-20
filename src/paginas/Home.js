import '../App.css';
import Header from '../Header.js';
import Footer from '../Footer.js';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <Header title="Página Inicial"/>
      <header className="App-header">
        <p>Controle de Estoque</p>
        <nav style={{ position: 'absolute', top: '150px', left: 0, width: '100%', textAlign: 'center', padding: '10px', backgroundColor: 'black' }}>
        <Link to="/cadastrofornecedor" className="nav-link">Cadastro Fornecedor</Link>
        <Link to="/entrada" className="nav-link">Cadastro Entrada</Link>
        <Link to="/listarentradas" className="nav-link">Listar Entradas</Link>
        <Link to="/itensentrada" className="nav-link">Cadastrar Itens da Entrada</Link>
        <Link to="/listaritensentrada" className="nav-link">Listar Itens da Entrada</Link>
        </nav>
      </header>
      <Footer/>
    </div>
  );
}

export default Home;