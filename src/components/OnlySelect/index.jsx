import './styles.css'
export const OnlySelect = ({ onChange, value, options }) => {
  return (
    <div className='option-container'>
{

    options.map(option => (
      <div key={option.label} >
              <label htmlFor={option.value} >{option.label}</label>
              <input
                type="radio"
                id={option.value}
                name="only"
                value={option.value}
                onChange={onChange}
                checked={value === option.value}
                />
            </div>
    ))
  }
                </div>
  )
}
