import * as React from 'react'
import { connect } from 'react-redux'

import {
  selectSubreddit,
  fetchPosts
} from './actions'
import { AppState } from './configureStore'
import Picker from './Picker'
import Posts from './Posts'


interface IProps {
  selectedSubreddit: string,
  lastUpdated: number,
  posts: [],
  handleChange: () => void
}

const mapStateToProps = (appState: AppState) => ({
  selectedSubreddit: appState.subreddit,
  lastUpdated: appState.posts.lastUpdated,
  posts: appState.posts.posts
})

const mapDispatchToProps = (dispatch: any) => ({
  handleChange: (subreddit: string) => {
    dispatch(selectSubreddit(subreddit))
    dispatch(fetchPosts(subreddit))
  }
})

class AsyncApp extends React.Component<IProps> {
  render() {
    const { selectedSubreddit, posts, lastUpdated, handleChange } = this.props
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
        </p>
        {posts !== undefined && posts.length > 0 &&
          <div>
            <Posts posts={posts} />
          </div>}
      </div>
    )
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AsyncApp)
