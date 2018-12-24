import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const description = [
  'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ')

const AdminDashLayout = () => (

  <Card.Group centered>
  <Card>
    <Card.Content header='Candidates' />
    <Card.Content>
     <Icon name='id card' size='huge' inverted color='black'/>
     </Card.Content>
  </Card>

  <Card>
    <Card.Content header='Voters' />
    <Card.Content>
     <Icon name='user' size='huge' inverted color='black'/>
     </Card.Content>
  </Card>

  <Card>
    <Card.Content header='Issues' />
    <Card.Content>
     <Icon name='question circle' size='huge' inverted color='black'/>
     </Card.Content>
  </Card>

  <Card>
    <Card.Content header='About Election' />
    <Card.Content>
     <Icon name='info' size='huge' inverted color='black'/>
     </Card.Content>
  </Card>
  </Card.Group>
)

export default AdminDashLayout
