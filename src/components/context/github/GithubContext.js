import { createContext, useReducer} from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    
    const initalState = {
        users: [],
        user:{},
        repos:[],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initalState)

    
    // for testing purpose
    const searchUsers = async (text) => { 
        setLoading()

        const params = new URLSearchParams({
            q: text
        })
        // ${GITHUB_URL}/search/users?${params}
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const {items}  = await response.json()
        
        dispatch({
            type:'GET_USERS',
            payload: items
        })

    }  

    //search single user
    const getUser = async (login) => { 
        setLoading()

        // ${GITHUB_URL}/search/users?${params}
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const data = await response.json()
        
        dispatch({
            type:'GET_USER',
            payload: data
        })

    }  

    const getUserRepos = async (login) => { 
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })
        // ${GITHUB_URL}/search/users?${params}
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const data  = await response.json()
        
        dispatch({
            type:'GET_REPOS',
            payload: data
        })

    }  

    const clearUserState = () => dispatch({
        type:'CLEAR_USER',
        payload: []
        
    })
    
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })
    return<GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user:state.user,
        repos: state.repos,
        getUser,
        searchUsers,
        clearUserState,
        getUserRepos,
    }
    }>
        {children}
    </GithubContext.Provider>

}

export default GithubContext