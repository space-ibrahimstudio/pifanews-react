import React, { Fragment, useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useDevmode } from "@ibrahimstudio/react";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import useApi from "../../libs/plugins/apis";
import useAuth from "../../libs/guards/auth";
import useGraph from "../../components/content/graph";
import { SEO } from "../../libs/plugins/seo";
import { inputValidator, useInputSchema, useDocument, getNestedValue } from "../../libs/plugins/helpers";
import Page, { Container, Section, Header } from "../../components/layout/frames";
import Fieldset from "../../components/formel/inputs";
import { TagsButton } from "../../components/formel/buttons";
import TextEditor, { EditorContent, EditorToolbar, EditorFooter } from "../../components/formel/text-editor";
import Form from "../../components/formel/form";
import PopOver from "../../components/layout/popover";
import { OGCard, EventDetailCard } from "../../components/layout/cards";
import useIcons from "../../components/content/icons";

const imgdomain = process.env.REACT_APP_API_URL;

const DashboardUpdatePage = () => {
  const { uscope, uslug, params } = useParams();
  const navigate = useNavigate();
  const { log } = useDevmode();
  const { userData } = useAuth();
  const { apiRead, apiGet, apiCrud } = useApi();
  const { short } = useDocument();
  const { inputSch, errorSch } = useInputSchema();
  const { H1, P } = useGraph();
  const { Arrow, Trash } = useIcons();
  const id = `${short}-${params}`;
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedID, setSelectedID] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [pageTitle, setPageTitle] = useState("");

  const [inputData, setInputData] = useState({ ...inputSch });
  const [errors, setErrors] = useState({ ...errorSch });

  const [newsCatData, setNewsCatData] = useState([]);
  const [localCatData, setLocalCatData] = useState([]);
  const [localeDate, setLocaleDate] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [tagSuggests, setTagSuggests] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [initialContent, setInitialContent] = useState("");
  const [selectedCatType, setSelectedCatType] = useState("berita");
  const [moduleDetData, setModuleDetData] = useState([]);

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
              data = await apiRead(formData, "main", "detailnew2");
              if (data && data.data) {
                const selecteddata = data.data;
                setSelectedID(selecteddata.berita.id);
                setPageTitle(selecteddata.berita.judul_berita);
                setInputData({ judul: selecteddata.berita.judul_berita, thumbnail: selecteddata.berita.thumnail_berita, catberita: selecteddata.berita.nama_kategori_berita_id, catdaerah: selecteddata.berita.nama_kategori_daerah_id, post_date: reversedDate(selecteddata.berita.tanggal_berita), penulis: selecteddata.berita.penulis_berita, image: `${imgdomain}/images/img_berita/${selecteddata.berita.img_berita}` });
                setInitialContent(selecteddata.berita.isi_berita);
                setLocaleDate(selecteddata.berita.tanggal_berita);
                setSelectedTags(selecteddata.tag.map((item) => ({ tag: item.nama_kategori_tag })));
              } else {
                setSelectedID("");
                setPageTitle("404 NOT FOUND");
                setInputData({ judul: "", thumbnail: "", catberita: "", catdaerah: "", post_date: "", penulis: "", image: "" });
                setInitialContent("");
                setLocaleDate("");
                setSelectedTags([]);
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
        case "event":
          switch (uslug) {
            case "module":
              formData.append("data", JSON.stringify({ secret: userData.token_activation, idevent: params }));
              data = await apiRead(formData, "event", "vieweventedit");
              const detaildata = await apiRead(formData, "event", "vieweventdetail");
              if (data && data.data && data.data.length > 0) {
                const selecteddata = data.data[0];
                setSelectedID(selecteddata.idevent);
                setSelectedSlug(selecteddata.slug);
                setPageTitle(selecteddata.title);
                setInputData({ judul: selecteddata.title, image: `${imgdomain}/images/event/${selecteddata.img}`, desc: selecteddata.descripiton, tanggal: selecteddata.tanggal, highlight: selecteddata.highlight, info: selecteddata.info, syarat: selecteddata.syarat });
                setModuleDetData(detaildata && detaildata.data && detaildata.data.length > 0 ? detaildata.data : []);
              } else {
                setSelectedID("");
                setSelectedSlug("");
                setPageTitle("404 NOT FOUND");
                setInputData({ judul: "", image: "", desc: "", tanggal: "", highlight: "", info: "", syarat: "" });
                setModuleDetData([]);
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
    if (name === "post_date" && value !== "") {
      const formattedDate = formatDate(value);
      setLocaleDate(formattedDate);
      log(`converted: "${value}" => "${formattedDate}"`);
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

  const switchData = async (params) => {
    setSelectedData(params);
    const currentData = (arraydata, identifier) => {
      if (typeof identifier === "string") {
        return arraydata.find((item) => getNestedValue(item, identifier) === params);
      } else {
        return arraydata.find((item) => item[identifier] === params);
      }
    };
    const errormsg = `Terjadi kesalahan saat memuat data. Mohon periksa koneksi internet anda dan coba lagi.`;
    let switchedData;
    setIsFetching(true);
    try {
      switch (uscope) {
        case "event":
          switch (uslug) {
            case "module":
              switchedData = currentData(moduleDetData, "ideventdetail");
              log(`id ${uslug} data switched:`, switchedData.ideventdetail);
              setInputData({ ...inputData, event_id: switchedData.ideventdetail, event_title: switchedData.judul, event_image: `${imgdomain}/images/event/${switchedData.img}`, event_day: switchedData.hari, event_info: switchedData.info, event_cost: switchedData.biaya, event_date: switchedData.tanggal, event_loc: switchedData.alamat, event_coords: switchedData.koordinat, event_guide: switchedData.panduan });
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

  const handleSubmit = async (e, endpoint, sendpoint = "office") => {
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
      case "event":
        switch (uslug) {
          case "module":
            requiredFields = ["judul", "highlight", "desc", "info", "syarat", "tanggal"];
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
        case "event":
          switch (uslug) {
            case "module":
              submittedData = { secret: userData.token_activation, title: inputData.judul, highlight: inputData.highlight, descripiton: inputData.desc, info: inputData.info, syarat: inputData.syarat, tanggal: inputData.tanggal };
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
      formData.append("idedit", selectedID);
      formData.append("fileimg", selectedImage);
      await apiCrud(formData, sendpoint, endpoint);
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

  const handleDelete = async (endpoint, sendpoint = "office") => {
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
        case "event":
          switch (uslug) {
            case "module":
              submittedData = { secret: userData.token_activation, title: "", highlight: "", descripiton: "", info: "", syarat: "", tanggal: "" };
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
      if (uslug === "kategori" || uslug === "module") {
        formData.append("iddel", selectedID);
      }
      await apiCrud(formData, sendpoint, endpoint);
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
            const tools = [["h1", "h2", "bold", "italic", "underline", "strikethrough", "ol", "ul", "image"]];
            const handleUpdate = async (content) => {
              const requiredFields = ["post_date", "judul", "penulis", "catberita", "catdaerah", "thumbnail"];
              const validationErrors = inputValidator(inputData, requiredFields);
              if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
              }
              if (content === "") {
                alert("Content is required.");
                return;
              }
              if (selectedTags.length <= 0) {
                setErrors({ ...errors, tag_suggest: "Tag is required, choose at least 1 tag." });
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
                const base64Content = btoa(unescape(encodeURIComponent(`<div>${content}</div>`)));
                const submittedData = { secret: userData.token_activation, idedit: selectedID, tgl: localeDate, judul: inputData.judul, penulis: inputData.penulis, catberita: inputData.catberita, catdaerah: inputData.catdaerah, content: base64Content, thumbnail: inputData.thumbnail, tag: selectedTags };
                const formData = new FormData();
                formData.append("data", JSON.stringify(submittedData));
                formData.append("fileimg", selectedImage);
                await apiCrud(formData, "office", "editnews");
                alert(successmsg);
                navigate(`/berita/${params}`);
              } catch (error) {
                console.error(errormsg, error);
              } finally {
                setIsSubmitting(false);
              }
            };

            return (
              <Fragment>
                <Header isasChild alignItems="center" gap="var(--pixel-15)">
                  <H1 size="lg" color="var(--color-primary)" align="center">
                    Update Berita
                  </H1>
                  {/* <P align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod.</P> */}
                </Header>
                <Section isWrap alignItems="center" justifyContent="space-between" gap="var(--pixel-10) var(--pixel-10)" margin="0">
                  <Button id="back-button" buttonText="Kembali" onClick={() => navigate(-1)} startContent={<Arrow size="var(--pixel-25)" direction="left" />} />
                  <Button id="delete-button" variant="line" color="var(--color-red)" buttonText="Hapus Berita" onClick={() => handleDelete("delnews")} startContent={<Trash size="var(--pixel-25)" />} />
                </Section>
                <Section isWrap gap="var(--pixel-10)">
                  <TextEditor maxW="var(--pixel-700)" initialContent={initialContent} onSubmit={handleUpdate}>
                    <Input id="post-title" type="text" labelText="Judul Berita" placeholder="Masukkan judul berita" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
                    <Input id="post-banner" variant="upload" labelText="Thumbnail Berita" isPreview note="Rekomendasi ukuran: 1200 x 628 pixels" initialImage={inputData.image} onSelect={handleImageSelect} maxSize={5 * 1024 * 1024} isRequired />
                    <Input id="post-alt" type="text" labelText="Thumbnail Alt" placeholder="Masukkan alternatif text" name="thumbnail" value={inputData.thumbnail} onChange={handleInputChange} errorContent={errors.thumbnail} isRequired />
                    <Fieldset>
                      <Input id="post-catnews" variant="select" isSearchable labelText="Kategori Berita" placeholder="Pilih kategori berita" name="catberita" value={inputData.catberita} options={newsCatData.map((item) => ({ value: item.id, label: item.nama_kategori_berita }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "catberita", value: selectedValue } })} errorContent={errors.catberita} isRequired />
                      <Input id="post-catlocal" variant="select" isSearchable labelText="Kategori Daerah" placeholder="Pilih kategori daerah" name="catdaerah" value={inputData.catdaerah} options={localCatData.map((item) => ({ value: item.id, label: item.nama_kategori_daerah }))} onSelect={(selectedValue) => handleInputChange({ target: { name: "catdaerah", value: selectedValue } })} errorContent={errors.catdaerah} isRequired />
                    </Fieldset>
                    <Fieldset>
                      <Input id="post-date" type="date" labelText="Tanggal Terbit" name="post_date" value={inputData.post_date} onChange={handleInputChange} errorContent={errors.post_date} isRequired />
                      <Input id="post-writer" type="text" labelText="Penulis Berita" placeholder="Masukkan nama penulis" name="penulis" value={inputData.penulis} onChange={handleInputChange} errorContent={errors.penulis} isRequired />
                    </Fieldset>
                    <EditorToolbar tools={tools} />
                    <EditorContent />
                    {selectedTags.length > 0 && (
                      <Fieldset>
                        {selectedTags.map((item, index) => (
                          <TagsButton key={index} id={`${id}-tag-${index}`} type="select" text={item.tag} onClick={() => handleRemoveTag(item.tag)} />
                        ))}
                      </Fieldset>
                    )}
                    <Input id="post-tag" type="text" labelText="Tag Berita" placeholder="Cari tag berita" name="tagQuery" value={tagQuery} onChange={handleTagSearch} />
                    {tagSuggests.length > 0 && (
                      <Fieldset>
                        {tagSuggests.map((item, index) => (
                          <TagsButton key={index} id={`${id}-suggest-tag-${index}`} text={item.nama_kategori_tag} onClick={() => handleAddTag(item)} />
                        ))}
                      </Fieldset>
                    )}
                    <EditorFooter>
                      <Button id="submit-action" type="submit" buttonText="Simpan Perubahan" action="save" isLoading={isSubmitting} />
                    </EditorFooter>
                  </TextEditor>
                  <OGCard image={selectedImageUrl ? selectedImageUrl : inputData.image && inputData.image !== "" ? inputData.image : "/img/fallback.jpg"} mssg="Hai, udah baca berita ini?" title={inputData.judul} desc={inputData.thumbnail} scope="/berita/" />
                </Section>
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
                <Header isasChild alignItems="center" gap="var(--pixel-15)">
                  <H1 size="lg" color="var(--color-primary)" align="center">
                    {selectedCatType === "berita" ? "Kategori Berita" : "Kategori Daerah"}
                  </H1>
                  {/* <P align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod.</P> */}
                </Header>
                <Section isWrap alignItems="center" justifyContent="space-between" gap="var(--pixel-10) var(--pixel-10)" margin="0">
                  <Button id="back-button" buttonText="Kembali" onClick={() => navigate(-1)} startContent={<Arrow size="var(--pixel-25)" direction="left" />} />
                  <Button id="delete-button" variant="line" color="var(--color-red)" buttonText="Hapus Kategori" onClick={() => handleDelete("cudcatberita")} startContent={<Trash size="var(--pixel-25)" />} />
                </Section>
                <Section isWrap gap="var(--pixel-10)">
                  <Form minW="var(--pixel-350)" onSubmit={selectedCatType === "berita" ? (e) => handleSubmit(e, "cudcatberita") : (e) => handleSubmit(e, "cudcatdaerah")}>
                    <Input id="cat-image" variant="upload" labelText="Thumbnail (og:image)" isPreview note="Rekomendasi ukuran: 920 x 470 pixels" initialImage={inputData.image} onSelect={handleImageSelect} isRequired />
                    <Input id="cat-title" type="text" labelText="Judul (og:title)" placeholder="Masukkan judul kategori" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
                    <Input id="cat-desc" type="text" labelText="Deskripsi (og:description)" placeholder="Masukkan deskripsi kategori" name="desc" value={inputData.desc} onChange={handleInputChange} errorContent={errors.desc} isRequired />
                    <EditorFooter>
                      <Button id="submit-action" type="submit" buttonText="Simpan Perubahan" action="save" isLoading={isSubmitting} />
                    </EditorFooter>
                  </Form>
                  <OGCard image={selectedImageUrl ? selectedImageUrl : inputData.image && inputData.image !== "" ? inputData.image : "/img/fallback.jpg"} mssg="Hai, udah baca berita ini?" title={inputData.judul} desc={inputData.desc} scope="/berita/kategori/" />
                </Section>
              </Fragment>
            );
          default:
            return null;
        }
      case "event":
        switch (uslug) {
          case "module":
            const openEventForm = () => {
              setSelectedState("new");
              setIsPopupOpen(true);
            };

            const closeEventForm = () => {
              setSelectedState(null);
              setInputData({ ...inputData, event_id: "", event_title: "", event_image: "", event_day: "", event_info: "", event_cost: "", event_date: "", event_loc: "", event_coords: "", event_guide: "" });
              setSelectedImg(null);
              setIsPopupOpen(false);
            };

            const openEventEdit = (params) => {
              setSelectedState("exist");
              switchData(params);
              setIsPopupOpen(true);
            };

            const closeEventEdit = () => {
              setSelectedState(null);
              setInputData({ ...inputData, event_id: "", event_title: "", event_image: "", event_day: "", event_info: "", event_cost: "", event_date: "", event_loc: "", event_coords: "", event_guide: "" });
              setSelectedImg(null);
              setIsPopupOpen(false);
            };

            const handleImageEvent = async (file) => {
              setSelectedImg(file);
            };

            const handleSubmitEvent = async (e) => {
              e.preventDefault();
              const requiredFields = ["event_title", "event_day", "event_info", "event_cost", "event_date", "event_loc", "event_coords", "event_guide"];
              const validationErrors = inputValidator(inputData, requiredFields);
              if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
              }
              const confirmmsg = selectedState === "exist" ? "Apakah anda yakin untuk menyimpan perubahan?" : "Apakah anda yakin untuk menambahkan data baru?";
              const successmsg = selectedState === "exist" ? "Selamat! Perubahan data berhasil disimpan." : "Selamat! Data baru berhasil ditambahkan.";
              const errormsg = selectedState === "exist" ? "Terjadi kesalahan saat menyimpan perubahan. Mohon periksa koneksi internet anda dan coba lagi." : "Terjadi kesalahan saat menambahkan data. Mohon periksa koneksi internet anda dan coba lagi.";
              const confirm = window.confirm(confirmmsg);
              if (!confirm) {
                return;
              }
              setIsSubmitting(true);
              try {
                const submittedData = { secret: userData.token_activation, idevent: selectedID, judul: inputData.event_title, hari: inputData.event_day, info: inputData.event_info, biaya: inputData.event_cost, tanggal: inputData.event_date, alamat: inputData.event_loc, koordinat: inputData.event_coords, panduan: inputData.event_guide, slug: selectedSlug };
                const formData = new FormData();
                formData.append("data", JSON.stringify(submittedData));
                if (selectedState === "exist") {
                  formData.append("idedit", selectedData);
                }
                formData.append("fileimg", selectedImg);
                await apiCrud(formData, "event", "cudeventdetail");
                alert(successmsg);
                log("submitted data:", submittedData);
                if (selectedState === "exist") {
                  closeEventEdit();
                } else {
                  closeEventForm();
                }
                await fetchData();
                await fetchAdditionalData();
              } catch (error) {
                alert(errormsg);
                console.error(errormsg, error);
              } finally {
                setIsSubmitting(false);
              }
            };

            const handleDeleteEvent = async (params) => {
              const confirmmsg = "Apakah anda yakin untuk menghapus data terpilih?";
              const successmsg = "Selamat! Data terpilih berhasil dihapus.";
              const errormsg = "Terjadi kesalahan saat menghapus data. Mohon periksa koneksi internet anda dan coba lagi.";
              const confirm = window.confirm(confirmmsg);
              if (!confirm) {
                return;
              }
              setIsSubmitting(true);
              try {
                const submittedData = { secret: userData.token_activation, idevent: "", judul: "", hari: "", info: "", biaya: "", tanggal: "", alamat: "", koordinat: "", panduan: "", slug: "" };
                const formData = new FormData();
                formData.append("data", JSON.stringify(submittedData));
                formData.append("iddel", params);
                await apiCrud(formData, "event", "cudeventdetail");
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

            return (
              <Fragment>
                <Header isasChild alignItems="center" gap="var(--pixel-15)">
                  <H1 size="lg" color="var(--color-primary)" align="center">
                    Modul Event
                  </H1>
                  {/* <P align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod.</P> */}
                </Header>
                <Section isWrap alignItems="center" justifyContent="space-between" gap="var(--pixel-10) var(--pixel-10)" margin="0">
                  <Button id="back-button" buttonText="Kembali" onClick={() => navigate(-1)} startContent={<Arrow size="var(--pixel-25)" direction="left" />} />
                  <Button id="delete-button" variant="line" color="var(--color-red)" buttonText="Hapus Modul" onClick={() => handleDelete("cudevent", "event")} startContent={<Trash size="var(--pixel-25)" />} />
                </Section>
                <Section isWrap gap="var(--pixel-10)">
                  <Form minW="var(--pixel-350)" onSubmit={(e) => handleSubmit(e, "cudevent", "event")}>
                    <H1 color="var(--color-secondary)">1. Modul Utama</H1>
                    <Input id="module-title" type="text" labelText="Judul Modul" placeholder="Masukkan judul modul" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
                    <Input id="module-banner" variant="upload" labelText="Thumbnail Modul" isPreview note="Rekomendasi ukuran: 1200 x 628 pixels" initialImage={inputData.image} onSelect={handleImageSelect} maxSize={5 * 1024 * 1024} isRequired />
                    <Fieldset>
                      <Input id="module-desc" type="text" labelText="Deskripsi Modul" placeholder="Masukkan deskripsi" name="desc" value={inputData.desc} onChange={handleInputChange} errorContent={errors.desc} isRequired />
                      <Input id="module-date" type="text" labelText="Tanggal Event" placeholder="Masukkan tanggal" name="tanggal" value={inputData.tanggal} onChange={handleInputChange} errorContent={errors.tanggal} isRequired />
                    </Fieldset>
                    <Fieldset>
                      <Input id="module-hl" type="text" labelText="Highlight Modul" placeholder="Masukkan highlight" name="highlight" value={inputData.highlight} onChange={handleInputChange} errorContent={errors.highlight} isRequired />
                      <Input id="module-info" type="text" labelText="Informasi Modul" placeholder="Masukkan informasi" name="info" value={inputData.info} onChange={handleInputChange} errorContent={errors.info} isRequired />
                    </Fieldset>
                    <Input id="module-syarat" variant="textarea" rows={10} labelText="Syarat & Ketentuan" placeholder="Masukkan syarat & ketentuan" name="syarat" value={inputData.syarat} onChange={handleInputChange} errorContent={errors.syarat} isRequired />
                    <H1 color="var(--color-secondary)">2. Detail Modul</H1>
                    {moduleDetData.map((item, index) => (
                      <EventDetailCard key={index} title={item.judul} day={item.hari} date={item.tanggal} onEdit={() => openEventEdit(item.ideventdetail)} onDelete={() => handleDeleteEvent(item.ideventdetail)} />
                    ))}
                    <Button id="add-detail" type="button" variant="dashed" color="var(--color-primary)" isFullwidth buttonText="Tambah Detail" onClick={openEventForm} />
                    <EditorFooter>
                      <Button id="submit-action" type="submit" buttonText="Simpan Perubahan" action="save" isLoading={isSubmitting} />
                    </EditorFooter>
                  </Form>
                  <OGCard image={selectedImageUrl ? selectedImageUrl : inputData.image && inputData.image !== "" ? inputData.image : "/img/fallback.jpg"} mssg="Hai, udah lihat event ini?" title={inputData.judul} desc={inputData.desc} scope="/event/" />
                  {isPopupOpen && (
                    <PopOver onSubmit={handleSubmitEvent} onClose={selectedState === "new" ? closeEventForm : closeEventEdit}>
                      <H1 color="var(--color-primary)" align="center">
                        {selectedState === "new" ? "Tambah Detail Event" : "Edit Detail Event"}
                      </H1>
                      <Input id="detail-title" type="text" labelText="Judul Event" placeholder="Masukkan judul event" name="event_title" value={inputData.event_title} onChange={handleInputChange} errorContent={errors.event_title} isRequired />
                      <Input id="detail-banner" variant="upload" labelText="Thumbnail Event" isPreview note="Rekomendasi ukuran: 1200 x 628 pixels" initialImage={inputData.event_image} onSelect={handleImageEvent} maxSize={5 * 1024 * 1024} isRequired />
                      <Fieldset>
                        <Input id="detail-day" type="text" labelText="Hari" placeholder="e.g. Sabtu" name="event_day" value={inputData.event_day} onChange={handleInputChange} errorContent={errors.event_day} isRequired />
                        <Input id="detail-date" type="date" labelText="Tanggal" name="event_date" value={inputData.event_date} onChange={handleInputChange} errorContent={errors.event_date} isRequired />
                      </Fieldset>
                      <Fieldset>
                        <Input id="detail-info" type="text" labelText="Informasi Event" placeholder="Masukkan informasi event" name="event_info" value={inputData.event_info} onChange={handleInputChange} errorContent={errors.event_info} isRequired />
                        <Input id="detail-cost" type="number" labelText="Biaya Event" placeholder="100000" name="event_cost" value={inputData.event_cost} onChange={handleInputChange} errorContent={errors.event_cost} isRequired />
                      </Fieldset>
                      <Fieldset>
                        <Input id="detail-loc" type="text" labelText="Lokasi Event" placeholder="Masukkan lokasi event" name="event_loc" value={inputData.event_loc} onChange={handleInputChange} errorContent={errors.event_loc} isRequired />
                        <Input id="detail-coords" type="text" labelText="Titik Koordinat" placeholder="Masukkan titik koordinat" name="event_coords" value={inputData.event_coords} onChange={handleInputChange} errorContent={errors.event_coords} isRequired />
                      </Fieldset>
                      <Input id="detail-guide" variant="textarea" rows={10} labelText="Panduan Event" placeholder="Masukkan panduan" name="event_guide" value={inputData.event_guide} onChange={handleInputChange} errorContent={errors.event_guide} isRequired />
                      <EditorFooter>
                        <Button id="abort-action" type="button" variant="line" color="var(--color-primary)" buttonText="Batal" onClick={selectedState === "new" ? closeEventForm : closeEventEdit} />
                        <Button id="submit-action" type="submit" buttonText={selectedState === "new" ? "Tambah" : "Update"} isLoading={isSubmitting} />
                      </EditorFooter>
                    </PopOver>
                  )}
                </Section>
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

  if (userData.level !== "admin") {
    <Navigate to="/" />;
  }

  return (
    <Fragment>
      <SEO title={`Update: ${pageTitle}`} route={`/dashboard/${uscope}/${uslug}/update/${params}`} isNoIndex />
      <Page pageid={id} type="private">
        <Container alignItems="center" minHeight="80vh" gap="var(--pixel-20)">
          {renderContent()}
        </Container>
      </Page>
    </Fragment>
  );
};

export default DashboardUpdatePage;
