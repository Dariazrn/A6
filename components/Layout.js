import { Container } from 'react-bootstrap';
import MainNav from '../components/MainNav';



function Layout (props){

    return (
     <>
     
       <MainNav />
       <br />
        <Container>
         {props.children}

        </Container>
        <br />
     </>
    )
}

export default Layout