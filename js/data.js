/**
 * =========================================================================
 * SITE_DATA: PUSAT DATA STATIS FEBERBISNIS
 * =========================================================================
 * Ubah seluruh teks, perjalanan, daftar pengurus, dan publikasi program
 * cukup dari objek ini tanpa perlu menyentuh struktur HTML di atas.
 */
const SITE_DATA = {
  // 0. Hero Photo Carousel Slides (5 slot foto di folder assets/img/hero/)
  heroSlides: [
    {
      id: 'hero-1',
      filename: 'herobanner1.png',
      tag: 'COMMUNITY & SYNERGY',
      title: 'Ruang Tumbuh Wirausaha FEB',
      palette: { bg: '#343333', accent1: '#E5006E', accent2: '#FFCE13' },
    },
    {
      id: 'hero-2',
      filename: 'herobanner2.png',
      tag: 'MENTORING & LEARNING',
      title: 'Belajar Langsung Bersama Praktisi',
      palette: { bg: '#262525', accent1: '#FFCE13', accent2: '#E5006E' },
    },
    {
      id: 'hero-3',
      filename: 'herobanner3.png',
      tag: 'ONE DAY TO START A BUSINESS',
      title: 'Dari Ide Menuju Aksi Nyata',
      palette: { bg: '#3A1E2C', accent1: '#E5006E', accent2: '#FFCE13' },
    },
    {
      id: 'hero-4',
      filename: 'herobanner4.png',
      tag: 'NETWORKING & COLLABORATION',
      title: 'Membangun Jejaring Founder Muda',
      palette: { bg: '#2B2928', accent1: '#FFCE13', accent2: '#E5006E' },
    },
    {
      id: 'hero-5',
      filename: 'herobanner5.png',
      tag: 'INCLUSIVE GROWTH SPACE',
      title: 'We Connect, Learn and Grow Together',
      palette: { bg: '#343333', accent1: '#E5006E', accent2: '#FFCE13' },
    },
  ],

  // 1. Empat Pilar Misi
  missions: [
    {
      num: '01',
      title: 'Structured Learning Direction',
      desc: 'Membuat perencanaan pengembangan pembelajaran kewirausahaan secara bertahap, jelas, dan terukur.',
    },
    {
      num: '02',
      title: 'Inclusive Growth Space',
      desc: 'Membangun lingkungan inklusif sebagai ruang tumbuh bersama bagi pengurus dan member.',
    },
    {
      num: '03',
      title: 'Capability & Community Management',
      desc: 'Mengembangkan kapasitas pengurus dan member melalui penguatan kemampuan yang memiliki rasa kebersamaan.',
    },
    {
      num: '04',
      title: 'Impactful Entrepreneurial Ecosystem',
      desc: 'Menghadirkan dampak nyata dan berkelanjutan melalui kolaborasi strategis dengan pihak eksternal.',
    },
  ],

  // 2. Core Values Organisasi
  coreValues: [
    {
      num: '01',
      title: 'Collaborative',
      desc: 'Keselarasan dan kerja sama antar anggota, tim, dan divisi untuk mencapai tujuan bersama secara efektif.',
    },
    {
      num: '02',
      title: 'Respect Boundaries',
      desc: 'Menghormati batasan yang ditentukan oleh seseorang dan mencoba untuk memahami kondisi yang sedang dialami oleh setiap anggota.',
    },
    {
      num: '03',
      title: 'High Motivation',
      desc: 'Keinginan dan motivasi yang tinggi pada setiap individu penting dalam menciptakan environment yang baik dalam FEBerbisnis karena akan membuat individu lainnya terinspirasi dan terdorong.',
    },
    {
      num: '04',
      title: 'Appreciative',
      desc: 'Menghargai setiap kontribusi, proses belajar, dan pencapaian anggota maupun divisi untuk membangun budaya yang saling mendukung.',
    },
  ],

  // 4. Struktur Organogram Kepengurusan Resmi (Periode 2026 & Periode 2025)
  organogramByYear: {
    '2026': {
      year: '2026',
      hasVP: true,
      units: {
        president: {
          id: 'president',
          shortCode: 'EXECUTIVE',
          levelLabel: 'Board of Director • 2026',
          title: 'President',
          subtitle: 'Firyal Fathia Awad',
          description:
            'Memimpin arah strategis FEBerbisnis, menyelaraskan visi dan misi lintas direktorat, serta merepresentasikan organisasi di tingkat fakultas dan eksternal.',
          members: [
            { name: 'Firyal Fathia Awad', role: 'President', major: 'Bisnis Digital', batch: '2024' },
          ],
        },
        'general-secretary': {
          id: 'general-secretary',
          shortCode: 'GENSEC',
          levelLabel: 'General Secretary • 2026',
          title: 'General Secretary',
          subtitle: 'Secretary & Treasury',
          description:
            'Mengelola tata kelola administrasi, kesekretariatan, arsip organisasi, serta transparansi dan pencatatan keuangan (Secretary & Treasury) FEBerbisnis.',
          members: [
            { name: 'Faiza Almeira Yasmi', role: 'Manager', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Nisrina Mutia Zahra', role: 'Staff', major: 'Akuntansi', batch: '2025' },
            { name: 'Tiara Salsabila Sudiardiputri', role: 'Staff', major: 'Manajemen', batch: '2025' },
            { name: 'Nadia Safitri', role: 'Staff', major: 'Ilmu Ekonomi', batch: '2025' },
            { name: 'Nisa Nurasipa', role: 'Staff', major: 'Ekonomi Islam', batch: '2025' },
          ],
        },
        'vp-internal': {
          id: 'vp-internal',
          shortCode: '',
          levelLabel: 'Board of Director • 2026',
          title: 'VP Internal',
          subtitle: 'Shafina Putri Apriadi',
          description:
            'Mengawasi dan menyelaraskan kinerja divisi Program & Event (PROVEN) serta Talent & Community Development (TNCD) guna menciptakan ruang tumbuh internal yang inklusif dan terukur.',
          members: [
            { name: 'Shafina Putri Apriadi', role: 'VP Internal', major: 'Akuntansi', batch: '2024' },
          ],
        },
        'vp-external': {
          id: 'vp-external',
          shortCode: '',
          levelLabel: 'Board of Director • 2026',
          title: 'VP External',
          subtitle: 'Azka Nadia Ramadhani',
          description:
            'Mengawasi strategi branding, relasi eksternal, dan pengembangan bisnis melalui divisi Branding & Media Communication (BMC), External Relation (ER), dan Business Development (BD).',
          members: [
            { name: 'Azka Nadia Ramadhani', role: 'VP External', major: 'Bisnis Digital', batch: '2024' },
          ],
        },
        'program-event': {
          id: 'program-event',
          shortCode: 'PROVEN',
          levelLabel: 'Direktorat Internal • 2026',
          title: 'Program & Event',
          subtitle: 'Perancangan & Eksekusi Proker',
          description:
            'Merancang kurikulum kegiatan serta mengeksekusi program kerja utama FEBerbisnis seperti Mentoring, Networking, dan One Day to Start a Business.',
          members: [
            { name: 'Della Amalia Nabilatussalamah', role: 'Manager', major: 'Bisnis Digital', batch: '2024' },
            { name: 'Reval Fiirizki Ilham', role: 'Assistant Manager', major: 'Manajemen', batch: '2025' },
            { name: 'Ahmad Yasin Maulana Ahyuddin', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Muhammad Ammar Kadafi', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Kalila Cyndriana Ananti', role: 'Staff', major: 'Ilmu Ekonomi', batch: '2025' },
            { name: 'Faiz Ghaisan Hermawan', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Nabilla Abdya Putri', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Paras Nauval Aljahra', role: 'Staff', major: 'Manajemen', batch: '2025' },
            { name: 'Berlian Liu Septiana', role: 'Staff', major: 'Manajemen', batch: '2025' },
            { name: 'Muhammad Rafi Ronanda Ramadhan', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
          ],
        },
        'talent-community': {
          id: 'talent-community',
          shortCode: 'TNCD',
          levelLabel: 'Direktorat Internal • 2026',
          title: 'Talent & Community Development',
          subtitle: 'Pengembangan Pengurus & Komunitas',
          description:
            'Mengembangkan kapasitas pengurus dan member, menjaga budaya kerja inklusif dan apresiatif, serta mengelola ekosistem komunitas anggota FEBerbisnis.',
          members: [
            { name: 'Ishaq', role: 'Manager', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Fransiska Romana Rachel Doy', role: 'Assistant Manager', major: 'Ilmu Ekonomi', batch: '2025' },
            { name: 'Carizzah Putri Az-Zahra', role: 'Staff', major: 'Ilmu Ekonomi', batch: '2025' },
            { name: 'Hasna Hafisah', role: 'Staff', major: 'Ekonomi Islam', batch: '2025' },
            { name: 'Quinna Sekar Kinasih', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Alexander Zelian Roostjahjono', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Nabila Arifah Maheswari', role: 'Staff', major: 'Akuntansi', batch: '2025' },
          ],
        },
        'branding-media': {
          id: 'branding-media',
          shortCode: 'BMC',
          levelLabel: 'Direktorat Eksternal • 2026',
          title: 'Branding & Media Communication',
          subtitle: 'Identitas Visual, Konten & Publikasi',
          description:
            'Membangun citra dan identitas visual FEBerbisnis, mengelola kanal komunikasi digital, serta memproduksi dokumentasi dan publikasi setiap kegiatan.',
          members: [
            { name: 'Adelia Mukhbita Alya', role: 'Manager', major: 'Bisnis Digital', batch: '2024' },
            { name: 'Labadiya Tarapu', role: 'Assistant Manager', major: 'Bisnis Digital', batch: '2024' },
            { name: 'Laras Adi Prasetyanti', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Jessica Bertha', role: 'Staff', major: 'Manajemen', batch: '2025' },
            { name: 'Yafi Apta Nugraha', role: 'Staff', major: 'Manajemen', batch: '2025' },
            { name: 'Rayhan Fathur Rahman', role: 'Staff', major: 'Manajemen', batch: '2025' },
            { name: 'Hasna Amalia Shofwan Harun', role: 'Staff', major: 'Ilmu Ekonomi', batch: '2025' },
            { name: 'Alfiyah Syahrah Ramadhani', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Naurah Razwa Nurfaizah', role: 'Staff', major: 'Manajemen', batch: '2025' },
            { name: 'Kareen Yesatama Tan', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
          ],
        },
        'external-relation': {
          id: 'external-relation',
          shortCode: 'ER',
          levelLabel: 'Direktorat Eksternal • 2026',
          title: 'External Relation',
          subtitle: 'Kemitraan, Jejaring & Kolaborasi',
          description:
            'Menjalin hubungan dan kolaborasi strategis dengan mitra eksternal, pembicara, mentor praktisi, sponsor, serta komunitas kewirausahaan lainnya.',
          members: [
            { name: 'Zakiyatul Fikra Az-Zahra', role: 'Manager', major: 'Bisnis Digital', batch: '2024' },
            { name: 'Renata Tania Irawan', role: 'Assistant Manager', major: 'Akuntansi', batch: '2025' },
            { name: 'Mutiara Iffah Arista', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Muhammad Azka Prawira Mursidin', role: 'Staff', major: 'Manajemen', batch: '2025' },
            { name: 'Azkia Aqila Ramadhani', role: 'Staff', major: 'Akuntansi', batch: '2025' },
            { name: 'Tsabita Fathyanabila', role: 'Staff', major: 'Ekonomi Islam', batch: '2024' },
            { name: 'Azkia Shabrina', role: 'Staff', major: 'Ekonomi Islam', batch: '2025' },
            { name: 'Joshua Kevin Hutabarat', role: 'Staff', major: 'Manajemen', batch: '2025' },
            { name: 'Alysa Altriana Rifdah', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Najwa Azzahra Panrelly', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
          ],
        },
        'business-development': {
          id: 'business-development',
          shortCode: 'BD',
          levelLabel: 'Direktorat Eksternal • 2026',
          title: 'Business Development',
          subtitle: 'Inisiatif Bisnis & Merchandise',
          description:
            'Mengembangkan unit usaha mandiri organisasi, mengelola produk merchandise FEBerbisnis, serta menciptakan peluang pertumbuhan bisnis bagi anggota.',
          members: [
            { name: 'Rasya Faza Zhafira', role: 'Manager', major: 'Akuntansi', batch: '2024' },
            { name: 'Kristin C. Oktina', role: 'Assistant Manager', major: 'Akuntansi', batch: '2025' },
            { name: 'Ulinnuha Khalisha', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Tiffany Nathania Tjandra', role: 'Staff', major: 'Manajemen', batch: '2025' },
            { name: 'Mohammad Fahri Hidayat', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Valexa Hafsah Ghaisani', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Mazin Rauf Kamil', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Tsuraya Inggit Anindya', role: 'Staff', major: 'Bisnis Digital', batch: '2025' },
            { name: 'Zaki Abdurrahman', role: 'Staff', major: 'Manajemen', batch: '2025' },
          ],
        },
      },
    },

    '2025': {
      year: '2025',
      hasVP: false,
      units: {
        president: {
          id: 'president',
          shortCode: 'EXECUTIVE',
          levelLabel: 'Executive • 2025',
          title: 'President',
          subtitle: 'Maula Ghazy Arryan H.',
          description:
            'Memimpin arah strategis FEBerbisnis periode 2025, menyelaraskan seluruh divisi, dan merepresentasikan organisasi di lingkup fakultas maupun eksternal.',
          members: [
            { name: 'Maula Ghazy Arryan H.', role: 'President', major: '', batch: '' },
          ],
        },
        'general-secretary': {
          id: 'general-secretary',
          shortCode: 'GENSEC',
          levelLabel: 'General Secretary • 2025',
          title: 'General Secretary',
          subtitle: 'Administrasi & Keuangan',
          description:
            'Mengelola tata kelola administrasi, kesekretariatan, arsip organisasi, serta transparansi pencatatan keuangan FEBerbisnis periode 2025.',
          members: [
            { name: 'Tia Adelin S.', role: 'Head', major: '', batch: '' },
            { name: 'Nadia Ratu Aini Alamsyah', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'Ayodhya Abdurrahman Azis', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'Aurel Theisa Netanya Purba', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'Nazwa Chairunnisa', role: 'Staff', major: 'Manajemen', batch: '' },
            { name: 'Shafira Aprilia Febrianta', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'Amir Adam Robles Ruswandi', role: 'Staff', major: 'Ilmu Ekonomi', batch: '' },
            { name: 'Shabha Khalisha Angky', role: 'Staff', major: 'Akuntansi', batch: '' },
          ],
        },
        'program-event': {
          id: 'program-event',
          shortCode: 'PE',
          levelLabel: 'Divisi • 2025',
          title: 'Program & Event',
          subtitle: 'Perancangan & Eksekusi Proker',
          description:
            'Merancang rangkaian kegiatan serta mengeksekusi program kerja utama kewirausahaan FEBerbisnis periode 2025.',
          members: [
            { name: 'Nasywa Auliyatunisaa', role: 'Head', major: '', batch: '' },
            { name: 'Erik Septian Ilham', role: 'Vice Head', major: '', batch: '' },
            { name: 'Nisrina Hanin Farras', role: 'Staff', major: 'Manajemen', batch: '' },
            { name: 'Gianfranca Alessa Manuela Carolina Napitupulu', role: 'Staff', major: 'Ilmu Ekonomi', batch: '' },
            { name: 'Ammara Nashita', role: 'Staff', major: 'Manajemen', batch: '' },
            { name: 'Alim Qodry Darma', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Muhammad Farhan Trirangga Pamungkas', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'Della Amalia Nabilatussalamah', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Malik Muhammad Arkan', role: 'Staff', major: 'Bisnis Digital', batch: '' },
          ],
        },
        'talent-community': {
          id: 'talent-community',
          shortCode: 'TNC',
          levelLabel: 'Divisi • 2025',
          title: 'Talent & Community Development',
          subtitle: 'Pengembangan Pengurus & Komunitas',
          description:
            'Mengembangkan kapasitas pengurus dan member, menjaga budaya kerja inklusif, serta membangun komunitas anggota FEBerbisnis periode 2025.',
          members: [
            { name: 'Fahny Dea R. W.', role: 'Head', major: '', batch: '' },
            { name: 'Athiya Zahira H.', role: 'Vice Head', major: '', batch: '' },
            { name: 'Muhammad Hilmi Hafidzuddin', role: 'Staff', major: 'Manajemen', batch: '' },
            { name: 'Oswald Jefferson Mulia Aritonang', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'Hanif Al Ghiffari', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Puanku Ratu FBS', role: 'Staff', major: 'Manajemen', batch: '' },
            { name: 'Joan Anabel Lumban Gaol', role: 'Staff', major: 'Manajemen', batch: '' },
            { name: 'Aurellia Rachel Getsemanuela Togatorop', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'Kassandra Putri Aliva', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'James Ginting', role: 'Staff', major: 'Manajemen', batch: '' },
          ],
        },
        'branding-media': {
          id: 'branding-media',
          shortCode: 'BM',
          levelLabel: 'Divisi • 2025',
          title: 'Branding & Media',
          subtitle: 'Identitas Visual & Publikasi',
          description:
            'Membangun identitas visual FEBerbisnis, mengelola kanal komunikasi digital, serta memproduksi dokumentasi dan publikasi kegiatan periode 2025.',
          members: [
            { name: 'Latifa Mischa S.', role: 'Head', major: '', batch: '' },
            { name: 'Kayla Nazhirah', role: 'Vice Head', major: '', batch: '' },
            { name: 'Syalima Tiara Nuraunillah', role: 'Staff', major: 'Ilmu Ekonomi', batch: '' },
            { name: 'Sarah Nabila Adawiyah', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Ani Hanifah', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Erfan Maulana Hafidz', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Ibrahim Ammar Wilka', role: 'Staff', major: 'Manajemen', batch: '' },
            { name: 'Rena Zahra Maulida', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Adelia Mukhbita Alya', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Chayarannisa Fachira Sukarno', role: 'Staff', major: 'Manajemen', batch: '' },
            { name: 'Zahra Putri Hardifia', role: 'Staff', major: 'Akuntansi', batch: '' },
          ],
        },
        'external-relation': {
          id: 'external-relation',
          shortCode: 'ER',
          levelLabel: 'Divisi • 2025',
          title: 'External Relation',
          subtitle: 'Kemitraan & Kolaborasi Eksternal',
          description:
            'Menjalin hubungan dan kolaborasi strategis dengan mitra eksternal, pembicara, mentor praktisi, dan komunitas kewirausahaan periode 2025.',
          members: [
            { name: 'Sherry Binyada S.', role: 'Head', major: '', batch: '' },
            { name: 'Evelline Revaliana', role: 'Vice Head', major: '', batch: '' },
            { name: 'Zakiyatul Fikra Az-Zahra', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Salsabila Syifa Permana', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Billyando Bagas Paolo Siagian', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'Aulia Nur Safira', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Ramadhina Sumadyanti', role: 'Staff', major: 'Ilmu Ekonomi', batch: '' },
            { name: 'Firyal Fathia Awad', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Leon Anthony', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'Fasalwa Ratu Nadira', role: 'Staff', major: 'Bisnis Digital', batch: '' },
          ],
        },
        'business-development': {
          id: 'business-development',
          shortCode: 'BD',
          levelLabel: 'Divisi • 2025',
          title: 'Business Development',
          subtitle: 'Inisiatif Bisnis & Usaha Mandiri',
          description:
            'Mengembangkan inisiatif usaha mandiri organisasi, merchandise, dan peluang pertumbuhan bisnis di lingkungan FEBerbisnis periode 2025.',
          members: [
            { name: 'Kabhinowo Kayvan', role: 'Head', major: '', batch: '' },
            { name: 'Fathiyah Azzahra', role: 'Vice Head', major: '', batch: '' },
            { name: 'Hilbran Ramadhan Putra', role: 'Staff', major: 'Ekonomi Islam', batch: '' },
            { name: 'Abril Pasha Hidayat Putra', role: 'Staff', major: 'Bisnis Digital', batch: '' },
            { name: 'Azifah Nurul Fitriani', role: 'Staff', major: 'Manajemen', batch: '' },
            { name: 'Amira Fadiya', role: 'Staff', major: 'Ilmu Ekonomi', batch: '' },
            { name: 'Rasya Faza Zhafira', role: 'Staff', major: 'Akuntansi', batch: '' },
            { name: 'Muhammad Tito Raditya Prastowo', role: 'Staff', major: 'Manajemen', batch: '' },
            { name: 'Rizq Athaya Rinaldi', role: 'Staff', major: 'Ekonomi Islam', batch: '' },
          ],
        },
      },
    },
  },

  // 5. Program & Events Utama
  programs: [
    {
      id: 'mentoring',
      index: '01',
      category: 'Mentoring',
      title: 'Mentoring',
      shortDesc:
        'Pendampingan terarah bersama praktisi dan alumni wirausaha untuk membedah model bisnis, validasi pasar, hingga strategi pertumbuhan usaha mahasiswa.',
      palette: { from: '#E5006E', to: '#FF8A3D' },
      publication: {
        background:
          'Banyak mahasiswa memiliki ide bisnis potensial namun kerap terhenti pada tahap validasi awal. Program Mentoring hadir sebagai implementasi misi Structured Learning Direction agar peserta mendapat arahan praktis yang jelas dan terukur.',
        focus:
          'Sesi klinik bisnis kelompok kecil yang membahas penyusunan Business Model Canvas (BMC), perhitungan harga pokok penjualan (HPP), strategi pemasaran digital, dan evaluasi masalah operasional secara langsung bersama mentor.',
        impact:
          'Membantu peserta memetakan langkah eksekusi bisnis secara realistis sekaligus membangun kepercayaan diri untuk membawa produk mereka ke pasar.',
      },
      gallery: [
        { label: 'SESI MENTORING 01', caption: 'Bedah Business Model Canvas bersama praktisi bisnis.' },
        { label: 'SESI MENTORING 02', caption: 'Diskusi kelompok kecil mengenai validasi pasar & pricing.' },
      ],
    },
    {
      id: 'networking',
      index: '02',
      category: 'Networking',
      title: 'Networking',
      shortDesc:
        'Ruang temu interaktif bagi mahasiswa pegiat dan peminat bisnis di lingkup FEB untuk bertukar insight, mencari co-founder, serta membangun kolaborasi lintas usaha.',
      palette: { from: '#343333', to: '#E5006E' },
      publication: {
        background:
          'Ekosistem kewirausahaan yang kuat lahir dari jejaring yang saling mendukung. Program Networking mempertemukan perintis usaha mahasiswa dengan rekan lintas jurusan dan komunitas eksternal.',
        focus:
          'Pertemuan tematik dengan format founder sharing, pitching singkat 60 detik, dan diskusi meja bundar yang mendorong kolaborasi nyata antar-brand mahasiswa.',
        impact:
          'Memperluas koneksi bisnis anggota FEBerbisnis serta membuka peluang kolaborasi strategis di dalam maupun luar lingkungan FEB.',
      },
      gallery: [
        { label: 'NETWORKING 01', caption: 'Sesi founder sharing dan tanya jawab lintas angkatan.' },
        { label: 'NETWORKING 02', caption: 'Diskusi santai & kolaborasi antar-perintis usaha FEB.' },
      ],
    },
    {
      id: 'one-day-business',
      index: '03',
      category: 'One Day to Start a Business',
      title: 'One Day to Start a Business',
      shortDesc:
        'Simulasi intensif satu hari penuh untuk merancang konsep produk, menyusun kelayakan dasar, dan mempresentasikan prototipe bisnis dari nol.',
      palette: { from: '#E8A800', to: '#E5006E' },
      publication: {
        background:
          'Memulai langkah pertama sering kali menjadi tantangan terbesar calon wirausaha. One Day to Start a Business dirancang untuk mematahkan keraguan tersebut lewat pengalaman praktik langsung dalam satu hari.',
        focus:
          'Sprint kewirausahaan berbasis tim: mulai dari riset masalah cepat, perancangan value proposition, simulasi biaya & harga jual, hingga sesi final pitching di hadapan juri praktisi.',
        impact:
          'Melatih ketangkasan berpikir bisnis, kolaborasi tim di bawah tenggat waktu nyata, dan keberanian mempresentasikan ide usaha.',
      },
      gallery: [
        { label: 'ONE DAY BIZ 01', caption: 'Sprint ideasi produk dan perancangan prototipe bisnis.' },
        { label: 'ONE DAY BIZ 02', caption: 'Presentasi final pitching tim di hadapan panel mentor.' },
      ],
    },
    {
      id: 'membership',
      index: '04',
      category: 'Membership',
      title: 'Membership',
      shortDesc:
        'Program penguatan kapasitas dan kebersamaan anggota aktif FEBerbisnis melalui ruang belajar inklusif, bonding, dan pendataan ekosistem bisnis member.',
      palette: { from: '#343333', to: '#C99700' },
      publication: {
        background:
          'Sebagai perwujudan misi Inclusive Growth Space dan Capability & Community Management, program Membership memastikan setiap anggota memiliki ruang aman untuk belajar, berbagi, dan bertumbuh bersama.',
        focus:
          'Rangkaian kegiatan onboarding member, internal sharing session, penguatan budaya saling menghargai, serta pemetaan portofolio usaha yang sedang dijalankan oleh para anggota.',
        impact:
          'Menciptakan rasa kebersamaan yang erat antar-pengurus dan member sekaligus menjadi fondasi direktori bisnis FEBerbisnis.',
      },
      gallery: [
        { label: 'MEMBERSHIP 01', caption: 'Sesi penyambutan dan pengenalan nilai inti FEBerbisnis.' },
        { label: 'MEMBERSHIP 02', caption: 'Internal growth circle & sharing operasional usaha member.' },
      ],
    },
  ],

  // 6. Community Hub: Member Businesses & Member Interests
  communityBusinesses: [
    {
      id: 'biz-kopi-senja',
      name: 'Kopi Senja FEB',
      category: 'F&B',
      founder: 'Raka Pratama',
      major: 'Bisnis Digital',
      batch: '2024',
      tagline: 'Kopi susu aren racikan mahasiswa dengan biji lokal Jawa Barat.',
      story:
        'Berawal dari riset tugas kuliah kewirausahaan, Kopi Senja FEB hadir menyediakan minuman kopi susu siap minum dan paket literan untuk kebutuhan rapat, kepanitiaan, hingga teman nugas mahasiswa.',
      offerings: ['Es Kopi Susu Aren 250ml & 1L', 'Matcha Oat Latte', 'Paket Coffee Break Event Kampus'],
      instagramHandle: '@kopisenja.feb',
      instagramUrl: 'https://instagram.com/feberbisnis',
      photo: 'assets/img/community/biz-kopi-senja.png',
      palette: { bg: '#343333', accent1: '#FFCE13', accent2: '#E5006E' },
    },
  ],

  communityInterests: [
    {
      id: 'int-1',
      name: 'Bima Mahendra',
      major: 'Bisnis Digital',
      batch: '2025',
      interests: ['F&B', 'Digital & Tech'],
      skills: ['Product Research', 'Digital Marketing'],
      lookingFor: 'Cari partner riset konsep cloud kitchen & F&B sehat untuk mahasiswa.',
      bio: 'Tertarik memadukan bisnis kuliner praktis dengan sistem pemesanan digital dan langganan mingguan anak kos.',
      instagramHandle: '@bimamahendra',
      instagramUrl: 'https://instagram.com/feberbisnis',
    },
  ],

  // 7. Shop: Official Merch FEBerbisnis & Member's Shop
  shopOfficialMerch: [
    {
      id: 'merch-tee',
      businessName: 'FEBerbisnis Official',
      productType: 'Official Merch',
      title: 'FEBerbisnis Editorial Oversized Tee',
      price: 125000,
      shortDesc: 'Kaos katun combed 24s dengan tipografi Swiss editorial khas FEBerbisnis.',
      description:
        'Merchandise resmi FEBerbisnis berbahan Cotton Combed 24s premium yang adem dan terstruktur. Menggunakan sablon plastisol presisi dengan aksen warna identitas organisasi.',
      specs: ['Bahan: 100% Cotton Combed 24s', 'Ukuran tersedia: S, M, L, XL', 'Warna: Charcoal & Warm Cream'],
      instagramHandle: '@feberbisnis',
      instagramUrl: 'https://instagram.com/feberbisnis',
      photos: [
        { src: 'assets/img/shop/merch/merch-tee-1.png', label: 'Tampak Depan' },
        { src: 'assets/img/shop/merch/merch-tee-2.png', label: 'Detail Tipografi' },
        { src: 'assets/img/shop/merch/merch-tee-3.png', label: 'Size Chart' },
      ],
      palette: { bg: '#343333', accent1: '#E5006E', accent2: '#FFCE13' },
    },
    {
      id: 'merch-tote',
      businessName: 'FEBerbisnis Official',
      productType: 'Official Merch',
      title: 'Connect & Grow Canvas Tote Bag',
      price: 75000,
      shortDesc: 'Tote bag kanvas tebal muat laptop 14 inci dengan saku dalam.',
      description:
        'Dirancang untuk mobilitas mahasiswa FEB dari kelas ke sesi diskusi bisnis. Menggunakan kanvas drill tebal dengan resleting utama dan kantong organizer di bagian dalam.',
      specs: ['Bahan: Kanvas Tebal 12oz + Resleting', 'Dimensi: 38 x 33 x 9 cm (Muat Laptop 14")', 'Warna: Warm Cream'],
      instagramHandle: '@feberbisnis',
      instagramUrl: 'https://instagram.com/feberbisnis',
      photos: [
        { src: 'assets/img/shop/merch/merch-tote-1.png', label: 'Tampak Utama' },
        { src: 'assets/img/shop/merch/merch-tote-2.png', label: 'Detail Saku Dalam' },
      ],
      palette: { bg: '#2B2928', accent1: '#FFCE13', accent2: '#E5006E' },
    },
    {
      id: 'merch-lanyard',
      businessName: 'FEBerbisnis Official',
      productType: 'Official Merch',
      title: 'Lanyard & Sticker Pack Edition 2026',
      price: 35000,
      shortDesc: 'Paket lanyard tissue print dua sisi + 5 stiker vinyl tahan air.',
      description:
        'Aksesori wajib pengurus dan member FEBerbisnis. Lanyard lembut dengan pengait besi kokoh dilengkapi 5 stiker die-cut anti air untuk laptop dan tumbler.',
      specs: ['Lanyard Tissue 2cm + Card Holder', 'Bonus 5 Stiker Vinyl Laminasi Doff', 'Ready Stock'],
      instagramHandle: '@feberbisnis',
      instagramUrl: 'https://instagram.com/feberbisnis',
      photos: [
        { src: 'assets/img/shop/merch/merch-lanyard-1.png', label: 'Set Lanyard & Stiker' },
        { src: 'assets/img/shop/merch/merch-lanyard-2.png', label: 'Close-Up Stiker' },
      ],
      palette: { bg: '#3A1E2C', accent1: '#E5006E', accent2: '#FFCE13' },
    },
  ],

  shopMemberProducts: [
    {
      id: 'mprod-kopi-1l',
      businessName: 'Kopi Senja FEB',
      productType: 'Produk Fisik',
      title: 'Es Kopi Susu Aren 1 Liter',
      price: 68000,
      shortDesc: 'Racikan house blend arabika-robusta dengan gula aren organik, tahan 3 hari di kulkas.',
      description:
        'Cocok untuk stok nugas, kumpul divisi, atau sharing bareng teman. Disajikan segar sesuai pesanan dengan pilihan level manis (Normal / Less Sugar).',
      specs: ['Volume: 1.000 ml (5–6 porsi)', 'Pilihan: Normal Sugar / Less Sugar', 'Pengiriman area kampus & Bandung'],
      instagramHandle: '@kopisenja.feb',
      instagramUrl: 'https://instagram.com/feberbisnis',
      photos: [
        { src: 'assets/img/shop/members/kopi-1l-a.png', label: 'Botol 1 Liter' },
        { src: 'assets/img/shop/members/kopi-1l-b.png', label: 'Saran Penyajian' },
      ],
      palette: { bg: '#343333', accent1: '#FFCE13', accent2: '#E5006E' },
    },
    {
      id: 'mprod-notion-kit',
      businessName: 'Rupa Creative Lab',
      productType: 'Produk Digital',
      title: 'Notion Business & Cashflow OS',
      price: 49000,
      shortDesc: 'Template Notion siap pakai untuk pencatatan order, stok, HPP, dan arus kas UMKM.',
      description:
        'Sistem operasional bisnis ringkas di Notion yang dirancang khusus bagi perintis usaha mahasiswa. Tinggal duplikasi ke workspace kamu dan langsung pakai.',
      specs: ['Format: Link Duplikasi Notion + Video Panduan', 'Fitur: Order Tracker, Rekap Laba Rugi, Kalender Konten', 'Akses selamanya setelah pembelian'],
      instagramHandle: '@rupacreativelab',
      instagramUrl: 'https://instagram.com/feberbisnis',
      photos: [
        { src: 'assets/img/shop/members/notion-os-a.png', label: 'Dashboard Utama' },
        { src: 'assets/img/shop/members/notion-os-b.png', label: 'Cashflow Tracker' },
        { src: 'assets/img/shop/members/notion-os-c.png', label: 'Mobile Preview' },
      ],
      palette: { bg: '#262525', accent1: '#E5006E', accent2: '#FFCE13' },
    },
    {
      id: 'mprod-kala-tee',
      businessName: 'Kala Wear Studio',
      productType: 'Produk Fisik',
      title: 'Kala Daily Heavyweight Shirt',
      price: 139000,
      shortDesc: 'Kaos boxy fit 230gsm warna earth-tone yang rapi dan tidak menerawang.',
      description:
        'Potongan boxy modern dengan kerah rib tebal yang tidak mudah melar. Nyaman digunakan seharian di lingkungan kampus.',
      specs: ['Bahan: Heavyweight Cotton 230gsm', 'Ukuran: M, L, XL', 'Warna: Sand, Charcoal, Olive'],
      instagramHandle: '@kalawear.id',
      instagramUrl: 'https://instagram.com/feberbisnis',
      photos: [
        { src: 'assets/img/shop/members/kala-tee-a.png', label: 'Lookbook Depan' },
        { src: 'assets/img/shop/members/kala-tee-b.png', label: 'Tekstur Kain' },
      ],
      palette: { bg: '#2B2928', accent1: '#FFCE13', accent2: '#E5006E' },
    },
    {
      id: 'mprod-pitch-deck',
      businessName: 'Rupa Creative Lab',
      productType: 'Produk Digital',
      title: 'Canva Pitch Deck Kit (35+ Slide)',
      price: 39000,
      shortDesc: 'Paket 35+ slide presentasi lomba bisnis & proposal sponsor siap edit di Canva.',
      description:
        'Hemat waktu desain saat ikut Business Plan Competition atau presentasi sponsor. Seluruh grafik, tabel keuangan, dan layout BMC mudah disesuaikan dengan warna brand kamu.',
      specs: ['Format: Template Canva (Free & Pro Compatible)', 'Isi: 35+ Layout Slide + Panduan Struktur Pitch', 'Pengiriman instan via link'],
      instagramHandle: '@rupacreativelab',
      instagramUrl: 'https://instagram.com/feberbisnis',
      photos: [
        { src: 'assets/img/shop/members/pitch-deck-a.png', label: 'Preview Cover & Grid' },
        { src: 'assets/img/shop/members/pitch-deck-b.png', label: 'Slide Finansial & BMC' },
      ],
      palette: { bg: '#3A1E2C', accent1: '#E5006E', accent2: '#FFCE13' },
    },
    {
      id: 'mprod-brownies',
      businessName: 'Crumble & Co. Bakehouse',
      productType: 'Produk Fisik',
      title: 'Fudgy Brownies Box (12 Sekat)',
      price: 65000,
      shortDesc: 'Brownies panggang dark chocolate dengan 4 pilihan topping favorit.',
      description:
        'Dipanggang fresh berdasarkan jadwal pre-order tiap Rabu & Sabtu. Tekstur fudgy di dalam dengan shiny crust di atas, cocok untuk hadiah maupun camilan.',
      specs: ['Ukuran: 20x10 cm (12 potong sekat)', 'Topping: Almond, Choco Chips, Cheese, Lotus Biscoff', 'Bisa tambah kartu ucapan gratis'],
      instagramHandle: '@crumbleco.bake',
      instagramUrl: 'https://instagram.com/feberbisnis',
      photos: [
        { src: 'assets/img/shop/members/brownies-a.png', label: 'Box 12 Sekat' },
        { src: 'assets/img/shop/members/brownies-b.png', label: 'Packaging Hampers' },
      ],
      palette: { bg: '#343333', accent1: '#E5006E', accent2: '#FFCE13' },
    },
  ],

  // 8. Ecosystem & Partners Logo Marquee (assets/img/ecosystem/partner1.png s.d. partner6.png)
  ecosystemPartners: [
    { id: 'partner-1', name: 'Kopi Senja FEB', tag: 'F&B', filename: 'partner1.png', accent: '#E5006E' },
    { id: 'partner-2', name: 'Nusantara Wear', tag: 'APPAREL', filename: 'partner2.png', accent: '#343333' },
    { id: 'partner-3', name: 'Karya Visual Studio', tag: 'CREATIVE', filename: 'partner3.png', accent: '#E5006E' },
    { id: 'partner-4', name: 'Dapur Kampus', tag: 'CULINARY', filename: 'partner4.png', accent: '#D99B00' },
    { id: 'partner-5', name: 'FinTrack Student', tag: 'FINTECH', filename: 'partner5.png', accent: '#343333' },
    { id: 'partner-6', name: 'Bumi Craft', tag: 'LIFESTYLE', filename: 'partner6.png', accent: '#E5006E' },
  ],

  // 9. Partnership SOP & PIC Contact Data (External Relation)
  partnership: {
    types: ['Brand Partner', 'Media Partner', 'Sponsorship', 'Community Collaboration'],
    benefits: [
      {
        num: '01',
        title: 'Logo di Ecosystem & Partners',
        desc: 'Penempatan logo eksklusif di section Ecosystem & Partners website resmi FEBerbisnis.',
      },
      {
        num: '02',
        title: 'Eksposur Komunitas FEB',
        desc: 'Eksposur di kanal media sosial dan komunitas mahasiswa FEB.',
      },
      {
        num: '03',
        title: 'Aktivasi Program & Events',
        desc: 'Keterlibatan langsung pada rangkaian program & events kewirausahaan FEBerbisnis.',
      },
    ],
    sopRules: [
      'Pengajuan penawaran atau proposal kerja sama dilakukan minimal H-14 sebelum jadwal kolaborasi/event.',
      'Produk, layanan, atau program mitra selaras dengan nilai kewirausahaan dan etika lingkungan akademik FEB.',
      'Ruang lingkup kolaborasi (deliverables & hak eksposur) disepakati bersama melalui konfirmasi tertulis / MoU.',
      'Penyerahan aset logo beresolusi tinggi (format PNG transparan) untuk publikasi di website dan media sosial.',
    ],
    pic: {
      title: 'External Relation — FEBerbisnis',
      desc: 'Hubungi tim External Relation kami untuk diskusi proposal, paket eksposur, maupun kolaborasi strategis.',
      whatsappUrl:
        'https://wa.me/6281234567890?text=Halo%20tim%20External%20Relation%20FEBerbisnis%2C%20kami%20tertarik%20untuk%20berdiskusi%20mengenai%20partnership.',
      emailUrl: 'mailto:partnership@feberbisnis.org',
      sopPdfUrl: 'assets/docs/SOP-Partnership-FEBerbisnis.pdf',
    },
  },
};
