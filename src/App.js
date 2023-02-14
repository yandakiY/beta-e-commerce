// import logo from './logo.svg';
// import {BrowserRouter as Router , Route , createBrowserRouter , Routes} from "react-router-dom"
import { useEffect, useState } from 'react';
import './App.css';
import ArticleList from './components/ArticleList';
import Footer from './components/Footer';
import Header from './components/Header';
import {useSelector , useDispatch} from 'react-redux'
import { actionsLists } from './store/lists-slice';
import { actionsCategory } from './store/category-slice';


function App() {

  // const [lists , setLists] = useState([])
  // const [category , setCategory] = useState([])

  // const disaptch = useDispatch()

  // const lists = useSelector(state => state.lists)
  // const category = useSelector(state => state.category)

  // // Actions of the new State with react redux

  // const setLists = disaptch(actionsLists.setLists)
  // const setCategory = disaptch(actionsCategory.setCategory)

  // // ---- // 

  const [search , setSearch] = useState('')
  const [viewAvailable , setViewAvailable] = useState("");

  const changeSearch = value =>{
    setSearch(value)
  }

  // Function pour get les elements sur notre json-server
  // const getLists = async () =>{
  //   const res = await fetch('http://localhost:5000/lists');
  //   const data = await res.json();

  //   // console.log(data)
  //   return data; 
  // }
  
  // const getCategory = async () =>{
  //   const res = await fetch('http://localhost:5000/category');
  //   const data = await res.json();

  //   // console.log(data) 
  //   return data; 
  // }

  // useEffect(() => {
  //   let getListsFromServer = async () =>{
  //     let listFormServer = await getLists()

  //     //Mise a jour du state
  //     setLists(listFormServer)
  //   } 

  //   let getCategoryFromServer = async () =>{
  //     let categoryFormServer = await getCategory()

  //     //Mise a jour du state
  //     setCategory(categoryFormServer)
  //   } 

  //   getListsFromServer()
  //   getCategoryFromServer();
  // }, []);

  return (
      <div className="App">
          <Header />
          <ArticleList/>
          {/* <p style={{fontFamily:'consolas', fontWeight:'bold'}}>No Articles in Database</p>} */}
          <Footer />
      </div>
  );
}

export default App;
