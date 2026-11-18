/**
 * Maryam Abdulkarim — Portfolio Interactive Engine
 * Pure vanilla JavaScript (no heavy libraries) for speed and responsiveness
 */

import './analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isReducedMotion = reducedMotionQuery.matches;

  // 0. Theme Toggle & Preference Sync
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const getSavedTheme = () => {
    try {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || saved === 'light' ? saved : null;
    } catch (e) {
      return null;
    }
  };
  const applyThemeState = (theme, animate) => {
    const resolved = theme === 'dark' ? 'dark' : 'light';
    if (animate && !reducedMotionQuery.matches) {
      document.documentElement.classList.add('theme-transitioning');
      window.clearTimeout(window.__themeTransitionTimer);
      window.__themeTransitionTimer = window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 220);
    } else {
      document.documentElement.classList.remove('theme-transitioning');
    }
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.style.colorScheme = resolved;
    if (themeToggleBtn) {
      const nextLabel = resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggleBtn.setAttribute('aria-label', nextLabel);
      themeToggleBtn.setAttribute('title', nextLabel);
      themeToggleBtn.setAttribute('aria-pressed', String(resolved === 'dark'));
    }
  };

  const initialTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyThemeState(initialTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
      applyThemeState(next, true);
    });
  }

  if (window.matchMedia) {
    const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSchemeChange = (e) => {
      if (!getSavedTheme()) {
        applyThemeState(e.matches ? 'dark' : 'light', true);
      }
    };
    if (darkSchemeQuery.addEventListener) {
      darkSchemeQuery.addEventListener('change', handleSchemeChange);
    } else if (darkSchemeQuery.addListener) {
      darkSchemeQuery.addListener(handleSchemeChange);
    }
  }

  // 1. Page Fade Transition & Selected Work View Transitions
  const overlay = document.querySelector('.page-fade-overlay');
  const supportsCrossDocVT =
    'onpageswap' in window &&
    'onpagereveal' in window &&
    typeof CSS !== 'undefined' &&
    CSS.supports('view-transition-name', 'none');

  const cleanupDoorState = (event) => {
    window.__vtSelectedWork = false;
    try {
      sessionStorage.removeItem('vtSelectedWork');
    } catch (e) {}
    const isPersistedRestore = Boolean(event && event.persisted);
    if (isPersistedRestore || !document.documentElement.classList.contains('vt-active')) {
      const optIn = document.getElementById('vt-opt-in');
      if (optIn) optIn.remove();
      document.documentElement.classList.remove('vt-active');
    }
    document.querySelectorAll('#work .project-card.door-transitioning').forEach((card) => {
      card.classList.remove('door-transitioning');
    });
    if (overlay) {
      overlay.classList.add('loaded');
    }
  };

  if (overlay) {
    requestAnimationFrame(() => {
      overlay.classList.add('loaded');
    });
  }

  window.addEventListener('pageshow', cleanupDoorState);

  if (supportsCrossDocVT) {
    window.addEventListener('pageswap', (e) => {
      if (!e.viewTransition) return;
      try {
        e.viewTransition.ready?.catch?.(() => {});
        e.viewTransition.finished?.catch?.(() => {});
        e.viewTransition.updateCallbackDone?.catch?.(() => {});
      } catch (err) {}

      if (isReducedMotion || !window.__vtSelectedWork) {
        try {
          e.viewTransition.skipTransition();
        } catch (err) {}
      }
    });

    document.querySelectorAll('#work .project-card a[href]').forEach((cardLink) => {
      cardLink.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (isReducedMotion) return;

        window.__vtSelectedWork = true;
        try {
          sessionStorage.setItem('vtSelectedWork', '1');
        } catch (err) {}

        if (!document.getElementById('vt-opt-in')) {
          const st = document.createElement('style');
          st.id = 'vt-opt-in';
          st.textContent = '@media (prefers-reduced-motion: no-preference) { @view-transition { navigation: auto; } }';
          document.head.appendChild(st);
        }

        if (window.innerWidth >= 768) {
          const card = cardLink.closest('.project-card');
          if (card) {
            card.classList.add('door-transitioning');
          }
        }
      });
    });
  }

  // Intercept local page links (excluding Selected Work when cross-doc VT is supported) for smooth page exit transition
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (supportsCrossDocVT && link.closest('#work .project-card')) return;
    const isAnchor = href.startsWith('#');
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank';
    const isDownload = link.hasAttribute('download') || /\.pdf(\?|$)/i.test(href);

    if (!isAnchor && !isExternal && !isDownload && !isReducedMotion) {
      link.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        if (overlay) {
          overlay.classList.remove('loaded');
          setTimeout(() => {
            window.location.href = href;
          }, 240);
        } else {
          window.location.href = href;
        }
      });
    }
  });

  // 2. Navigation Scroll Styling
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const handleNavScroll = () => {
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4b. Copy Email Button
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    let copyTimer = null;
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-copy-email') || 'maryamabdulkarim06@gmail.com';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const tempInput = document.createElement('textarea');
          tempInput.value = email;
          tempInput.setAttribute('readonly', '');
          tempInput.style.position = 'fixed';
          tempInput.style.opacity = '0';
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        const copyLabel = copyEmailBtn.querySelector('.copy-email-label');
        if (copyLabel) {
          copyLabel.textContent = 'Copied ✓';
        } else {
          copyEmailBtn.textContent = 'Copied ✓';
        }
        copyEmailBtn.classList.add('is-copied');
        if (copyTimer) clearTimeout(copyTimer);
        copyTimer = setTimeout(() => {
          if (copyLabel) {
            copyLabel.textContent = 'Copy';
          } else {
            copyEmailBtn.textContent = 'Copy';
          }
          copyEmailBtn.classList.remove('is-copied');
        }, 2000);
      } catch (err) {}
    });
  }

  // 5. Scroll Progress Bar (Case Studies)
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  // 6. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if (revealElements.length > 0) {
    if (isReducedMotion) {
      revealElements.forEach((el) => el.classList.add('visible'));
    } else {
      const revealVisibleOrPassed = () => {
        const vh = window.innerHeight || document.documentElement.clientHeight || 800;
        revealElements.forEach((el) => {
          if (el.classList.contains('visible')) return;
          const rect = el.getBoundingClientRect();
          if (rect.top <= vh + 60) {
            el.classList.add('visible');
          }
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: '80px 0px' }
      );
      revealElements.forEach((el) => observer.observe(el));
      window.addEventListener('scroll', revealVisibleOrPassed, { passive: true });
      window.addEventListener('load', revealVisibleOrPassed, { once: true });
      requestAnimationFrame(revealVisibleOrPassed);
    }
  }

  // 7. Stat Numbers Count-Up Animation
  const statNumbers = document.querySelectorAll('[data-count-to]');
  if (statNumbers.length > 0) {
    if (isReducedMotion) {
      statNumbers.forEach((stat) => {
        const target = stat.getAttribute('data-count-to');
        const prefix = stat.getAttribute('data-prefix') || '';
        const suffix = stat.getAttribute('data-suffix') || '';
        stat.textContent = `${prefix}${target}${suffix}`;
      });
    } else {
      const statObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const target = parseInt(el.getAttribute('data-count-to') || '0', 10);
              const prefix = el.getAttribute('data-prefix') || '';
              const suffix = el.getAttribute('data-suffix') || '';
              const duration = 1400; // ms
              const startTime = performance.now();

              const animateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutExpo formula
                const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const currentVal = Math.round(target * ease);
                el.textContent = `${prefix}${currentVal}${suffix}`;
                if (progress < 1) {
                  requestAnimationFrame(animateNumber);
                }
              };
              requestAnimationFrame(animateNumber);
              statObserver.unobserve(el);
            }
          });
        },
        { threshold: 0.3 }
      );
      statNumbers.forEach((stat) => statObserver.observe(stat));
    }
  }

  // 8. Lightbox for Galleries & Catalogue
  const lightbox = document.getElementById('portfolioLightbox');
  let openLightboxFn = null;

  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption-text');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentGalleryItems = [];
    let currentIndex = 0;

    const openLightbox = (items, index) => {
      currentGalleryItems = items;
      currentIndex = index;
      updateLightboxContent();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Log screenshot engagement in privacy analytics
      if (window.PortfolioAnalytics && window.PortfolioAnalytics.trackLightboxOpen) {
        const item = items[index];
        const title = item instanceof HTMLElement
          ? (item.getAttribute('data-title') || item.querySelector('.gallery-caption h4')?.textContent || item.querySelector('img')?.alt || 'Screenshot')
          : (item?.title || 'Screenshot');
        window.PortfolioAnalytics.trackLightboxOpen(title);
      }
    };
    openLightboxFn = openLightbox;

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const updateLightboxContent = () => {
      if (!currentGalleryItems[currentIndex]) return;
      const item = currentGalleryItems[currentIndex];
      
      // Support both DOM elements and raw data objects
      if (item instanceof HTMLElement) {
        const img = item.querySelector('img');
        const captionTitle = item.getAttribute('data-title')
          || item.querySelector('.gallery-caption h4')?.textContent
          || item.closest('.cs-image-card')?.querySelector('.cs-image-caption')?.textContent
          || item.closest('.ecosmart-image-card')?.querySelector('.ecosmart-img-caption')?.textContent
          || img?.alt
          || '';
        const captionDesc = item.getAttribute('data-desc')
          || item.closest('.ba-pair')?.querySelector('.ba-caption')?.textContent
          || item.querySelector('.gallery-caption p')?.textContent
          || '';
        
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || captionTitle;
        }
        if (lightboxCaption) {
          if (captionDesc && captionTitle) {
            lightboxCaption.innerHTML = `<strong>${captionTitle}</strong> — ${captionDesc}`;
          } else {
            lightboxCaption.innerHTML = captionTitle ? `<span>${captionTitle}</span>` : '';
          }
        }
      } else {
        if (lightboxImg) {
          lightboxImg.src = item.src;
          lightboxImg.alt = item.title;
        }
        if (lightboxCaption) {
          lightboxCaption.innerHTML = `<strong>${item.plate}: ${item.title}</strong> — ${item.desc}`;
        }
      }
    };

    const showPrev = () => {
      if (currentGalleryItems.length === 0) return;
      currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
      updateLightboxContent();
    };

    const showNext = () => {
      if (currentGalleryItems.length === 0) return;
      currentIndex = (currentIndex + 1) % currentGalleryItems.length;
      updateLightboxContent();
    };

    // Attach click handlers to static masonry galleries
    document.querySelectorAll('.gallery-masonry:not(.catalogue-grid-view)').forEach((gallery) => {
      const items = Array.from(gallery.querySelectorAll('.gallery-item'));
      items.forEach((item, idx) => {
        item.addEventListener('click', () => openLightbox(items, idx));
      });
    });

    // Attach click handlers to all case study image frames (.cs-img-frame, .ba-screen, .ecosmart-img-frame, or [data-lightbox])
    const caseStudyImages = Array.from(document.querySelectorAll('.cs-img-frame, .ba-screen, .ecosmart-img-frame, [data-lightbox]'));
    if (caseStudyImages.length > 0) {
      caseStudyImages.forEach((frame, idx) => {
        frame.addEventListener('click', (e) => {
          e.stopPropagation();
          openLightbox(caseStudyImages, idx);
        });
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // Mobile swipe support inside Lightbox
    let lbTouchStartX = 0;
    let lbTouchStartY = 0;
    lightbox.addEventListener('touchstart', (e) => {
      if (!lightbox.classList.contains('active') || !e.changedTouches.length) return;
      lbTouchStartX = e.changedTouches[0].clientX;
      lbTouchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      if (!lightbox.classList.contains('active') || !e.changedTouches.length) return;
      const dx = e.changedTouches[0].clientX - lbTouchStartX;
      const dy = e.changedTouches[0].clientY - lbTouchStartY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        if (dx > 0) {
          showPrev();
        } else {
          showNext();
        }
      }
    }, { passive: true });

    window.PortfolioLightbox = {
      open: openLightbox,
      close: closeLightbox,
      isActive: () => lightbox.classList.contains('active')
    };
  }

  // 9. Interactive Illustrations Catalogue Slider Engine
  const catStage = document.getElementById('catalogueStage');
  if (catStage) {
    const catalogueData = [
      {
        id: 1,
        plate: "Plate 01",
        title: "Morning at GMS Alimosho (PU 003)",
        subtitle: "Polling Unit 003 Environment Setup",
        category: "Civic Storyboard",
        filter: "storyboard",
        src: "/assets/aistudio/First_frame__1__cf2e54bc.png",
        desc: "Narrative wide establishing shot of the community school courtyard converted into a grassroots civic polling station under morning shade trees."
      },
      {
        id: 2,
        plate: "Plate 02",
        title: "Morning Gathering & Early Voters",
        subtitle: "Community Arrival & Anticipation",
        category: "Civic Storyboard",
        filter: "storyboard",
        src: "/assets/aistudio/SECOND_SCENE_57a6e2f1.png",
        desc: "Citizens gathering at the school gate as dawn breaks, exchanging greetings before the accredited voter queue begins."
      },
      {
        id: 3,
        plate: "Plate 03",
        title: "Electoral Officials & Community Dialogue",
        subtitle: "Verification & Accreditation",
        category: "Civic Storyboard",
        filter: "storyboard",
        src: "/assets/aistudio/THIRD_SCENE_d5ce0582.png",
        desc: "Transparent dialogue between presiding officials, community elders, and observers setting up the voter verification desk."
      },
      {
        id: 4,
        plate: "Plate 04",
        title: "Classroom Polling Booth Interior",
        subtitle: "Secret Ballot Stamping",
        category: "Civic Storyboard",
        filter: "storyboard",
        src: "/assets/aistudio/FOURTH_SCENE_4b5852eb.png",
        desc: "Careful architectural interior capturing desk layout, ballot paper inspection, and the privacy of the thumbprint cubicle."
      },
      {
        id: 5,
        plate: "Plate 05",
        title: "Casting the Ballot",
        subtitle: "The Decisive Moment",
        category: "Civic Storyboard",
        filter: "storyboard",
        src: "/assets/aistudio/FIFTH_SCENE_c1d7b4c3.png",
        desc: "A Nigerian citizen sliding her folded ballot into the transparent electoral box in front of accredited monitors."
      },
      {
        id: 6,
        plate: "Plate 06",
        title: "Afternoon Heat & Civic Resolve",
        subtitle: "The Waiting Hours",
        category: "Civic Storyboard",
        filter: "storyboard",
        src: "/assets/aistudio/SIXTH_SCENE_c06109cd.png",
        desc: "Intimate character study of voters waiting under the veranda shade as temperatures rise, sharing stories and snacks."
      },
      {
        id: 7,
        plate: "Plate 07",
        title: "Public Ballot Count",
        subtitle: "Open Transparency",
        category: "Civic Storyboard",
        filter: "storyboard",
        src: "/assets/aistudio/SEVENTH_SCENE_069ff787.png",
        desc: "The ballot box is unsealed and inverted in full view of the public as every single vote is held up and proclaimed."
      },
      {
        id: 8,
        plate: "Plate 08",
        title: "Chalkboard Tally & Witness",
        subtitle: "Collective Accounting",
        category: "Civic Storyboard",
        filter: "storyboard",
        src: "/assets/aistudio/SEVENTH_SCENE__1__35dedb7f.png",
        desc: "Classroom blackboard converted into an official tally board, recording 5-bar tally gates watched closely by party agents."
      },
      {
        id: 9,
        plate: "Plate 09",
        title: "Sunset Conclusion & Form EC8A",
        subtitle: "Peaceful Completion",
        category: "Civic Storyboard",
        filter: "storyboard",
        src: "/assets/aistudio/EIGHT_fa92f8c9.png",
        desc: "Dusk settles over the school grounds as the certified polling unit result sheet is pasted on the school wall for all citizens."
      },
      {
        id: 10,
        plate: "Plate 10",
        title: "Coloured Scenario Ideation & Thumbnails",
        subtitle: "Visual Development & Beat Board",
        category: "Concept & Character",
        filter: "concept",
        src: "/assets/aistudio/Coloured_Scenerio_Ideation_4f0b8887.png",
        desc: "Systematic lighting study and environmental storyboard frames mapping sunlight and narrative tension across the day."
      },
      {
        id: 11,
        plate: "Plate 11",
        title: "Character Color Harmony & Lighting",
        subtitle: "Palette & Material Render",
        category: "Concept & Character",
        filter: "concept",
        src: "/assets/aistudio/COLOR__3__92367bfe.png",
        desc: "Exploration of warm ochre earth tones, traditional patterned clothing, and rich skin tones under harsh tropical sunlight."
      },
      {
        id: 12,
        plate: "Plate 12",
        title: "Character Model Sheet & Expressions",
        subtitle: "Anatomy, Gestures & Wardrobe",
        category: "Concept & Character",
        filter: "concept",
        src: "/assets/aistudio/Illustrations_744de593.png",
        desc: "Turnaround sheets capturing Nigerian character archetypes, traditional fabrics, everyday postures, and expressive gestures."
      },
      {
        id: 13,
        plate: "Plate 13",
        title: "Nigerian Snack Packaging Illustration",
        subtitle: "Food Illustration & Identity",
        category: "Vector Art",
        filter: "vector",
        src: "/assets/aistudio/Snack__7__779a4eca.png",
        desc: "Clean, vibrant vector illustration of packaged local pastries and savory crunch snacks with bold color blocking."
      },
      {
        id: 14,
        plate: "Plate 14",
        title: "Zobo & Citrus Infusion Vector Artwork",
        subtitle: "Beverage Illustration",
        category: "Vector Art",
        filter: "vector",
        src: "/assets/aistudio/Drink__5__85867869.png",
        desc: "High-energy commercial vector art celebrating hibiscus herbal cooler with splash dynamics and fresh botanical garnishes."
      },
      {
        id: 15,
        plate: "Plate 15",
        title: "Artisan Coffee Cup & Sleeve Vector Illustration",
        subtitle: "Warm Beverage Packaging & Iconography",
        category: "Vector Art",
        filter: "vector",
        src: "/assets/aistudio/With_Effect__2__5f1fe495.png",
        desc: "Vector packaging illustration of a minimalist takeaway coffee cup with embossed paper sleeve, heart emblem, and depth shadowing."
      }
    ];

    let currentFilter = 'all';
    let filteredItems = [...catalogueData];
    let activeIndex = 0;

    const catGridView = document.getElementById('catalogueGridView');
    const catActiveImg = document.getElementById('catActiveImg');
    const catPlateBadge = document.getElementById('catPlateBadge');
    const catPlateTitle = document.getElementById('catPlateTitle');
    const catPlateSubtitle = document.getElementById('catPlateSubtitle');
    const catPlateDesc = document.getElementById('catPlateDesc');
    const catCurrentNum = document.getElementById('catCurrentNum');
    const catTotalNum = document.getElementById('catTotalNum');
    const catPrevBtn = document.getElementById('catPrevBtn');
    const catNextBtn = document.getElementById('catNextBtn');
    const catThumbsRail = document.getElementById('catThumbsRail');
    const catMediaFrame = document.getElementById('catMediaFrame');
    const catExpandBtn = document.getElementById('catExpandBtn');
    const filterBtns = document.querySelectorAll('.catalogue-filters .filter-btn');
    const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');

    const updateStageContent = () => {
      if (filteredItems.length === 0) return;
      const item = filteredItems[activeIndex];

      if (catActiveImg) {
        catActiveImg.src = item.src;
        catActiveImg.alt = `${item.plate}: ${item.title}`;
      }
      if (catPlateBadge) {
        catPlateBadge.innerHTML = `<span>${item.plate}</span><span aria-hidden="true">·</span><span>${item.category}</span>`;
      }
      if (catPlateTitle) {
        catPlateTitle.textContent = item.title;
      }
      if (catPlateSubtitle) {
        catPlateSubtitle.textContent = item.subtitle;
      }
      if (catPlateDesc) {
        catPlateDesc.textContent = item.desc;
      }
      if (catCurrentNum) {
        catCurrentNum.textContent = String(activeIndex + 1).padStart(2, '0');
      }
      if (catTotalNum) {
        catTotalNum.textContent = String(filteredItems.length).padStart(2, '0');
      }

      // Update thumbnail active states
      if (catThumbsRail) {
        const thumbCards = catThumbsRail.querySelectorAll('.thumb-card');
        thumbCards.forEach((tc, idx) => {
          if (idx === activeIndex) {
            tc.classList.add('active');
            tc.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          } else {
            tc.classList.remove('active');
          }
        });
      }
    };

    const renderThumbs = () => {
      if (!catThumbsRail) return;
      catThumbsRail.innerHTML = '';
      filteredItems.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = `thumb-card ${idx === activeIndex ? 'active' : ''}`;
        card.setAttribute('role', 'tab');
        card.setAttribute('aria-label', `${item.plate}: ${item.title}`);
        card.innerHTML = `
          <img src="${item.src}" alt="${item.title}" loading="lazy" />
          <span class="thumb-plate-label">${item.plate}</span>
        `;
        card.addEventListener('click', () => {
          activeIndex = idx;
          updateStageContent();
        });
        catThumbsRail.appendChild(card);
      });
    };

    const renderGridView = () => {
      if (!catGridView) return;
      catGridView.innerHTML = '';
      filteredItems.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'gallery-item';
        card.innerHTML = `
          <div class="gallery-thumb-wrap" style="aspect-ratio: 16/10;">
            <img src="${item.src}" alt="${item.title}" loading="lazy" />
          </div>
          <div class="gallery-caption">
            <span class="category-tag" style="color: var(--accent-color); font-size: 0.7rem;">${item.plate} · ${item.category}</span>
            <h4 style="margin-top: 0.25rem;">${item.title}</h4>
            <p>${item.desc}</p>
          </div>
        `;
        card.addEventListener('click', () => {
          if (openLightboxFn) {
            openLightboxFn(filteredItems, idx);
          }
        });
        catGridView.appendChild(card);
      });
    };

    const applyFilter = (filter) => {
      currentFilter = filter;
      if (filter === 'all') {
        filteredItems = [...catalogueData];
      } else {
        filteredItems = catalogueData.filter((it) => it.filter === filter);
      }
      activeIndex = 0;
      updateStageContent();
      renderThumbs();
      renderGridView();
    };

    // Filter Buttons
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.getAttribute('data-filter') || 'all');
      });
    });

    // View Mode Toggle (Slide vs Grid)
    viewToggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        viewToggleBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const viewMode = btn.getAttribute('data-view');
        if (viewMode === 'grid') {
          catStage.style.display = 'none';
          catGridView.classList.add('active');
        } else {
          catStage.style.display = '';
          catGridView.classList.remove('active');
        }
      });
    });

    // Navigation Buttons (Prev / Next)
    const prevSlide = () => {
      if (filteredItems.length === 0) return;
      activeIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
      updateStageContent();
    };

    const nextSlide = () => {
      if (filteredItems.length === 0) return;
      activeIndex = (activeIndex + 1) % filteredItems.length;
      updateStageContent();
    };

    if (catPrevBtn) catPrevBtn.addEventListener('click', prevSlide);
    if (catNextBtn) catNextBtn.addEventListener('click', nextSlide);

    // Lightbox triggers for active slide
    if (catMediaFrame) {
      catMediaFrame.addEventListener('click', () => {
        if (openLightboxFn && filteredItems.length > 0) {
          openLightboxFn(filteredItems, activeIndex);
        }
      });
    }
    if (catExpandBtn) {
      catExpandBtn.addEventListener('click', () => {
        if (openLightboxFn && filteredItems.length > 0) {
          openLightboxFn(filteredItems, activeIndex);
        }
      });
    }

    // Keyboard navigation when hovering or interacting with catalogue
    let isHoveringCatalogue = false;
    const catContainer = document.querySelector('.catalogue-container');
    if (catContainer) {
      catContainer.addEventListener('mouseenter', () => { isHoveringCatalogue = true; });
      catContainer.addEventListener('mouseleave', () => { isHoveringCatalogue = false; });
    }

    window.addEventListener('keydown', (e) => {
      if (lightbox && lightbox.classList.contains('active')) return;
      if (!isHoveringCatalogue) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });

    // Touch swipe support on the main media frame
    let touchStartX = 0;
    if (catMediaFrame) {
      catMediaFrame.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      catMediaFrame.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (diff > 45) {
          prevSlide();
        } else if (diff < -45) {
          nextSlide();
        }
      }, { passive: true });
    }

    // Initial render
    renderThumbs();
    renderGridView();
    updateStageContent();
  }

  // 10. Reusable Modern Phone Video Controller (EcoSmart AI & Ajo Book)
  const phoneVideos = document.querySelectorAll('.modern-phone-video');
  if (phoneVideos.length > 0) {
    phoneVideos.forEach((video) => {
      const screen = video.closest('.modern-phone-screen');
      const toggleBtn = screen?.querySelector('.phone-playback-btn');
      const playIcon = toggleBtn?.querySelector('.phone-icon-play');
      const pauseIcon = toggleBtn?.querySelector('.phone-icon-pause');
      let userManuallyPaused = false;

      const updatePlayState = (isPlaying) => {
        if (toggleBtn) {
          if (isPlaying) {
            toggleBtn.classList.remove('is-paused');
            toggleBtn.setAttribute('aria-label', 'Pause demo video');
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
          } else {
            toggleBtn.classList.add('is-paused');
            toggleBtn.setAttribute('aria-label', 'Play demo video');
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
          }
        }
      };

      const togglePlay = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (video.paused) {
          userManuallyPaused = false;
          video.play().then(() => updatePlayState(true)).catch(() => {});
        } else {
          userManuallyPaused = true;
          video.pause();
          updatePlayState(false);
        }
      };

      // Toggle when clicking the dedicated button
      if (toggleBtn) {
        toggleBtn.addEventListener('click', togglePlay);
      }

      // Also toggle when tapping/clicking anywhere on the screen (unless clicking the button directly)
      if (screen) {
        screen.addEventListener('click', (e) => {
          if (e.target === toggleBtn || toggleBtn?.contains(e.target)) return;
          togglePlay(e);
        });
      }

      video.addEventListener('play', () => updatePlayState(true));
      video.addEventListener('pause', () => updatePlayState(false));

      // Respect prefers-reduced-motion: if enabled, never autoplay, show poster and play button
      if (isReducedMotion) {
        video.pause();
        updatePlayState(false);
      } else {
        // IntersectionObserver: play when in view, pause when out of view
        const videoObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !userManuallyPaused) {
                video.play().then(() => updatePlayState(true)).catch(() => {});
              } else {
                video.pause();
                updatePlayState(false);
              }
            });
          },
          { threshold: 0.35 }
        );
        videoObserver.observe(video);
      }
    });
  }

  // 11. Case Study Walkthrough Video Controller (Kioni, etc.)
  const walkthroughVideos = document.querySelectorAll('.cs-video-element');
  if (walkthroughVideos.length > 0) {
    const isDataSaver = navigator.connection?.saveData === true;
    const shouldAvoidAutoplay = isReducedMotion || isDataSaver;

    walkthroughVideos.forEach((video) => {
      const frame = video.closest('.cs-video-frame');
      const toggleBtn = frame?.querySelector('.cs-video-toggle');
      const playIcon = toggleBtn?.querySelector('.icon-play');
      const pauseIcon = toggleBtn?.querySelector('.icon-pause');
      const label = toggleBtn?.querySelector('.toggle-label');
      let userManuallyPaused = false;

      const updateState = (isPlaying) => {
        if (!toggleBtn) return;
        if (isPlaying) {
          toggleBtn.setAttribute('aria-label', 'Pause video');
          if (label) label.textContent = 'Pause';
          if (playIcon) playIcon.style.display = 'none';
          if (pauseIcon) pauseIcon.style.display = 'block';
        } else {
          toggleBtn.setAttribute('aria-label', 'Play video');
          if (label) label.textContent = 'Play';
          if (playIcon) playIcon.style.display = 'block';
          if (pauseIcon) pauseIcon.style.display = 'none';
        }
      };

      const togglePlay = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (video.paused) {
          userManuallyPaused = false;
          video.play().then(() => updateState(true)).catch(() => {});
        } else {
          userManuallyPaused = true;
          video.pause();
          updateState(false);
        }
      };

      if (toggleBtn) {
        toggleBtn.addEventListener('click', togglePlay);
      }

      if (video) {
        video.addEventListener('click', togglePlay);
        video.addEventListener('play', () => updateState(true));
        video.addEventListener('pause', () => updateState(false));
      }

      if (shouldAvoidAutoplay) {
        video.pause();
        updateState(false);
      } else {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !userManuallyPaused) {
                video.play().then(() => updateState(true)).catch(() => {});
              } else {
                video.pause();
                updateState(false);
              }
            });
          },
          { threshold: 0.25 }
        );
        observer.observe(video);
      }
    });
  }

  // 13. Hero Toolkit Strip Tooltips (Edge detection & Mobile tap support)
  const toolWrappers = document.querySelectorAll('.tool-pill-wrapper');
  if (toolWrappers.length > 0) {
    const adjustTooltipPosition = (wrapper) => {
      const tooltip = wrapper.querySelector('.tool-tooltip');
      const pill = wrapper.querySelector('.tool-pill');
      const arrow = wrapper.querySelector('.tool-tooltip-arrow');
      if (!tooltip || !pill) return;

      // Reset first to measure natural position
      tooltip.style.left = '50%';
      tooltip.style.transform = '';
      if (arrow) arrow.style.left = '50%';

      const tipRect = tooltip.getBoundingClientRect();
      const padding = 12;
      const screenWidth = window.innerWidth;

      let shiftX = 0;
      if (tipRect.left < padding) {
        shiftX = padding - tipRect.left;
      } else if (tipRect.right > screenWidth - padding) {
        shiftX = (screenWidth - padding) - tipRect.right;
      }

      if (shiftX !== 0) {
        tooltip.style.transform = `translateX(calc(-50% + ${shiftX}px)) translateY(0)`;
        if (arrow) {
          arrow.style.left = `calc(50% - ${shiftX}px)`;
        }
      }
    };

    toolWrappers.forEach((wrapper) => {
      const pill = wrapper.querySelector('.tool-pill');
      if (!pill) return;

      // Desktop hover / focus edge adjustment
      wrapper.addEventListener('mouseenter', () => adjustTooltipPosition(wrapper));
      pill.addEventListener('focus', () => adjustTooltipPosition(wrapper));

      // Mobile tap support
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasActive = wrapper.classList.contains('active');
        toolWrappers.forEach((w) => w.classList.remove('active'));
        if (!wasActive) {
          wrapper.classList.add('active');
          adjustTooltipPosition(wrapper);
        }
      });
    });

    // Tap outside to close tooltips on mobile
    document.addEventListener('click', () => {
      toolWrappers.forEach((w) => w.classList.remove('active'));
    });

    // Escape closes tooltips
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toolWrappers.forEach((w) => w.classList.remove('active'));
      }
    });
  }

  // 14. Case Study "On this page" Sticky TOC Scrollspy
  const csToc = document.querySelector('.cs-toc');
  if (csToc) {
    const tocLinks = Array.from(csToc.querySelectorAll('.cs-toc-link[href^="#"]'));
    const tocSections = tocLinks
      .map((link) => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        return target ? { link, target } : null;
      })
      .filter(Boolean);

    const footerEl = document.querySelector('.site-footer');

    const updateTocState = () => {
      if (tocSections.length === 0) return;
      if (window.innerWidth < 1200) {
        csToc.style.transform = '';
        return;
      }

      const triggerOffset = 150;
      let activeIndex = 0;

      for (let i = 0; i < tocSections.length; i++) {
        const rect = tocSections[i].target.getBoundingClientRect();
        if (rect.top <= triggerOffset) {
          activeIndex = i;
        }
      }

      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (nearBottom) {
        activeIndex = tocSections.length - 1;
      }

      tocSections.forEach(({ link }, idx) => {
        const isActive = idx === activeIndex;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      if (footerEl) {
        const footerRect = footerEl.getBoundingClientRect();
        const tocHeight = csToc.offsetHeight;
        const tocTopPx = 116; // ~7.25rem
        const overlap = tocTopPx + tocHeight + 24 - footerRect.top;
        if (overlap > 0) {
          csToc.style.transform = `translateY(-${overlap}px)`;
        } else {
          csToc.style.transform = '';
        }
      }
    };

    let tocRafPending = false;
    const scheduleTocUpdate = () => {
      if (tocRafPending) return;
      tocRafPending = true;
      requestAnimationFrame(() => {
        tocRafPending = false;
        updateTocState();
      });
    };

    window.addEventListener('scroll', scheduleTocUpdate, { passive: true });
    window.addEventListener('resize', scheduleTocUpdate, { passive: true });
    window.addEventListener('load', updateTocState);
    window.addEventListener('hashchange', updateTocState);
    updateTocState();

    tocSections.forEach(({ link, target }) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        target.scrollIntoView({
          behavior: isReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    });
  }

  // 15. Footer Back to Top
  document.querySelectorAll('.footer-back-top').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: isReducedMotion ? 'auto' : 'smooth',
      });
    });
  });

  // 16. Homepage Hero Portrait Video (Whole-hero hover trigger on desktop, auto-play once on touch load)
  const heroSection = document.getElementById('heroSection') || document.querySelector('.hero-section');
  const heroTurnVideo = document.getElementById('heroTurnVideo');

  if (heroSection && heroTurnVideo && window.matchMedia) {
    const hoverCapableQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    let isPointerInsideHero = false;
    let hasStartedHoverPlay = false;
    let touchPlayedOnce = false;
    let isHeroVisible = false;
    let rewindRafId = null;

    const cancelRewind = () => {
      if (rewindRafId !== null) {
        cancelAnimationFrame(rewindRafId);
        rewindRafId = null;
      }
    };

    const rewindToStartSmoothly = () => {
      cancelRewind();
      heroTurnVideo.pause();
      if (reducedMotionQuery.matches || heroTurnVideo.readyState < 1 || heroTurnVideo.currentTime <= 0.02) {
        try { heroTurnVideo.currentTime = 0; } catch (err) {}
        return;
      }

      const startTime = heroTurnVideo.currentTime;
      const durationMs = Math.max(220, Math.min(600, startTime * 180));
      let startedAt = null;

      const stepRewind = (timestamp) => {
        if (reducedMotionQuery.matches) {
          cancelRewind();
          try { heroTurnVideo.currentTime = 0; } catch (err) {}
          return;
        }
        if (startedAt === null) startedAt = timestamp;
        const t = Math.min(1, (timestamp - startedAt) / durationMs);
        // Ease-out quad
        const eased = 1 - Math.pow(1 - t, 2);
        const nextVideoTime = Math.max(0, startTime * (1 - eased));
        if (!heroTurnVideo.seeking) {
          try { heroTurnVideo.currentTime = nextVideoTime; } catch (err) {}
        }
        if (t < 1) {
          rewindRafId = requestAnimationFrame(stepRewind);
        } else {
          try { heroTurnVideo.currentTime = 0; } catch (err) {}
          rewindRafId = null;
        }
      };

      rewindRafId = requestAnimationFrame(stepRewind);
    };

    const playVideoOnce = () => {
      if (reducedMotionQuery.matches || heroTurnVideo.readyState < 2) return;
      cancelRewind();
      try { heroTurnVideo.currentTime = 0; } catch (err) {}
      const playPromise = heroTurnVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    const maybeTriggerTouchPlayback = () => {
      if (reducedMotionQuery.matches || hoverCapableQuery.matches || touchPlayedOnce) return;
      if (!isHeroVisible || heroTurnVideo.readyState < 2) return;
      touchPlayedOnce = true;
      playVideoOnce();
    };

    const onVideoReady = () => {
      heroTurnVideo.pause();
      if (reducedMotionQuery.matches) {
        heroTurnVideo.classList.remove('is-ready');
        return;
      }
      heroTurnVideo.classList.add('is-ready');
      if (hoverCapableQuery.matches) {
        if ((isPointerInsideHero || heroSection.matches(':hover')) && !hasStartedHoverPlay) {
          isPointerInsideHero = true;
          hasStartedHoverPlay = true;
          playVideoOnce();
        }
      } else {
        maybeTriggerTouchPlayback();
      }
    };

    heroTurnVideo.pause();
    heroTurnVideo.addEventListener('error', () => {
      heroTurnVideo.classList.remove('is-ready');
    });

    if (heroTurnVideo.readyState >= 2) {
      onVideoReady();
    } else {
      heroTurnVideo.addEventListener('loadeddata', onVideoReady, { once: true });
      heroTurnVideo.addEventListener('canplay', onVideoReady, { once: true });
    }

    heroTurnVideo.addEventListener('ended', () => {
      // On touch devices, stay on the first frame after playing once automatically
      if (!hoverCapableQuery.matches) {
        rewindToStartSmoothly();
      }
    });

    heroSection.addEventListener('mouseenter', () => {
      if (reducedMotionQuery.matches || !hoverCapableQuery.matches) return;
      isPointerInsideHero = true;
      if (hasStartedHoverPlay) return;
      hasStartedHoverPlay = true;
      playVideoOnce();
    });

    heroSection.addEventListener('mouseleave', () => {
      if (!hoverCapableQuery.matches) return;
      isPointerInsideHero = false;
      hasStartedHoverPlay = false;
      rewindToStartSmoothly();
    });

    if ('IntersectionObserver' in window) {
      const heroVisibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isHeroVisible = true;
              maybeTriggerTouchPlayback();
            }
          });
        },
        { threshold: 0.2 }
      );
      heroVisibilityObserver.observe(heroSection);
    } else {
      isHeroVisible = true;
      maybeTriggerTouchPlayback();
    }

    const handleVideoMotionChange = () => {
      if (reducedMotionQuery.matches) {
        cancelRewind();
        heroTurnVideo.pause();
        try { heroTurnVideo.currentTime = 0; } catch (err) {}
        heroTurnVideo.classList.remove('is-ready');
      } else if (heroTurnVideo.readyState >= 2) {
        heroTurnVideo.classList.add('is-ready');
      }
    };

    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', handleVideoMotionChange);
    }
  }

  // 17. Homepage Hero Auto-Rotating 3-Step Subtext (cycles every 3.5s, pauses on line hover)
  const heroSubtitleStage = document.getElementById('heroSubtitleStage');
  const heroStepLines = document.querySelectorAll('#heroSubtitleStage .hero-step-line');
  const heroStepBars = document.querySelectorAll('#heroStepProgress .hero-step-bar');

  if (heroSubtitleStage && heroStepLines.length > 0) {
    let activeStep = 0;
    let cycleTimer = null;
    let isHovered = false;

    const showStep = (nextIndex, animate = true) => {
      if (nextIndex === activeStep) return;
      const prevLine = heroStepLines[activeStep];
      const nextLine = heroStepLines[nextIndex];
      activeStep = nextIndex;

      if (prevLine) {
        prevLine.classList.remove('is-active');
        if (animate) {
          prevLine.classList.add('is-exiting');
        } else {
          prevLine.classList.remove('is-exiting');
        }
        prevLine.setAttribute('aria-hidden', 'true');
      }

      if (nextLine) {
        if (animate) {
          nextLine.classList.add('is-no-transition');
          nextLine.classList.remove('is-active', 'is-exiting');
          void nextLine.offsetWidth;
          nextLine.classList.remove('is-no-transition');
          nextLine.classList.add('is-active');
        } else {
          nextLine.classList.remove('is-exiting', 'is-no-transition');
          nextLine.classList.add('is-active');
        }
        nextLine.removeAttribute('aria-hidden');
      }

      heroStepBars.forEach((bar, idx) => {
        bar.classList.toggle('is-active', idx === activeStep);
      });
    };

    const stopCycling = () => {
      if (cycleTimer !== null) {
        window.clearInterval(cycleTimer);
        cycleTimer = null;
      }
    };

    const startCycling = () => {
      stopCycling();
      if (reducedMotionQuery.matches || isHovered || heroStepLines.length <= 1) return;
      cycleTimer = window.setInterval(() => {
        const nextIndex = (activeStep + 1) % heroStepLines.length;
        showStep(nextIndex, true);
      }, 3500);
    };

    heroSubtitleStage.addEventListener('mouseenter', () => {
      isHovered = true;
      stopCycling();
    });

    heroSubtitleStage.addEventListener('mouseleave', () => {
      isHovered = false;
      startCycling();
    });

    const handleCycleMotionChange = () => {
      if (reducedMotionQuery.matches) {
        stopCycling();
        showStep(0, false);
      } else {
        startCycling();
      }
    };

    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', handleCycleMotionChange);
    }

    if (reducedMotionQuery.matches) {
      showStep(0, false);
    } else {
      startCycling();
    }
  }

  // 18. Homepage Hero Interactive Pixel-Grid Canvas
  const heroPixelCanvas = document.getElementById('heroPixelCanvas');
  if (heroSection && heroPixelCanvas && window.matchMedia) {
    const hoverCapableQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const ctx = heroPixelCanvas.getContext('2d');

    if (ctx) {
      const SQUARE_SIZE = 8;
      const GAP = 3;
      const PITCH = SQUARE_SIZE + GAP;
      const HOVER_RADIUS = 75;
      const FADE_DURATION = 1500;
      const MAX_LIGHT_GLOW_ALPHA = 0.45;
      const MAX_DARK_GLOW_ALPHA = 0.55;

      const LIGHT_GREENS = [
        '46, 125, 79',   // #2e7d4f
        '39, 114, 70',
        '56, 138, 90',
        '32, 102, 60'
      ];
      const DARK_GREENS = [
        '95, 191, 136',  // #5fbf88
        '109, 202, 148',
        '85, 180, 126',
        '122, 210, 158'
      ];

      let width = 0;
      let height = 0;
      let cols = 0;
      let rows = 0;
      let offsetX = 0;
      let offsetY = 6;
      let dpr = 1;
      let rafId = null;
      let isHeroInViewport = true;
      let lastPointerX = null;
      let lastPointerY = null;
      let lastSpawnTime = 0;
      const activeCells = new Map();

      const isEnabled = () => hoverCapableQuery.matches && !reducedMotionQuery.matches;

      const clearCanvas = () => {
        if (!width || !height) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
      };

      const stopAnimation = () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      };

      const resizeCanvas = () => {
        const rect = heroSection.getBoundingClientRect();
        width = Math.max(0, Math.floor(rect.width));
        height = Math.max(0, Math.floor(rect.height));
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        heroPixelCanvas.width = Math.floor(width * dpr);
        heroPixelCanvas.height = Math.floor(height * dpr);

        cols = Math.ceil(width / PITCH) + 1;
        rows = Math.ceil(height / PITCH) + 1;
        const totalGridW = cols * PITCH - GAP;
        offsetX = Math.floor((width - totalGridW) / 2);
        offsetY = 6;
      };

      const drawFrame = (now) => {
        if (!isEnabled() || !width || !height) {
          stopAnimation();
          clearCanvas();
          return;
        }

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const palette = isDark ? DARK_GREENS : LIGHT_GREENS;

        // Resting faint grid (~2.5-2.8% opacity)
        ctx.fillStyle = isDark ? 'rgba(237, 234, 228, 0.028)' : 'rgba(20, 20, 20, 0.025)';
        for (let r = 0; r < rows; r++) {
          const y = offsetY + r * PITCH;
          if (y > height || y + SQUARE_SIZE < 0) continue;
          for (let c = 0; c < cols; c++) {
            const x = offsetX + c * PITCH;
            if (x > width || x + SQUARE_SIZE < 0) continue;
            ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
          }
        }

        // Lit squares fading smoothly over 1.5s
        activeCells.forEach((cell, key) => {
          const elapsed = now - cell.bornAt;
          if (elapsed >= FADE_DURATION) {
            activeCells.delete(key);
            return;
          }
          const progress = Math.max(0, elapsed / FADE_DURATION);
          const fade = Math.pow(1 - progress, 1.35);
          const alpha = cell.peakAlpha * fade;
          if (alpha <= 0.004) {
            activeCells.delete(key);
            return;
          }
          const x = offsetX + cell.col * PITCH;
          const y = offsetY + cell.row * PITCH;
          ctx.fillStyle = `rgba(${palette[cell.colorIdx]}, ${alpha.toFixed(3)})`;
          ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
        });
      };

      const startLoop = () => {
        if (rafId !== null || !isEnabled() || !isHeroInViewport) return;
        const tick = (now) => {
          if (!isEnabled() || !isHeroInViewport) {
            stopAnimation();
            return;
          }
          drawFrame(now);
          if (activeCells.size > 0) {
            rafId = requestAnimationFrame(tick);
          } else {
            rafId = null;
          }
        };
        rafId = requestAnimationFrame(tick);
      };

      const renderStaticRestingGrid = () => {
        if (!isEnabled()) {
          stopAnimation();
          activeCells.clear();
          clearCanvas();
          return;
        }
        drawFrame(performance.now());
      };

      const lightSquaresNearCursor = (clientX, clientY) => {
        if (!isEnabled() || !isHeroInViewport) return;
        const rect = heroSection.getBoundingClientRect();
        const mx = clientX - rect.left;
        const my = clientY - rect.top;

        const now = performance.now();
        if (lastPointerX !== null && lastPointerY !== null) {
          const distMove = Math.hypot(mx - lastPointerX, my - lastPointerY);
          if (distMove < 10 && now - lastSpawnTime < 45) {
            return;
          }
        }
        lastPointerX = mx;
        lastPointerY = my;
        lastSpawnTime = now;

        const minCol = Math.max(0, Math.floor((mx - HOVER_RADIUS - offsetX) / PITCH));
        const maxCol = Math.min(cols - 1, Math.ceil((mx + HOVER_RADIUS - offsetX) / PITCH));
        const minRow = Math.max(0, Math.floor((my - HOVER_RADIUS - offsetY) / PITCH));
        const maxRow = Math.min(rows - 1, Math.ceil((my + HOVER_RADIUS - offsetY) / PITCH));

        const candidates = [];
        for (let r = minRow; r <= maxRow; r++) {
          const cy = offsetY + r * PITCH + SQUARE_SIZE * 0.5;
          for (let c = minCol; c <= maxCol; c++) {
            const cx = offsetX + c * PITCH + SQUARE_SIZE * 0.5;
            const dist = Math.hypot(cx - mx, cy - my);
            if (dist <= HOVER_RADIUS) {
              candidates.push({ col: c, row: r, dist });
            }
          }
        }

        if (candidates.length === 0) return;

        // Calmly ignite 2-3 squares within 75px, favoring closer squares
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const maxAlpha = isDark ? MAX_DARK_GLOW_ALPHA : MAX_LIGHT_GLOW_ALPHA;
        const baseAlpha = isDark ? 0.24 : 0.20;
        const rangeAlpha = maxAlpha - baseAlpha;
        const count = Math.min(candidates.length, Math.random() < 0.45 ? 3 : 2);
        for (let i = 0; i < count; i++) {
          const a = candidates[Math.floor(Math.random() * candidates.length)];
          const b = candidates[Math.floor(Math.random() * candidates.length)];
          const pick = a.dist <= b.dist ? a : b;

          const proximity = Math.max(0, 1 - pick.dist / HOVER_RADIUS);
          const targetPeak = Math.min(
            maxAlpha,
            baseAlpha + rangeAlpha * Math.pow(proximity, 0.8) * (0.78 + 0.22 * Math.random())
          );

          const key = `${pick.col},${pick.row}`;
          const existing = activeCells.get(key);
          if (existing) {
            const existingAlpha = existing.peakAlpha * Math.pow(Math.max(0, 1 - (now - existing.bornAt) / FADE_DURATION), 1.35);
            existing.peakAlpha = Math.max(existingAlpha, targetPeak);
            existing.bornAt = now;
          } else {
            activeCells.set(key, {
              col: pick.col,
              row: pick.row,
              colorIdx: Math.floor(Math.random() * 4),
              peakAlpha: targetPeak,
              bornAt: now
            });
          }
        }

        startLoop();
      };

      const handleHeroPointerMove = (e) => {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        lightSquaresNearCursor(e.clientX, e.clientY);
      };

      heroSection.addEventListener('mousemove', handleHeroPointerMove, { passive: true });
      heroSection.addEventListener('mouseleave', () => {
        lastPointerX = null;
        lastPointerY = null;
      });

      if ('IntersectionObserver' in window) {
        const heroCanvasObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isHeroInViewport = entry.isIntersecting;
              if (!isHeroInViewport) {
                stopAnimation();
              } else if (activeCells.size > 0) {
                startLoop();
              } else {
                renderStaticRestingGrid();
              }
            });
          },
          { threshold: 0 }
        );
        heroCanvasObserver.observe(heroSection);
      }

      const handleResize = () => {
        resizeCanvas();
        if (activeCells.size > 0 && isHeroInViewport && isEnabled()) {
          drawFrame(performance.now());
        } else {
          renderStaticRestingGrid();
        }
      };

      if ('ResizeObserver' in window) {
        const heroResizeObserver = new ResizeObserver(handleResize);
        heroResizeObserver.observe(heroSection);
      } else {
        window.addEventListener('resize', handleResize, { passive: true });
      }

      if ('MutationObserver' in window) {
        const themeObserver = new MutationObserver(() => {
          if (!isHeroInViewport) return;
          if (activeCells.size > 0) {
            drawFrame(performance.now());
          } else {
            renderStaticRestingGrid();
          }
        });
        themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-theme']
        });
      }

      const handleEnvironmentChange = () => {
        resizeCanvas();
        renderStaticRestingGrid();
      };

      if (reducedMotionQuery.addEventListener) {
        reducedMotionQuery.addEventListener('change', handleEnvironmentChange);
      }
      if (hoverCapableQuery.addEventListener) {
        hoverCapableQuery.addEventListener('change', handleEnvironmentChange);
      }

      resizeCanvas();
      renderStaticRestingGrid();
    }
  }
});



