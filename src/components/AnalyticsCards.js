
import React from 'react';

const AnalyticsCards = ({ analytics }) => {
  return (
    <div className="analytics-cards">
      <div className="analytics-card">
        <h3>Total Followers / Fans</h3>
        <p>{analytics.page_fans}</p>
      </div>
      <div className="analytics-card">
        <h3>Total Engagement</h3>
        <p>{analytics.page_engaged_users}</p>
      </div>
      <div className="analytics-card">
        <h3>Total Impressions</h3>
        <p>{analytics.page_impressions}</p>
      </div>
      <div className="analytics-card">
        <h3>Total Reactions</h3>
        <p>{analytics.page_actions_post_reactions_total}</p>
      </div>
    </div>
  );
};

export default AnalyticsCards;
