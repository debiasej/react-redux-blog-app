import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class PostsNew extends Component {
  render() {
      return (
        <form>
          <h3>Create a New Post</h3>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" />
          </div>

          <div className="form-group">
            <label>Categories</label>
            <input type="text" className="form-control" />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea type="text" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      );
  }
}

// reduxForm is like connect function in react-redux library
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content']
})(PostsNew);

/* When user types something in.... redux-form records it on app state
state === {
  form: {
    PostsNewForm: {
      title: '...',
      categories: '...',
      content: '...'
    }
  }
}
*/
