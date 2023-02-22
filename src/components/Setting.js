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
import { storage } from '../firebase/firebase'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'

const Setting = () => {

  const [viewAddCategories , setviewAddCategories] = useState(false)
  const [viewAddArticles , setviewAddArticles] = useState(false)


    const dispatch = useDispatch();

    // Use redux for the access of state article and category
    let lists = useSelector(state  => state.lists.lists)
    const category = useSelector(state  => state.category.category)

    // //get element lists from server
    const getLists = async () =>{
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

      // #1: Create a ref with our storage const export and folder/name-of-file
      const refImg = ref(storage , `/images/${value.image[0].name}`)
      
      // #2:  Use uploadBytes or uploadBytesResumable for upload our files
      const uploadTask = uploadBytesResumable(refImg , value.image[0]).then(e => console.log('Upload Ok',e))

      // Phase 2 : Get the link

      // #1: Get the constant who serve the uploading , use .then like a Promise.
      // #2 : Use method getDownloadURL with params our refs (refImg) using then on this method (getDownloadURL) and we are link of our image now in the db 
      uploadTask.then(() => {
        // Handle successful uploads on complete
        // instance, get the download URL:
        getDownloadURL(refImg).then((downloadUrl) => console.log('Link', downloadUrl))
      }, 
      (err) => {
        console.log(err);
      })
      // uploadTask.on('state_changed',
      //   (snapshot) => {

      //     console.log(snapshot)
      //   },
      //   (err) => {
      //     console.error(err)
      //   },
      //   () =>{
      //     // Handle successful uploads on complete
      //     // For instance, get the download URL:

      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => console.log('Link', downloadUrl))
      //   }
      // )

      

      // console.log(uploadImg)
      
      const valueToAdd = {...value, image: value.image[0] ,stocked:value.number > 0 ? true : false}


      console.log(valueToAdd)
      // await axios.put('https://beta-e-commerce-default-rtdb.firebaseio.com/lists.json', [...lists , { ...valueToAdd , id: lists[lists.length - 1].id+1 }])
      //   .then(e => console.log(e))
      //   .catch(err => console.error(err))

      // dispatch(actionsLists.setLists([...lists , { ...valueToAdd , id: lists.length === 0 ? 1 : lists[lists.length - 1].id+1 }]));
      // On recupere le dernier element du state lists et on incremente son id pour le nouveau a ajouté
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

        // console.log(value)
        // Appel de la liste depuis Firebase
        let listsFromFirebase = await getLists();
        var indexFirebaseElement;

        // Get a Array of id of lists Firebase
        let idArray = listsFromFirebase.map(e => e === null ? null : e.id)
        idArray.map((e , i) => e === value.id ? indexFirebaseElement = i : 0)


        console.log("Index from firebase" , indexFirebaseElement)

        dispatch(actionsLists.setLists(lists.map(e => e.id === value.id ? {...value , stocked: value.number > 0 ? true : false} : e)))

        // update this function for so that use link Firebase and update the element selected
        await axios.put(`https://beta-e-commerce-default-rtdb.firebaseio.com/lists/${indexFirebaseElement}.json` , {...value , stocked: value.number > 0 ? true : false})
            .then(e => console.log(e))
            .catch(err => console.error(err))
        
        // handleClose()
        // window.location.reload()
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
    }, []);

    // console.log("Category", category)

  return (
    <>
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
    </>
  )
}

export default Setting