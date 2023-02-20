import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import ArticleList from './components/ArticleList';
import Footer from './components/Footer';
import Header from './components/Header';
import NotLists from './components/NotLists';
import { actionsCategory } from './store/category-slice';
import { filterActions } from './store/filter-slice';
import { actionsLists } from './store/lists-slice';



function App() {

  // Get lists of Articles from server
  const getLists = async () =>{
    const res = await fetch('https://beta-e-commerce-default-rtdb.firebaseio.com/lists.json');
    // const res = await fetch('http://localhost:5000/lists');
    const data = await res.json();

    // console.log(data)
    console.log('Firebase',data)
    return data; 
  }
  
  // Get category of articles from server
  const getCategory = async () =>{
      const res = await fetch('http://localhost:5000/category');
      const data = await res.json();

      // console.log(data) 
      return data; 
  }

  // get state via methods Redux 
  const lists = useSelector(state => state.lists.lists)
  const category = useSelector(state => state.category.category)

  // State filter
  let search = useSelector(state => state.filter.search)
  let available = useSelector(state => state.filter.available)

  // get function of methods actions via redux
  const dispatch = useDispatch();
  // ********

  // Change value Search
  const setSearch = value =>{
    dispatch(filterActions.setSearch(value))
  }

  // Change value Available
  const setAvailable = value =>{
    dispatch(filterActions.setAvailable(value))
  }

  useEffect(() => {
    let getListsFromServer = async () =>{
      let listFormServer = await getLists()
      
      //Mise a jour du state
      dispatch(actionsLists.setLists(listFormServer))
    } 

    let getCategoryFromServer = async () =>{
      let categoryFormServer = await getCategory()

      //Mise a jour du state
      dispatch(actionsCategory.setCategory(categoryFormServer))
    } 

    getListsFromServer()
    getCategoryFromServer();
  }, []);

  // console.log('Lists from server (useSelector) ', lists)

  return (
      <div className="App">
          <Header changeSearch={setSearch} changeAvailable={setAvailable} />
          {lists.length === 0 ? <NotLists /> : <ArticleList lists={lists} category={category} />}
          {/* <Footer /> */}
      </div>
  );
}

export default App;
