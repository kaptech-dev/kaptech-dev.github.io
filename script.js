// Project: Kaptech Portfolio | File: script.js | Description: Logika interaksi dan animasi untuk portofolio
// Initialize Animations
AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
});

// Scroll Header Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// --- PORTFOLIO DATA (Source of Truth) ---
// Tambahkan atau edit proyek di sini, maka index.html akan terupdate otomatis!
const PORTFOLIO_DATA = [
    {
        title: "Counter Tasbih Pro: Zikir App",
        category: "ANDROID",
        tags: ["Utility", "Zikir App"],
        description: "Digital Tasbih with premium interface, vibration feedback, and daily zikir tracking to enhance your spiritual journey.",
        link: "https://play.google.com/store/apps/details?id=com.kaptech.countertasbihdigital",
        linkText: "VIEW ON PLAYSTORE",
        colorClass: "bg-brand-primary",
        tagColor: "text-brand-light",
        image: "assets/android_icon_countertasbih.png",
        previewText: "Counter Tasbih Pro"
    },
        {
        title: "RiseSocial: Profil Booster",
        category: "ANDROID",
        tags: ["Productivity", "Social Tool"],
        description: "Optimize your social media presence with advanced profiling tools and engagement analytics built for growth.",
        link: "#",
        linkText: "VIEW ON PLAYSTORE",
        colorClass: "bg-brand-primary",
        tagColor: "text-brand-light",
        image: "assets/android_icon_risesocial.png",
        previewText: "RiseSocial Preview"
    },
    {
        title: "FB Web Auto Comment Bot",
        category: "EXTENTION",
        tags: ["Productivity", "CHROME"],
        description: "Facebook comment automation with multi-payload support and real-time logs.",
        link: "#",
        linkText: "PRIVATE USE (CHROME WEB STORE SOON)",
        colorClass: "bg-orange-500",
        tagColor: "text-orange-400",
        image: "assets/extention_icon_facebokkall.png",
        previewText: "Chrome Ext Preview"
    },
        {
        title: "YT Shorts Auto Comment ",
        category: "EXTENTION",
        tags: ["Productivity", "CHROME"],
        description: "Intelligent and silent YouTube Shorts comment automation to boost engagement for only your channel",
        link: "#",
        linkText: "PRIVATE USE (CHROME WEB STORE SOON)",
        colorClass: "bg-orange-500",
        tagColor: "text-orange-400",
        image: "assets/extention_icon_ytpersonal.png",
        previewText: "Chrome Ext Preview"
    },
         {
        title: "YT Shorts Pro Scroll & Comment",
        category: "EXTENTION",
        tags: ["Productivity", "CHROME"],
        description: "Boost engagement across multiple channels with intelligent and silent YouTube Shorts comment automation.",
        link: "#",
        linkText: "PRIVATE USE (CHROME WEB STORE SOON)",
        colorClass: "bg-orange-500",
        tagColor: "text-orange-400",
        image: "assets/extention_icon_ytall.png", 
        previewText: "Chrome Ext Preview"
    },
        {
        title: "TT Followers Export",
        category: "EXTENTION",
        tags: ["Productivity", "CHROME"],
        description: "Export Tiktok followers to CSV with real-time logging and human-like behavior simulation.",
        link: "#",
        linkText: "PRIVATE USE (CHROME WEB STORE SOON)",
        colorClass: "bg-orange-500",
        tagColor: "text-orange-400",
        image: "assets/extention_icon_exporttiktok.png",
        previewText: "Chrome Ext Preview"
    },
        {
        title: "IG Followers Export - Premium Scraper",
        category: "EXTENTION",
        tags: ["Productivity", "CHROME"],
        description: "Export Instagram followers to CSV with real-time logging and human-like behavior simulation.",
        link: "#",
        linkText: "PRIVATE USE (CHROME WEB STORE SOON)",
        colorClass: "bg-orange-500",
        tagColor: "text-orange-400",
        image: "assets/extention_icon_exportinstagram.png",
        previewText: "Chrome Ext Preview"
    },
        {
        title: "ea_BMAAutoEntryKaptech",
        category: "MQL5 EA",
        tags: ["Trading", "Expert Advisor"],
        description: "Optimized specifically for the XAUUSD (Gold) M1 timeframe, BMAAutoEntry is an advanced execution tool designed for precision scalping. It combines rapid entry logic with robust risk management to handle the high volatility of the gold market.",
        link: "#",
        linkText: "PRIVATE USE (MQL5 MARKET SOON)",
        colorClass: "bg-emerald-500",
        tagColor: "text-emerald-400",
        image: "assets/mql5_ea_BMAAutoEntryKaptech.jpg",
        previewText: "MT5 EA Preview"
    },
    {
        title: "ea_autoRunAgresifBuyLayer",
        category: "MQL5 EA",
        tags: ["Trading", "Expert Advisor"],
        description: "A specialized execution system engineered specifically for XAUUSD (Gold) on the M1 timeframe. This version is strictly optimized for Buy-Only strategies, allowing you to capitalize on bullish trends with lightning-fast entries and automated risk management.",
        link: "#",
        linkText: "PRIVATE USE (MQL5 MARKET SOON)",
        colorClass: "bg-emerald-500",
        tagColor: "text-emerald-400",
        image: "assets/mql5_ea_autoRunAgresifBuyLayer.jpg",
        previewText: "MT5 EA Preview"
    },
        {
        title: "ea_autoRunAgresifSellLayer",
        category: "MQL5 EA",
        tags: ["Trading", "Expert Advisor"],
        description: "An advanced execution tool specifically optimized for XAUUSD (Gold) on the M1 timeframe. This version is strictly engineered for Sell-Only strategies, allowing you to profit from downward trends with high-speed entries and automated risk management.",
        link: "#",
        linkText: "PRIVATE USE (MQL5 MARKET SOON)",
        colorClass: "bg-emerald-500",
        tagColor: "text-emerald-400",
        image: "assets/mql5_ea_autoRunAgresifSellLayer.jpg",
        previewText: "MT5 EA Preview"
    },
        {
        title: "UniversalSLTPManager",
        category: "MQL5 EA",
        tags: ["Trading", "Expert Advisor"],
        description: "PEnsure your trading account is never left unprotected. UniversalSLTPManager is a powerful utility designed to automatically scan and apply Stop Loss (SL) and Take Profit (TP) to every open position on your account—regardless of how the trade was opened.",
        link: "#",
        linkText: "COMMERCIAL USE (DOWNLOAD, MQL5 MARKET SOON )",
        colorClass: "bg-emerald-500",
        tagColor: "text-emerald-400",
        image: "assets/mql5_ea_UniversalSLTPManager.jpg",
        previewText: "MT5 EA Preview"
    },
        {
        title: "script_AutoCloseManager",
        category: "MQL5 SCRIPT",
        tags: ["Trading", "SCRIPT MT5"],
        description: "Take full control of your trading account with BMA Auto Close Manager. Designed to handle multiple order types simultaneously, this tool ensures your workspace stays clean and your risk is managed by automatically closing positions and deleting pending orders based on your specific profit or loss targets.",
        link: "#",
        linkText: "COMMERCIAL USE (DOWNLOAD, MQL5 MARKET SOON )",
        colorClass: "bg-emerald-500",
        tagColor: "text-emerald-400",
        image: "assets/mql5_script_AutoCloseManager.jpg",
        previewText: "MT5 SCRIPT Preview"
    }
    /* 
    TEMPLATE UNTUK TAMBAH PROYEK BARU:
        {
        title: "Nama Proyek",
        category: "KATEGORI",
        tags: ["Tag1", "Tag2"],
        description: "Deskripsi singkat proyek Anda.",
        link: "https://URL_TUJUAN",
        linkText: "TEKS TOMBOL",
        colorClass: "bg-brand-primary", // Pilihan: bg-orange-500, bg-emerald-500, dll
        tagColor: "text-brand-light", // Sesuaikan dengan colorClass
        image: "assets/nama_file.png", // Kosongkan jika belum ada gambar
        previewText: "Teks Pengganti Gambar"
    },
    */
];

