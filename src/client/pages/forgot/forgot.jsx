import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { routes } from 'routes';

import * as userActions from 'resources/user/user.actions';

import Input from 'components/input';
import Button from 'components/button';

import styles from './forgot.pcss';

function Forgot() {
  const dispatch = useDispatch();

  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const [email, setEmail] = React.useState('');

  async function submit(event) {
    event.preventDefault();

    try {
      setPending(true);
      await dispatch(userActions.forgot({ email }));
      setSubmitted(true);
    } catch (error) {
      setErrors(error.data.errors);
    } finally {
      setPending(false);
    }
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
            {email}
          </p>
        </>
      )}

      {!submitted && (
        <>
          <p className={styles.description}>
            We’ll send a reset link to your email
          </p>
          <form onSubmit={submit} noValidate className={styles.form}>
            <div className={styles.row}>
              <Input
                type="email"
                value={email}
                onChange={setEmail}
                errors={errors.email}
                placeholder="Email"
                disabled={pending}
              />
            </div>
            <div className={styles.row}>
              <Button
                type="submit"
                color="green"
                disabled={pending || !email}
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
}

export default React.memo(Forgot);
