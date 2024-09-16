import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";


export default function Layout({children}: {children: JSX.Element | JSX.Element[]}) {
  return (
    <div >

      <main style={{background:'white'}}>
          <Navbar/>
        <Container style={{paddingTop:'2rem', height:'90vh'}}>
            {children}
        </Container>
      </main>

     
    
    </div>
  )
}