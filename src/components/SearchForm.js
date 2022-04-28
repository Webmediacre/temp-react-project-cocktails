
import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  // destructure setSearchTerm in context of useGlobalContext();
  const { setSearchTerm } = useGlobalContext(); // setSearchTerm is a new variable
  console.log(setSearchTerm);

  const searchValue = React.useRef('');

  const searchCoachtail = () => {
    setSearchTerm(searchValue.current.value);
  }

  // don't have to import useEffect
  React.useEffect(() => {
    // have the form appear as on
    searchValue.current.focus();
  }, []) 

  const handleSubmit = (e) => {
    e.preventDefault(); 
  }

  return (

    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}> 
        <div className='form-control'>
          <label htmlFor='name'>
            search your fovorite cocktail 
          </label>
          <input type='text' id='name' ref={searchValue} onChange={searchCoachtail} placeholder=''></input>
        </div>
      </form>
    </section>

  )

} 

export default SearchForm
