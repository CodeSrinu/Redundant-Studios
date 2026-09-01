import React from 'react';
import { useGames } from '../../hooks/useGames';
import { Link } from 'react-router-dom';
import { getEmbedUrl } from '../../utils/youtube';
import { Play, ChevronRight, ExternalLink } from 'lucide-react';
import { COLORS, SPACING, BORDER_RADIUS, FONT, GRADIENTS, SHADOW } from '../../styles';

const isValidUrl = (url) => url && url.trim() !== '' && url.trim() !== '#';

const FeaturedGames = () => {
  const { games, loading } = useGames();

  if (loading) return null;

  const latest = games.filter(g => !g.featured).slice(0, 1);
  const previousGames = games.filter(g => !g.featured).slice(1, 4);

  if (latest.length === 0 && previousGames.length === 0) return null;

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
            In Development
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
            Latest Game
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
            More Projects <ChevronRight size={14} />
          </Link>
        </div>

        {/* Latest Game — big featured card */}
        {latest.length > 0 && latest.map((game) => {
          const embedUrl = getEmbedUrl(game.trailerUrl);
          const hasTrailer = isValidUrl(embedUrl);
          const hasPlaystore = isValidUrl(game.playstoreUrl);
          const modes = game.modes ? game.modes.split(',').map(m => {
            const [name, desc] = m.split('|');
            return { name: name?.trim(), desc: desc?.trim() };
          }) : [];
          const tags = game.tags ? game.tags.split(',').map(t => t.trim()) : [];

          return (
            <div
              key={game.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr',
                gap: 0,
                background: COLORS.surface,
                borderRadius: BORDER_RADIUS.md,
                overflow: 'hidden',
                border: `1px solid ${COLORS.inputBorder}`,
                transition: 'border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="latest-card-grid"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 50px rgba(225, 6, 0, 0.2), 0 0 0 1px rgba(225, 6, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Left: YouTube trailer — 16:9 */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                overflow: 'hidden',
                backgroundColor: COLORS.bgElevated,
                borderRight: `1px solid ${COLORS.inputBorder}`,
              }}
              className="latest-card-video"
              >
                {embedUrl ? (
                  <iframe
                    src={`${embedUrl}?rel=0`}
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    color: COLORS.muted,
                  }}>
                    <Play size={40} color={COLORS.primary} />
                    <span style={{
                      fontFamily: FONT.body,
                      fontSize: '0.8rem',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}>Trailer Coming Soon</span>
                  </div>
                )}
              </div>

              {/* Right: Game content */}
              <div style={{
                padding: SPACING.xl,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: SPACING.lg,
              }}
              className="latest-card-content"
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
                    {game.status}
                  </div>
                  <h3 style={{
                    fontFamily: FONT.display,
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                    color: COLORS.white,
                    margin: 0,
                    fontWeight: 800,
                    letterSpacing: '2px',
                    lineHeight: '1',
                    textTransform: 'uppercase',
                    marginBottom: SPACING.sm,
                  }}>
                    {game.title}
                  </h3>
                  <div style={{
                    fontFamily: FONT.body,
                    fontSize: '0.75rem',
                    color: COLORS.muted,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 600,
                    marginBottom: SPACING.md,
                  }}>
                    {game.genre} · {game.platform}
                  </div>
                  {game.description && (
                    <p style={{
                      fontFamily: FONT.body,
                      fontSize: '0.95rem',
                      color: COLORS.secondary,
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 500,
                    }}>
                      {game.description}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {hasTrailer && (
                    <a
                      href={embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.95rem 1.4rem',
                        background: GRADIENTS.primary,
                        color: COLORS.white,
                        fontFamily: FONT.body,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.85rem',
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
                      href={game.playstoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.95rem 1.4rem',
                        background: 'transparent',
                        color: COLORS.white,
                        fontFamily: FONT.body,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.85rem',
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

        {/* Previous Games — 3-col grid below */}
        {previousGames.length > 0 && (
          <div style={{ marginTop: SPACING.xl }}>
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
                Previous Projects
              </span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: SPACING.lg,
            }}
            className="previous-grid"
            >
              {previousGames.map((game) => {
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
                          src={`${embedUrl}?rel=0`}
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
        )}

        <p style={{
          fontFamily: FONT.body,
          fontSize: '0.8rem',
          color: COLORS.muted,
          margin: SPACING.md + ' 0 0',
          fontWeight: 500,
          letterSpacing: '1px',
        }}>
          More projects coming soon. Follow us for updates.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .latest-card-grid {
            grid-template-columns: 1fr !important;
          }
          .latest-card-video {
            border-right: none !important;
            border-bottom: 1px solid ${COLORS.inputBorder};
          }
          .latest-card-content {
            padding: ${SPACING.md} !important;
          }
          .previous-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1100px) and (min-width: 901px) {
          .previous-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .latest-card-content {
            padding: ${SPACING.sm} !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedGames;