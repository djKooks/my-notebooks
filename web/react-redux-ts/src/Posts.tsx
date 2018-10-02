import * as React from 'react'

interface IProps {
  posts: []
}

export default class Posts extends React.Component<IProps> {
  
  public render() {
    const { posts } = this.props
    console.log(`posts: ${posts.length}`)
    return (
      <ul>
        {posts.map((post: {title: string}, i) => <li key={i}>{post.title}</li>)}
      </ul>
    )
  }
}
