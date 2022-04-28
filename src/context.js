
import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const AppContext = React.createContext(); // pass React.createContext() to AppContext

const AppProvider = ({ children }) => {

  // context applies to whole 'AppProvider' function

  const [ loading, setLoading ] = useState(true); // used for loading or not loading
  const [ searchTerm, setSearchTerm ] = useState('a'); // used in Search Form page
  const [ cocktails, setCocktails ] = useState([]); // used for cocktails list

  // get the data
  const fetchDrinks = useCallback ( async () => { // useCallback to prevent infinite loop 
    setLoading(true);
    try { 
      const response = await fetch(`${url}${searchTerm}`); // fetch from url and setSearchTerm
      const data = await response.json(); // have rseponse as json
      // console.log(data);
      const { drinks } = data; // desctructure to use in functions
      if(drinks){ // true - there are drinks
        const newCocktails = drinks.map((item) => {
          // must destructure in order to get and set indvidual item values
          const { idDrink, strDrink, strDrinkThumb, strAlchoholic, strGlass } = item; 
          return ( // now set api values to local values
            {
              id:idDrink, name:strDrink, image:strDrinkThumb, info:strAlchoholic, glass:strGlass
            } 
          )
        }) // newCocktails() ends
        setCocktails(newCocktails); // newCocktails in context
      } else {
        setCocktails([]); // cocktails is blank also
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm])

  // now load fetchDrinks in page react useEffect function
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]); // have fetchDrinks() as a dependency

  return ( // return values in Provider by context
    <AppContext.Provider value={ { loading, cocktails, setSearchTerm } }> 
      {children}
    </AppContext.Provider>
  )

}
// make sure to use 
export const useGlobalContext = () => { // 'useGlobalContext' is just the name of arrow function
  return useContext(AppContext) // must return useContext(AppContext)
}
 
export { AppContext, AppProvider }
