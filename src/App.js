import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import NewProject from './components/pages/Newproject';
import Contact from './components/pages/Contact';
import Projects from './components/pages/Projects';


import Container from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer'; 

function App() {
  return (
    <Router>
      <Navbar />
    <Container customClass="min-height">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/company" element={<Company />} />
        <Route path="/newproject" element={<NewProject />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Container>
      <Footer />
    </Router>
  );
}

export default App;