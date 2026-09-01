import React from 'react';
import { useGames } from '../../hooks/useGames';
import { ChevronRight, ExternalLink, Play } from 'lucide-react';
import { COLORS, SPACING, BORDER_RADIUS, FONT, GRADIENTS, SHADOW } from '../../styles';

const FeaturedGameSection = () => {
  const { games, loading } = useGames();

  if (loading) return null;

  const featuredGame = games.find(game => game.featured);

  if (!featuredGame) return null;

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const embedUrl = getEmbedUrl(featuredGame.trailerUrl);

  const modes = featuredGame.modes ? featuredGame.modes.split(',').map(m => {
    const [name, desc] = m.split('|');
    return { name: name?.trim(), desc: desc?.trim() };
  }) : [];

  const tags = featuredGame.tags ? featuredGame.tags.split(',').map(t => t.trim()) : [];
  const gameModes = modes.length > 0 ? `${modes.length} ${modes.length === 1 ? 'MODE' : 'MODES'}` : null;

  return (
    <section style={{
      padding: `${SPACING.xxxl} ${SPACING.lg}`,
      backgroundColor: COLORS.bg,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Featured label */}
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
            In Development
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: SPACING.xl,
          alignItems: 'start',
        }}
        className="featured-grid"
        >
          {/* Left: Video — 60% */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'hidden',
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.inputBorder}`,
            borderRadius: BORDER_RADIUS.md,
          }}>
            {embedUrl ? (
              <iframe
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                  border: 'none',
                }}
                src={`${embedUrl}?rel=0&vq=hd1080`}
                title="Featured Game Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
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

          {/* Right: Content — 40% */}
          <div>
            <h2 style={{
              fontFamily: FONT.display,
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: COLORS.white,
              margin: 0,
              textTransform: 'uppercase',
              fontWeight: 700,
              lineHeight: '1',
              letterSpacing: '2px',
              marginBottom: SPACING.md,
            }}>
              {featuredGame.title}
            </h2>

            {featuredGame.description && (
              <p style={{
                fontFamily: FONT.body,
                fontSize: '1rem',
                color: COLORS.secondary,
                lineHeight: '1.7',
                margin: 0,
                marginBottom: SPACING.md,
                fontWeight: 500,
              }}>
                {featuredGame.description}
              </p>
            )}

            {modes.length > 0 && (
              <p style={{
                fontFamily: FONT.body,
                fontSize: '0.95rem',
                color: COLORS.secondary,
                margin: 0,
                marginBottom: SPACING.md,
                fontWeight: 600,
              }}>
                This game consists of {modes.length} modes:
              </p>
            )}

            {modes.length > 0 && (
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                marginBottom: SPACING.lg,
              }}>
                {modes.map((mode, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    gap: '0.6rem',
                    alignItems: 'flex-start',
                  }}>
                    <Play size={14} color={COLORS.primary} fill={COLORS.primary} style={{ marginTop: '4px', flexShrink: 0 }} />
                    <div>
                      <strong style={{
                        color: COLORS.white,
                        fontFamily: FONT.body,
                        fontSize: '1rem',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: '0.2rem',
                      }}>{mode.name}</strong>
                      {mode.desc && (
                        <span style={{
                          color: COLORS.secondary,
                          fontSize: '0.9rem',
                          lineHeight: 1.5,
                          fontWeight: 500,
                        }}>{mode.desc}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Meta tags row */}
            {(tags.length > 0 || featuredGame.platform || gameModes) && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: SPACING.lg }}>
                {tags.map((tag, idx) => (
                  <span key={idx} style={{
                    padding: '0.35rem 0.8rem',
                    border: `1px solid ${COLORS.inputBorder}`,
                    color: COLORS.secondary,
                    fontFamily: FONT.body,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    borderRadius: BORDER_RADIUS.sm,
                  }}>
                    {tag}
                  </span>
                ))}
                {gameModes && (
                  <span style={{
                    padding: '0.35rem 0.8rem',
                    border: `1px solid ${COLORS.inputBorder}`,
                    color: COLORS.secondary,
                    fontFamily: FONT.body,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    borderRadius: BORDER_RADIUS.sm,
                  }}>
                    {gameModes}
                  </span>
                )}
                {featuredGame.platform && (
                  <span style={{
                    padding: '0.35rem 0.8rem',
                    border: `1px solid ${COLORS.inputBorder}`,
                    color: COLORS.secondary,
                    fontFamily: FONT.body,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    borderRadius: BORDER_RADIUS.sm,
                  }}>
                    {featuredGame.platform}
                  </span>
                )}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: SPACING.md }}>
              {embedUrl && (
                <button
                  onClick={() => window.open(embedUrl, '_blank')}
                  style={{
                    background: GRADIENTS.primary,
                    color: COLORS.white,
                    padding: '0.95rem 1.5rem',
                    fontSize: '0.9rem',
                    fontFamily: FONT.body,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    border: 'none',
                    borderRadius: BORDER_RADIUS.md,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    boxShadow: SHADOW.glow,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <span>Watch Trailer</span>
                  <ChevronRight size={16} />
                </button>
              )}

              {featuredGame.playstoreUrl && (
                <button
                  onClick={() => window.open(featuredGame.playstoreUrl, '_blank')}
                  style={{
                    background: 'transparent',
                    color: COLORS.white,
                    padding: '0.95rem 1.5rem',
                    fontSize: '0.9rem',
                    fontFamily: FONT.body,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    border: `1px solid ${COLORS.inputBorder}`,
                    borderRadius: BORDER_RADIUS.md,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
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
                  <span>Download Game</span>
                  <ExternalLink size={14} />
                </button>
              )}
            </div>

            {featuredGame.playstoreUrl && (
              <p style={{
                fontFamily: FONT.body,
                fontSize: '0.8rem',
                color: COLORS.muted,
                margin: 0,
                fontWeight: 500,
              }}>
                Available on Google Play.
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedGameSection;