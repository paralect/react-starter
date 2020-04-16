import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';
import Input from 'components/input';
import Button, { colors as buttonColors } from 'components/button';
import Form, { Row, Column } from 'components/form';
import * as fromUser from 'resources/user/user.selectors';
import * as userActions from 'resources/user/user.actions';
import * as userValidators from 'resources/user/user.validators';
import * as toastActions from 'resources/toast/toast.actions';

import styles from './profile.styles';

class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      errors: {},
    };

    this.initialState = _.cloneDeep(this.state);
  }

  onFieldChange = (field) => (value) => {
    this.setState({ [field]: value });
  };

  validateField = (field) => async () => {
    const userData = _.omit(this.state, ['errors', 'prevProps']);
    const result = await userValidators.validateUserField(userData, field);

    this.setState({ errors: result.errors });
  };

  showErrors = (errors) => {
    this.setState({ errors });

    const { addErrorMessage } = this.props;
    addErrorMessage(
      'Unable to save user info:',
      errors._global ? errors._global.join(', ') : '',
    );
  }

  updateUser = async () => {
    const result = await userValidators.validateUser(_.omit(
      this.state,
      ['errors', 'prevProps'],
    ));

    if (!result.isValid) {
      this.showErrors(result.errors);
      return;
    }

    const {
      updateCurrentUser,
      addSuccessMessage,
    } = this.props;

    try {
      await updateCurrentUser(_.omit(this.state, 'errors'));
      addSuccessMessage('User info updated!');
    } catch (error) {
      this.showErrors(error.data.errors);
    }
  }

  cancel = () => {
    this.setState(this.initialState);
  }

  error = (field) => {
    const { errors } = this.state;
    return errors[field] || [];
  }

  render() {
    const {
      firstName,
      lastName,
      email,
    } = this.state;

    return (
      <>
        <h1>Profile</h1>

        <Form>
          <Row>
            <Column>
              <span>First name</span>

              <Input
                errors={this.error('firstName')}
                value={firstName}
                onChange={this.onFieldChange('firstName')}
                onBlur={this.validateField('firstName')}
              />
            </Column>

            <Column>
              <span>Last name</span>

              <Input
                errors={this.error('lastName')}
                value={lastName}
                onChange={this.onFieldChange('lastName')}
                onBlur={this.validateField('lastName')}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <span>Email</span>

              <Input
                errors={this.error('email')}
                value={email}
                onChange={this.onFieldChange('email')}
                onBlur={this.validateField('email')}
              />
            </Column>

            <Column />
          </Row>
          <Row>
            <Column>
              <Button
                className={styles.button}
                onClick={this.cancel}
                tabIndex={-1}
                color={buttonColors.red}
              >
                Cancel
              </Button>

              <Button
                className={styles.button}
                onClick={this.updateUser}
                tabIndex={0}
                color={buttonColors.green}
              >
                Save
              </Button>
            </Column>
          </Row>
        </Form>
      </>
    );
  }
}

Profile.propTypes = {
  updateCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  addErrorMessage: PropTypes.func.isRequired,
  addSuccessMessage: PropTypes.func.isRequired,
};

export default connect((state) => ({
  user: fromUser.getUser(state),
}), {
  updateCurrentUser: userActions.updateCurrentUser,
  addErrorMessage: toastActions.addErrorMessage,
  addSuccessMessage: toastActions.addSuccessMessage,
})(Profile);
