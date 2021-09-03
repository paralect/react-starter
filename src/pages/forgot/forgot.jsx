import React, { useContext } from 'react';
import cn from 'classnames';
import { Link, Redirect } from 'react-router-dom';

import { routes } from 'routes';

import { StoreContext } from 'resources/store/store';

import * as api from 'resources/user/user.api';

import Input from 'components/input';
import Button from 'components/button';
import Form from 'components/form';

import styles from './forgot.pcss';

const Forgot = () => {
  const { state } = useContext(StoreContext);
  const { user } = state;

  const [values, setValues] = React.useState({});
  const [pending, setPending] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async ({ email }) => {
    setPending(true);
    await api.forgot({ email });
    setValues({ email });
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
          <Form
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <div className={styles.row}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                disabled={pending}
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
          </Form>
        </>
      )}
    </div>
  );
};

export default React.memo(Forgot);
