import {React, useContext} from 'react'
import GithubContext from '../context/github/GithubContext'

import Spinner from '../layouts/Spinner'
import UserItem from './UserItem'


function UserResult() {
  const {users, loading} = useContext(GithubContext)
    
   
        if(!loading){
          return ( 
          <div className="grid grid-clos-1 gap-8 xl:grid-cols-4 xl:grid-cols-3 ms: grid-cols-2">
            {users.map((user, id) => (
           <UserItem key={id} user={user}/>
            ))}
            </div>
          )}
        else{
          return <Spinner />
        }

}

export default UserResult