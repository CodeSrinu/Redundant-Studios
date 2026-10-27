import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import DiscordIcon from './DiscordIcon';
import { useFirestoreContent } from '../hooks/useFirestoreContent';
import { DEFAULT_CONTENT } from '../utils/defaultContent';
import { COLORS, SPACING, FONT, BORDER_RADIUS, GRADIENTS } from '../styles';

const Footer = () => {
  const { content } = useFirestoreContent();
  const data = content || DEFAULT_CONTENT;
  const studioName = data?.studioName || 'Redundant Studios';
  const rawContact = data?.contact || DEFAULT_CONTENT.contact;
  const contact = {
    ...DEFAULT_CONTENT.contact,
    ...rawContact,
    instagramUrl: (rawContact.instagramUrl && rawContact.instagramUrl !== '#') ? rawContact.instagramUrl : DEFAULT_CONTENT.contact.instagramUrl,
    linkedinUrl: (rawContact.linkedinUrl && rawContact.linkedinUrl !== '#') ? rawContact.linkedinUrl : DEFAULT_CONTENT.contact.linkedinUrl,
    youtubeUrl: (rawContact.youtubeUrl && rawContact.youtubeUrl !== '#') ? rawContact.youtubeUrl : DEFAULT_CONTENT.contact.youtubeUrl,
    discordUrl: (rawContact.discordUrl && rawContact.discordUrl !== '#') ? rawContact.discordUrl : DEFAULT_CONTENT.contact.discordUrl,
    email: (rawContact.email && rawContact.email !== '#') ? rawContact.email : DEFAULT_CONTENT.contact.email,
  };
  const logoUrl = data?.logoUrl || '';

  const navLinks = data?.navbarLabels || DEFAULT_CONTENT.navbarLabels;
  const socials = [
    { icon: Instagram, url: contact.instagramUrl, label: 'Instagram' },
    { icon: Linkedin, url: contact.linkedinUrl, label: 'LinkedIn' },
    { icon: Youtube, url: contact.youtubeUrl, label: 'YouTube' },
    { icon: DiscordIcon, url: contact.discordUrl, label: 'Discord' },
    { icon: Mail, url: contact.email ? `mailto:${contact.email}` : null, label: 'Email' },
  ].filter(s => s.url && s.url !== '#');

  return (
    <footer style={{
      backgroundColor: '#050505',
      borderTop: `1px solid rgba(225, 6, 0, 0.2)`,
      padding: `${SPACING.xxl} ${SPACING.lg} ${SPACING.lg}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Watermark */}
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: FONT.display,
        fontSize: 'clamp(4rem, 15vw, 10rem)',
        fontWeight: 900,
        color: 'rgba(225, 6, 0, 0.04)',
        letterSpacing: '5px',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        REDUNDANT
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: SPACING.xl,
          marginBottom: SPACING.xl,
        }}>
          {/* Studio info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: SPACING.md,
            }}>
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo"
                  style={{
                    width: '44px',
                    height: '44px',
                    objectFit: 'contain',
                    borderRadius: BORDER_RADIUS.sm,
                  }}
                />
              ) : (
                <div style={{
                  width: '44px', height: '44px',
                  background: GRADIENTS.primary,
                  borderRadius: BORDER_RADIUS.sm,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONT.display, fontWeight: 900, color: COLORS.white,
                  fontSize: '1.4rem',
                  boxShadow: '0 0 16px rgba(225, 6, 0, 0.4)',
                }}>R</div>
              )}
              <div>
                <div style={{
                  fontFamily: FONT.display,
                  fontSize: '1rem',
                  fontWeight: 900,
                  color: COLORS.white,
                  letterSpacing: '2px',
                }}>{studioName.split(' ')[0].toUpperCase()}</div>
                <div style={{
                  fontFamily: FONT.accent,
                  fontSize: '0.65rem',
                  color: COLORS.primary,
                  letterSpacing: '3px',
                  fontWeight: 700,
                }}>{studioName.split(' ').slice(1).join(' ').toUpperCase() || 'STUDIOS'}</div>
              </div>
            </div>
            <p style={{
              color: COLORS.muted,
              fontSize: '0.9rem',
              lineHeight: '1.6',
              marginBottom: SPACING.md,
            }}>
              Crafting immersive worlds and unforgettable gaming experiences.
            </p>
            <div style={{ display: 'flex', gap: SPACING.sm, flexWrap: 'wrap' }}>
              {socials.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    style={{
                      width: '38px',
                      height: '38px',
                      background: COLORS.surface,
                      border: `1px solid ${COLORS.inputBorder}`,
                      borderRadius: BORDER_RADIUS.sm,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: COLORS.muted,
                      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.white;
                      e.currentTarget.style.background = 'rgba(225, 6, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.muted;
                      e.currentTarget.style.background = COLORS.surface;
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{
              fontFamily: FONT.accent,
              color: COLORS.white,
              fontSize: '0.95rem',
              letterSpacing: '2px',
              marginBottom: SPACING.md,
              textTransform: 'uppercase',
              fontWeight: 700,
            }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{
                      color: COLORS.muted,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      transition: 'color 0.35s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = COLORS.muted}
                  >
                    <span style={{ color: COLORS.primary, fontSize: '0.7rem' }}>›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio info */}
          <div>
            <h4 style={{
              fontFamily: FONT.accent,
              color: COLORS.white,
              fontSize: '0.95rem',
              letterSpacing: '2px',
              marginBottom: SPACING.md,
              textTransform: 'uppercase',
              fontWeight: 700,
            }}>
              Studio
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ color: COLORS.muted, fontSize: '0.9rem' }}>Indie Game Studio</li>
              <li style={{ color: COLORS.muted, fontSize: '0.9rem' }}>Mobile & PC Games</li>
              <li style={{ color: COLORS.muted, fontSize: '0.9rem' }}>Unity Engine</li>
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h4 style={{
              fontFamily: FONT.accent,
              color: COLORS.white,
              fontSize: '0.95rem',
              letterSpacing: '2px',
              marginBottom: SPACING.md,
              textTransform: 'uppercase',
              fontWeight: 700,
            }}>
              Get In Touch
            </h4>
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                style={{
                  color: COLORS.muted,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  transition: 'color 0.35s ease',
                  display: 'block',
                  marginBottom: '0.7rem',
                  wordBreak: 'break-all',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = COLORS.muted}
              >
                {contact.email}
              </a>
            )}
            <p style={{ color: COLORS.muted, fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              For business inquiries and partnerships.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: `1px solid ${COLORS.inputBorder}`,
          paddingTop: SPACING.md,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: SPACING.sm,
        }}>
          <p style={{
            color: COLORS.muted,
            fontSize: '0.85rem',
            fontFamily: FONT.accent,
            letterSpacing: '1px',
            margin: 0,
          }}>
            © {new Date().getFullYear()} {studioName}. All rights reserved.
          </p>
          <p style={{
            color: COLORS.muted,
            fontSize: '0.85rem',
            fontFamily: FONT.accent,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            Made with <span style={{ color: COLORS.primary }}>♥</span> by {studioName}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;