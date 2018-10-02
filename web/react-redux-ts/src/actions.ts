import { Dispatch } from 'redux'

import { ActionTypeStates } from './actionTypes'
import { fetchHeadlines } from './api'

export interface IRequestPosts {
  type: ActionTypeStates.REQUEST_POSTS,
  subreddit: string
}

export interface IReceivePosts {
  type: ActionTypeStates.RECEIVE_POSTS,
  subreddit: string,
  posts: [],
  receivedAt: number
}

export interface ISelectSubreddit {
  type: ActionTypeStates.SELECT_SUBREDDIT,
  subreddit: string
}

export function selectSubreddit(subreddit: string): ISelectSubreddit {
  return {
    type: ActionTypeStates.SELECT_SUBREDDIT,
    subreddit
  }
}

export function requestPosts(subreddit: string): IRequestPosts {
  return {
    type: ActionTypeStates.REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit: string, json: any): IReceivePosts {
  return {
    type: ActionTypeStates.RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child: any) => child.data),
    receivedAt: Date.now()
  }
}

export const fetchPosts = (subreddit: string) => (dispatch: Dispatch) => {
    fetchHeadlines(subreddit)
    .then(res => res.json())
    .then((respJson: any) => {
      dispatch(receivePosts(subreddit, respJson))
    });
}
