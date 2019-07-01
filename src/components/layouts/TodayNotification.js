import React, { useState } from 'react';
import today from '../utils/today';
import formatDateString from '../utils/formatDateString';
import morningQuote from '../utils/getRandomQuote';

const TodayNotification = () => {
  const [showTodayNoti, setShowTodayNoti] = useState(true);
  return (
    <>
      {showTodayNoti && (
        <div className="section" style={{ paddingTop: '24px' }}>
          <div className="columns is-mobile is-multiline is-centered">
            <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
              <div className="notification is-info has-text-centered">
                <button
                  className="delete"
                  onClick={() => setShowTodayNoti(false)}
                />
                Today is: <strong>{formatDateString(today)}</strong>.{' '}
                {morningQuote}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodayNotification;
