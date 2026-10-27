import React from 'react';
import { Mail, Instagram, Linkedin, Youtube, Play } from 'lucide-react';
import DiscordIcon from '../components/DiscordIcon';
import { useFirestoreContent } from '../hooks/useFirestoreContent';
import { DEFAULT_CONTENT } from '../utils/defaultContent';
import { COLORS, SPACING, FONT, BORDER_RADIUS } from '../styles';

const Contact = () => {
  const { content: hookContent } = useFirestoreContent();
  const content = hookContent || DEFAULT_CONTENT;
  const rawContact = content?.contact || DEFAULT_CONTENT.contact;
  const contact = {
    ...DEFAULT_CONTENT.contact,
    ...rawContact,
    instagramUrl: (rawContact.instagramUrl && rawContact.instagramUrl !== '#') ? rawContact.instagramUrl : DEFAULT_CONTENT.contact.instagramUrl,
    linkedinUrl: (rawContact.linkedinUrl && rawContact.linkedinUrl !== '#') ? rawContact.linkedinUrl : DEFAULT_CONTENT.contact.linkedinUrl,
    youtubeUrl: (rawContact.youtubeUrl && rawContact.youtubeUrl !== '#') ? rawContact.youtubeUrl : DEFAULT_CONTENT.contact.youtubeUrl,
    discordUrl: (rawContact.discordUrl && rawContact.discordUrl !== '#') ? rawContact.discordUrl : DEFAULT_CONTENT.contact.discordUrl,
    email: (rawContact.email && rawContact.email !== '#') ? rawContact.email : DEFAULT_CONTENT.contact.email,
  };

  const socials = [
    { name: 'Instagram', icon: Instagram, url: contact.instagramUrl },
    { name: 'LinkedIn', icon: Linkedin, url: contact.linkedinUrl },
    { name: 'YouTube', icon: Youtube, url: contact.youtubeUrl },
    { name: 'Play Store', icon: Play, url: contact.playstoreUrl },
    { name: 'Discord', icon: DiscordIcon, url: contact.discordUrl },
  ].filter(s => s.url && s.url !== '#');

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh' }}>
      <section style={{
        padding: `${SPACING.xxxl} ${SPACING.lg}`,
        backgroundColor: COLORS.bg,
        minHeight: '80vh',
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
              Contact
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
            marginBottom: SPACING.lg,
            lineHeight: '0.95',
          }}>
            Get In Touch
          </h1>

          <p style={{
            fontFamily: FONT.body,
            fontSize: '1.1rem',
            color: COLORS.secondary,
            lineHeight: '1.7',
            margin: 0,
            marginBottom: SPACING.xl,
            maxWidth: '640px',
            fontWeight: 500,
          }}>
            Have questions or just want to say hi? Reach out to us through any of the following channels.
          </p>

          {/* Email — prominent */}
          {contact.email && (
            <div style={{
              paddingBottom: SPACING.xl,
              marginBottom: SPACING.xl,
              borderBottom: `1px solid ${COLORS.border}`,
            }}>
              <div style={{
                fontFamily: FONT.body,
                fontSize: '0.85rem',
                color: COLORS.muted,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}>
                Email
              </div>
              <a
                href={`mailto:${contact.email}`}
                style={{
                  fontFamily: FONT.display,
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  color: COLORS.white,
                  textDecoration: 'none',
                  letterSpacing: '1px',
                  fontWeight: 700,
                  transition: 'color 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = COLORS.white}
              >
                {contact.email}
              </a>
            </div>
          )}

          {/* Socials — clean icon + label row, no boxes */}
          {socials.length > 0 && (
            <div>
              <div style={{
                fontFamily: FONT.body,
                fontSize: '0.85rem',
                color: COLORS.muted,
                textTransform: 'uppercase',
                letterSpacing: '3px',
                fontWeight: 600,
                marginBottom: SPACING.md,
              }}>
                Follow
              </div>
              <div style={{
                display: 'flex',
                gap: SPACING.xl,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}>
                {socials.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        color: COLORS.secondary,
                        textDecoration: 'none',
                        fontFamily: FONT.body,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        transition: 'color 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                      onMouseLeave={(e) => e.currentTarget.style.color = COLORS.secondary}
                    >
                      <Icon size={20} />
                      {social.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact;