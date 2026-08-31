const fs = require('fs');

// 1. UPDATE STYLE.CSS
const stylePath = 'c:/WPZ/css/style.css';
let styleContent = fs.readFileSync(stylePath, 'utf8');

// Fix global p selector so it doesn't force text-justify on centered subtitles
styleContent = styleContent.replace(
    /p\s*\{\s*text-align:\s*justify;\s*text-justify:\s*inter-word;\s*\}/g,
    `p.text-justify, .bio-p, .article-p {
    text-align: justify;
    text-justify: inter-word;
}`
);

// Add/update Wave Marquee keyframes and track classes in style.css
const waveCss = `
/* ------------------------------------------------------------- */
/* SINE-WAVE FLOATING SKILL MARQUEE                              */
/* ------------------------------------------------------------- */
.skill-marquee-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 22px 0;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}

.skill-marquee-track {
    display: flex;
    width: max-content;
    gap: 18px;
    will-change: transform;
}

.skill-marquee-container:hover .skill-marquee-track {
    animation-play-state: paused !important;
}

.skill-marquee-track-wave-1 {
    animation: marqueeWave1 30s ease-in-out infinite;
}

.skill-marquee-track-wave-2 {
    animation: marqueeWave2 28s ease-in-out infinite;
}

@keyframes marqueeWave1 {
    0% {
        transform: translate3d(0, 0px, 0) rotate(0deg);
    }
    20% {
        transform: translate3d(-10%, -14px, 0) rotate(-1.5deg);
    }
    40% {
        transform: translate3d(-20%, 6px, 0) rotate(1deg);
    }
    60% {
        transform: translate3d(-30%, -12px, 0) rotate(-1.2deg);
    }
    80% {
        transform: translate3d(-40%, 10px, 0) rotate(1.4deg);
    }
    100% {
        transform: translate3d(-50%, 0px, 0) rotate(0deg);
    }
}

@keyframes marqueeWave2 {
    0% {
        transform: translate3d(-50%, 0px, 0) rotate(0deg);
    }
    20% {
        transform: translate3d(-40%, 14px, 0) rotate(1.5deg);
    }
    40% {
        transform: translate3d(-30%, -6px, 0) rotate(-1deg);
    }
    60% {
        transform: translate3d(-20%, 12px, 0) rotate(1.2deg);
    }
    80% {
        transform: translate3d(-10%, -10px, 0) rotate(-1.4deg);
    }
    100% {
        transform: translate3d(0, 0px, 0) rotate(0deg);
    }
}

.skill-chip-modern {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 13px 22px;
    background: rgba(15, 23, 42, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 22px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.skill-chip-modern:hover {
    border-color: rgba(6, 182, 212, 0.5);
    background: rgba(15, 23, 42, 0.95);
    box-shadow: 0 14px 35px -5px rgba(6, 182, 212, 0.35);
    transform: translateY(-5px) scale(1.05);
}

.skill-chip-modern i {
    font-size: 24px;
    transition: transform 0.3s ease;
}

.skill-chip-modern:hover i {
    transform: scale(1.2) rotate(6deg);
}
`;

// Replace marquee section in style.css
const marqueeStart = styleContent.indexOf('/* INFINITE MARQUEE SKILL CAROUSEL');
const projModalStart = styleContent.indexOf('/* PROJECT DETAIL MODAL');

if (marqueeStart !== -1 && projModalStart !== -1) {
    const beforeMarquee = styleContent.slice(0, marqueeStart);
    const afterMarquee = styleContent.slice(projModalStart);
    styleContent = beforeMarquee + waveCss.trim() + '\n\n/* ------------------------------------------------------------- */\n' + afterMarquee;
}

fs.writeFileSync(stylePath, styleContent);
console.log('STYLE.CSS UPDATED WITH WAVE ANIMATION AND TEXT-ALIGN FIX');
