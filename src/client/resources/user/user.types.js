// @flow

import type { $AxiosXHRConfigBase } from 'axios';

export type ValidationErrorsType = {
  _global?: Array<string>,
  firstName?: Array<string>,
  lastName?: Array<string>,
  email?: Array<string>,
};

export type StateType = {
  _id: string,
  createdOn: Date,
  firstName: string,
  lastName: string,
  email: string,
  errors?: ValidationErrorsType,
};

export type ActionType = {
  type: string,
  payload: StateType,
};

export type ReducerType = (state: StateType, action: ActionType) => StateType;

export type FetchUserApiType = (id: string) => Promise<*>;

export type UpdateUserApiType = (
  id: string,
  data: StateType,
  options?: $AxiosXHRConfigBase<Object>,
) => Promise<*>;
