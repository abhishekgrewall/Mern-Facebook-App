
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onLogin }) => {
  const responseFacebook = (response) => {
    if (response.accessToken) {
      onLogin(response.accessToken);
    } else {
      console.log('Facebook login failed');
    }
  };

  return (
    <FacebookLogin
      appId="1573832476812876"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      isMobile={false} 
      disableMobileRedirect={true} 
      icon="fa-facebook"
      textButton="Login with Facebook"
    />
  );
};

export default FacebookLoginButton;
