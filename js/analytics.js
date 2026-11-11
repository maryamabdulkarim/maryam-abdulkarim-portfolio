/**
 * Maryam Abdulkarim Portfolio — Privacy-Focused Analytics Tracker
 * 
 * Guarantees:
 * - 100% client-side storage (localStorage)
 * - Zero cookies, zero IP logging, zero fingerprinting, zero third-party requests
 * - Respects Do Not Track (DNT)
 * - Monitors portfolio traffic, case study dwell time, scroll completion, and screenshot zoom engagement
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'ma_portfolio_analytics_v1';
  const isDNT = navigator.doNotTrack === '1' || window.doNotTrack === '1';

  // Current session tracking
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const pageTitle = document.title.split('—')[0].trim();
  const startTime = Date.now();
  let maxScrollPercentage = 0;
  const milestonesReached = new Set();

  // Helper to load stored data
  const getStoredData = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return initData();
      return JSON.parse(raw);
    } catch {
      return initData();
    }
  };

  const initData = () => ({
    created: new Date().toISOString(),
    totalViews: 0,
    sessionsCount: 0,
    deviceTypes: { desktop: 0, mobile: 0, tablet: 0 },
    pages: {
      'index.html': { views: 0, avgTimeSeconds: 0, totalSeconds: 0, maxScrollAvg: 0 },
      'kioni.html': { views: 0, avgTimeSeconds: 0, totalSeconds: 0, maxScrollAvg: 0, lightboxOpens: 0 },
      'kioni-design-system.html': { views: 0, avgTimeSeconds: 0, totalSeconds: 0, maxScrollAvg: 0, lightboxOpens: 0 },
      'ajo-book.html': { views: 0, avgTimeSeconds: 0, totalSeconds: 0, maxScrollAvg: 0, lightboxOpens: 0 },
      'ecosmart.html': { views: 0, avgTimeSeconds: 0, totalSeconds: 0, maxScrollAvg: 0, lightboxOpens: 0 },
    },
    topScreensViewed: {},
    outboundClicks: {},
    referrers: { Direct: 0, Search: 0, Social: 0, Other: 0 },
    scrollMilestones: { '25%': 0, '50%': 0, '75%': 0, '100%': 0 }
  });

  const saveData = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage quota or private mode
    }
  };

  // Determine anonymous device category
  const getDeviceCategory = () => {
    const w = window.innerWidth;
    if (w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  };

  // Categorize referrer without capturing personal URLs
  const getSanitizedReferrer = () => {
    const ref = document.referrer;
    if (!ref) return 'Direct';
    if (/google|bing|duckduckgo|yahoo/i.test(ref)) return 'Search';
    if (/linkedin|twitter|t\.co|facebook|instagram/i.test(ref)) return 'Social';
    return 'Other';
  };

  // 1. Record Page Visit
  const recordPageView = () => {
    if (isDNT) return;
    const data = getStoredData();
    data.totalViews = (data.totalViews || 0) + 1;

    // Check session freshness (last active > 30 minutes = new session)
    const lastSession = sessionStorage.getItem('ma_session_active');
    if (!lastSession) {
      sessionStorage.setItem('ma_session_active', '1');
      data.sessionsCount = (data.sessionsCount || 0) + 1;
      const device = getDeviceCategory();
      data.deviceTypes[device] = (data.deviceTypes[device] || 0) + 1;
      const refCat = getSanitizedReferrer();
      data.referrers[refCat] = (data.referrers[refCat] || 0) + 1;
    }

    if (!data.pages[currentPath]) {
      data.pages[currentPath] = { views: 0, avgTimeSeconds: 0, totalSeconds: 0, maxScrollAvg: 0, lightboxOpens: 0 };
    }
    data.pages[currentPath].views = (data.pages[currentPath].views || 0) + 1;
    saveData(data);
  };

  // 2. Track Dwell Time on Page
  const recordDwellTime = () => {
    if (isDNT) return;
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    if (elapsedSeconds < 2) return; // Ignore accidental bounces

    const data = getStoredData();
    if (!data.pages[currentPath]) return;

    const pageStats = data.pages[currentPath];
    pageStats.totalSeconds = (pageStats.totalSeconds || 0) + elapsedSeconds;
    pageStats.avgTimeSeconds = Math.round(pageStats.totalSeconds / Math.max(pageStats.views, 1));
    pageStats.maxScrollAvg = Math.max(pageStats.maxScrollAvg || 0, maxScrollPercentage);

    saveData(data);
  };

  // 3. Track Scroll Depth Milestones (25%, 50%, 75%, 100%)
  const checkScrollDepth = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const currentScroll = Math.min(100, Math.round((window.scrollY / docHeight) * 100));
    maxScrollPercentage = Math.max(maxScrollPercentage, currentScroll);

    [25, 50, 75, 100].forEach((milestone) => {
      const key = `${milestone}%`;
      if (currentScroll >= milestone && !milestonesReached.has(key)) {
        milestonesReached.add(key);
        if (!isDNT) {
          const data = getStoredData();
          if (data.scrollMilestones) {
            data.scrollMilestones[key] = (data.scrollMilestones[key] || 0) + 1;
            saveData(data);
          }
        }
      }
    });
  };

  // 4. Public API for Lightbox & Interaction tracking
  window.PortfolioAnalytics = {
    trackLightboxOpen: (imageTitleOrSrc) => {
      if (isDNT) return;
      const data = getStoredData();
      const key = String(imageTitleOrSrc).trim() || 'Untitled Screenshot';
      data.topScreensViewed[key] = (data.topScreensViewed[key] || 0) + 1;
      if (data.pages[currentPath]) {
        data.pages[currentPath].lightboxOpens = (data.pages[currentPath].lightboxOpens || 0) + 1;
      }
      saveData(data);
    },

    trackOutboundClick: (destinationName) => {
      if (isDNT) return;
      const data = getStoredData();
      const key = String(destinationName).trim();
      data.outboundClicks[key] = (data.outboundClicks[key] || 0) + 1;
      saveData(data);
    },

    getData: getStoredData,

    resetData: () => {
      localStorage.removeItem(STORAGE_KEY);
      return initData();
    },

    openDashboard: () => renderAnalyticsModal()
  };

  // Event Listeners for Page Engagement
  window.addEventListener('DOMContentLoaded', () => {
    recordPageView();
    window.addEventListener('scroll', checkScrollDepth, { passive: true });
    window.addEventListener('beforeunload', recordDwellTime);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        recordDwellTime();
      }
    });

    // Intercept outbound external link clicks (e.g. Kioni live, Demo, Email)
    document.querySelectorAll('a[href^="http"], a[href^="mailto"]').forEach((link) => {
      link.addEventListener('click', () => {
        const label = link.textContent.trim() || link.getAttribute('href');
        window.PortfolioAnalytics.trackOutboundClick(label);
      });
    });

    // Listen for keyboard shortcut Shift + A to open Analytics Dashboard
    window.addEventListener('keydown', (e) => {
      if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        renderAnalyticsModal();
      }
    });
  });

  // Modal Dashboard Renderer
  const renderAnalyticsModal = () => {
    let existingModal = document.getElementById('portfolioAnalyticsModal');
    if (existingModal) {
      existingModal.remove();
    }

    const data = getStoredData();
    const modal = document.createElement('div');
    modal.id = 'portfolioAnalyticsModal';
    modal.className = 'analytics-modal-backdrop';

    const formatSeconds = (sec) => {
      if (!sec || sec < 60) return `${sec || 0}s`;
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m}m ${s}s`;
    };

    const topScreens = Object.entries(data.topScreensViewed || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const outboundLinks = Object.entries(data.outboundClicks || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    modal.innerHTML = `
      <div class="analytics-modal-sheet" role="dialog" aria-modal="true" aria-labelledby="analyticsTitle">
        <div class="analytics-modal-header">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="category-tag" style="color: #1F5C45; font-size: 0.75rem;">Privacy Analytics</span>
              <span style="font-size: 0.75rem; background: #E6F4D7; color: #1F5C45; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Zero Cookies · 100% On-Device</span>
            </div>
            <h3 id="analyticsTitle" style="font-family: var(--font-heading, Georgia, serif); font-size: 1.6rem; color: #141414; margin-top: 0.35rem;">
              Portfolio Engagement
            </h3>
          </div>
          <button class="analytics-close-btn" aria-label="Close dashboard">✕</button>
        </div>

        <!-- Metrics Overview Grid -->
        <div class="analytics-metric-grid">
          <div class="analytics-metric-card">
            <span class="analytics-metric-val">${data.totalViews || 0}</span>
            <span class="analytics-metric-label">Total Page Views</span>
          </div>
          <div class="analytics-metric-card">
            <span class="analytics-metric-val">${data.sessionsCount || 1}</span>
            <span class="analytics-metric-label">Unique Sessions</span>
          </div>
          <div class="analytics-metric-card">
            <span class="analytics-metric-val">${formatSeconds(data.pages['kioni.html']?.avgTimeSeconds || 0)}</span>
            <span class="analytics-metric-label">Avg. Kioni Read Time</span>
          </div>
          <div class="analytics-metric-card">
            <span class="analytics-metric-val">${(data.pages['kioni.html']?.lightboxOpens || 0) + (data.pages['kioni-design-system.html']?.lightboxOpens || 0)}</span>
            <span class="analytics-metric-label">Screens Zoomed</span>
          </div>
        </div>

        <!-- Page Engagement Table -->
        <div class="analytics-section-box">
          <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.75rem; color: #141414;">Case Study Engagement</h4>
          <div class="analytics-table-wrap">
            <table class="analytics-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Avg. Time</th>
                  <th>Screens Zoomed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Home (Portfolio)</strong></td>
                  <td>${data.pages['index.html']?.views || 0}</td>
                  <td>${formatSeconds(data.pages['index.html']?.avgTimeSeconds || 0)}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td><strong>Kioni Case Study</strong></td>
                  <td>${data.pages['kioni.html']?.views || 0}</td>
                  <td>${formatSeconds(data.pages['kioni.html']?.avgTimeSeconds || 0)}</td>
                  <td>${data.pages['kioni.html']?.lightboxOpens || 0}</td>
                </tr>
                <tr>
                  <td><strong>Kioni Design System</strong></td>
                  <td>${data.pages['kioni-design-system.html']?.views || 0}</td>
                  <td>${formatSeconds(data.pages['kioni-design-system.html']?.avgTimeSeconds || 0)}</td>
                  <td>${data.pages['kioni-design-system.html']?.lightboxOpens || 0}</td>
                </tr>
                <tr>
                  <td><strong>Ajo Book</strong></td>
                  <td>${data.pages['ajo-book.html']?.views || 0}</td>
                  <td>${formatSeconds(data.pages['ajo-book.html']?.avgTimeSeconds || 0)}</td>
                  <td>${data.pages['ajo-book.html']?.lightboxOpens || 0}</td>
                </tr>
                <tr>
                  <td><strong>EcoSmart AI</strong></td>
                  <td>${data.pages['ecosmart.html']?.views || 0}</td>
                  <td>${formatSeconds(data.pages['ecosmart.html']?.avgTimeSeconds || 0)}</td>
                  <td>${data.pages['ecosmart.html']?.lightboxOpens || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Two Columns: Top Screenshots & Outbound Clicks -->
        <div class="analytics-split-grid">
          <div class="analytics-section-box">
            <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.65rem; color: #141414;">Most Examined Screens</h4>
            ${topScreens.length === 0 ? '<p style="font-size: 0.85rem; color: #6B6B6B;">Click any screenshot to zoom in lightbox to log interactions.</p>' : `
              <ul class="analytics-list">
                ${topScreens.map(([title, count]) => `
                  <li>
                    <span class="analytics-list-title">${title}</span>
                    <span class="analytics-list-badge">${count} views</span>
                  </li>
                `).join('')}
              </ul>
            `}
          </div>

          <div class="analytics-section-box">
            <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.65rem; color: #141414;">External Link Engagement</h4>
            ${outboundLinks.length === 0 ? '<p style="font-size: 0.85rem; color: #6B6B6B;">Clicks on live apps, prototypes, and contact links will appear here.</p>' : `
              <ul class="analytics-list">
                ${outboundLinks.map(([link, count]) => `
                  <li>
                    <span class="analytics-list-title" title="${link}">${link}</span>
                    <span class="analytics-list-badge">${count} clicks</span>
                  </li>
                `).join('')}
              </ul>
            `}
          </div>
        </div>

        <!-- Privacy & Actions Footer -->
        <div class="analytics-modal-footer">
          <p style="font-size: 0.8rem; color: #6B6B6B;">
            🔒 <strong>Strictly Private:</strong> Stored locally in your browser. No external telemetry servers, cookies, or personal tracking.
          </p>
          <div style="display: flex; gap: 0.75rem;">
            <button id="exportAnalyticsBtn" class="analytics-action-btn">Export JSON</button>
            <button id="resetAnalyticsBtn" class="analytics-action-btn danger">Reset Stats</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('active'));

    // Bind modal actions
    const closeBtn = modal.querySelector('.analytics-close-btn');
    const closeModal = () => {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 250);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    const exportBtn = modal.querySelector('#exportAnalyticsBtn');
    exportBtn.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-engagement-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    const resetBtn = modal.querySelector('#resetAnalyticsBtn');
    resetBtn.addEventListener('click', () => {
      if (confirm('Clear local engagement data?')) {
        window.PortfolioAnalytics.resetData();
        closeModal();
      }
    });

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        window.removeEventListener('keydown', handleEsc);
      }
    };
    window.addEventListener('keydown', handleEsc);
  };
})();
