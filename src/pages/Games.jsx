import React, { useState } from 'react';
import { useGames } from '../hooks/useGames';
import { getEmbedUrl, getWatchUrl } from '../utils/youtube';
import { Play } from 'lucide-react';
import { COLORS, SPACING, BORDER_RADIUS, FONT, GRADIENTS } from '../styles';

const isValidUrl = (url) => url && url.trim() !== '' && url.trim() !== '#';

const Games = () => {
  const [filter, setFilter] = useState('All');
  const { games, loading, error } = useGames();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg,
      }}>
        <div style={{
          fontFamily: FONT.body,
          color: COLORS.muted,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontSize: '0.85rem',
          fontWeight: 600,
        }}>
          Loading games...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.error,
      }}>
        Error loading games.
      </div>
    );
  }

  const filteredGames = filter === 'All' 
    ? games 
    : filter === 'Released' || filter === 'Coming Soon'
      ? games.filter(g => g.status === filter)
      : games.filter(g => g.category === filter.toLowerCase());

  return (
    <div style={{ padding: `${SPACING.xxxl} ${SPACING.lg}`, backgroundColor: COLORS.bg, minHeight: '100vh' }}>
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
            Our Portfolio
          </span>
        </div>

        <h1 style={{
          fontFamily: FONT.display,
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          color: COLORS.white,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          margin: 0,
          marginBottom: SPACING.md,
          lineHeight: '0.95',
        }}>
          Our Games
        </h1>

        <p style={{
          fontFamily: FONT.body,
          color: COLORS.secondary,
          maxWidth: '600px',
          fontSize: '1.05rem',
          lineHeight: 1.7,
          margin: 0,
          marginBottom: SPACING.xl,
          fontWeight: 500,
        }}>
          Explore our collection of immersive worlds and unforgettable experiences.
        </p>

        {/* Filter pills — NO border by default */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: SPACING.xl,
          flexWrap: 'wrap',
        }}>
          {['All', 'Previous', 'Upcoming', 'Released', 'Coming Soon'].map(status => {
            const isActive = filter === status;
            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  padding: '0.65rem 1.5rem',
                  background: isActive ? GRADIENTS.primary : 'transparent',
                  color: isActive ? COLORS.white : COLORS.muted,
                  border: 'none',
                  borderRadius: BORDER_RADIUS.pill,
                  cursor: 'pointer',
                  fontFamily: FONT.body,
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 16px rgba(225, 6, 0, 0.4)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = COLORS.white;
                    e.currentTarget.style.background = 'rgba(225, 6, 0, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = COLORS.muted;
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Games grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: SPACING.lg,
        }}
        className="games-grid"
        >
          {filteredGames.map((game) => {
            const embedUrl = getEmbedUrl(game.trailerUrl);
            const watchUrl = getWatchUrl(game.trailerUrl);
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
                        href={watchUrl}
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

        {filteredGames.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: COLORS.muted,
            marginTop: SPACING.xl,
            fontFamily: FONT.body,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}>
            No games found for this category.
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .games-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Games;
