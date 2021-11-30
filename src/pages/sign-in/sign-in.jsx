import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';

import { routes } from 'routes';

import * as userSelectors from 'resources/user/user.selectors';
import { userActions } from 'resources/user/user.slice';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './sign-in.pcss';

function SignIn() {
  const user = useSelector(userSelectors.selectUser);

  const dispatch = useDispatch();

  const { handleSubmit, formState: { errors }, control } = useForm();

  const onSubmit = async (submitValues) => {
    await dispatch(userActions.signIn(submitValues));
  };

  if (user) {
    const redirectPath = new URLSearchParams(window.location.search).get('to');

    return <Redirect to={redirectPath || routes.home.url()} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}
    >
      <h1 className={styles.title}>
        Sign In
      </h1>
      <div className={styles.row}>
        <Input
          name="email"
          label="Email Address"
          placeholder="Email"
          control={control}
          error={errors.email}
        />
      </div>
      <div className={styles.row}>
        <Input
          name="password"
          type="password"
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
    </form>
  );
}

export default React.memo(SignIn);
