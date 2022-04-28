
import React from 'react';
import { Link } from 'react-router-dom';

// Cocktail to be used in 'CocktailList'
// deconstruct and access item props that will be used in the ...spread operator
const Cocktail = ({ id, name, image, info, glass }) => {

  return (

    <article className='container'>

      <div className='img-container'>
        <img src={image} alt={name} />
      </div>
      <div className='footer-container'>
        <h3>{name}</h3>
        <h3>{glass}</h3>
        <h3>{info}</h3>
        <Link to={`/cocktail/${id}`} className='btn btn primary btn-details'>
          details 
        </Link>
      </div>
      
    </article>

  )

}

export default Cocktail;
