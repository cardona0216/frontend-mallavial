import React from 'react'

import  Image  from "next/image";
import { useRouter } from "next/router";
import { Container } from 'semantic-ui-react';
export default function Navbar() {
    const router = useRouter()
  return (
    <Container>
            <Image
            style={{cursor:'pointer'}}
            onClick={() => router.push('/')}
            src='/geosat.png'
            width={100}
            height={30}
            alt='logo'
        >
        </Image>
    </Container>

       
            
                   
                   
                  
            
      
    
  )
}
