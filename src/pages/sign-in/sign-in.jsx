import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { routes } from 'routes';
import { StoreContext } from 'resources/store';
import actions from 'resources/actions';

import Input from 'components/input';
import Button from 'components/button';
import Form from 'components/form';

import styles from './sign-in.pcss';

function SignIn() {
  const { state: { user }, dispatch } = useContext(StoreContext);

  const handleSubmit = async (submitValues) => {
    await dispatch(actions.signIn(submitValues));
  };

  if (user) {
    const redirectPath = new URLSearchParams(window.location.search).get('to');

    return <Redirect to={redirectPath || routes.home.url()} />;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <h1 className={styles.title}>
        Sign In
      </h1>
      <div className={styles.row}>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          label="Email"
        />
      </div>
      <div className={styles.row}>
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
        />
      </div>
      <div className={styles.row}>
        <Button
          htmlType="submit"
        >
          Sign in
        </Button>
      </div>
      <div className={styles.links}>
        <div className={styles.row}>
          Don’t have an account?
          {' '}
          <Link to={routes.signUp.url()}>
            Sign up
          </Link>
        </div>
        <div className={styles.row}>
          <Link to={routes.forgot.url()}>
            Forgot password?
          </Link>
        </div>
      </div>
    </Form>
  );
}

export default React.memo(SignIn);
