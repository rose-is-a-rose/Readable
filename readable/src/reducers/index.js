import { combineReducers } from 'redux'
let i = 100;
export default ( state = {}, action) => {
  switch (action.type) {
    case 'ADD_POST' :
      const { post } = action;
      return {
        ...state,
        posts: [
        	...state.posts,
        	[i++]: action
      	]
      }
    default :
      return state
  }

}

// export default combineReducers({
//   posts
// })
