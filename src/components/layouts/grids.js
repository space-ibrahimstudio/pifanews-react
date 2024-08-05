import React from "react";
import { useNavigate } from "react-router-dom";
import { NewsDisplayCard } from "../contents/cards";
import styles from "./styles/news3grid.module.css";

export const News3Grid = ({ id, posts = [] }) => {
  const navigate = useNavigate();
  const compid = `${id}-3-grid`;
  const slicedposts = posts.slice(0, 3);

  return (
    <section id={compid} className={styles.news3grid}>
      {slicedposts.length > 0 && <NewsDisplayCard id={`${compid}-${slicedposts[0].id}`} title={slicedposts[0].judul_berita} short={slicedposts[0].isi_berita.substring(0, 160)} tag={slicedposts[0].nama_kategori_berita} image={slicedposts[0].img_berita} loc={slicedposts[0].penulis_berita} date={slicedposts[0].tanggal_berita} align="stretch" height="var(--pixel-270)" onClick={() => navigate(`/berita/${slicedposts[0].slug}`)} />}
      <div className={styles.news3gridSmall}>
        {slicedposts.slice(1).map((post, index) => (
          <div key={index} className={styles.news3grid200}>
            <NewsDisplayCard id={`${compid}-${post.id}`} title={post.judul_berita} short={post.isi_berita.substring(0, 160)} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} align="stretch" height="var(--pixel-270)" onClick={() => navigate(`/berita/${post.slug}`)} />
          </div>
        ))}
      </div>
    </section>
  );
};
