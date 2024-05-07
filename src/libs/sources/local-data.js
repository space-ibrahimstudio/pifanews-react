export async function getStaticMenus() {
  const menus = [
    { path: "/lokal", text: "Lokal" },
    { path: "/pifabiz", text: "PifaBiz" },
    { path: "/teknologi", text: "Teknologi" },
    { path: "/bisnis", text: "Bisnis" },
    { path: "/lifestyle", text: "Lifestyle" },
    { path: "/olahraga", text: "Olahraga" },
    { path: "/politik", text: "Politik" },
  ];

  return menus;
}

export async function getFeaturedPosts() {
  const posts = [
    {
      id: "1",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui.",
      short:
        "Nullam vulputate commodo euismod. In sodales imperdiet nisl vel scelerisque.",
      tag: "Lorem",
      image: "/img/img-01.jpg",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "2",
      title:
        "Duis venenatis fermentum lacinia. Quisque in porta dui, vel dictum odio.",
      short:
        "Phasellus ac tellus non neque pellentesque laoreet. Aenean sit amet",
      tag: "Duis",
      image: "/img/img-02.jpg",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "3",
      title:
        "elit sit amet sem ornare blandit. Quisque in augue id ligula auctor",
      short:
        "mattis at at diam. Sed at rutrum nisl. Quisque tempus, arcu vel molestie",
      tag: "Elit",
      image: "/img/img-03.jpg",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "4",
      title:
        "aliquam, augue enim tempor odio, eu malesuada tortor lacus quis nisi.",
      short: "Integer ut mollis sapien. Duis pellentesque leo pretium pretium ",
      tag: "Aliquam",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "5",
      title:
        "egestas. Pellentesque a luctus mi, sit amet ornare erat. Etiam commodo",
      short:
        "pharetra accumsan. Nunc cursus massa leo, et tempus massa feugiat eu.",
      tag: "Egestas",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "6",
      title:
        "Fusce nunc quam, posuere in ornare nec, eleifend in lectus. Donec euismod orci",
      short:
        "neque. In maximus dictum pellentesque. Fusce vulputate pulvinar enim vel ",
      tag: "Fusce",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "7",
      title:
        "volutpat. Phasellus eget mauris nec nibh consequat congue nec quis dolor.",
      short:
        "Nulla ante felis, rutrum id dignissim in, aliquam a tortor. Cras elementum",
      tag: "volutpat",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "8",
      title: "neque sed orci egestas viverra. In dictum at lacus sed faucibus.",
      short:
        "Suspendisse ligula lectus, tempor nec semper et, blandit id dolor. Donec vel",
      tag: "neque",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "9",
      title:
        "velit sem. Quisque in condimentum risus. Sed at consequat nisl. Aliquam ",
      short:
        "sit amet turpis nec mauris tempus maximus. Morbi turpis ipsum, commodo et",
      tag: "velit",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "10",
      title:
        "dolor vel, molestie malesuada tortor. Morbi libero purus, facilisis et diam",
      short:
        "vel, pellentesque facilisis massa. Aliquam erat volutpat. Maecenas ",
      tag: "dolor",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "11",
      title:
        "placerat lorem eget purus semper maximus. Quisque placerat faucibus",
      short:
        "dapibus. In ac justo sed ipsum elementum dictum. Etiam mattis, massa",
      tag: "placerat",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "12",
      title:
        "sit amet molestie porta, ex sapien sollicitudin ex, pulvinar vestibulum",
      short:
        "diam dui et lectus. Morbi id ornare nibh. Nunc viverra quam vel nisi",
      tag: "sit",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "13",
      title:
        "ultricies, id mollis massa mollis. Suspendisse pellentesque, magna eu",
      short:
        "consequat ultricies, leo nulla maximus diam, ut sodales justo dolor ut nunc.",
      tag: "ultricies",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "14",
      title:
        "Proin tempus condimentum blandit. In dictum rutrum turpis sed ultrices.",
      short:
        "Pellentesque rutrum tortor sed felis imperdiet imperdiet. Nulla id fringilla",
      tag: "Proin",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "15",
      title:
        "odio, tempus tincidunt massa. Nullam hendrerit cursus dui, vel egestas ante",
      short:
        "fermentum at. Sed sit amet porttitor nisi, ut porta massa. Nunc a magna",
      tag: "odio",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
  ];

  return posts;
}

export async function getTrendingTags() {
  const tags = [
    { value: "pilpres-2024", label: "Pilpres 2024" },
    { value: "kalbar", label: "Kalbar" },
    { value: "indonesia-u23", label: "Indonesia U23" },
    { value: "gempa-bumi", label: "Gempa Bumi" },
  ];

  return tags;
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
