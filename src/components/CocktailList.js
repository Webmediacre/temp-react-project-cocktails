
import React from 'react'
import Cocktail from './Cocktail'; // all cocktails
import Loading from './Loading'; // loading if loading
import { useGlobalContext } from '../context'; // app context

const CocktailList = () => {
  // destructure 
  const { cocktails, loading } = useGlobalContext(); 
  console.log(cocktails); 
  // condition: if we can not fetch any Cocktails
  if(loading){ // initial value of true
    return <Loading />
  }

  if(cocktails.length < 1){ // if less than zero

    return ( 
      <h2 className='section-title'> no cocktails match your search term </h2>
    )

  }

  return ( 

    <section className='section'>

      <h2 className='section-title'>
        cocktails
      </h2>
      <div className='cocktails-center'>
        {cocktails.map((item) => {

          // ... spread operator that has access to props
          return <Cocktail key={item.id} {...item}/> 

        })}
      </div>

    </section>
    
  )

}

export default CocktailList