// Dynamic Project Renderer
const renderProjects = () => {
    const grid = document.getElementById("project-grid");
    const counter = document.getElementById("project-counter");
    const dotsContainer = document.getElementById("slider-dots");
    
    if (!grid) return;

    // 1. Triple Cloning - Render data 3x untuk loop tanpa henti
    // Grup A (Awal) - Grup B (Konten Utama) - Grup C (Akhir)
    const tripleData = [...PORTFOLIO_DATA, ...PORTFOLIO_DATA, ...PORTFOLIO_DATA];
    
    grid.innerHTML = tripleData.map((project, index) => `
        <div class="group bg-white border border-ui-border rounded-3xl overflow-hidden hover:border-brand-primary transition-all duration-500 shadow-premium hover:shadow-premium-hover shrink-0 ${(index < PORTFOLIO_DATA.length || index >= PORTFOLIO_DATA.length * 2) ? 'cloned-item' : ''}" data-aos="fade-up" data-aos-delay="${(index % PORTFOLIO_DATA.length) * 100}">
            <div class="h-56 bg-white flex items-center justify-center p-10 relative">
                <div class="w-full h-full bg-white rounded-xl border border-ui-border flex items-center justify-center text-txt-main font-semibold text-sm group-hover:scale-105 transition-transform duration-500 text-center px-4 overflow-hidden">
                    ${project.image ? 
                        `<img src="${project.image}" alt="${project.title}" class="w-full h-full object-contain p-4">` : 
                        project.previewText
                    }
                </div>
                <div class="absolute top-4 right-4 ${project.colorClass} text-[10px] font-black px-3 py-1 rounded-full text-white shadow-sm">${project.category}</div>
            </div>
            <div class="p-8">
                <div class="flex gap-2 mb-4 text-[10px] font-bold tracking-widest uppercase ${project.tagColor}">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join(' • ')}
                </div>
                <h3 class="text-2xl font-bold text-txt-main mb-3">${project.title}</h3>
                <p class="text-txt-muted text-sm leading-relaxed mb-8">
                    ${project.description}
                </p>
                <div class="flex items-center justify-between">
                    <a href="${project.link}" class="text-txt-main font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all uppercase">
                        ${project.linkText} <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    `).join("");

    // 2. Render Navigation Dots (Hanya 4 dot sesuai data asli)
    if (dotsContainer) {
        dotsContainer.innerHTML = PORTFOLIO_DATA.map((_, i) => `
            <div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
        `).join("");
    }

    if (counter) {
        counter.textContent = `Showing ${PORTFOLIO_DATA.length} Projects`;
    }

    AOS.refresh();

    // Set posisi awal ke tengah (Grup B) setelah render
    setTimeout(() => {
        const cards = grid.querySelectorAll('.group');
        if (cards.length > 0) {
            const cardWidth = cards[0].offsetWidth + 32;
            grid.scrollLeft = PORTFOLIO_DATA.length * cardWidth;
            currentSlideIndex = PORTFOLIO_DATA.length;
        }
    }, 100);
};

