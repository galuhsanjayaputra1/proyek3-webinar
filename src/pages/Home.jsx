import Navbar from '../components/Navbar.jsx';
import '../styles/Home.css';
import Footer from '../components/Footer.jsx';
import { useData } from '../context/DataContext.jsx'; // Import DataContext
import { HomeSection } from '../data/HomeSection.jsx';
import parse from 'html-react-parser';
import { coursesSection } from '../data/CoursesSection.jsx';
import { tutorsSection } from '../data/TutorsSection.jsx';
import Tutors from '../components/Tutors.jsx';
import { partnersSection } from '../data/PartnersSection.jsx';
import Partners from '../components/Partners.jsx';
import Contact from '../components/Contact.jsx';
import { contactSection } from '../data/ContactSection.jsx';
import { eventsSection } from '../data/EventsSection.jsx';
import Events from '../components/Events.jsx';

function Home() {
  const { events, tutors, partners, landingData } = useData(); // Get data from context

  // Safely access data or fallback to defaults provided in context
  const homeSection = landingData?.home || {};
  const orgSection = landingData?.organization || {};

  return (
    <>
      <Navbar />

      <div className="wrapper">

        <section id="home">
          <img src={homeSection.image} alt="home" />
          <div className="kolom">
            {parse(homeSection.content || '')}
          </div>
        </section>

        <section id="courses">
          <div className="kolom">
            {parse(orgSection.content || '')}
          </div>
          <img src={orgSection.image} alt="organization" />
        </section>

        <section id="event">
          <div className="tengah">
            <div className="kolom">
              {parse(eventsSection.content)}
            </div>
            <Events eventList={events} />
          </div>
        </section>

        <section id="tutors">
          <div className="tengah">
            <div className="kolom">
              {parse(tutorsSection.content)}
            </div>
            <Tutors tutorsList={tutors} />
          </div>
        </section>

        <section id="partners">
          <div className="tengah">
            <div className="kolom">
              {parse(partnersSection.content)}
            </div>
            <Partners partnersList={partners} />
          </div>
        </section>

      </div>

      <Contact contactSection={contactSection} />
      <Footer />
    </>
  );
}

export default Home;
