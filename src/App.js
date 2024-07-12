import React, { useState } from 'react';
import './App.css';
import FacebookLoginButton from './components/FacebookLoginButton';
import SelectPage from './components/SelectPage';
import AnalyticsCards from './components/AnalyticsCards';
import axios from 'axios';
import moment from 'moment';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const handleLogin = (token) => {
    setAccessToken(token);
    fetchUserProfile(token);
    fetchUserPages(token);
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email,picture&access_token=${token}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserPages = async (token) => {
    try {
      const response = await axios.get(`https://graph.facebook.com/v13.0/me/accounts?fields=id,name&access_token=${token}`);
      setPages(response.data.data);
    } catch (error) {
      console.error('Error fetching user pages:', error);
    }
  };

  const handlePageSelect = async (pageId) => {
    setSelectedPageId(pageId);
    if (pageId && accessToken) {
      try {
        const sinceDate = moment().subtract(1, 'month').format('YYYY-MM-DD');
        const untilDate = moment().format('YYYY-MM-DD');
        const response = await axios.get(`https://graph.facebook.com/v13.0/${pageId}/insights`, {
          params: {
            access_token: accessToken,
            since: sinceDate,
            until: untilDate,
            period: 'total_over_range',
            metric: 'page_fans,page_engaged_users,page_impressions,page_actions_post_reactions_total',
          },
        });
        setAnalytics(response.data.data);
      } catch (error) {
        console.error('Error fetching page analytics:', error);
      }
    }
  };

  return (
    <div className="App">
      {!accessToken ? (
        <FacebookLoginButton onLogin={handleLogin} />
      ) : (
        <>
          <h1>Welcome, {user && user.name}!</h1>
          <img src={user && user.picture && user.picture.data.url} alt="Profile" />
          <SelectPage pages={pages} onSelect={handlePageSelect} />
          {selectedPageId && (
            <>
              <h2>Selected Page ID: {selectedPageId}</h2>
              {analytics && <AnalyticsCards analytics={analytics} />}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;

