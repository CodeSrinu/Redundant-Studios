import React from 'react';
import { Youtube, Linkedin, Instagram } from 'lucide-react';
import DiscordIcon from '../DiscordIcon';
import { useFirestoreContent } from '../../hooks/useFirestoreContent';
import { DEFAULT_CONTENT } from '../../utils/defaultContent';
import { COLORS, SPACING, BORDER_RADIUS, FONT, GRADIENTS } from '../../styles';

const Founders = () => {
  const { content } = useFirestoreContent();
  const data = content || DEFAULT_CONTENT;
  const rawFounders = data?.founders || DEFAULT_CONTENT.founders;

  const founders = rawFounders.map((f, i) => {
    const fallback = DEFAULT_CONTENT.founders[i] || {};
    const image = (f.image && !f.image.includes('placeholder')) ? f.image : (fallback.image || f.image);
    const socials = {
      youtube: (f.socials?.youtube && f.socials.youtube !== '#') ? f.socials.youtube : fallback.socials?.youtube,
      linkedin: (f.socials?.linkedin && f.socials.linkedin !== '#') ? f.socials.linkedin : fallback.socials?.linkedin,
      instagram: (f.socials?.instagram && f.socials.instagram !== '#') ? f.socials.instagram : fallback.socials?.instagram,
    };
    return { ...f, image, socials };
  });

  if (!founders || founders.length === 0) return null;

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
            The Team
          </span>
        </div>

        <h2 style={{
          fontFamily: FONT.display,
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          color: COLORS.white,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          margin: 0,
          marginBottom: SPACING.xl,
          lineHeight: '0.95',
        }}>
          Our Founders
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: SPACING.lg,
        }}
        className="founders-grid"
        >
          {founders.map((founder, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: SPACING.md,
                padding: SPACING.xl,
                background: COLORS.surface,
                borderRadius: BORDER_RADIUS.md,
                border: `1px solid ${COLORS.inputBorder}`,
                transition: 'box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                textAlign: 'center',
              }}
              className="founder-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 50px rgba(225, 6, 0, 0.2), 0 0 0 1px rgba(225, 6, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Larger circular portrait — 128px */}
              <div style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                flexShrink: 0,
                borderRadius: '50%',
                overflow: 'hidden',
                background: GRADIENTS.primary,
                border: `3px solid ${COLORS.primary}`,
                boxShadow: '0 0 24px rgba(225, 6, 0, 0.3)',
              }}>
                <img
                  src={founder.image || 'https://via.placeholder.com/256/141414/cc0000?text=' + (founder.name?.[0] || 'R')}
                  alt={founder.name}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/256/141414/cc0000?text=' + (founder.name?.[0] || 'R'); }}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Content below image */}
              <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
                <h3 style={{
                  fontFamily: FONT.display,
                  fontSize: '1.3rem',
                  color: COLORS.white,
                  margin: 0,
                  marginBottom: '0.25rem',
                  letterSpacing: '1.5px',
                  fontWeight: 700,
                  lineHeight: '1.1',
                  textTransform: 'uppercase',
                }}>
                  {founder.name}
                </h3>
                <p style={{
                  color: COLORS.primary,
                  fontFamily: FONT.body,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  margin: 0,
                  fontSize: '0.75rem',
                  letterSpacing: '2px',
                  marginBottom: SPACING.sm,
                }}>
                  {founder.role}
                </p>
                {founder.description && (
                  <p style={{
                    color: COLORS.muted,
                    lineHeight: 1.6,
                    fontSize: '0.85rem',
                    margin: 0,
                    fontWeight: 500,
                  }}>
                    {founder.description}
                  </p>
                )}
                <div style={{ display: 'flex', gap: SPACING.sm, marginTop: SPACING.md, justifyContent: 'center' }}>
                  {founder.socials?.youtube && (
                    <a
                      href={founder.socials.youtube}
                      style={{ color: COLORS.muted, transition: 'color 0.35s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = COLORS.muted}
                    >
                      <Youtube size={16} />
                    </a>
                  )}
                  {founder.socials?.linkedin && (
                    <a
                      href={founder.socials.linkedin}
                      style={{ color: COLORS.muted, transition: 'color 0.35s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = COLORS.muted}
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {founder.socials?.instagram && (
                    <a
                      href={founder.socials.instagram}
                      style={{ color: COLORS.muted, transition: 'color 0.35s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = COLORS.muted}
                    >
                      <Instagram size={16} />
                    </a>
                  )}
                  {founder.socials?.discord && (
                    <a
                      href={founder.socials.discord}
                      style={{ color: COLORS.muted, transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)', display: 'inline-flex' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = COLORS.muted}
                    >
                      <DiscordIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founders-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1100px) and (min-width: 901px) {
          .founders-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .founder-portrait {
            width: 96px !important;
            height: 96px !important;
          }
          .founder-card {
            padding: ${SPACING.md} !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Founders;