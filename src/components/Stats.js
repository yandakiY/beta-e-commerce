import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'

const Stats = ({backSettings , lists , category}) => {
  
  let testC = category.map(cat => ({name:cat.name , id:cat.id}))
  let test = lists.map(l => ({name:l.name , number: l.number , price: l.price , category:l.category , stocked: l.stocked , id:l.id}))

  function getArticleByCategory(){
    
    var count = 0;
    var nameCat = ''

    let valueToReturn = []
    for(let i = 0 ; i < testC.length ; i++){

      var categoryIsNotNull = false;
      for(let j = 0 ; j < test.length ; j++){

        if(testC[i].name === test[j].category){
          count++
          nameCat = testC[i].name
          categoryIsNotNull = true
        }
        
      }

      categoryIsNotNull ? valueToReturn.push({category: nameCat , count: count}) : valueToReturn.push({category: testC[i].name , count: 0})
      count = 0
      nameCat = ''
    }

    return valueToReturn;
  }


  // Get quantity of article by category
  function getQuantityArticle(){
    var valueToReturn = []

    var count = 0
    var nameCat = ''

    // Parcourir en 1er les category 
    // Parcourir en 2eme les articles && verifier si leur category correspond a la cateogry premiere

    for(let i = 0 ; i < testC.length ; i++){
      // Category has not article
      var categoryNotArticle = false

      for(let j = 0 ; j < test.length ; j++){
        if(testC[i].name === test[j].category){
          count += (Number.isInteger(test[j].number) ? Number.parseInt(test[j].number) : Number.parseFloat(test[j].number))
          nameCat = test[j].category
          categoryNotArticle = true
        }
      }

      categoryNotArticle ? valueToReturn.push({qteArticle: count , category: nameCat}) : valueToReturn.push({qteArticle:0 , name:testC[i].name})

      count = 0
      // nameCat
    }

    return valueToReturn;
  }

  // Get the average price of article by category
  function avgPriceByCategory(){
    let valueToReturn = []

    let avg = 0;
    let countArt = 0
    let nameCat = ''

    for(let i = 0 ; i < testC.length ; i++){
      let categoryPresent = false;

      for(let j = 0 ; j < test.length ; j++){

        if(testC[i].name === test[j].category){
          // Count article in the coun
          countArt++
          avg += Number.isInteger(test[j].price) ? Number.parseInt(test[j].price) : Number.parseFloat(test[j].price)
          nameCat = testC[i].name
          
          categoryPresent = true
        }

      }

      avg = Math.round((avg/countArt + Number.EPSILON) * 100) / 100 

      categoryPresent ? valueToReturn.push({category: nameCat , avgPrice: avg}) : valueToReturn.push({category: testC[i].name , avgPrice: 0})

      avg = 0
      countArt = 0
    }

    return valueToReturn
  }


  // Article categorize by stocked or not
  function articleInStock(){
    var valueToReturn = [
      {
        inStock: true,
        quantity:0
      },
      {
        inStock: false,
        quantity:0
      }
    ]
    // var countStocked = 0
    // var countNotStocked = 0
    for(let i = 0 ; i < test.length ; i++){ // On parcoure les articles

      if(test[i].stocked === true){
        // Index 0 = Article in Stock is true
        valueToReturn[0].quantity++
      }else{
        // Index 1 = Article in Stock is false
        valueToReturn[1].quantity++
      }
    }

    return valueToReturn;
  }


  function articleStockedByCategory(){

    let valueToReturn = []
    // Parcourir les category
    // Parcourir les articles
    // Check si l'article est en stock ou non

    for(let i = 0 ; i < testC.length ; i++){

      // Add the name of category
      valueToReturn.push({
        category: testC[i].name,
        inStock:0,
        notInStock:0
      })
      
      for(let j = 0 ; j < test.length ; j++){
        // Update the new object which was add now 
        if((testC[i].name === test[j].category) && test[j].stocked === true){
          valueToReturn[i].inStock++
        }else if((testC[i].name === test[j].category) && test[j].stocked === false){
          valueToReturn[i].notInStock++
        }else{
          continue
        }
      }
    }

    return valueToReturn;
  }

  console.log('Index Article by category' , getArticleByCategory())
  console.log('Quantity of article by cateogry', getQuantityArticle())
  console.log('Prix moyen des article par category', avgPriceByCategory())
  console.log('Number of products in stock or not' , articleInStock())
  console.log('Stocked or not by Category' , articleStockedByCategory())


  return (
    <Container>
        <div style={{display:'flex' , justifyContent:'center'}} >
            <Button variant='outline-danger' style={{display:'flex' , alignItems:'center'}} onClick={backSettings}><BsArrowLeft /> {' '} Back to Settings</Button>
        </div>
        <h2 style={{fontFamily:'montserrat' , marginTop:'15px'}}>Data Visualization : </h2>

        <Row lg={2} xs={1}>
            <Col>
                <Card style={{fontFamily:'montserrat'}}>
                    <Card.Title as={'h4'}>Article by category</Card.Title>
                </Card>
            </Col>
            <Col>
                <Card style={{fontFamily:'montserrat'}}>
                    <Card.Title as={'h4'}>Quantity of article by category</Card.Title>
                </Card>
            </Col>
            {/* <hr /> */}
            <Col>
                <Card style={{fontFamily:'montserrat'}}>
                    <Card.Title as={'h4'}>Average price of articles by category</Card.Title>
                </Card>
            </Col>
            <Col>
                <Card style={{fontFamily:'montserrat'}}>
                    <Card.Title as={'h4'}>Article in stock or not</Card.Title>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default Stats