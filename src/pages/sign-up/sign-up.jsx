import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import config from 'config';
import { routes } from 'routes';

import * as userSelectors from 'resources/user/user.selectors';
import { userActions } from 'resources/user/user.slice';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './sign-up.pcss';

function SignUp() {
  const dispatch = useDispatch();

  const user = useSelector(userSelectors.selectUser);

  const { handleSubmit, formState: { errors }, control } = useForm();

  const [values, setValues] = React.useState({});
  const [registered, setRegistered] = React.useState(false);

  const [signupToken, setSignupToken] = React.useState();

  const onSubmit = async (submitValues) => {
    const response = await dispatch(userActions.signUp(submitValues));
    if (response.signupToken) setSignupToken(response.signupToken);
    setRegistered(true);
    setValues(submitValues);
  };

  if (user) {
    return <Redirect to={routes.home.url()} />;
  }

  if (registered) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          Thanks!
        </h1>
        <div className={styles.row}>
          We just sent an email with a confirmation link to
          {' '}
          <b>{values.email}</b>
          .
        </div>
        <div className={styles.row}>
          Please follow the instructions from the email to complete a sign up process.
        </div>
        {signupToken && (
          <div className={styles.links}>
            <div className={styles.row}>
              You look like a cool developer.
              {' '}
              <a href={`${config.apiUrl}/account/verify-email?token=${signupToken}`}>
                Verify email
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}
    >
      <h1 className={styles.title}>
        Sign Up
      </h1>
      <div className={styles.row}>
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          label="First Name"
          control={control}
          error={errors.firstName}
        />
      </div>
      <div className={styles.row}>
        <Input
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          control={control}
          error={errors.lastName}
        />
      </div>
      <div className={styles.row}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          label="Email"
          control={control}
          error={errors.email}
        />
      </div>
      <div className={styles.row}>
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          control={control}
          error={errors.password}
        />
      </div>
      <div className={styles.row}>
        <Button
          htmlType="submit"
        >
          Sign up
        </Button>
      </div>
      <div className={styles.links}>
        <div className={styles.row}>
          Already have an account?
          {' '}
          <Link to={routes.signIn.url()}>
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
}

export default React.memo(SignUp);
