import{Link} from "react-router-dom";

import Container from "./Container";

import styles from './Navbar.module.css';
import logo from '../../img/costs_logo.png'

function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link>
                    <img src={logo} alt="Costs"/>
                </Link>
            <ul class={styles.list}>
                <li className={styles.item}><Link to='/'>Home</Link></li>
                <li className={styles.item}><Link to='/Projects'>Projects</Link></li>
                <li className={styles.item}><Link to='/Contact'>Contato</Link></li>
                <li className={styles.item}><Link to='/Company'>Empresa</Link></li>
            </ul>
            </Container>
        </nav>
    )
}

export default Navbar;