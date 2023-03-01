import React, { useEffect, useState } from 'react'
import AddArticles from './Form/AddArticles'
import AddCategories from './Form/AddCategories'
import '../style/Settings.css'
import TableArticleSettings from './Table/TableArticleSettings'
import {useSelector , useDispatch} from 'react-redux'
import { actionsLists } from '../store/lists-slice'
import { actionsCategory } from '../store/category-slice'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { BsBookmarkPlusFill, BsFillCartPlusFill , BsFillGearFill } from 'react-icons/bs'
import { BiHome  , BiBlock } from "react-icons/bi";
import NotLists from './NotLists'
import axios from 'axios'
import axiosLists from '../api-axios/axiosLists'
import axiosCategory from '../api-axios/axiosCategory'
import { auth, storage } from '../firebase/firebase'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { redirect , Navigate } from 'react-router-dom'

const Setting = () => {

    const [viewAddCategories , setviewAddCategories] = useState(false)
    const [viewAddArticles , setviewAddArticles] = useState(false)

    const myAuth = auth.currentUser
    console.log("My auth",myAuth)
    const [isAuth , setIsAuth] = React.useState(null);

    // const loader = () => {
    //   if(myAuth === null){
    //     return redirect('/auth-denied')
    //   }
    //   // return null;
    // }

    const dispatch = useDispatch();

    // Use redux for the access of state article and category
    let lists = useSelector(state  => state.lists.lists)
    const category = useSelector(state  => state.category.category)

    // //get element lists from server
    const getLists = async () => {
        const res = await axiosLists.get();
        return res.data
    }

    const getCategory = async () =>{
        const res = await axiosCategory.get();
        return res.data
    }

    const addArticles = async (value) => {

      // Send Image a Firebase
      // Comment proceder ?? : Envoyer d'abord l'image vers le storage de Firebase (/images) et par la suite recuperer le lien de l'image et l'inserer
      
      // Phase 1 : Send image
      // ------
      // #1: Create a ref with our storage const export and folder/name-of-file
      // #1-a : How attribute Name of images : IMG+nameImage+Date.getTime()
      let valueId = new Date().getTime();
      const refImg = ref(storage , `/images/IMG-${value.image[0].name}-${valueId}`)
      
      // #2:  Use uploadBytes or uploadBytesResumable for upload our files
      const uploadTask = uploadBytesResumable(refImg , value.image[0])

      // Phase 2 : Get the link
      // -------
      // #1: Get the constant who serve the uploading , use .then like a Promise.
      // #2 : Use method getDownloadURL with params our refs (refImg) using then on this method (getDownloadURL) and we are link of our image now in the db 
      uploadTask.then(() => {
        // Handle successful uploads on complete
        // instance, get the download URL:
        getDownloadURL(refImg).then(async (downloadUrl) => {

          const valueToAdd = {...value, image:downloadUrl ,stocked:value.number > 0 ? true : false}

          // Mise a jour du state lists avec la nouvelle valeur ajoutée
          dispatch(actionsLists.setLists([...lists , { ...valueToAdd , id: lists.length === 0 ? 1 : lists[lists.length - 1].id+1 }]));
          
          // Envoie du nouveau state mise a jour a la place de l'ancien
          await axios.put('https://beta-e-commerce-default-rtdb.firebaseio.com/lists.json', [...lists , { ...valueToAdd , id: lists.length === 0 ? 1 : lists[lists.length - 1].id+1 }])
            .then(e => console.log(e.status))
            .catch(err => console.error(err))
        })
      },
      (err) => {
        console.log(err);
      })

      setviewAddArticles(false)
    }

    const addCategory = async value =>{

      await axios.put('https://beta-e-commerce-default-rtdb.firebaseio.com/category.json', [...category , {...value , id: category[category.length - 1].id+1}])
        .then(e => console.log(e))
        .catch(err => console.error(err))
      
      // Mise a jour du state
      dispatch(actionsCategory.setCategory([...category , {...value , id: category[category.length - 1].id+1}]));
      setviewAddCategories(false)
      
    }

    const sendSubmitUpdate = async (value) =>{
      
      const refImg = ref(storage , `/images/IMG-${value.image[0].name}-${new Date().getTime()}`)

      uploadBytes(refImg , value.image[0]).then(
        () =>{
          getDownloadURL(refImg).then(async (downloadUrl) => {
            // console.log(downloadUrl)

            // Appel de la liste depuis Firebase
            let listsFromFirebase = await getLists();
            var indexFirebaseElement;

            // Get a Array of id of lists Firebase
            let idArray = listsFromFirebase.map(e => e === null ? null : e.id)

            // Get index Firebase
            idArray.map((e , i) => e === value.id ? indexFirebaseElement = i : 0)

            // Mise a jour du state lists
            dispatch(actionsLists.setLists(lists.map(e => e.id === value.id ? {...value , image:downloadUrl , stocked: value.number > 0 ? true : false} : e)))

            await axios.put(`https://beta-e-commerce-default-rtdb.firebaseio.com/lists/${indexFirebaseElement}.json` , {...value , image: downloadUrl , stocked: value.number > 0 ? true : false})
                .then(e => console.log(e))
                .catch(err => console.error(err))
          })
        }
      )
    }

    

    useEffect(() => {
        const getListsFromServer = async () =>{
            let listFormServer = await getLists();

            dispatch(actionsLists.setLists(listFormServer));

        }
        const getCategoryFromServer = async () =>{
            let categoryFormServer = await getCategory();

            dispatch(actionsCategory.setCategory(categoryFormServer));
        }

        getListsFromServer();
        getCategoryFromServer();
        setIsAuth(myAuth)
        
    }, []);

    // console.log("Category", category)

  return (
    isAuth ? <>
        <Navbar expand="lg" variant="dark" bg="dark" fixed="sticky">
          <Container>
            <Navbar.Brand style={{fontFamily:'Consolas , sans-serif' , textDecoration:'underline'}} href="#">
              <h4>Settings <BsFillGearFill /></h4>
            </Navbar.Brand>

            <Nav>
              <Nav.Link onClick={() => setviewAddCategories(!viewAddCategories)} style={{display:'flex' , flexDirection:'row' , alignItems:'baseline'}}>
                {viewAddCategories === false ? <><h5>Add Categories </h5>{' '}<BsBookmarkPlusFill /></> : <><h5 className='text-danger'>Close Add Categories </h5>{' '}<BiBlock className='text-danger' /></>}
              </Nav.Link>
              <Nav.Link onClick={() => setviewAddArticles(!viewAddArticles)} style={{display:'flex' , flexDirection:'row' , alignItems:'baseline'}}>
                {viewAddArticles === false ? <><h5>Add Articles </h5>{' '}<BsFillCartPlusFill /></> : <><h5 className='text-danger'>Close Add Articles </h5>{' '}<BiBlock className='text-danger'/></>}
              </Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href='/' style={{display:'flex' , flexDirection:'row' , alignItems:'baseline'}}>
                    <h3 style={{color:'whitesmoke'}}><BiHome /></h3>
                </Nav.Link>
                {myAuth !== null && <Nav.Link href='/about' className='text-danger' style={{border:'solid white 2px'}}>
                  <h5 style={{fontWeight:'bold'}}>Sign out</h5>
                </Nav.Link>}
            </Nav>
          </Container>
        </Navbar>

        <div style={{textAlign:'center'}}>

            <div style={{display:'flex', flexDirection:'row' , justifyContent:'space-evenly' , alignItems:'center'}}>
                {/* Categories Formulaire */}
                {viewAddCategories && <AddCategories addCategory={addCategory} />}

                {/* Articles Formulaire */}
                {viewAddArticles && <AddArticles category={category} lists={lists} addArticle={addArticles} />}
            </div>

            {lists.length === 0 || category.length === 0 ? <NotLists /> : <TableArticleSettings sendUpdate={sendSubmitUpdate} lists={lists} category={category} />}
        </div>
    </> : <Navigate to={'/auth-denied'} />
  )
}

export default Setting