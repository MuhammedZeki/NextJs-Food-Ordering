import React from 'react'

const Input = ({handleChange,handleBlur,data}) => {
  return (
        <div>
          <label htmlFor={data.name} className='w-full relative block'>
            <input id={data.id} name={data.name} 
              type={data.type} value={data.value} required
             className={`border border-primary 
             peer pt-2 px-2 rounded-md w-full h-14 
             ${data.touched && data.error ? "border-red-600" : "border-primary"}`} 
             onChange={handleChange}
             onBlur={handleBlur}
             />
            <span className='absolute top-0 left-0 h-full
              peer-focus:h-7 text-sm peer-focus:text-xs
              flex items-center p-2 transition-all duration-300
              peer-valid:h-7 peer-valid:text-xs peer-valid:font-semibold 
              peer-focus:font-semibold
              '>
                {data.placeHolder ? data.placeHolder : ""}
              </span>
          </label>
          {data.error && data.touched && (
            <p className="text-red-500 text-sm mt-1">{data.error}</p>
          )}
        </div>
  )
}

export default Input