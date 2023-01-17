import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <div>

           {user ? (<div> <h1>Hello {user.username}</h1>
             <p>Your username is : {user.username}</p>
             <p>Your email is : {user.attributes?.email}</p>
             <p>your sub is {user.attributes?.sub}</p>
                 <p>your have {user.attributes?.tokens} left</p>
             <button type="button" onClick={signOut}>Sign out</button>
                    </div>
             ) :
             ('')

          }
          </div>
        </main>
      )}
    </Authenticator>
  );
}
