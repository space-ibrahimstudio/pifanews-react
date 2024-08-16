export async function getContactInfo() {
  const contacts = [
    {
      id: "1",
      label: "(+62) 811 5737 688",
      value: "(+62) 811 5737 688",
      icon: "/svg/phone.svg",
    },
    {
      id: "2",
      label: "nettacodeindonesia@gmail.com",
      value: "nettacodeindonesia@gmail.com",
      icon: "/svg/email.svg",
    },
  ];

  return contacts;
}

export async function getSocialInfo() {
  const socials = [
    {
      id: "1",
      label: "PIFA on Instagram",
      value: "https://instagram.com/pifa.co.id",
      icon: "/svg/instagram.svg",
    },
    {
      id: "2",
      label: "PIFA on Facebook",
      value: "https://www.facebook.com/Pifa-175960317881224",
      icon: "/svg/facebook.svg",
    },
    {
      id: "3",
      label: "PIFA on YouTube",
      value: "https://www.youtube.com/channel/UChd3pp48NwGI0afTn3dgm7g",
      icon: "/svg/youtube.svg",
    },
  ];

  return socials;
}

export async function getStaticPages() {
  const pages = [
    {
      id: "1",
      title: "Navigasi",
      items: [
        { itemid: "1", name: "Syarat & Ketentuan", path: "/syarat-ketentuan" },
        { itemid: "2", name: "Tentang PIFA", path: "/tentang-pifa" },
        { itemid: "3", name: "Kebijakan Privasi", path: "/kebijakan-privasi" },
        { itemid: "4", name: "Bantuan (FAQ)", path: "/faq" },
      ],
    },
    {
      id: "2",
      title: "Panduan",
      items: [
        {
          itemid: "1",
          name: "Kode Etik Jurnalistik",
          path: "/kode-etik-jurnalistik",
        },
        { itemid: "2", name: "Beriklan", path: "/pasang-iklan" },
        {
          itemid: "3",
          name: "Pedoman Media Siber",
          path: "/pedoman-media-siber",
        },
      ],
    },
  ];

  return pages;
}

export async function getLocalCategories() {
  const cats = [
    { id: "1", name: "Pontianak", image: "/img/img-01.jpg" },
    { id: "2", name: "Kubu Raya", image: "/img/img-02.jpg" },
    { id: "3", name: "Mempawah", image: "/img/img-03.jpg" },
    { id: "4", name: "Singkawang", image: "" },
    { id: "5", name: "Bengkayang", image: "" },
    { id: "6", name: "Sambas", image: "" },
    { id: "7", name: "Landak", image: "" },
    { id: "8", name: "Sanggau", image: "" },
    { id: "9", name: "Sekadau", image: "" },
    { id: "10", name: "Sintang", image: "" },
    { id: "11", name: "Melawi", image: "" },
    { id: "12", name: "Kapuas Hulu", image: "" },
    { id: "13", name: "Ketapang", image: "" },
    { id: "14", name: "Kayong Utara", image: "" },
  ];

  return cats;
}

export async function getInfographicPosts() {
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
}

export async function getAdDatas() {
  const ads = [
    { label: "", image: "/img/ad/1696303634.webp" },
    { label: "", image: "/img/ad/1654149291.webp" },
    { label: "", image: "/img/ad/1654149341.webp" },
    { label: "", image: "/img/ad/1654149110.webp" },
    { label: "", image: "/img/ad/1696303634.webp" },
    { label: "", image: "/img/ad/1654149291.webp" },
    { label: "", image: "/img/ad/1654149341.webp" },
    { label: "", image: "/img/ad/1654149110.webp" },
  ];

  return ads;
}
