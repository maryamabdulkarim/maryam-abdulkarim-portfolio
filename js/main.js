/**
 * Maryam Abdulkarim — Portfolio Interactive Engine
 * Pure vanilla JavaScript (no heavy libraries) for speed and responsiveness
 */

import './analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Page Fade Transition
  const overlay = document.querySelector('.page-fade-overlay');
  if (overlay) {
    requestAnimationFrame(() => {
      overlay.classList.add('loaded');
    });
  }

  // Intercept local page links for smooth page exit transition
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const isAnchor = href.startsWith('#');
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank';
    
    if (!isAnchor && !isExternal && !isReducedMotion) {
      link.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey) return;
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

  // 2. Custom Cursor (Desktop Only)
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (!isTouchDevice && !isReducedMotion && cursorDot && cursorRing) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hasMoved = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
      }
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(updateRing);
    };
    requestAnimationFrame(updateRing);

    // Expand cursor over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .gallery-item, input, textarea');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-active'));
    });
  }

  // 3. Navigation Scroll Styling
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
      mobileToggle.textContent = isOpen ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.textContent = '☰';
      });
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
    updateProgress();
  }

  // 6. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  if (revealElements.length > 0) {
    if (isReducedMotion) {
      revealElements.forEach((el) => el.classList.add('visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealElements.forEach((el) => observer.observe(el));
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
});


