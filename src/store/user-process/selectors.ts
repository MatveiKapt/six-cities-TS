import {AuthorizationStatus, NameSpace} from '../../const';
import {State} from '../../types/state';
import {User} from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): User['email'] => state[NameSpace.User].user;
