import * as AWS from 'aws-sdk';
import {Amplify, Auth} from 'aws-amplify';

AWS.config.region = 'us-east-1';
export const getBackgroundOffset = () => {
    const a = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    return `${a}% ${b}%`;
};

const password = process.env.USER_PASS as string;
const username = process.env.USER_ID as string;
const userPoolId = process.env.USER_POOL_ID as string;
const clientId = process.env.CLIENT_ID;
const poolId = process.env.POOL_ID as string;
const region = process.env.POOL_REGION as string;

Amplify.configure({
    Auth: {

        identityPoolId: poolId,
        region,
        userPoolId,
        userPoolWebClientId: clientId,
        mandatorySignIn: true,
        signUpVerificationMethod: 'link',

    },
});

// eslint-disable-next-line consistent-return
export async function signIn() {
    try {
        await Auth.signIn(username, password);
        return Auth.currentSession()
            .then(data => data.getIdToken()
                .getJwtToken());
    } catch (error) {
        console.log('error signing in', error);
    }
}

export async function sendModules(data = {}) {
    const token = await signIn();
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: poolId,
        Logins: { login: `cognito-idp.us-east-1.amazonaws.com/${userPoolId}:${token}`},
    });

  const sts = new AWS.STS({region: 'us-east-1'});
  const stsParams = {
    RoleArn: 'arn:aws:iam::665421229125:role/execute-hfopt',
    DurationSeconds: 3600,
    RoleSessionName: 'Any string',
  };
  const stsResults = await sts.assumeRole(stsParams)
      .promise();
  console.log(stsResults);

  const lambda = new AWS.Lambda({
    region: 'us-east-1',
    accessKeyId: stsResults.Credentials?.AccessKeyId,
    secretAccessKey: stsResults.Credentials?.SecretAccessKey,
    sessionToken: stsResults.Credentials?.SessionToken,
  });

  const result = await lambda.invoke({
    FunctionName: 'hfopt',
    InvocationType: 'RequestResponse',
    Payload: data,
}).promise();
    return result;
}
