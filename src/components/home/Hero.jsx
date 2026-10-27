import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useFirestoreContent } from '../../hooks/useFirestoreContent';
import { DEFAULT_CONTENT } from '../../utils/defaultContent';
import { COLORS, SPACING, BORDER_RADIUS, FONT } from '../../styles';

const isDirectVideoUrl = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
};

const getYouTubeEmbed = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?rel=0&autoplay=1&loop=1&mute=1&playlist=${match[2]}` : null;
};

const Hero = ({ content: propContent }) => {
  const { content: hookContent } = useFirestoreContent();
  const content = propContent || hookContent || DEFAULT_CONTENT;
  const rawHero = content?.hero || DEFAULT_CONTENT.hero;
  const heroBg = (rawHero?.backgroundImageUrl && !rawHero.backgroundImageUrl.includes('placeholder')) 
    ? rawHero.backgroundImageUrl 
    : DEFAULT_CONTENT.hero.backgroundImageUrl;
  const hero = { ...rawHero, backgroundImageUrl: heroBg };

  const videoUrl = hero.videoBackgroundUrl || '';
  const isDirect = isDirectVideoUrl(videoUrl);
  const videoEmbedUrl = !isDirect ? getYouTubeEmbed(videoUrl) : null;

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}>
        {isDirect ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : videoEmbedUrl ? (
          <iframe
            src={videoEmbedUrl}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              border: 'none',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Hero Background"
          />
        ) : hero.backgroundImageUrl ? (
          <img
            src={hero.backgroundImageUrl}
            alt=""
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : null}
        {/* Blend overlay — dark gradient to blend image/video with studio vibe */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.78) 45%, rgba(10,10,10,0.55) 100%)`,
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 30% 20%, rgba(225, 6, 0, 0.10) 0%, transparent 55%)`,
          zIndex: 2,
        }} />
      </div>

      {/* Grain overlay */}
      <div className="grain" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: `${SPACING.xxxl} ${SPACING.lg}`,
        paddingLeft: 'clamp(0px, 4vw, 2rem)',
      }}>
        <div style={{
          fontFamily: FONT.body,
          fontSize: '0.85rem',
          color: COLORS.primary,
          fontWeight: 700,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: SPACING.lg,
        }}>
          <span style={{
            display: 'inline-block',
            width: '40px',
            height: '2px',
            background: COLORS.primary,
            verticalAlign: 'middle',
            marginRight: '12px',
          }} />
          Indie Game Studio
        </div>

        <h1 style={{
          fontFamily: FONT.display,
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          color: COLORS.white,
          marginBottom: SPACING.lg,
          fontWeight: 800,
          letterSpacing: '2px',
          lineHeight: '0.95',
          maxWidth: '900px',
          textTransform: 'uppercase',
        }}>
          {hero.headline}
        </h1>

        <p style={{
          fontFamily: FONT.body,
          fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
          color: COLORS.secondary,
          marginBottom: SPACING.xl,
          maxWidth: '580px',
          lineHeight: 1.7,
          fontWeight: 500,
        }}>
          {hero.subheadline}
        </p>

        <div style={{ display: 'flex', gap: SPACING.md, flexWrap: 'wrap' }}>
          <Link
            to="/games"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: COLORS.primary,
              color: COLORS.white,
              padding: '1rem 2rem',
              fontSize: '0.95rem',
              fontFamily: FONT.body,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              borderRadius: BORDER_RADIUS.sm,
              textDecoration: 'none',
              transition: 'background 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease',
              boxShadow: '0 0 20px rgba(225, 6, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.primaryHover;
              e.currentTarget.style.boxShadow = '0 0 32px rgba(225, 6, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.primary;
              e.currentTarget.style.boxShadow = '0 0 20px rgba(225, 6, 0, 0.3)';
            }}
          >
            Explore Games <ChevronRight size={16} />
          </Link>

          <Link
            to="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'transparent',
              color: COLORS.white,
              padding: '1rem 2rem',
              fontSize: '0.95rem',
              fontFamily: FONT.body,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              borderRadius: BORDER_RADIUS.sm,
              border: `1px solid ${COLORS.inputBorder}`,
              textDecoration: 'none',
              transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.primary;
              e.currentTarget.style.color = COLORS.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.inputBorder;
              e.currentTarget.style.color = COLORS.white;
            }}
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;