import React from 'react';
import { useFirestoreContent } from '../hooks/useFirestoreContent';
import { DEFAULT_CONTENT } from '../utils/defaultContent';
import { COLORS, SPACING, BORDER_RADIUS, FONT, GRADIENTS } from '../styles';

const About = () => {
  const { content: hookContent } = useFirestoreContent();
  const content = hookContent || DEFAULT_CONTENT;
  const about = content?.about || DEFAULT_CONTENT.about;

  const rawFounders = (content?.founders && content.founders.length > 0)
    ? content.founders
    : DEFAULT_CONTENT.founders;

  const founders = rawFounders.map((f, i) => {
    const fallback = DEFAULT_CONTENT.founders[i] || {};
    const image = (f.image && !f.image.includes('placeholder')) ? f.image : (fallback.image || f.image);
    return { ...f, image };
  });

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh' }}>
      <section style={{
        padding: `${SPACING.xxxl} ${SPACING.lg} ${SPACING.xl}`,
        backgroundColor: COLORS.bg,
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: SPACING.lg,
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
              Studio
            </span>
          </div>

          <h1 style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            color: COLORS.white,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            margin: 0,
            marginBottom: SPACING.xl,
            lineHeight: '0.95',
          }}>
            About Us
          </h1>

          <p style={{
            fontFamily: FONT.body,
            fontSize: '1.15rem',
            color: COLORS.secondary,
            lineHeight: '1.7',
            margin: 0,
            maxWidth: '780px',
            textAlign: 'left',
            fontWeight: 500,
          }}>
            {about.description}
          </p>
        </div>
      </section>

      <section style={{
        padding: `${SPACING.xxl} ${SPACING.lg}`,
        backgroundColor: COLORS.bg,
        borderTop: `1px solid ${COLORS.inputBorder}`,
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: SPACING.lg,
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
          className="about-team-grid"
          >
            {founders.map((member, idx) => {
              const placeholder = `https://via.placeholder.com/256/141414/cc0000?text=${encodeURIComponent(member.name?.[0] || 'R')}`;
              const imgSrc = member.image && member.image.trim() ? member.image : placeholder;
              return (
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
                  className="about-team-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 50px rgba(225, 6, 0, 0.2), 0 0 0 1px rgba(225, 6, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="about-portrait" style={{
                    position: 'relative',
                    width: '128px',
                    height: '128px',
                    flexShrink: 0,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: GRADIENTS.primary,
                    border: `3px solid ${COLORS.primary}`,
                    boxShadow: '0 0 24px rgba(225, 6, 0, 0.3)',
                  }}>
                    <img
                      src={imgSrc}
                      alt={member.name}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = placeholder; }}
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>

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
                      {member.name}
                    </h3>
                    <p style={{
                      color: COLORS.primary,
                      fontFamily: FONT.body,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      margin: 0,
                      fontSize: '0.75rem',
                      letterSpacing: '2px',
                    }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-team-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1100px) and (min-width: 901px) {
          .about-team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .about-portrait {
            width: 96px !important;
            height: 96px !important;
          }
          .about-team-card {
            padding: ${SPACING.md} !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;