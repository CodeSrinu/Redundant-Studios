import React from 'react';
import { Instagram, Linkedin, Youtube, Play } from 'lucide-react';
import DiscordIcon from '../DiscordIcon';
import { useFirestoreContent } from '../../hooks/useFirestoreContent';
import { DEFAULT_CONTENT } from '../../utils/defaultContent';
import { COLORS, SPACING, FONT } from '../../styles';

const SocialLinks = () => {
  const { content } = useFirestoreContent();
  const data = content || DEFAULT_CONTENT;
  const rawContact = data?.contact || DEFAULT_CONTENT.contact;
  const contact = {
    ...DEFAULT_CONTENT.contact,
    ...rawContact,
    instagramUrl: (rawContact.instagramUrl && rawContact.instagramUrl !== '#') ? rawContact.instagramUrl : DEFAULT_CONTENT.contact.instagramUrl,
    linkedinUrl: (rawContact.linkedinUrl && rawContact.linkedinUrl !== '#') ? rawContact.linkedinUrl : DEFAULT_CONTENT.contact.linkedinUrl,
    youtubeUrl: (rawContact.youtubeUrl && rawContact.youtubeUrl !== '#') ? rawContact.youtubeUrl : DEFAULT_CONTENT.contact.youtubeUrl,
    discordUrl: (rawContact.discordUrl && rawContact.discordUrl !== '#') ? rawContact.discordUrl : DEFAULT_CONTENT.contact.discordUrl,
  };

  const links = [
    { name: 'Instagram', icon: Instagram, url: contact.instagramUrl },
    { name: 'LinkedIn', icon: Linkedin, url: contact.linkedinUrl },
    { name: 'YouTube', icon: Youtube, url: contact.youtubeUrl },
    { name: 'Play Store', icon: Play, url: contact.playstoreUrl },
    { name: 'Discord', icon: DiscordIcon, url: contact.discordUrl },
  ].filter(l => l.url && l.url !== '#');

  if (links.length === 0) return null;

  return (
    <section style={{
      padding: `${SPACING.xl} ${SPACING.lg}`,
      backgroundColor: COLORS.bg,
      borderTop: `1px solid ${COLORS.border}`,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap',
        }}
        className="social-follow-row"
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: FONT.body,
            fontSize: '0.85rem',
            color: COLORS.muted,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontWeight: 600,
            lineHeight: 1,
          }}>
            Follow
          </span>
          <div style={{
            display: 'flex',
            gap: '1.75rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-follow-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: COLORS.secondary,
                    fontFamily: FONT.body,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textDecoration: 'none',
                    transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    lineHeight: 1,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = COLORS.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = COLORS.secondary}
                >
                  <Icon size={16} style={{ display: 'block' }} />
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .social-follow-row { gap: 0.75rem !important; }
          .social-follow-link { font-size: 0.8rem !important; }
        }
      `}</style>
    </section>
  );
};

export default SocialLinks;