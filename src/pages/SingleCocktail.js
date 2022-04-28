
import React from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {

  const { id } = useParams();
  const [ loading, setLoading ] = React.useState(false);
  const [ cocktail, setCocktail ] = React.useState(null);

  React.useEffect(() => { // load all below in page

    setLoading(true); // before fetching and loading
    // set function
    async function getCocktail() { // just a function to read api and respone

      try {
      
        const response = await fetch(`${url}${id}`); // fetch url and id
        
        const data = await response.json();

          console.log(data);

          if (data.drinks) { // 'data.drinks' is the structure of the json // if data.drinks is true

          const { // must destructure in order to get and set indvidual item values
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0] // the first count

          const ingredients = [ // collecting ingredients as an array
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]

          const newCocktail = { // newCocktail because plus new 'ingredients' array 
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          }

          setCocktail(newCocktail)
        } else {
          setCocktail(null)
        }

        setLoading(false);

      } catch (error){ // parameter
        console.log(error);
        setLoading(false);
      }

    }
    // get function
    getCocktail(); // invoke getCocktail
  }, [id])

  if(loading){ // loading is true
    return <Loading />
  }

  if(!cocktail){
    return (
      <h2 className='section-title'>
        no cocktail to display
      </h2>
    )
  }

  // destructure before reiterate // new
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = cocktail
    
  return (

    <section className='section cocktail-section'> 

      <Link to='/' className='btn btn-primary'> back home </Link>
      
      <h2 className='section-title'> {name} </h2>
      <div className='drink'>
        <img src={image} alt={name}/>

        <div className='drink-info'>
          <p>
            <span className='drink-data'> name: </span> {name}
          </p>
          <p>
            <span className='drink-data'> category: </span> {category}
          </p>
          <p>
            <span className='drink-data'> info: </span> {info}
          </p> 
          <p>
            <span className='drink-data'> glass: </span> {glass}
          </p>
          <p>
            <span className='drink-data'> glass: </span> 
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {ingredients.map((item, index) => {
              return (
                  item ? <span key={index}> {item}</span> : null
              )
            })}
          </p> 
        </div>

      </div>

    </section>

  )
  
}

export default SingleCocktail;
