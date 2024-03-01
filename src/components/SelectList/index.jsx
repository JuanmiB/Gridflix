import React, { useState } from 'react'
import './styles.css'
export const SelectList = ({ value, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const options = [
    { value: 'Fecha de lanzamiento descendente', label: 'Fecha de lanzamiento descendente' },
    { value: 'Fecha de lanzamiento ascendente', label: 'Fecha de lanzamiento ascendente' },
    { value: 'Titulo', label: 'Titulo' }
  ]
  return (
        <fieldset style={{ position: 'relative', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>

                <legend> Ordenar por: </legend>
                <button style={{ padding: 6, backgroundColor: '#202b38', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10, border: 'none' }} onClick={() => setIsDropdownOpen((prevState) => !prevState)}>{value}
                    {
                        isDropdownOpen
                          ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='chevronUp'>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>

                            )
                          : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="chevronDown">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>

                            )
                    }
                </button>
            </div>
            <div>
                {isDropdownOpen && (
                    <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'absolute',
                          top: '40px',
                          left: '65px',
                          border: 'solid 1px',
                          borderRadius: '5px',
                          backgroundColor: 'white',
                          width: '170px',
                          color: 'black',
                          height: 200,
                          overflowY: 'scroll'
                        }}
                    >
                        {
                            options.map(option => (
                                <fieldset key={option.value} style={{ border: 'none', display: 'flex', margin: 0 }}>
                                    <legend>etiquetas</legend>
                                    <input
                                        type="checkbox"
                                        id={option.value}
                                        name="sort"
                                        value={option.value}
                                        onChange={onChange}
                                        onClick={() => setIsDropdownOpen(false)}
                                        checked={value === option.value}
                                    />
                                    <label style={{ margin: 0 }} htmlFor={option.value}>{option.label}</label>
                                </fieldset>
                            ))
                        }
                    </div>)}
            </div>
        </fieldset>
  )
}
