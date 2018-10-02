import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

export type AppState = {
  subreddit: string,
  posts: PostState,
}

export type PostState = {
  posts: [],
  lastUpdated: number
}

export default function configureStore<AppState>() {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )
}
