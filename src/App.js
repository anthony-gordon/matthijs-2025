import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemProvider } from './ItemContext';
import HomePage from './components/HomePage';
import ItemPage from './components/ItemPage';
import Header from './components/Header'; // Import the Header component
import './App.css'; // Import the CSS file for styling
import './style/root.css'; // Import the CSS file for styling


function App() {

  return (
    <ItemProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/item/:slug" element={<ItemPage />} />
        </Routes>
      </Router>
    </ItemProvider>
  );
}

export default App;
