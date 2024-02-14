import './header.css';
import { Link } from 'react-router-dom';

function Header(){
    return(
      <header>
        <Link className="logo" to="/">Filmes Play</Link>
        <Link className="favorito" to="/favorito">Meus Filmes</Link>
      </header>
    )
}
export default Header;