import * as AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';

AWS.config.region = 'us-east-1';

export const getBackgroundOffset = () => {
  const a = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  return `${a}% ${b}%`;
};

export async function signIn() {
  try {
    const user = await Auth.signIn(username, password);
  } catch (error) {
    console.log('error signing in', error);
  }
}

export async function sendModules(url = '', data = {}) {
  const req = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return req.json();
}

export async function authFrontend() {

}
