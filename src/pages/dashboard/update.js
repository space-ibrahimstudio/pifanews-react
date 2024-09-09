import React, { Fragment, useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useDevmode } from "@ibrahimstudio/react";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { useApi } from "../../libs/plugins/api";
import { useAuth } from "../../libs/security/auth";
import { useDocument } from "../../libs/plugins/document";
import { SEO } from "../../libs/plugins/seo";
import { inputSchema, errorSchema } from "../../libs/plugins/common";
import { inputValidator } from "../../libs/helpers";
import { PageLayout } from "../../components/layouts/pages";
import Container from "../../components/layouts/frames";
import { DashboardContainer, DashboardHead, DashboardToolbar } from "./index";
import Fieldset from "../../components/user-inputs/inputs";
import { TagsButton } from "../../components/user-inputs/buttons";
import TextEditor, { EditorContent, EditorToolbar, EditorFooter } from "../../components/user-inputs/text-editor";
import { SubmitForm } from "../../components/user-inputs/form";
import { OGCard } from "../../components/contents/cards";
import { Arrow, Trash } from "../../components/contents/icons";

const imgURL = process.env.REACT_APP_IMAGE_URL;

const DashboardUpdatePage = () => {
  const { uscope, uslug, params } = useParams();
  const navigate = useNavigate();
  const { log } = useDevmode();
  const { isLoggedin, userData } = useAuth();
  const { apiRead, apiGet, apiCrud } = useApi();
  const { short } = useDocument();
  const id = `${short}-${params}`;
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedID, setSelectedID] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  const [inputData, setInputData] = useState({ ...inputSchema });
  const [errors, setErrors] = useState({ ...errorSchema });

  const [newsCatData, setNewsCatData] = useState([]);
  const [localCatData, setLocalCatData] = useState([]);
  const [localeDate, setLocaleDate] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [tagSuggests, setTagSuggests] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [initialContent, setInitialContent] = useState("");
  const [selectedCatType, setSelectedCatType] = useState("berita");

  const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const monthsObj = { Januari: "01", Februari: "02", Maret: "03", April: "04", Mei: "05", Juni: "06", Juli: "07", Agustus: "08", September: "09", Oktober: "10", November: "11", Desember: "12" };

  const reversedDate = (formattedDate) => {
    const [dayOfWeek, day, monthName, year] = formattedDate.split(" ");
    const month = monthsObj[monthName];
    const dayNum = day.replace(",", "").padStart(2, "0");
    return `${year}-${month}-${dayNum}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayName = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat halaman. Mohon periksa koneksi internet anda dan coba lagi.";
    const formData = new FormData();
    const addtFormData = new FormData();
    let data;
    setIsFetching(true);
    try {
      switch (uscope) {
        case "berita":
          switch (uslug) {
            case "isi-berita":
              formData.append("slug", params);
              data = await apiRead(formData, "main", "detailnew");
              if (data && data.data && data.data.length > 0) {
                const selecteddata = data.data[0];
                setSelectedID(selecteddata.id);
                setPageTitle(selecteddata.judul_berita);
                setInputData({ judul: selecteddata.judul_berita, thumbnail: selecteddata.thumnail_berita, catberita: selecteddata.nama_kategori_berita_id, catdaerah: selecteddata.nama_kategori_daerah_id, tgl: reversedDate(selecteddata.tanggal_berita), penulis: selecteddata.penulis_berita, image: `${imgURL}/${selecteddata.img_berita}` });
                setInitialContent(selecteddata.isi_berita);
              } else {
                setSelectedID("");
                setPageTitle("404 NOT FOUND");
                setInputData({ judul: "", thumbnail: "", catberita: "", catdaerah: "", tgl: "", penulis: "", image: "" });
                setInitialContent("");
                navigate(-1);
              }
              break;
            default:
              break;
          }
          break;
        case "master":
          switch (uslug) {
            case "kategori":
              let beritadata = [];
              let daerahdata = [];
              let mergeddata = [];
              formData.append("data", JSON.stringify({ secret: userData.token_activation, kategori: "berita" }));
              addtFormData.append("data", JSON.stringify({ secret: userData.token_activation, kategori: "daerah" }));
              const beritares = await apiRead(formData, "office", "viewcategory");
              const daerahres = await apiRead(addtFormData, "office", "viewcategory");
              if (beritares && beritares.data && beritares.data.length > 0) {
                beritadata = beritares.data;
              } else {
                beritadata = [];
              }
              if (daerahres && daerahres.data && daerahres.data.length > 0) {
                daerahdata = daerahres.data;
              } else {
                daerahdata = [];
              }
              mergeddata = [...beritadata, ...daerahdata];
              const categorydata = mergeddata.find((item) => item.slug === params);
              if (categorydata) {
                setSelectedID(categorydata.id);
                setPageTitle(categorydata.nama_kategori_berita ? categorydata.nama_kategori_berita : categorydata.nama_kategori_daerah);
                setInputData({ judul: categorydata.nama_kategori_berita ? categorydata.nama_kategori_berita : categorydata.nama_kategori_daerah, desc: categorydata.desc, image: categorydata.img });
                setSelectedCatType(categorydata.nama_kategori_berita ? "berita" : "daerah");
              } else {
                setSelectedID("");
                setPageTitle("404 NOT FOUND");
                setInputData({ judul: "", desc: "", image: "" });
                setSelectedCatType("berita");
                navigate(-1);
              }
              break;
            default:
              break;
          }
          break;
        default:
          break;
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    if (name === "tgl" && value !== "") {
      const formattedDate = formatDate(value);
      setLocaleDate(formattedDate);
    }
  };

  const handleImageSelect = async (file) => {
    setSelectedImage(file);
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setSelectedImageUrl(url);
    } else {
      setSelectedImageUrl(null);
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

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    let requiredFields = [];
    switch (uscope) {
      case "master":
        switch (uslug) {
          case "kategori":
            requiredFields = ["judul", "desc"];
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    const validationErrors = inputValidator(inputData, requiredFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const confirmmsg = "Apakah anda yakin untuk menyimpan perubahan?";
    const successmsg = "Selamat! Perubahan data berhasil disimpan.";
    const errormsg = "Terjadi kesalahan saat menyimpan perubahan. Mohon periksa koneksi internet anda dan coba lagi.";
    const confirm = window.confirm(confirmmsg);
    if (!confirm) {
      return;
    }
    setIsSubmitting(true);
    try {
      let submittedData;
      switch (uscope) {
        case "master":
          switch (uslug) {
            case "kategori":
              submittedData = { secret: userData.token_activation, name: inputData.judul, desc: inputData.desc };
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      const formData = new FormData();
      formData.append("data", JSON.stringify(submittedData));
      if (uslug === "kategori") {
        formData.append("idedit", selectedID);
        formData.append("fileimg", selectedImage);
      }
      await apiCrud(formData, "office", endpoint);
      alert(successmsg);
      log("submitted data:", submittedData);
      await fetchData();
      await fetchAdditionalData();
    } catch (error) {
      alert(errormsg);
      console.error(errormsg, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (endpoint) => {
    const confirmmsg = "Apakah anda yakin untuk menghapus data terpilih?";
    const successmsg = "Selamat! Data terpilih berhasil dihapus.";
    const errormsg = "Terjadi kesalahan saat menghapus data. Mohon periksa koneksi internet anda dan coba lagi.";
    const confirm = window.confirm(confirmmsg);
    if (!confirm) {
      return;
    }
    setIsSubmitting(true);
    try {
      let submittedData;
      switch (uscope) {
        case "berita":
          switch (uslug) {
            case "isi-berita":
              submittedData = { secret: userData.token_activation, iddelete: selectedID };
              break;
            default:
              break;
          }
          break;
        case "master":
          switch (uslug) {
            case "kategori":
              submittedData = { secret: userData.token_activation, name: "", desc: "" };
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      const formData = new FormData();
      formData.append("data", JSON.stringify(submittedData));
      if (uslug === "kategori") {
        formData.append("iddel", selectedID);
      }
      await apiCrud(formData, "office", endpoint);
      alert(successmsg);
      log("submitted data:", submittedData);
      navigate(-1);
    } catch (error) {
      alert(errormsg);
      console.error(errormsg, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (uscope) {
      case "berita":
        switch (uslug) {
          case "isi-berita":
            const tools = [["h1", "h2", "bold", "italic", "underline", "strikethrough", "ol", "ul"]];
            const handleUpdate = async (content) => {
              const formData = new FormData();
              const base64Content = btoa(unescape(encodeURIComponent(content)));
              const submittedData = { secret: userData.token_activation, idedit: selectedID, tgl: localeDate, judul: inputData.judul, penulis: inputData.penulis, catberita: inputData.catberita, catdaerah: inputData.catdaerah, content: base64Content, thumbnail: inputData.thumbnail, tag: selectedTags };
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

            return (
              <Fragment>
                <DashboardHead title="Update Berita" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod." />
                <DashboardToolbar>
                  <Button id={`${id}-back-button`} buttonText="Kembali" onClick={() => navigate(-1)} startContent={<Arrow size="var(--pixel-25)" direction="left" />} />
                  <Button id={`${id}-delete-button`} variant="line" color="var(--color-red)" buttonText="Hapus Berita" onClick={() => handleDelete("delnews")} startContent={<Trash size="var(--pixel-25)" />} />
                </DashboardToolbar>
                <Container isasChild isWrap gap="var(--pixel-10)">
                  <TextEditor maxW="var(--pixel-700)" initialContent={initialContent} onSubmit={handleUpdate}>
                    <Input id={`${id}-post-title`} type="text" labelText="Judul Berita" placeholder="Masukkan judul berita" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
                    <Input id={`${id}-post-banner`} variant="upload" labelText="Thumbnail Berita" isPreview note="Rekomendasi ukuran: 1200 x 628 pixels" initialImage={inputData.image} onSelect={handleImageSelect} maxSize={5 * 1024 * 1024} isRequired />
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
                  <OGCard image={selectedImageUrl ? selectedImageUrl : inputData.image && inputData.image !== "" ? inputData.image : "/img/fallback.jpg"} title={inputData.judul} desc={inputData.thumbnail} scope="/berita/" />
                </Container>
              </Fragment>
            );
          default:
            return null;
        }
      case "master":
        switch (uslug) {
          case "kategori":
            return (
              <Fragment>
                <DashboardHead title={selectedCatType === "berita" ? "Kategori Berita" : "Kategori Daerah"} desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod." />
                <DashboardToolbar>
                  <Button id={`${id}-back-button`} buttonText="Kembali" onClick={() => navigate(-1)} startContent={<Arrow size="var(--pixel-25)" direction="left" />} />
                  <Button id={`${id}-delete-button`} variant="line" color="var(--color-red)" buttonText="Hapus Kategori" onClick={() => handleDelete("cudcatberita")} startContent={<Trash size="var(--pixel-25)" />} />
                </DashboardToolbar>
                <Container isasChild isWrap gap="var(--pixel-10)">
                  <SubmitForm minW="var(--pixel-350)" onSubmit={selectedCatType === "berita" ? (e) => handleSubmit(e, "cudcatberita") : (e) => handleSubmit(e, "cudcatdaerah")}>
                    <Input id={`${id}-cat-image`} variant="upload" labelText="Thumbnail (og:image)" isPreview note="Rekomendasi ukuran: 920 x 470 pixels" initialImage={inputData.image} onSelect={handleImageSelect} isRequired />
                    <Input id={`${id}-cat-title`} type="text" labelText="Judul (og:title)" placeholder="Masukkan judul kategori" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
                    <Input id={`${id}-cat-desc`} type="text" labelText="Deskripsi (og:description)" placeholder="Masukkan deskripsi kategori" name="desc" value={inputData.desc} onChange={handleInputChange} errorContent={errors.desc} isRequired />
                    <EditorFooter>
                      <Button type="submit" buttonText="Simpan Perubahan" action="save" isLoading={isSubmitting} />
                    </EditorFooter>
                  </SubmitForm>
                  <OGCard image={selectedImageUrl ? selectedImageUrl : inputData.image && inputData.image !== "" ? inputData.image : "/img/fallback.jpg"} title={inputData.judul} desc={inputData.desc} scope="/berita/kategori/" />
                </Container>
              </Fragment>
            );
          default:
            return null;
        }
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchData();
    fetchAdditionalData();
  }, [uscope, uslug, params]);

  if (!isLoggedin) {
    <Navigate to="/login" />;
  }

  if (userData.level !== "admin") {
    <Navigate to="/" />;
  }

  return (
    <Fragment>
      <SEO title={`Update: ${pageTitle}`} route={`/dashboard/${uscope}/${uslug}/update/${params}`} />
      <PageLayout pageid={id} type="private">
        <DashboardContainer>{renderContent()}</DashboardContainer>
      </PageLayout>
    </Fragment>
  );
};

export default DashboardUpdatePage;