// --- INTERACTION LOGIC ---

let autoScrollInterval;
let currentSlideIndex = 0;
let isJumping = false;

const startAutoScroll = () => {
    stopAutoScroll(); 
    autoScrollInterval = setInterval(() => {
        const grid = document.getElementById("project-grid");
        const wrapper = document.getElementById("project-slider-wrapper");
        
        if (!grid || !wrapper || !wrapper.classList.contains("slider-active") || isJumping) return;

        const cards = grid.querySelectorAll('.group');
        if (cards.length === 0) return;

        currentSlideIndex++;
        const cardWidth = cards[0].offsetWidth + 32;
        
        grid.scrollTo({
            left: currentSlideIndex * cardWidth,
            behavior: "smooth"
        });
    }, 3000);
};

const stopAutoScroll = () => {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
};

// Slider Navigation & Sync
const initSlider = () => {
    const grid = document.getElementById("project-grid");
    const dotsContainer = document.getElementById("slider-dots");
    const wrapper = document.getElementById("project-slider-wrapper");
    const expandTrigger = document.getElementById("expand-trigger");

    if (!grid || !dotsContainer) return;

    // Klik Dot - Arahkan ke set data di tengah (Grup B)
    dotsContainer.addEventListener("click", (e) => {
        const dot = e.target.closest(".dot");
        if (!dot) return;

        const index = parseInt(dot.dataset.index);
        const cards = grid.querySelectorAll('.group');
        
        if (cards.length > 0) {
            // Kita targetkan indeks di set tengah (PORTFOLIO_DATA.length + index)
            currentSlideIndex = PORTFOLIO_DATA.length + index;
            const cardWidth = cards[0].offsetWidth + 32;
            grid.scrollTo({
                left: currentSlideIndex * cardWidth,
                behavior: "smooth"
            });
            startAutoScroll();
        }
    });

    // Seamless Jump Logic pada Event Scroll
    grid.addEventListener("scroll", () => {
        if (!wrapper.classList.contains("slider-active") || isJumping) return;
        
        const scrollPos = grid.scrollLeft;
        const cards = grid.querySelectorAll('.group');
        if (cards.length === 0) return;
        
        // Gunakan getBoundingClientRect untuk presisi tinggi jika perlu, 
        // tapi offsetWidth + gap biasanya cukup jika konsisten.
        const cardWidth = cards[0].offsetWidth + 32;
        const totalItems = PORTFOLIO_DATA.length;
        const totalWidth = totalItems * cardWidth;
        
        // Logika Teleportasi (Zero Gap)
        // Jika sudah di Grup C (index 2N), lompat balik ke Grup B (index N)
        if (scrollPos >= totalWidth * 2) {
            isJumping = true;
            grid.classList.add('no-snap'); // Matikan snap sementara
            grid.scrollLeft = scrollPos - totalWidth;
            grid.classList.remove('no-snap');
            setTimeout(() => isJumping = false, 50);
        } 
        // Jika masuk ke Grup A (awal), lompat ke Grup B
        else if (scrollPos <= totalWidth * 0.5) {
            isJumping = true;
            grid.classList.add('no-snap');
            grid.scrollLeft = scrollPos + totalWidth;
            grid.classList.remove('no-snap');
            setTimeout(() => isJumping = false, 50);
        }

        // Update Dots Aktif (Modulo)
        const activeIndex = Math.round(grid.scrollLeft / cardWidth) % totalItems;
        const dots = dotsContainer.querySelectorAll(".dot");
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === activeIndex);
        });

        // Pastikan currentSlideIndex sinkron untuk auto-scroll berikutnya
        if (!isJumping) {
            currentSlideIndex = Math.round(grid.scrollLeft / cardWidth);
        }
    });

    grid.addEventListener("mouseenter", stopAutoScroll);
    grid.addEventListener("mouseleave", () => {
        if (wrapper.classList.contains("slider-active")) startAutoScroll();
    });

    if (expandTrigger) {
        expandTrigger.addEventListener("click", () => {
            const isSlider = wrapper.classList.contains("slider-active");
            const counterText = expandTrigger.querySelector('#project-counter');
            
            if (isSlider) {
                stopAutoScroll();
                wrapper.classList.remove("slider-active");
                wrapper.classList.add("grid-active");
                dotsContainer.classList.add("hidden-nav");
                if(counterText) counterText.textContent = "Collapse Grid View";
                expandTrigger.querySelector('svg').style.transform = "rotate(90deg)";
            } else {
                wrapper.classList.add("slider-active");
                wrapper.classList.remove("grid-active");
                dotsContainer.classList.remove("hidden-nav");
                if(counterText) counterText.textContent = `Showing ${PORTFOLIO_DATA.length} Projects`;
                expandTrigger.querySelector('svg').style.transform = "rotate(0deg)";
                
                // Reset ke tengah saat kembali ke slider
                const cards = grid.querySelectorAll('.group');
                const cardWidth = cards[0].offsetWidth + 32;
                grid.scrollLeft = PORTFOLIO_DATA.length * cardWidth;
                currentSlideIndex = PORTFOLIO_DATA.length;
                startAutoScroll();
            }
        });
    }

    startAutoScroll();
}

// Initialize on Load
window.addEventListener("DOMContentLoaded", () => {
    renderProjects();
    initSlider();
});
