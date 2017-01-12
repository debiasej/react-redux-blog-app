import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
  },
  categories: {
    type: 'input',
    label: 'Enter some categories'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents'
  }
};

//['title', 'categories', 'content'];

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push the new path
        // to navigate to.
        this.context.router.push('/');
      });
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div
        className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}
        key={fieldConfig.label}>
          <label>{fieldConfig.label}</label>
          <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
          <div className="form-control-feedback">
            {fieldHelper.touched ? fieldHelper.error : ''}
          </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    //const { fields: { title, categories, content }, handleSubmit } = this.props;
    // const handleSubmit = this.props.handleSubmit;
    // const title = this.props.fields.title; ...

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New Post</h3>
        {_.map(FIELDS, this.renderField.bind(this))}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (element, field) => {
    if(!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  /*if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }*/

  return errors;
}

// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

// reduxForm is like connect function in react-redux library
export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate
}, null, { createPost })(PostsNew);

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
