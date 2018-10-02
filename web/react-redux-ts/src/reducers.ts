import { combineReducers } from 'redux'
import {
  ActionTypeStates
} from './actionTypes'

function selectedSubreddit(state = 'reactjs', action: any) {
  switch (action.type) {
    case ActionTypeStates.SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function postsBySubreddit(
  state = {
    posts: [],
    lastUpdated: 0
  },
  action: any
) {
  switch (action.type) {
    case ActionTypeStates.REQUEST_POSTS:
      return Object.assign({}, state, {
      })
    case ActionTypeStates.RECEIVE_POSTS:
      return Object.assign({}, state, {
        posts: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  posts: postsBySubreddit,
  selected: selectedSubreddit
})

export default rootReducer
