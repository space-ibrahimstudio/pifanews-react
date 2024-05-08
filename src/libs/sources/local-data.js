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
      tag: "Lokal",
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
      tag: "Lokal",
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
      tag: "Lokal",
      image: "/img/img-03.jpg",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "4",
      title:
        "aliquam, augue enim tempor odio, eu malesuada tortor lacus quis nisi.",
      short: "Integer ut mollis sapien. Duis pellentesque leo pretium pretium ",
      tag: "Lokal",
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
      tag: "Lokal",
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
      tag: "Lokal",
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
      tag: "Lokal",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "8",
      title: "neque sed orci egestas viverra. In dictum at lacus sed faucibus.",
      short:
        "Suspendisse ligula lectus, tempor nec semper et, blandit id dolor. Donec vel",
      tag: "Lokal",
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
      tag: "Lokal",
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
      tag: "Lokal",
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
      tag: "Lokal",
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
      tag: "Lokal",
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
      tag: "Lokal",
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
      tag: "Lokal",
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
      tag: "Lokal",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "1",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui.",
      short:
        "Nullam vulputate commodo euismod. In sodales imperdiet nisl vel scelerisque.",
      tag: "PifaBiz",
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
      tag: "PifaBiz",
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
      tag: "PifaBiz",
      image: "/img/img-03.jpg",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "4",
      title:
        "aliquam, augue enim tempor odio, eu malesuada tortor lacus quis nisi.",
      short: "Integer ut mollis sapien. Duis pellentesque leo pretium pretium ",
      tag: "PifaBiz",
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
      tag: "PifaBiz",
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
      tag: "PifaBiz",
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
      tag: "PifaBiz",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "8",
      title: "neque sed orci egestas viverra. In dictum at lacus sed faucibus.",
      short:
        "Suspendisse ligula lectus, tempor nec semper et, blandit id dolor. Donec vel",
      tag: "PifaBiz",
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
      tag: "PifaBiz",
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
      tag: "PifaBiz",
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
      tag: "PifaBiz",
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
      tag: "PifaBiz",
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
      tag: "PifaBiz",
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
      tag: "PifaBiz",
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
      tag: "PifaBiz",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "1",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui.",
      short:
        "Nullam vulputate commodo euismod. In sodales imperdiet nisl vel scelerisque.",
      tag: "Teknologi",
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
      tag: "Teknologi",
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
      tag: "Teknologi",
      image: "/img/img-03.jpg",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "4",
      title:
        "aliquam, augue enim tempor odio, eu malesuada tortor lacus quis nisi.",
      short: "Integer ut mollis sapien. Duis pellentesque leo pretium pretium ",
      tag: "Teknologi",
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
      tag: "Teknologi",
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
      tag: "Teknologi",
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
      tag: "Teknologi",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "8",
      title: "neque sed orci egestas viverra. In dictum at lacus sed faucibus.",
      short:
        "Suspendisse ligula lectus, tempor nec semper et, blandit id dolor. Donec vel",
      tag: "Teknologi",
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
      tag: "Teknologi",
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
      tag: "Teknologi",
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
      tag: "Teknologi",
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
      tag: "Teknologi",
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
      tag: "Teknologi",
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
      tag: "Teknologi",
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
      tag: "Teknologi",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "1",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui.",
      short:
        "Nullam vulputate commodo euismod. In sodales imperdiet nisl vel scelerisque.",
      tag: "Bisnis",
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
      tag: "Bisnis",
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
      tag: "Bisnis",
      image: "/img/img-03.jpg",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "4",
      title:
        "aliquam, augue enim tempor odio, eu malesuada tortor lacus quis nisi.",
      short: "Integer ut mollis sapien. Duis pellentesque leo pretium pretium ",
      tag: "Bisnis",
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
      tag: "Bisnis",
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
      tag: "Bisnis",
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
      tag: "Bisnis",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "8",
      title: "neque sed orci egestas viverra. In dictum at lacus sed faucibus.",
      short:
        "Suspendisse ligula lectus, tempor nec semper et, blandit id dolor. Donec vel",
      tag: "Bisnis",
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
      tag: "Bisnis",
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
      tag: "Bisnis",
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
      tag: "Bisnis",
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
      tag: "Bisnis",
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
      tag: "Bisnis",
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
      tag: "Bisnis",
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
      tag: "Bisnis",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "1",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui.",
      short:
        "Nullam vulputate commodo euismod. In sodales imperdiet nisl vel scelerisque.",
      tag: "Lifestyle",
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
      tag: "Lifestyle",
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
      tag: "Lifestyle",
      image: "/img/img-03.jpg",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "4",
      title:
        "aliquam, augue enim tempor odio, eu malesuada tortor lacus quis nisi.",
      short: "Integer ut mollis sapien. Duis pellentesque leo pretium pretium ",
      tag: "Lifestyle",
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
      tag: "Lifestyle",
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
      tag: "Lifestyle",
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
      tag: "Lifestyle",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "8",
      title: "neque sed orci egestas viverra. In dictum at lacus sed faucibus.",
      short:
        "Suspendisse ligula lectus, tempor nec semper et, blandit id dolor. Donec vel",
      tag: "Lifestyle",
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
      tag: "Lifestyle",
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
      tag: "Lifestyle",
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
      tag: "Lifestyle",
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
      tag: "Lifestyle",
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
      tag: "Lifestyle",
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
      tag: "Lifestyle",
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
      tag: "Lifestyle",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "1",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui.",
      short:
        "Nullam vulputate commodo euismod. In sodales imperdiet nisl vel scelerisque.",
      tag: "Olahraga",
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
      tag: "Olahraga",
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
      tag: "Olahraga",
      image: "/img/img-03.jpg",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "4",
      title:
        "aliquam, augue enim tempor odio, eu malesuada tortor lacus quis nisi.",
      short: "Integer ut mollis sapien. Duis pellentesque leo pretium pretium ",
      tag: "Olahraga",
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
      tag: "Olahraga",
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
      tag: "Olahraga",
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
      tag: "Olahraga",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "8",
      title: "neque sed orci egestas viverra. In dictum at lacus sed faucibus.",
      short:
        "Suspendisse ligula lectus, tempor nec semper et, blandit id dolor. Donec vel",
      tag: "Olahraga",
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
      tag: "Olahraga",
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
      tag: "Olahraga",
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
      tag: "Olahraga",
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
      tag: "Olahraga",
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
      tag: "Olahraga",
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
      tag: "Olahraga",
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
      tag: "Olahraga",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "1",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui.",
      short:
        "Nullam vulputate commodo euismod. In sodales imperdiet nisl vel scelerisque.",
      tag: "Politik",
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
      tag: "Politik",
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
      tag: "Politik",
      image: "/img/img-03.jpg",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "4",
      title:
        "aliquam, augue enim tempor odio, eu malesuada tortor lacus quis nisi.",
      short: "Integer ut mollis sapien. Duis pellentesque leo pretium pretium ",
      tag: "Politik",
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
      tag: "Politik",
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
      tag: "Politik",
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
      tag: "Politik",
      image: "",
      location: "Indonesia",
      date: "20 Jan 2024",
    },
    {
      id: "8",
      title: "neque sed orci egestas viverra. In dictum at lacus sed faucibus.",
      short:
        "Suspendisse ligula lectus, tempor nec semper et, blandit id dolor. Donec vel",
      tag: "Politik",
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
      tag: "Politik",
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
      tag: "Politik",
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
      tag: "Politik",
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
      tag: "Politik",
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
      tag: "Politik",
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
      tag: "Politik",
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
      tag: "Politik",
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
