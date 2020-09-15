import * as React from 'react';
import {connect} from 'react-redux';
import {addUser} from "./actions/User";
import User from './components/User';
import {IAddUser, IUserInfo} from "./interfaces/User";
import UserStyle from "./styles/UserStyle";
import GlobalStyle from "./styles/GlobalStyle";
let curId = 1;

function App({users, addUser}: {users: IUserInfo[], addUser: IAddUser}) {
    return (
        <React.Fragment>
            {
                users.map((user) => {
                    return (
                        <User key={user.id} user={user} />
                    );
                })
            }
            <div>
                <button onClick={() => {
                    addUser({id: curId, name: `지훈_${curId}`});
                    ++curId;
                }}>사용자 추가</button>
            </div>
            <style jsx>{GlobalStyle}</style>
        </React.Fragment>
    );
}


export default connect(
    (state: IUserInfo[]): IUserInfo[] => state,
    { addUser }
)(App);;
