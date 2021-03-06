
import {React, useState, useContext, useEffect} from 'react'
import AlertContext from '../context/alert/AlertContext'
import GithubContext from '../context/github/GithubContext'

function UserSearch() {

  const UserState = () => {
    clearUserState()
  }
  

  const {users, searchUsers, clearUserState} = useContext(GithubContext)
  const {setAlert}  = useContext(AlertContext)

  const [text, setText] = useState('')

  const handleChange = (e) => setText(e.target.value)
  
  const handleSubmit = (e) => {e.preventDefault()
    	if(text === '') {
      setAlert('Please enter something','error')
      }
      else{
        searchUsers(text)
        setText('')
      }
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
    <div>

    <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-xl text-black'
                placeholder='Search'
                value={text}
                onChange={handleChange}
               
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-xl'
              >
                Go
              </button>
            </div>
          </div>
        </form>
    </div>
    {users.length > 0 && (
      <div>
      <button className="btn btn-ghost btn-xl" onClick={UserState}>Clear</button>
    </div> 
    )}
     
    </div>
  )
}

export default UserSearch