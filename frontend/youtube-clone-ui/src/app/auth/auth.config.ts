import { PassedInitialConfig } from 'angular-auth-oidc-client';


export const authConfig: PassedInitialConfig = {
  config: {
            authority: 'https://azil-yahia01.eu.auth0.com',
    //TODO RIGLHA
            redirectUrl: (typeof window !== "undefined")? window.location.origin : "" ,
            clientId: 'Mb6XgL6dKsxpg35lUY5Ye0IcwLJJuAdZ',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
        }
}
