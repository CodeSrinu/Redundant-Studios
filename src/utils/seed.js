import { db } from '../firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

export const seedDatabase = async () => {
  try {
    // Seed main content
    await setDoc(doc(db, 'content', 'main'), {
      studioName: 'Redundant Studios',
      hero: {
        headline: 'Redundant Studios',
        subheadline: 'Crafting immersive experiences and pushing the boundaries of game development.',
        backgroundImageUrl: 'https://via.placeholder.com/1920x1080'
      },
      about: {
        description: 'Redundant Studios is a passionate team of developers and artists dedicated to creating high-quality, engaging games. We believe in pushing technical boundaries and delivering unique experiences that resonate with players worldwide.',
        values: [
          { title: 'Innovation', description: 'Constantly exploring new ways to enhance gameplay and graphics.' },
          { title: 'Quality', description: 'Ensuring every detail is polished to perfection.' },
          { title: 'Passion', description: 'Creating games that we truly love to play.' }
        ]
      },
      contact: {
        email: 'contact@redundantstudios.com',
        discordUrl: '#',
        instagramUrl: '#',
        linkedinUrl: '#',
        youtubeUrl: '#',
        playstoreUrl: '#'
      },
      navbarLabels: [
        { name: 'Home', path: '/' },
        { name: 'Games', path: '/games' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ],
      visibility: {
        hero: true,
        featuredGames: true,
        founders: true,
        socialLinks: true
      },
      founders: [
        {
          name: 'Srinu',
          role: 'Founder & CEO',
          description: 'Visionary leader with a passion for creating cutting-edge gaming experiences.',
          image: 'https://via.placeholder.com/200',
          socials: { youtube: '#', linkedin: '#', instagram: '#' }
        },
        {
          name: 'Bobby',
          role: 'Co-Founder & Lead Dev',
          description: 'Technical wizard driving the engine and gameplay mechanics of our titles.',
          image: 'https://via.placeholder.com/200',
          socials: { youtube: '#', linkedin: '#', instagram: '#' }
        },
        {
          name: 'Badri',
          role: 'Co-Founder & Art Director',
          description: 'Creative force shaping the visual identity and atmosphere of our games.',
          image: 'https://via.placeholder.com/200',
          socials: { youtube: '#', linkedin: '#', instagram: '#' }
        }
      ],
      teamImages: {
        srinu: 'https://via.placeholder.com/150',
        bobby: 'https://via.placeholder.com/150',
        badri: 'https://via.placeholder.com/150'
      }
    });

    // Seed initial game
    await addDoc(collection(db, 'games'), {
      title: 'DeadZone',
      genre: 'Top-down Shooter',
      platform: 'Android',
      description: 'A 2D top-down zombie shooter — survive waves of the undead.',
      status: 'Released',
      thumbnailUrl: 'https://via.placeholder.com/400x225',
      trailerUrl: 'https://www.youtube.com/watch?v=ppCIV9tVjYk',
      playstoreUrl: '#',
      order: 0,
      featured: true
    });

    return { success: true };
  } catch (error) {
    console.error("Seeding error:", error);
    return { success: false, error };
  }
};
