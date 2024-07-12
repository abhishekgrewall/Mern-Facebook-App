import React, { useState, useEffect } from 'react';

const PageInsights = ({ pages }) => {
    const [selectedPage, setSelectedPage] = useState(null);
    const [pageInsights, setPageInsights] = useState(null);

    useEffect(() => {
        if (selectedPage) {
            fetchPageInsights(selectedPage);
        }
    }, [selectedPage]);

    const fetchPageInsights = (pageId) => {
        const startDate = '2024-01-01'; 
        const endDate = '2024-07-01';  

        fetch(`/api/page/${pageId}/insights?since=${startDate}&until=${endDate}&period=total_over_range`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPageInsights({
                    followers: data.page_fans,
                    engagement: data.page_engaged_users,
                    impressions: data.page_impressions,
                    reactions: data.page_actions_post_reactions_total
                });
            })
            .catch(error => {
                console.error('Error fetching page insights:', error);
                setPageInsights(null); 
            });
    };

    const handlePageSelect = (event) => {
        const selectedPageId = event.target.value;
        setSelectedPage(selectedPageId);
    };

    return (
        <div>
            <select onChange={handlePageSelect}>
                <option value="">Select a Page</option>
                {pages.map(page => (
                    <option key={page.id} value={page.id}>{page.name}</option>
                ))}
            </select>
            {pageInsights !== null && (
                <div>
                    <h2>Page Insights for {selectedPage}</h2>
                    <div>Total Followers / Fans: {pageInsights.followers}</div>
                    <div>Total Engagement: {pageInsights.engagement}</div>
                    <div>Total Impressions: {pageInsights.impressions}</div>
                    <div>Total Reactions: {pageInsights.reactions}</div>
                </div>
            )}
            {pageInsights === null && selectedPage && (
                <p>Loading insights...</p>
            )}
        </div>
    );
};

export default PageInsights;
