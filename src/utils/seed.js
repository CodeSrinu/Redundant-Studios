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
        backgroundImageUrl: 'https://res.cloudinary.com/yhod98s0/image/upload/v1788331473/MyProfileImg.png'
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
        email: 'redundantstudios79@gmail.com',
        discordUrl: 'https://discord.com/invite/S3w4j8d7m',
        instagramUrl: 'https://www.instagram.com/redundantstudios',
        linkedinUrl: 'https://www.linkedin.com/in/redundant-studios',
        youtubeUrl: 'https://www.youtube.com/@RedundantStudios',
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
          image: 'https://res.cloudinary.com/yhod98s0/image/upload/v1788331473/MyProfileImg.png',
          socials: {
            youtube: 'https://www.youtube.com/@Srinubytes',
            linkedin: 'https://www.linkedin.com/in/srinivasu-kadiyam/',
            instagram: 'https://www.instagram.com/srinu_700'
          }
        },
        {
          name: 'Bobby',
          role: 'Co-Founder & Lead Dev',
          description: 'Technical wizard driving the engine and gameplay mechanics of our titles.',
          image: 'https://via.placeholder.com/256/141414/cc0000?text=Bobby',
          socials: { youtube: '#', linkedin: '#', instagram: '#' }
        },
        {
          name: 'Badri',
          role: 'Co-Founder & Art Director',
          description: 'Creative force shaping the visual identity and atmosphere of our games.',
          image: 'https://res.cloudinary.com/yhod98s0/image/upload/v1787997872/Badri.jpg',
          socials: {
            youtube: 'https://www.youtube.com/@PBR_GameDev',
            linkedin: 'https://www.linkedin.com/in/pericharla-badri-raju-6924942a5',
            instagram: 'https://www.instagram.com/bhagavan_pericharla'
          }
        }
      ],
      teamImages: {
        srinu: 'https://res.cloudinary.com/yhod98s0/image/upload/v1788331473/MyProfileImg.png',
        bobby: 'https://via.placeholder.com/150',
        badri: 'https://res.cloudinary.com/yhod98s0/image/upload/v1787997872/Badri.jpg'
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
      trailerUrl: 'https://www.youtube.com/watch?v=QMeNKpE8COM',
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
