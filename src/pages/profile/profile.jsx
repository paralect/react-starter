import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import useToast from 'hooks/useToast';
import * as userSelectors from 'resources/user/user.selectors';

import { updateProfile } from 'resources/user/user.api';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './profile.styles.pcss';

const Profile = () => {
  const { toastSuccess } = useToast();
  const user = useSelector(userSelectors.selectUser);

  const { handleSubmit, formState: { errors }, control } = useForm();

  const onSubmit = useCallback(async ({ password }) => {
    await updateProfile({ password });
    toastSuccess('Your password have been successfully updated.');
  }, [toastSuccess]);

  return (
    <div className={styles.uploadContainer}>
      <span>
        <h1 className={styles.heading}>Profile</h1>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            name="email"
            label="Email Address"
            defaultValue={user.email}
            control={control}
            error={errors.email}
            disabled
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Your password"
            control={control}
            error={errors.password}
          />
          <Button
            htmlType="submit"
          >
            Update Profile
          </Button>
        </form>
      </span>
    </div>
  );
};

export default React.memo(Profile);
