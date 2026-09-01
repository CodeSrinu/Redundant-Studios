import React from 'react';
import { useGames } from '../../hooks/useGames';
import { Link } from 'react-router-dom';
import { getEmbedUrl } from '../../utils/youtube';
import { Play, ChevronRight } from 'lucide-react';
import { COLORS, SPACING, BORDER_RADIUS, FONT, GRADIENTS } from '../../styles';

const isValidUrl = (url) => url && url.trim() !== '' && url.trim() !== '#';

const PreviousGames = () => {
  const { games, loading } = useGames();

  if (loading) return null;

  const nonFeatured = games.filter(g => !g.featured).sort((a, b) => (a.order || 0) - (b.order || 0));

  if (nonFeatured.length === 0) return null;

  return (
    <section style={{
      padding: `${SPACING.xxxl} ${SPACING.lg}`,
      backgroundColor: COLORS.bg,
      borderTop: `1px solid ${COLORS.inputBorder}`,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: SPACING.md,
        }}>
          <span style={{
            display: 'inline-block',
            width: '40px',
            height: '2px',
            background: COLORS.primary,
          }} />
          <span style={{
            fontFamily: FONT.body,
            fontSize: '0.85rem',
            color: COLORS.primary,
            fontWeight: 700,
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}>
            Released
          </span>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: SPACING.xl,
          flexWrap: 'wrap',
          gap: SPACING.md,
        }}>
          <h2 style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            color: COLORS.white,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            margin: 0,
            lineHeight: '0.95',
          }}>
            Previous Projects
          </h2>
          <Link
            to="/games"
            style={{
              color: COLORS.primary,
              fontFamily: FONT.body,
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              textDecoration: 'none',
              letterSpacing: '2px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'opacity 0.5s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            View All <ChevronRight size={14} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: SPACING.lg,
        }}
        className="previous-games-grid"
        >
          {nonFeatured.map((game) => {
            const embedUrl = getEmbedUrl(game.trailerUrl);
            const hasTrailer = isValidUrl(embedUrl);
            const hasPlaystore = isValidUrl(game.playstoreUrl);
            return (
              <div
                key={game.id}
                style={{
                  background: COLORS.surface,
                  borderRadius: BORDER_RADIUS.md,
                  overflow: 'hidden',
                  border: `1px solid ${COLORS.inputBorder}`,
                  transition: 'box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(225, 6, 0, 0.2), 0 0 0 1px rgba(225, 6, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  backgroundColor: COLORS.bgElevated,
                }}>
                  {embedUrl ? (
                    <iframe
                      src={`${embedUrl}?rel=0&vq=hd1080`}
                      style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        border: 'none',
                      }}
                      title={game.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : isValidUrl(game.thumbnailUrl) ? (
                    <img
                      src={game.thumbnailUrl}
                      alt={game.title}
                      loading="lazy"
                      style={{
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
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      color: COLORS.muted,
                    }}>
                      <Play size={32} color={COLORS.primary} />
                      <span style={{
                        fontFamily: FONT.body,
                        fontSize: '0.75rem',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}>Coming Soon</span>
                    </div>
                  )}

                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    padding: '0.3rem 0.7rem',
                    background: 'rgba(10,10,10,0.85)',
                    color: COLORS.primary,
                    fontFamily: FONT.body,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    borderRadius: BORDER_RADIUS.sm,
                  }}>
                    {game.status}
                  </div>
                </div>

                <div style={{ padding: SPACING.md, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{
                    fontFamily: FONT.display,
                    fontSize: '1.3rem',
                    color: COLORS.white,
                    margin: 0,
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    marginBottom: '0.4rem',
                    lineHeight: '1.1',
                  }}>
                    {game.title}
                  </h3>
                  <div style={{
                    fontFamily: FONT.body,
                    fontSize: '0.8rem',
                    color: COLORS.muted,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 600,
                    marginBottom: SPACING.sm,
                  }}>
                    {game.genre} · {game.platform}
                  </div>
                  {game.description && (
                    <p style={{
                      fontFamily: FONT.body,
                      fontSize: '0.9rem',
                      color: COLORS.secondary,
                      lineHeight: 1.5,
                      margin: 0,
                      marginBottom: SPACING.md,
                      fontWeight: 500,
                      flex: 1,
                    }}>
                      {game.description.length > 120 ? game.description.substring(0, 120) + '...' : game.description}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {hasTrailer && (
                      <a
                        href={embedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.6rem 1rem',
                          background: GRADIENTS.primary,
                          color: COLORS.white,
                          fontFamily: FONT.body,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '2px',
                          fontSize: '0.7rem',
                          borderRadius: BORDER_RADIUS.sm,
                          textDecoration: 'none',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          flex: 1,
                          justifyContent: 'center',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(225, 6, 0, 0.4)'}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                      >
                        <Play size={12} fill={COLORS.white} />
                        Watch Trailer
                      </a>
                    )}
                    {hasPlaystore && (
                      <a
                        href={game.playstoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.6rem 1rem',
                          background: 'transparent',
                          color: COLORS.white,
                          fontFamily: FONT.body,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '2px',
                          fontSize: '0.7rem',
                          borderRadius: BORDER_RADIUS.sm,
                          border: `1px solid ${COLORS.inputBorder}`,
                          textDecoration: 'none',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          flex: 1,
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
                        Play Store
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
          .previous-games-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1100px) and (min-width: 901px) {
          .previous-games-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PreviousGames;