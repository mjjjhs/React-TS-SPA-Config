import * as React from 'react';
import {connect} from 'react-redux';
import {removeUser} from "../actions/User";
import {IRemoveUser, IUserInfo} from "../interfaces/User";
import UserStyle from "../styles/UserStyle";

function User({user, removeUser}: {user: IUserInfo, removeUser: IRemoveUser}) {
    console.log('user::', user);
    return (
        <React.Fragment>
            <div>
                <span>UserName: {user?.name}</span>
                <button onClick={() => removeUser(user.id)}>삭제</button>
            </div>
            <style jsx>{UserStyle}</style>
        </React.Fragment>
    );
}


export default connect(
    null,
    { removeUser }
)(User);;
