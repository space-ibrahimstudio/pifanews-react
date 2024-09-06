import React, { Fragment, useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { useApi } from "../../libs/plugins/api";
import { useAuth } from "../../libs/security/auth";
import { useDocument } from "../../libs/plugins/document";
import { inputSchema, errorSchema } from "../../libs/plugins/common";
import { PageLayout } from "../../components/layouts/pages";
import { DashboardContainer, DashboardHead, DashboardToolbar } from "./index";
import Fieldset from "../../components/user-inputs/inputs";
import { TagsButton } from "../../components/user-inputs/buttons";
import TextEditor, { EditorContent, EditorToolbar, EditorFooter } from "../../components/user-inputs/text-editor";
import { Arrow, Trash } from "../../components/contents/icons";

const imgURL = process.env.REACT_APP_IMAGE_URL;

const DashboardUpdatePage = () => {
  const { params } = useParams();
  const navigate = useNavigate();
  const { isLoggedin, userData } = useAuth();
  const { apiRead, apiGet, apiCrud } = useApi();
  const { short } = useDocument();
  const id = `${short}-${params}`;
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [postData, setPostData] = useState(null);
  const [inputData, setInputData] = useState({ ...inputSchema });
  const [errors, setErrors] = useState({ ...errorSchema });

  const [newsCatData, setNewsCatData] = useState([]);
  const [localCatData, setLocalCatData] = useState([]);
  const [localeDate, setLocaleDate] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [tagSuggests, setTagSuggests] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [initialContent, setInitialContent] = useState("");

  const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayName = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    if (name === "tgl" && value !== "") {
      const formattedDate = formatDate(value);
      setLocaleDate(formattedDate);
    }
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
  };

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat halaman. Mohon periksa koneksi internet anda dan coba lagi.";
    const formData = new FormData();
    setIsFetching(true);
    try {
      formData.append("slug", params);
      const data = await apiRead(formData, "main", "detailnew");
      if (data && data.data && data.data.length > 0) {
        const selecteddata = data.data[0];
        setPostData(selecteddata);
        setInputData({ judul: selecteddata.judul_berita, thumbnail: selecteddata.thumnail_berita, catberita: selecteddata.nama_kategori_berita_id, catdaerah: selecteddata.nama_kategori_daerah_id, tgl: selecteddata.tanggal_berita, penulis: selecteddata.penulis_berita });
        setSelectedImage(`${imgURL}/${selecteddata.img_berita}`);
        setInitialContent(selecteddata.isi_berita);
      } else {
        setPostData(null);
      }
    } catch (error) {
      console.error(errormsg, error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchAdditionalData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat data tambahan. Mohon periksa koneksi internet anda dan coba lagi.";
    try {
      const newscatdata = await apiGet("main", "categorynew");
      setNewsCatData(newscatdata && newscatdata.data && newscatdata.data.length > 0 ? newscatdata.data : []);
      const localcatdata = await apiGet("main", "categoryarea");
      setLocalCatData(newscatdata && localcatdata.data && localcatdata.data.length > 0 ? localcatdata.data : []);
    } catch (error) {
      console.error(errormsg, error);
    }
  };

  const tools = [["h1", "h2", "bold", "italic", "underline", "strikethrough", "ol", "ul"]];

  const fetchTagSuggests = async (query) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ secret: userData.token_activation }));
    formData.append("catberita", "");
    formData.append("catdaerah", "");
    formData.append("tag", query);
    try {
      const response = await apiRead(formData, "office", "searchdata");
      setTagSuggests(response && response.data && response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleTagSearch = (e) => {
    const value = e.target.value;
    setTagQuery(value);
    if (value) {
      fetchTagSuggests(value);
    } else {
      setTagSuggests([]);
    }
  };

  const handleAddTag = (tag) => {
    if (!selectedTags.some((existingTag) => existingTag.tag === tag.nama_kategori_tag)) {
      setSelectedTags([...selectedTags, { tag: tag.nama_kategori_tag }]);
    }
    setTagQuery("");
    setTagSuggests([]);
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag.tag !== tagToRemove));
  };

  const handleUpdate = async (content) => {
    const formData = new FormData();
    const base64Content = btoa(unescape(encodeURIComponent(content)));
    const submittedData = { secret: userData.token_activation, idedit: postData.id, tgl: localeDate, judul: inputData.judul, penulis: inputData.penulis, catberita: inputData.catberita, catdaerah: inputData.catdaerah, content: base64Content, thumbnail: inputData.thumbnail, tag: selectedTags };
    formData.append("data", JSON.stringify(submittedData));
    formData.append("fileimg", selectedImage);
    const confirm = window.confirm("Apakah anda yakin untuk mempublish berita baru?");
    if (!confirm) {
      return;
    }
    setIsSubmitting(true);
    try {
      await apiCrud(formData, "office", "editnews");
      alert("Selamat, postingan berita baru berhasil dipublish!");
      navigate(`/berita/${params}`);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const formData = new FormData();
    const submittedData = { secret: userData.token_activation, iddelete: postData.id };
    formData.append("data", JSON.stringify(submittedData));
    const confirm = window.confirm("Apakah anda yakin untuk menghapus berita ini?");
    if (!confirm) {
      return;
    }
    setIsSubmitting(true);
    try {
      await apiCrud(formData, "office", "delnews");
      alert("Selamat, postingan berita berhasil dihapus!");
      navigate(-1);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAdditionalData();
  }, [params]);

  if (!isLoggedin) {
    <Navigate to="/login" />;
  }

  if (userData.level !== "admin") {
    <Navigate to="/" />;
  }

  return (
    <PageLayout pageid={id} type="private">
      <DashboardContainer>
        <DashboardHead title="Update Berita" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod." />
        <DashboardToolbar>
          <Button id={`${id}-back-button`} buttonText="Kembali" onClick={() => navigate(-1)} startContent={<Arrow size="var(--pixel-25)" direction="left" />} />
          <Button id={`${id}-delete-button`} variant="line" color="#f31260" buttonText="Hapus Berita" onClick={handleDelete} startContent={<Trash size="var(--pixel-25)" />} />
        </DashboardToolbar>
        <TextEditor maxW="var(--pixel-700)" initialContent={initialContent} onSubmit={handleUpdate}>
          <Input id={`${id}-post-title`} type="text" labelText="Judul Berita" placeholder="Masukkan judul berita" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
          <Input id={`${id}-post-banner`} variant="upload" labelText="Thumbnail Berita" isPreview note="Rekomendasi ukuran: 1200 x 628 pixels" initialImage={selectedImage} onSelect={handleImageSelect} maxSize={5 * 1024 * 1024} isRequired />
          <Input id={`${id}-post-alt`} type="text" labelText="Thumbnail Alt" placeholder="Masukkan alternatif text" name="thumbnail" value={inputData.thumbnail} onChange={handleInputChange} errorContent={errors.thumbnail} isRequired />
          <Fieldset>
            <Input id={`${id}-post-catnews`} variant="select" isSearchable labelText="Kategori Berita" placeholder="Pilih kategori berita" name="catberita" value={inputData.catberita} options={newsCatData.map((item) => ({ value: item.id, label: item.nama_kategori_berita }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "catberita", value: selectedValue } })} errorContent={errors.catberita} isRequired />
            <Input id={`${id}-post-catlocal`} variant="select" isSearchable labelText="Kategori Daerah" placeholder="Pilih kategori daerah" name="catdaerah" value={inputData.catdaerah} options={localCatData.map((item) => ({ value: item.id, label: item.nama_kategori_daerah }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "catdaerah", value: selectedValue } })} errorContent={errors.catdaerah} isRequired />
          </Fieldset>
          <Fieldset>
            <Input id={`${id}-post-date`} type="date" labelText="Tanggal Terbit" name="tgl" value={inputData.tgl} onChange={handleInputChange} errorContent={errors.tgl} isRequired />
            <Input id={`${id}-post-writer`} type="text" labelText="Penulis Berita" placeholder="Masukkan nama penulis" name="penulis" value={inputData.penulis} onChange={handleInputChange} errorContent={errors.penulis} isRequired />
          </Fieldset>
          <EditorToolbar tools={tools} />
          <EditorContent />
          <Fragment>
            {selectedTags.length > 0 && (
              <Fieldset>
                {selectedTags.map((item, index) => (
                  <TagsButton key={index} id={`${id}-tag-${index}`} type="select" text={item.tag} onClick={() => handleRemoveTag(item.tag)} />
                ))}
              </Fieldset>
            )}
          </Fragment>
          <Input id={`${id}-post-tag`} type="text" labelText="Tag Berita" placeholder="Cari tag berita" name="tagQuery" value={tagQuery} onChange={handleTagSearch} />
          <Fragment>
            {tagSuggests.length > 0 && (
              <Fieldset>
                {tagSuggests.map((item, index) => (
                  <TagsButton key={index} id={`${id}-suggest-tag-${index}`} text={item.nama_kategori_tag} onClick={() => handleAddTag(item)} />
                ))}
              </Fieldset>
            )}
          </Fragment>
          <EditorFooter>
            <Button type="submit" buttonText="Simpan Perubahan" action="save" isLoading={isSubmitting} />
          </EditorFooter>
        </TextEditor>
      </DashboardContainer>
    </PageLayout>
  );
};

export default DashboardUpdatePage;
