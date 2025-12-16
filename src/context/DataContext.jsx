import { createContext, useContext, useState, useEffect } from 'react';
import { eventList as initialEvents } from '../data/EventsSection';
import { tutorsList as initialTutors } from '../data/TutorsSection';
import { partnersList as initialPartners } from '../data/PartnersSection';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [partners, setPartners] = useState([]);


  // Load initial data
  useEffect(() => {
    // Check localStorage first
    const savedEvents = localStorage.getItem('webinar_events');
    const savedTutors = localStorage.getItem('webinar_tutors');
    const savedPartners = localStorage.getItem('webinar_partners');

    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Add IDs to initial data if not present
      const eventsWithIds = initialEvents.map((e, index) => ({
        id: index + 1,
        ...e
      }));
      setEvents(eventsWithIds);
      localStorage.setItem('webinar_events', JSON.stringify(eventsWithIds));
    }

    if (savedTutors) {
      setTutors(JSON.parse(savedTutors));
    } else {
      const tutorsWithIds = initialTutors.map((t, index) => ({
        id: index + 1,
        ...t
      }));
      setTutors(tutorsWithIds);
      localStorage.setItem('webinar_tutors', JSON.stringify(tutorsWithIds));
    }

    if (savedPartners) {
      setPartners(JSON.parse(savedPartners));
    } else {
      const partnersWithIds = initialPartners.map((p, index) => ({
        id: index + 1,
        ...p
      }));
      setPartners(partnersWithIds);
      localStorage.setItem('webinar_partners', JSON.stringify(partnersWithIds));
    }

  }, []);


  // Sync with localStorage whenever state changes
  useEffect(() => {
    if (events.length > 0) localStorage.setItem('webinar_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    if (tutors.length > 0) localStorage.setItem('webinar_tutors', JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    if (partners.length > 0) localStorage.setItem('webinar_partners', JSON.stringify(partners));
  }, [partners]);




  // CRUD Operations
  // Events
  const addEvent = (newEvent) => {
    const id = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([...events, { id, ...newEvent }]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  // Tutors
  const addTutor = (newTutor) => {
    const id = tutors.length > 0 ? Math.max(...tutors.map(t => t.id)) + 1 : 1;
    setTutors([...tutors, { id, ...newTutor }]);
  };

  const updateTutor = (updatedTutor) => {
    setTutors(tutors.map(t => t.id === updatedTutor.id ? updatedTutor : t));
  };

  const deleteTutor = (id) => {
    setTutors(tutors.filter(t => t.id !== id));
  };

  // Landing Page Data
  const [landingData, setLandingData] = useState({
    home: {
      image: 'https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg?size=626&ext=jpg&ga=GA1.2.1769275626.1605867161',
      content: `<p class="deskripsi">Belajar Programming Di Webinar Ulbi Aja</p>
                <h2>Tetap Sehat, Tetap Semangat</h2>
                <p>Webinar ULBI adalah program pembelajaran daring yang diselenggarakan Universitas Logistik dan Bisnis Internasional untuk memberikan materi edukasi modern dan interaktif. Melalui sesi yang dipandu dosen dan praktisi industri, peserta dapat meningkatkan kompetensi di bidang teknologi, logistik, bisnis, dan pengembangan diri. Webinar ini terbuka untuk mahasiswa, alumni, dan masyarakat umum, serta menyediakan sertifikat resmi sebagai nilai tambah portofolio.</p>`
    },
    organization: {
      image: 'https://img.freepik.com/free-vector/online-learning-isometric-concept_1284-17947.jpg?size=626&ext=jpg&ga=GA1.2.1769275626.1605867161',
      content: `<h2>ORGANISASI</h2>
                <p>Organisasi ini merupakan sebuah lembaga resmi yang bergerak dalam pengembangan pendidikan, penelitian, dan pemberdayaan masyarakat. Fokus utama organisasi adalah menciptakan lingkungan yang mendukung kolaborasi, inovasi, serta pengembangan kompetensi bagi seluruh anggotanya.</p>
                <p>Melalui berbagai program, organisasi menyediakan layanan seperti pelatihan, seminar, riset terapan, serta kegiatan sosial yang dirancang untuk meningkatkan kualitas sumber daya manusia. Setiap kegiatan disusun secara terstruktur dan dipimpin oleh para ahli, sehingga memberikan dampak yang nyata bagi anggota maupun masyarakat luas.</p>
                <p>Dengan visi membangun komunitas yang profesional dan berdaya saing, organisasi ini terus berkomitmen menghadirkan program berkualitas, memperluas jaringan, serta menciptakan budaya kerja yang kolaboratif dan produktif.</p>`
    }
  });

  useEffect(() => {
    const savedLanding = localStorage.getItem('webinar_landing');
    if (savedLanding) {
      setLandingData(JSON.parse(savedLanding));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('webinar_landing', JSON.stringify(landingData));
  }, [landingData]);

  const updateLandingData = (section, newData) => {
    setLandingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...newData }
    }));
  };

  // Partners
  const addPartner = (newPartner) => {
    const id = partners.length > 0 ? Math.max(...partners.map(p => p.id)) + 1 : 1;
    setPartners([...partners, { id, ...newPartner }]);
  };

  const updatePartner = (updatedPartner) => {
    setPartners(partners.map(p => p.id === updatedPartner.id ? updatedPartner : p));
  };

  const deletePartner = (id) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  // Organization Applications Logic - REMOVED

  return (
    <DataContext.Provider value={{
      events, addEvent, updateEvent, deleteEvent,
      tutors, addTutor, updateTutor, deleteTutor,
      partners, addPartner, updatePartner, deletePartner,
      landingData, updateLandingData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
