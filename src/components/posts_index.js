import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render () {
    return (
      <div>List of blog posts</div>
    );
  }
}

function mapDispatchToProps(dispath) {
  return bindActionCreators({ fetchPosts }, dispath);
}

export default connect(null, mapDispatchToProps)(PostsIndex);
