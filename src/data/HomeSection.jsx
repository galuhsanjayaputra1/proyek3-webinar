// Cek apakah admin sudah menyimpan perubahan HomeSection
let saved = JSON.parse(localStorage.getItem("HomeSection"));

export const HomeSection = saved || {
    image: 'https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg?size=626&ext=jpg&ga=GA1.2.1769275626.1605867161',

    content: `<p class="deskripsi">Belajar Programming Di Webinar Ulbi Aja</p>
                <h2>Tetap Sehat, Tetap Semangat</h2>
                <p>Webinar ULBI adalah program pembelajaran daring yang diselenggarakan Universitas Logistik dan Bisnis Internasional untuk memberikan materi edukasi modern dan interaktif. Melalui sesi yang dipandu dosen dan praktisi industri, peserta dapat meningkatkan kompetensi di bidang teknologi, logistik, bisnis, dan pengembangan diri. Webinar ini terbuka untuk mahasiswa, alumni, dan masyarakat umum, serta menyediakan sertifikat resmi sebagai nilai tambah portofolio.</p>
                <p></p>`
};
