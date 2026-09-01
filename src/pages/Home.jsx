import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedGames from '../components/home/FeaturedGames';
import FeaturedGameSection from '../components/home/FeaturedGameSection';
import Founders from '../components/home/Founders';
import SocialLinks from '../components/home/SocialLinks';
import { useFirestoreContent } from '../hooks/useFirestoreContent';
import { DEFAULT_CONTENT } from '../utils/defaultContent';
import { COLORS, SPACING } from '../styles';

const Home = () => {
  const { content, loading, error } = useFirestoreContent();
  const displayContent = content || DEFAULT_CONTENT;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg
      }}>
        <div style={{ textAlign: 'center', color: COLORS.secondary }}>Loading...</div>
      </div>
    );
  }

  const visibility = displayContent?.visibility || {};

  return (
    <div style={{ overflowX: 'hidden', backgroundColor: COLORS.bg }}>
      {visibility.hero !== false && <Hero content={displayContent} />}
      {visibility.featuredGame !== false && <FeaturedGameSection content={displayContent} />}
      {visibility.featuredGames !== false && <FeaturedGames content={displayContent} />}
      {visibility.founders !== false && <Founders content={displayContent} />}
      {visibility.socialLinks !== false && <SocialLinks content={displayContent} />}
    </div>
  );
};

export default Home;