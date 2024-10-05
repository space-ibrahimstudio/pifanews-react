export const getContactInfo = () => {
  const contacts = [
    { id: "1", label: "(+62) 811 5737 688", value: "(+62) 811 5737 688", icon: "/svg/phone.svg" },
    { id: "2", label: "nettacodeindonesia@gmail.com", value: "nettacodeindonesia@gmail.com", icon: "/svg/email.svg" },
  ];

  return contacts;
};

export const getSocialInfo = () => {
  const socials = [
    { id: "1", label: "PIFA on Instagram", value: "https://instagram.com/pifa.co.id", icon: "/svg/instagram.svg" },
    { id: "2", label: "PIFA on Facebook", value: "https://www.facebook.com/Pifa-175960317881224", icon: "/svg/facebook.svg" },
    { id: "3", label: "PIFA on YouTube", value: "https://www.youtube.com/channel/UChd3pp48NwGI0afTn3dgm7g", icon: "/svg/youtube.svg" },
  ];

  return socials;
};

export const getStaticPages = () => {
  const pages = [
    {
      id: "1",
      title: "Navigasi",
      items: [
        { itemid: "1", name: "Syarat & Ketentuan", path: "/informasi/syarat-ketentuan" },
        { itemid: "2", name: "Tentang PIFA", path: "/informasi/tentang-pifa" },
        { itemid: "3", name: "Kebijakan Privasi", path: "/informasi/kebijakan-privasi" },
        { itemid: "4", name: "Bantuan (FAQ)", path: "/informasi/faq" },
      ],
    },
    {
      id: "2",
      title: "Panduan",
      items: [
        { itemid: "1", name: "Kode Etik Jurnalistik", path: "/informasi/kode-etik-jurnalistik" },
        { itemid: "2", name: "Beriklan", path: "/informasi/pasang-iklan" },
        { itemid: "3", name: "Pedoman Media Siber", path: "/informasi/pedoman-media-siber" },
      ],
    },
  ];

  return pages;
};

export const getStaticPosts = () => {
  const pages = [
    {
      id: "1",
      title: "Syarat & Ketentuan",
      image: "/img/syarat-ketentuan.jpg",
      author: "Admin",
      date: "2021-08-26 20:48:00",
      slug: "syarat-ketentuan",
    },
    {
      id: "2",
      title: "Tentang Pifa",
      image: "/img/tentang-pifa.jpg",
      author: "Admin",
      date: "2021-08-26 20:44:43",
      slug: "tentang-pifa",
    },
    {
      id: "3",
      title: "Kebijakan Privasi",
      image: "/img/kebijakan-privasi.jpg",
      author: "Admin",
      date: "2021-08-24 10:02:26",
      slug: "kebijakan-privasi",
    },
    {
      id: "4",
      title: "Bantuan (FAQ)",
      image: "/img/faq.jpg",
      author: "Admin",
      date: "2021-08-26 20:48:23",
      slug: "faq",
    },
    {
      id: "5",
      title: "Kode Etik Jurnalistik",
      image: "/img/kode-etik-jurnalistik.jpg",
      author: "Admin",
      date: "2021-09-07 15:42:46",
      slug: "kode-etik-jurnalistik",
    },
    {
      id: "6",
      title: "Beriklan",
      image: "/img/pasang-iklan.jpg",
      author: "Admin",
      date: "2022-04-27 13:45:49",
      slug: "pasang-iklan",
    },
    {
      id: "7",
      title: "Pedoman Media Siber",
      image: "/img/pedoman-media-siber.jpg",
      author: "Admin",
      date: "2021-09-07 15:53:40",
      slug: "pedoman-media-siber",
    },
  ];

  return pages;
};

export const getInfographicPosts = () => {
  const posts = [
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod.",
      image: "/img/graphic/art-1.jpg",
      count: "4",
      status: "BARU",
    },
    {
      title: "In sodales imperdiet nisl vel scelerisque. Duis venenatis fermentum lacinia.",
      image: "/img/graphic/art-2.jpg",
      count: "7",
      status: "UPDATE",
    },
    {
      title: "Quisque in porta dui, vel dictum odio. Phasellus ac tellus non neque pellentesque laoreet.",
      image: "/img/graphic/art-3.jpg",
      count: "1",
      status: "BARU",
    },
    { title: "Aenean sit amet elit sit amet sem ornare blandit.", image: "/img/graphic/art-4.jpg", count: "12", status: "" },
    {
      title: "Quisque in augue id ligula auctor mattis at at diam. Sed at rutrum nisl.",
      image: "/img/graphic/art-5.jpg",
      count: "2",
      status: "UPDATE",
    },
    {
      title: "Quisque tempus, arcu vel molestie aliquam, augue enim tempor odio, eu malesuada tortor lacus quis nisi.",
      image: "/img/graphic/art-6.jpg",
      count: "8",
      status: "",
    },
    {
      title: "Integer ut mollis sapien. Duis pellentesque leo pretium pretium egestas.",
      image: "/img/graphic/art-7.jpg",
      count: "23",
      status: "",
    },
  ];

  return posts;
};

export const getAdDatas = () => {
  const ads = [
    { label: "COBLOS NO 1", image: "/img/ad/wide-5.png" },
    { label: "SPACE AVAILABLE!!!", image: "/img/ad/wide-1.png" },
    { label: "PANTENGIN INFOGRAFIS DUNIA TERKINI", image: "/img/ad/wide-2.png" },
    { label: "LAPORKAN KEJADIAN PENTING DISEKITARMU", image: "/img/ad/wide-3.png" },
    { label: "BERITA TERUPDATE SETIAP HARI", image: "/img/ad/wide-4.png" },
    { label: "SPACE AVAILABLE!!!", image: "/img/ad/wide-1.png" },
    { label: "COBLOS NO 1", image: "/img/ad/wide-5.png" },
    { label: "PANTENGIN INFOGRAFIS DUNIA TERKINI", image: "/img/ad/wide-2.png" },
    { label: "LAPORKAN KEJADIAN PENTING DISEKITARMU", image: "/img/wide-ad/3.png" },
    { label: "BERITA TERUPDATE SETIAP HARI", image: "/img/ad/wide-4.png" },
  ];

  return ads;
};
