import fetch from 'cross-fetch'

export const fetchHeadlines = (subreddit: string): Promise<Response> => {
  console.log(`fetchHeadlines: ${subreddit}`)
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
}