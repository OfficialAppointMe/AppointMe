import React from 'react'

const SearchBar = () => {
    return (
        <div className='flex justify-center mb-4 relative'>
            <input type="text" className='w-[90%] rounded-full' placeholder='Search People...' />
            <button className='bg-slate-800 h-8 w-8 flex justify-center items-center rounded-full absolute left-[88%] top-[10%]'>
                <lord-icon
                    src="https://cdn.lordicon.com/kkvxgpti.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                    style={{"width":"25px","height":"25px"}}>
                </lord-icon>
            </button>
        </div>
    )
}

export default SearchBar
