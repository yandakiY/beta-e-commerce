import React from 'react'
import { Container } from 'react-bootstrap'
import NotLists from '../NotLists'
import Stats from '../Stats'
import TableArticleSettings from '../Table/TableArticleSettings'

const SettingsStats = ({lists , category , backSettings}) => {
  return (
    <Container style={{textAlign:'center' , marginTop:'75px'}} fluid>
        {lists.length === 0 || category.length === 0 ? <NotLists /> : <Stats backSettings={backSettings} lists={lists} category={category} />}
    </Container>
  )
}

export default SettingsStats