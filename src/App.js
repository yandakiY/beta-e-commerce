
import './App.css';
import ArticleList from './components/ArticleList';
import Footer from './components/Footer';
import Header from './components/Header';



function App() {

  return (
      <div className="App">
          <Header />
          <ArticleList/>
          <Footer />
      </div>
  );
}

export default App;
