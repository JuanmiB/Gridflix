import './styles.css'
export const Form = ({ search, changeInput, submitForm, error }) => {
  return (
    <form onSubmit={submitForm} >
      <label style={{ position: 'absolute', color: 'transparent' }} htmlFor="search">Buscar</label>
      <input
        id='search'
        type='text'
        style={{ border: error ? 'solid red 2px' : '', position: 'relative', color: 'black' }}
        value={search}
        onChange={changeInput}
        name="search"
        placeholder="Star wars, Iron Man, SuperMan"
        className="input-search"
      />
      <button disabled={error !== null}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

      </button>
    </form>
  )
}
