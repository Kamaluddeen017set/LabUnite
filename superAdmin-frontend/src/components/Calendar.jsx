'use client';
import {
  faChevronLeft,
  faChevronRight,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import '../styles/Calendar.css';
import axiosInstance from '../axiosInstance';
import StaffActivity from './StaffActivivtyLists';
import { useApp } from '../app/context/appContext';
export default function Calender() {
  const { activeDay, setActiveDay, currentDate, setCurrentDate } = useApp();

  const [fetchLoaded, setFetchLoaded] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);
  const [staffActivities, setStaffActivities] = useState([]);
  const scrollRef = useRef(null);

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let days = [];
    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(year, month, d);
      const dayName = dateObj.toLocaleString('en-US', { weekday: 'short' });
      days.push({ number: d, dayName, fullDate: dateObj.toISOString() });
    }
    return days;
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current && activeDay) {
        const activeElemnt = scrollRef.current.querySelector('.active');
        if (activeElemnt) {
          activeElemnt.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
          });
        }
      }
    });
  }, [activeDay, currentDate]);

  let startX = 0;
  const handleTouchStart = e => {
    startX = e.touches[0].clientX;
  };
  useEffect(() => {
    const fetchResults = async () => {
      const labId = JSON.parse(localStorage.getItem('LabId'));
      if (!labId || !activeDay || !currentDate) return;

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = activeDay.toString().padStart(2, '0');
      const padmonth = String(month).padStart(2, '0');
      const selectedDate = `${year}-${padmonth}-${day}`;
      try {
        const res = await axiosInstance.get(
          `/activities/${labId}/filter/date?start=${selectedDate}&end=${selectedDate}`
        );

        setStaffActivities(res.data.activities || []);
        console.log(res.data.activities);
        setFetchLoaded(true);
      } catch (err) {
        console.error(err);
        setFetchLoaded(true);
      }
    };
    fetchResults();
  }, [activeDay, currentDate, refreshKey]);
  const handleTouchEnd = e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      setCurrentDate(
        new Date(currentDate.setMonth(currentDate.getMonth() + 1))
      );
    } else if (endX - startX > 50) {
      setCurrentDate(
        new Date(currentDate.setMonth(currentDate.getMonth() - 1))
      );
    }
  };

  console.log('from calender', staffActivities);
  return (
    <div className="calender" key={refreshKey}>
      <div className="current-month">
        <h3>
          {currentDate.toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <div className="arrows">
          <FontAwesomeIcon
            className="left"
            icon={faChevronLeft}
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
          />
          <FontAwesomeIcon
            className="right"
            icon={faChevronRight}
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              )
            }
          />
        </div>
      </div>
      <div
        className="current-date"
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {renderDays().map(day => (
          <div
            key={day.fullDate}
            onClick={() => setActiveDay(day.number)}
            className={activeDay == day.number ? 'active day' : 'day'}
            style={{
              background:
                activeDay === day.number ? 'var(--scolor)' : 'var(--tcolor)',
              color: activeDay === day.number ? 'white' : '#000',
              textAlign: 'center',
              userSelect: 'none',
              minWidth: '27px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            <span>{day.dayName}</span>
            <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>
              {String(day.number).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
      <button
        className="refresh-btn"
        onClick={() => {
          const today = new Date();
          setCurrentDate(today);

          setActiveDay(today.getDate());
          setRefreshKey(prev => prev + 2);
        }}
      >
        Refresh <FontAwesomeIcon icon={faRefresh} />
      </button>
      <StaffActivity
        staffActivities={staffActivities}
        fetchLoaded={fetchLoaded}
        x
      />
    </div>
  );
}
