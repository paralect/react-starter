import React, {
  useCallback, useState, useEffect, useContext,
} from 'react';
import * as yup from 'yup';
import { useFormContext } from 'react-hook-form';

import { StoreContext } from 'resources/store';
import { userActions } from 'resources/user/user.actions';
import { toastActions } from 'resources/toast/toast.actions';

import * as filesApi from 'resources/files/files.api';

import Input from 'components/input';
import Button from 'components/button';
import Form from 'components/form';
import FileUpload from 'components/file-upload';
import Icon from 'components/icon';

import styles from './profile.styles.pcss';

const schema = yup.object({
  firstName: yup.string()
    .trim()
    .required('First name is required'),
  lastName: yup.string()
    .trim()
    .required('Last name is required'),
  email: yup.string()
    .trim()
    .lowercase()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

const CancelButton = ({ onCancel, user }) => { // eslint-disable-line react/prop-types
  const { reset } = useFormContext();

  const handleClick = () => {
    onCancel();
    reset(user);
  };

  return (
    <Button
      className={styles.button}
      tabIndex={-1}
      type="secondary"
      onClick={handleClick}
    >
      Cancel
    </Button>
  );
};

const Profile = () => {
  const { state: { user }, dispatch } = useContext(StoreContext);
  const { avatarFileKey: userAvatarFileKey } = user;

  const [avatarFileKey, setAvatarFileKey] = useState(userAvatarFileKey);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleSubmit = useCallback(async (submitValues) => {
    await userActions.updateCurrentUser(dispatch, { ...submitValues, avatarFileKey });
    toastActions.createToast(dispatch, { type: 'success', message: 'User info updated!' });
  }, [dispatch, avatarFileKey]);

  const getAvatarUrl = useCallback(async (key) => {
    try {
      const { url } = await filesApi.getDownloadUrl(key);
      if (url) {
        setAvatarUrl(url);
      }
    } catch ({ data }) {
      toastActions.createToast(dispatch, { type: 'error', message: data.errors.file[0] });
    }
  }, [dispatch]);

  const uploadAvatar = async (files) => {
    try {
      const file = files[0];
      const { key } = await filesApi.upload(file);
      setAvatarFileKey(key);
    } catch ({ data }) {
      toastActions.createToast(dispatch, { type: 'error', message: data.errors.file[0] });
    }
  };

  const deleteAvatar = () => {
    setAvatarFileKey(null);
  };

  const resetAvatar = () => {
    setAvatarFileKey(userAvatarFileKey);
  };

  useEffect(() => {
    if (avatarFileKey) {
      getAvatarUrl(avatarFileKey);
    } else {
      setAvatarUrl(null);
    }
  }, [avatarFileKey, getAvatarUrl]);

  return (
    <>
      <h1>Profile</h1>
      <Form
        defaultValues={user}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <div className={styles.row}>
          <Input
            name="firstName"
            placeholder="First Name"
            label="First Name"
          />
        </div>

        <div className={styles.row}>
          <Input
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
          />
        </div>

        <div className={styles.row}>
          <Input
            name="email"
            placeholder="Email"
            label="Email"
          />
        </div>

        <div className={styles.row}>
          <span>Avatar</span>
          {avatarUrl ? (
            <>
              <img
                className={styles.avatar}
                src={avatarUrl}
                alt=""
              />
              <Button
                type="secondary"
                onClick={deleteAvatar}
              >
                <Icon icon="close" />
                Delete
              </Button>
            </>
          ) : (
            <FileUpload
              onFileSelect={uploadAvatar}
              accept="image/*"
              multiple={false}
            />
          )}
        </div>

        <div className={styles.buttons}>
          <CancelButton
            onCancel={resetAvatar}
            user={user}
          />
          <Button
            className={styles.button}
            tabIndex={0}
            htmlType="submit"
          >
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};

export default React.memo(Profile);
