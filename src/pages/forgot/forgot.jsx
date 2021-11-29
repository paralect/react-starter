import React from 'react';
import cn from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { routes } from 'routes';

import * as userSelectors from 'resources/user/user.selectors';
import { userActions } from 'resources/user/user.slice';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './forgot.pcss';

const Forgot = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelectors.selectUser);

  const { handleSubmit, formState: { errors }, control } = useForm();

  const [values, setValues] = React.useState({});
  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = async (submitValues) => {
    setPending(true);
    await dispatch(userActions.forgot(submitValues));
    setValues(submitValues);
    setSubmitted(true);
    setPending(false);
  };

  if (user) {
    return <Redirect to={routes.home.url()} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Forgot Password
      </h1>

      {submitted && (
        <>
          <p className={styles.description}>
            We sent a reset link to your email:
          </p>
          <p className={cn(styles.description, styles.description_bold)}>
            {values.email}
          </p>
        </>
      )}

      {!submitted && (
        <>
          <p className={styles.description}>
            We’ll send a reset link to your email
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
          >
            <div className={styles.row}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                disabled={pending}
                control={control}
                error={errors.email}
              />
            </div>
            <div className={styles.row}>
              <Button
                htmlType="submit"
                isLoading={pending}
              >
                Send reset link
              </Button>
            </div>
            <div className={styles.links}>
              <div className={styles.row}>
                Remember the password?
                {' '}
                <Link to={routes.signIn.url()}>
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default React.memo(Forgot);
