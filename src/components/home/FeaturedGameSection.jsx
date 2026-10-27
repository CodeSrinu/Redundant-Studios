import React from 'react';
import { useGames } from '../../hooks/useGames';
import { ChevronRight, ExternalLink, Play } from 'lucide-react';
import { COLORS, SPACING, BORDER_RADIUS, FONT, GRADIENTS, SHADOW } from '../../styles';
import { getEmbedUrl, getWatchUrl } from '../../utils/youtube';

const isValidUrl = (url) => url && url.trim() !== '' && url.trim() !== '#';

const FeaturedGameSection = () => {
  const { games, loading } = useGames();

  if (loading) return null;

  const featuredGames = games.filter(g => g.featured === true).sort((a, b) => (a.order || 0) - (b.order || 0));

  if (featuredGames.length === 0) return null;

  return (
    <section style={{
      padding: `${SPACING.xxxl} ${SPACING.lg}`,
      backgroundColor: COLORS.bg,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {featuredGames.length > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: SPACING.xl,
          }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              background: COLORS.primary,
              borderRadius: '50%',
              boxShadow: SHADOW.glow,
            }} />
          <span style={{
            fontFamily: FONT.body,
            fontSize: '0.85rem',
            color: COLORS.primary,
            fontWeight: 700,
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}>
            Latest Games
          </span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xl }}>
          {featuredGames.map((featuredGame) => {
            const embedUrl = getEmbedUrl(featuredGame.trailerUrl);
            const watchUrl = getWatchUrl(featuredGame.trailerUrl);
            const hasTrailer = isValidUrl(embedUrl);
            const hasPlaystore = isValidUrl(featuredGame.playstoreUrl);

            return (
              <div
                key={featuredGame.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 2fr',
                  gap: 0,
                  background: COLORS.surface,
                  borderRadius: BORDER_RADIUS.md,
                  overflow: 'hidden',
                  border: `1px solid ${COLORS.inputBorder}`,
                  transition: 'box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="featured-grid"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(225, 6, 0, 0.2), 0 0 0 1px rgba(225, 6, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Left: Video */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  backgroundColor: COLORS.bgElevated,
                  borderRight: `1px solid ${COLORS.inputBorder}`,
                }}
                className="featured-video"
                >
                  {embedUrl ? (
                    <iframe
                      style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        border: 'none',
                      }}
                      src={`${embedUrl}?rel=0&vq=hd1080`}
                      title={featuredGame.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : isValidUrl(featuredGame.thumbnailUrl) ? (
                    <img
                      src={featuredGame.thumbnailUrl}
                      alt={featuredGame.title}
                      loading="lazy"
                      style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: GRADIENTS.primarySoft,
                    }}>
                      <Play size={36} color={COLORS.primary} />
                      <span style={{
                        fontFamily: FONT.body,
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        color: COLORS.muted,
                        fontWeight: 600,
                      }}>Trailer Coming Soon</span>
                    </div>
                  )}
                </div>

                {/* Right: Content */}
                <div style={{
                  padding: SPACING.xl,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: SPACING.lg,
                }}
                className="featured-content"
                >
                  <div>
                    <div style={{
                      display: 'inline-block',
                      padding: '0.3rem 0.7rem',
                      background: 'rgba(225, 6, 0, 0.1)',
                      color: COLORS.primary,
                      fontFamily: FONT.body,
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      borderRadius: BORDER_RADIUS.sm,
                      marginBottom: SPACING.sm,
                    }}>
                      {featuredGame.status}
                    </div>
                    <h2 style={{
                      fontFamily: FONT.display,
                      fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                      color: COLORS.white,
                      margin: 0,
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      lineHeight: '1',
                      letterSpacing: '2px',
                      marginBottom: SPACING.sm,
                    }}>
                      {featuredGame.title}
                    </h2>
                    <div style={{
                      fontFamily: FONT.body,
                      fontSize: '0.75rem',
                      color: COLORS.muted,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      fontWeight: 600,
                      marginBottom: SPACING.md,
                    }}>
                      {featuredGame.genre} · {featuredGame.platform}
                    </div>
                    {featuredGame.description && (
                      <p style={{
                        fontFamily: FONT.body,
                        fontSize: '1rem',
                        color: COLORS.secondary,
                        lineHeight: '1.7',
                        margin: 0,
                        fontWeight: 500,
                      }}>
                        {featuredGame.description}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {hasTrailer && (
                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.95rem 1.5rem',
                          background: GRADIENTS.primary,
                          color: COLORS.white,
                          fontFamily: FONT.body,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '2px',
                          fontSize: '0.9rem',
                          borderRadius: BORDER_RADIUS.sm,
                          textDecoration: 'none',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: '0 0 20px rgba(225, 6, 0, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 0 32px rgba(225, 6, 0, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(225, 6, 0, 0.3)';
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                          <Play size={14} fill={COLORS.white} />
                          Watch Trailer
                        </span>
                        <ExternalLink size={14} />
                      </a>
                    )}

                    {hasPlaystore && (
                      <a
                        href={featuredGame.playstoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.95rem 1.5rem',
                          background: 'transparent',
                          color: COLORS.white,
                          fontFamily: FONT.body,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '2px',
                          fontSize: '0.9rem',
                          borderRadius: BORDER_RADIUS.sm,
                          border: `1px solid ${COLORS.inputBorder}`,
                          textDecoration: 'none',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
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
                        <span>Play Store</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
          .featured-video {
            border-right: none !important;
            border-bottom: 1px solid ${COLORS.inputBorder};
          }
          .featured-content {
            padding: ${SPACING.md} !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedGameSection;
