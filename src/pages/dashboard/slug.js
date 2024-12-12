import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useDevmode, useWindow } from "@ibrahimstudio/react";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import useApi from "../../libs/plugins/apis";
import useAuth from "../../libs/guards/auth";
import useGraph from "../../components/content/graph";
import { useOptions, getCurrentDate, inputValidator, useInputSchema, useDocument, stripHtml } from "../../libs/plugins/helpers";
import { SEO } from "../../libs/plugins/seo";
import Page, { Section, Header, Container } from "../../components/layout/frames";
import Grid from "../../components/layout/grids";
import Pagination from "../../components/navigation/pagination";
import Fieldset from "../../components/formel/inputs";
import { TagsButton, SwitchButton } from "../../components/formel/buttons";
import TextEditor, { EditorContent, EditorToolbar, EditorFooter } from "../../components/formel/text-editor";
import Form from "../../components/formel/form";
import useIcons from "../../components/content/icons";
import NewsCard, { CatAdmCard, OGCard, TagCard, BannerCard } from "../../components/layout/cards";

const imgdomain = process.env.REACT_APP_API_URL;

const DashboardSlugPage = () => {
  const { scope, slug } = useParams();
  const navigate = useNavigate();
  const draggedItemIndex = useRef();
  const { log } = useDevmode();
  const { width } = useWindow();
  const { userData } = useAuth();
  const { apiRead, apiGet, apiCrud } = useApi();
  const { short } = useDocument();
  const { limitopt } = useOptions();
  const { inputSch, errorSch } = useInputSchema();
  const { H1, P } = useGraph();
  const { VGrid, VList, VPlus } = useIcons();
  const id = `${short}-${scope}-${slug}`;
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataShown, setIsDataShown] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [selectedMode, setSelectedMode] = useState("view");
  const [selectedView, setSelectedView] = useState("grid");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedCatType, setSelectedCatType] = useState("berita");
  const [pageTitle, setPageTitle] = useState("");
  const [draggingIndex, setDraggingIndex] = useState(null);

  const [inputData, setInputData] = useState({ ...inputSch });
  const [errors, setErrors] = useState({ ...errorSch });

  const [postData, setPostData] = useState([]);
  const [newsCatData, setNewsCatData] = useState([]);
  const [localCatData, setLocalCatData] = useState([]);
  const [localeDate, setLocaleDate] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [tagSuggests, setTagSuggests] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [initialContent, setInitialContent] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [bannerData, setBannerData] = useState([]);

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

  const handlePageChange = (page) => setCurrentPage(page);
  const handleLimitChange = (value) => {
    setLimit(value);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    if (name === "post_date" && value !== "") {
      const formattedDate = formatDate(value);
      setLocaleDate(formattedDate);
    }
  };

  const restoreFormState = () => {
    const formattedDate = formatDate(getCurrentDate());
    setSelectedImage(null);
    setSelectedImageUrl(null);
    setSelectedTags([]);
    setTagSuggests([]);
    setTagQuery("");
    setInitialContent("");
    setInputData({ ...inputSch, post_date: getCurrentDate() });
    setLocaleDate(formattedDate);
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setSelectedImageUrl(url);
    } else {
      setSelectedImageUrl(null);
    }
  };

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat halaman. Mohon periksa koneksi internet anda dan coba lagi.";
    const formData = new FormData();
    let data;
    setIsFetching(true);
    try {
      switch (scope) {
        case "berita":
          switch (slug) {
            case "isi-berita":
              setPageTitle(selectedMode === "add" ? "Tambah Berita" : "Daftar Berita");
              const offset = (currentPage - 1) * limit;
              formData.append("data", JSON.stringify({ secret: userData.token_activation, limit, hal: offset }));
              data = await apiRead(formData, "office", "viewnews");
              if (data && data.data && data.data.length > 0) {
                setPostData(data.data);
                setTotalPages(data.TTLPage);
                setIsDataShown(true);
              } else {
                setPostData([]);
                setTotalPages(0);
                setIsDataShown(false);
              }
              break;
            default:
              break;
          }
          break;
        case "master":
          switch (slug) {
            case "kategori":
              setPageTitle(selectedMode === "add" ? "Tambah Kategori" : "Daftar Kategori");
              formData.append("data", JSON.stringify({ secret: userData.token_activation, kategori: selectedCatType }));
              data = await apiRead(formData, "office", "viewcategory");
              if (data && data.data && data.data.length > 0) {
                setCategoryData(data.data);
                setIsDataShown(true);
              } else {
                setCategoryData([]);
                setIsDataShown(false);
              }
              break;
            case "tags":
              setPageTitle(selectedMode === "add" ? "Tambah Tag" : "Daftar Tag");
              const offset = (currentPage - 1) * limit;
              formData.append("data", JSON.stringify({ secret: userData.token_activation, limit, hal: offset }));
              data = await apiRead(formData, "office", "viewtags");
              if (data && data.data && data.data.length > 0) {
                setTagsData(data.data);
                setTotalPages(data.TTLPage);
                setIsDataShown(true);
              } else {
                setTagsData([]);
                setTotalPages(0);
                setIsDataShown(false);
              }
              break;
            case "banner":
              setPageTitle("Daftar Banner");
              formData.append("data", JSON.stringify({ secret: userData.token_activation }));
              data = await apiRead(formData, "office", "viewbanner");
              if (data && data.data && data.data.length > 0) {
                setBannerData(data.data);
                setIsDataShown(true);
              } else {
                setBannerData([]);
                setIsDataShown(false);
              }
              break;
            default:
              break;
          }
          break;
        case "event":
          switch (slug) {
            case "module":
              setPageTitle(selectedMode === "add" ? "Tambah Modul" : "Daftar Modul");
              const offset = (currentPage - 1) * limit;
              formData.append("data", JSON.stringify({ secret: userData.token_activation, limit, hal: offset }));
              data = await apiRead(formData, "event", "viewevent");
              if (data && data.data && data.data.length > 0) {
                setModuleData(data.data);
                setTotalPages(data.TTLPage);
                setIsDataShown(true);
              } else {
                setModuleData([]);
                setTotalPages(0);
                setIsDataShown(false);
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
      switch (scope) {
        case "berita":
          const newscatdata = await apiGet("main", "categorynew");
          setNewsCatData(newscatdata && newscatdata.data && newscatdata.data.length > 0 ? newscatdata.data : []);
          const localcatdata = await apiGet("main", "categoryarea");
          setLocalCatData(newscatdata && localcatdata.data && localcatdata.data.length > 0 ? localcatdata.data : []);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(errormsg, error);
    }
  };

  const handleSubmit = async (e, endpoint, sendpoint = "office") => {
    e.preventDefault();
    let requiredFields = [];
    switch (scope) {
      case "master":
        switch (slug) {
          case "kategori":
            requiredFields = ["judul", "desc"];
            break;
          default:
            break;
        }
        break;
      case "event":
        switch (slug) {
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
    const confirmmsg = "Apakah anda yakin untuk menambahkan data baru?";
    const successmsg = "Selamat! Data baru berhasil ditambahkan.";
    const errormsg = "Terjadi kesalahan saat menambahkan data. Mohon periksa koneksi internet anda dan coba lagi.";
    const confirm = window.confirm(confirmmsg);
    if (!confirm) {
      return;
    }
    setIsSubmitting(true);
    try {
      let submittedData;
      switch (scope) {
        case "master":
          switch (slug) {
            case "kategori":
              submittedData = { secret: userData.token_activation, name: inputData.judul, desc: inputData.desc };
              break;
            default:
              break;
          }
          break;
        case "event":
          switch (slug) {
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
      if (slug === "kategori" || slug === "module") {
        formData.append("fileimg", selectedImage);
      }
      await apiCrud(formData, sendpoint, endpoint);
      alert(successmsg);
      log("submitted data:", submittedData);
      restoreFormState();
    } catch (error) {
      alert(errormsg);
      console.error(errormsg, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    let modeSwitcher = [];
    let viewSwitcher = [];
    switch (scope) {
      case "berita":
        switch (slug) {
          case "isi-berita":
            const tools = [
              ["h1", "h2", "bold", "italic", "underline", "strikethrough", "ol", "ul"],
              ["link", "image", "video"],
            ];
            modeSwitcher = [
              { icon: <VList size="var(--pixel-20)" />, label: "Daftar Berita", onClick: () => setSelectedMode("view"), active: selectedMode === "view" },
              { icon: <VPlus size="var(--pixel-20)" />, label: "Tambah Berita", onClick: () => setSelectedMode("add"), active: selectedMode === "add" },
            ];

            viewSwitcher = [
              { icon: <VGrid size="var(--pixel-20)" />, onClick: () => setSelectedView("grid"), active: selectedView === "grid" },
              { icon: <VList size="var(--pixel-20)" />, onClick: () => setSelectedView("list"), active: selectedView === "list" },
            ];

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

            const handlePublish = async (content) => {
              const requiredFields = ["post_date", "judul", "penulis", "catberita", "catdaerah", "thumbnail"];
              const validationErrors = inputValidator(inputData, requiredFields);
              if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
              }
              if (selectedImage === null) {
                alert("Image is required.");
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
              const confirmmsg = "Apakah anda yakin untuk menambahkan data baru?";
              const successmsg = "Selamat! Data baru berhasil ditambahkan.";
              const errormsg = "Terjadi kesalahan saat menambahkan data. Mohon periksa koneksi internet anda dan coba lagi.";
              const confirm = window.confirm(confirmmsg);
              if (!confirm) {
                return;
              }
              setIsSubmitting(true);
              try {
                const base64Content = btoa(unescape(encodeURIComponent(`<div>${content}</div>`)));
                const submittedData = { secret: userData.token_activation, tgl: localeDate, judul: inputData.judul, penulis: inputData.penulis, catberita: inputData.catberita, catdaerah: inputData.catdaerah, content: base64Content, thumbnail: inputData.thumbnail, tag: selectedTags };
                const formData = new FormData();
                formData.append("data", JSON.stringify(submittedData));
                formData.append("fileimg", selectedImage);
                await apiCrud(formData, "office", "addnews");
                alert(successmsg);
                restoreFormState();
              } catch (error) {
                console.error(errormsg, error);
              } finally {
                setIsSubmitting(false);
              }
            };

            // const generateBlogPost = async () => {
            //   setIsGenerating(true);
            //   try {
            //     const response = await axios.post("http://localhost:5000/api/generate", { title: inputData.judul }, { headers: { "Content-Type": "application/json" } });
            //     console.log("Gemini response:", response);
            //     setInitialContent(response.data.content);
            //   } catch (error) {
            //     console.error("Error generating blog post:", error);
            //     setInitialContent("Failed to generate content.");
            //   } finally {
            //     setIsGenerating(false);
            //   }
            // };

            return (
              <Fragment>
                <Header isasChild alignItems="center" gap="var(--pixel-15)">
                  <H1 size="lg" color="var(--color-primary)" align="center">
                    Isi Berita
                  </H1>
                  {/* <P align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod.</P> */}
                </Header>
                <Section overflow="unset" isWrap alignItems="center" justifyContent="space-between" gap="var(--pixel-10) var(--pixel-10)" margin="0">
                  <Section overflow="unset" isWrap alignItems="center" justifyContent="center" gap="var(--pixel-10)">
                    {/* {selectedMode === "add" && <Button id="back-button" buttonText="Test AI" onClick={generateBlogPost} />} */}
                    {/* {selectedMode === "view" && <Input id="limit-data" isLabeled={false} variant="select" noEmptyValue baseColor="var(--color-secondlight)" placeholder="Baris per Halaman" value={limit} options={limitopt} onSelect={handleLimitChange} isReadonly={!isDataShown} isDisabled={selectedMode === "add"} />} */}
                    <Input id="limit-data" isLabeled={false} variant="select" noEmptyValue baseColor="var(--color-secondlight)" placeholder="Baris per Halaman" value={limit} options={limitopt} onSelect={handleLimitChange} isReadonly={!isDataShown} isDisabled={selectedMode === "add"} />
                    {selectedMode === "view" && width >= 464 && <SwitchButton type="ico" buttons={viewSwitcher} />}
                  </Section>
                  <SwitchButton type={width >= 464 ? "reg" : "ico"} buttons={modeSwitcher} />
                </Section>
                {selectedMode === "view" && (
                  <Fragment>
                    <Grid gridTemplateRows={selectedView === "grid" ? "unset" : "repeat(2, auto)"} gridTemplateColumns={selectedView === "grid" ? "repeat(auto-fill, minmax(var(--pixel-300), 1fr))" : "repeat(auto-fill, minmax(var(--pixel-350), 1fr))"} gap="var(--pixel-10)">
                      {postData.map((post, index) => (
                        <Fragment key={index}>
                          {selectedView === "grid" && <NewsCard title={post.judul_berita} short={post.isi_berita} tag={`Views: ${post.counter}`} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/dashboard/${scope}/${slug}/update/${post.slug}`} onClick={() => navigate(`/dashboard/${scope}/${slug}/update/${post.slug}`)} />}
                          {selectedView === "list" && <CatAdmCard title={post.judul_berita} short={stripHtml(post.isi_berita)} tag={`Views: ${post.counter}`} image={`${imgdomain}/images/img_berita/${post.img_berita}`} onEdit={() => navigate(`/dashboard/${scope}/${slug}/update/${post.slug}`)} />}
                        </Fragment>
                      ))}
                    </Grid>
                    {isDataShown && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
                  </Fragment>
                )}
                {selectedMode === "add" && (
                  <Section isWrap gap="var(--pixel-10)">
                    <TextEditor minW="var(--pixel-350)" initialContent={initialContent} onSubmit={handlePublish}>
                      <Input id="post-title" type="text" labelText="Judul Berita" placeholder="Masukkan judul berita" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
                      <Input id="post-banner" variant="upload" labelText="Thumbnail Berita" isPreview note="Rekomendasi ukuran: 1200 x 628 pixels" onSelect={handleImageSelect} maxSize={5 * 1024 * 1024} isRequired />
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
                      <Input id="post-tag" type="text" labelText="Tag Berita" placeholder="Cari tag berita" name="tag_suggest" value={tagQuery} onChange={handleTagSearch} errorContent={errors.tag_suggest} />
                      {tagSuggests.length > 0 && (
                        <Fieldset>
                          {tagSuggests.map((item, index) => (
                            <TagsButton key={index} id={`${id}-suggest-tag-${index}`} text={item.nama_kategori_tag} onClick={() => handleAddTag(item)} />
                          ))}
                        </Fieldset>
                      )}
                      <EditorFooter>
                        <Button id="submit-action" type="submit" buttonText="Publish Berita" action="save" isLoading={isSubmitting} />
                      </EditorFooter>
                    </TextEditor>
                    <OGCard image={selectedImageUrl ? selectedImageUrl : "/img/fallback.jpg"} mssg="Hai, udah baca berita ini?" title={inputData.judul} desc={inputData.thumbnail} scope="/berita/" />
                  </Section>
                )}
              </Fragment>
            );
          default:
            return null;
        }
      case "master":
        switch (slug) {
          case "kategori":
            const switchCatType = [
              { label: "Kategori Berita", onClick: () => setSelectedCatType("berita"), active: selectedCatType === "berita" },
              { label: "Kategori Daerah", onClick: () => setSelectedCatType("daerah"), active: selectedCatType === "daerah" },
            ];

            modeSwitcher = [
              { label: "Daftar Kategori", onClick: () => setSelectedMode("view"), active: selectedMode === "view" },
              { label: "Tambah Kategori", onClick: () => setSelectedMode("add"), active: selectedMode === "add" },
            ];

            const handleDragStart = (index) => {
              draggedItemIndex.current = index;
              setDraggingIndex(index);
            };

            const handleDragOver = (e, hoverIndex) => {
              e.preventDefault();
              if (hoverIndex === draggedItemIndex.current) return;
              const updatedCategories = [...categoryData];
              const [movedItem] = updatedCategories.splice(draggedItemIndex.current, 1);
              updatedCategories.splice(hoverIndex, 0, movedItem);
              draggedItemIndex.current = hoverIndex;
              setCategoryData(updatedCategories);
            };

            const handleDrop = async () => {
              setDraggingIndex(null);
              try {
                const formData = new FormData();
                formData.append("data", JSON.stringify({ secret: userData.token_activation, indexing: categoryData.map((item, index) => ({ id: item.id, posisi: index + 1 })) }));
                await apiCrud(formData, "office", "indexing");
                console.log("Order updated successfully");
              } catch (error) {
                console.error("Error updating order:", error);
              }
            };

            return (
              <Fragment>
                <Header isasChild alignItems="center" gap="var(--pixel-15)">
                  <H1 size="lg" color="var(--color-primary)" align="center">
                    {selectedCatType === "berita" ? "Kategori Berita" : "Kategori Daerah"}
                  </H1>
                  {/* <P align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod.</P> */}
                </Header>
                <Section isWrap alignItems="center" justifyContent="space-between" gap="var(--pixel-10) var(--pixel-10)" margin="0">
                  <SwitchButton buttons={switchCatType} />
                  <SwitchButton buttons={modeSwitcher} />
                </Section>
                {selectedMode === "view" && (
                  <Grid gridTemplateRows="repeat(2, auto)" gridTemplateColumns="repeat(auto-fill, minmax(var(--pixel-350), 1fr))" gap="var(--pixel-10)">
                    {categoryData.map((item, index) => (
                      <CatAdmCard
                        key={index}
                        title={selectedCatType === "berita" ? item.nama_kategori_berita : item.nama_kategori_daerah}
                        short={item.desc}
                        image={`${imgdomain}/images/img_berita/${item.img}`}
                        onEdit={() => navigate(`/dashboard/${scope}/${slug}/update/${item.slug}`)}
                        draggable={selectedCatType === "berita"}
                        onDragStart={selectedCatType === "berita" ? () => handleDragStart(index) : () => {}}
                        onDragOver={selectedCatType === "berita" ? (e) => handleDragOver(e, index) : () => {}}
                        onDrop={selectedCatType === "berita" ? handleDrop : () => {}}
                        style={{ cursor: selectedCatType === "berita" ? "move" : "default", opacity: draggingIndex === index ? 0.5 : 1, transition: "all 0.2s ease", border: draggingIndex === index ? "1px dashed var(--color-primary)" : "1px solid transparent" }}
                      />
                    ))}
                  </Grid>
                )}
                {selectedMode === "add" && (
                  <Section isWrap gap="var(--pixel-10)">
                    <Form minW="var(--pixel-350)" onSubmit={selectedCatType === "berita" ? (e) => handleSubmit(e, "cudcatberita") : (e) => handleSubmit(e, "cudcatdaerah")}>
                      <Input id="cat-image" variant="upload" labelText="Thumbnail (og:image)" isPreview note="Rekomendasi ukuran: 920 x 470 pixels" onSelect={handleImageSelect} isRequired />
                      <Input id="cat-title" type="text" labelText="Judul (og:title)" placeholder="Masukkan judul kategori" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
                      <Input id="cat-desc" type="text" labelText="Deskripsi (og:description)" placeholder="Masukkan deskripsi kategori" name="desc" value={inputData.desc} onChange={handleInputChange} errorContent={errors.desc} isRequired />
                      <EditorFooter>
                        <Button id="submit-action" type="submit" buttonText="Publish Kategori" action="save" isLoading={isSubmitting} />
                      </EditorFooter>
                    </Form>
                    <OGCard image={selectedImageUrl ? selectedImageUrl : "/img/fallback.jpg"} mssg="Hai, udah baca berita ini?" title={inputData.judul} desc={inputData.desc} scope="/berita/kategori/" />
                  </Section>
                )}
              </Fragment>
            );
          case "tags":
            modeSwitcher = [
              { label: "Daftar Tag", onClick: () => setSelectedMode("view"), active: selectedMode === "view" },
              { label: "Tambah Tag", onClick: () => setSelectedMode("add"), active: selectedMode === "add" },
            ];

            const closeAddTag = () => {
              setInputData({ name: "" });
              setSelectedMode("view");
            };

            const openEditTag = (id, content) => {
              setSelectedID(id);
              log("selected id:", id);
              setInputData({ name: content });
              setSelectedMode("view");
            };

            const closeEditTag = () => {
              setSelectedID("");
              setInputData({ name: "" });
            };

            const handleSaveTag = async (action) => {
              const requiredFields = ["name"];
              const validationErrors = inputValidator(inputData, requiredFields);
              if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
              }
              const confirmmsg = action === "add" ? "Apakah anda yakin untuk menambahkan data baru?" : "Apakah anda yakin untuk menyimpan perubahan?";
              const successmsg = action === "add" ? "Selamat! Data baru berhasil ditambahkan." : "Selamat! Perubahan data berhasil disimpan.";
              const errormsg = action === "add" ? "Terjadi kesalahan saat menambahkan data. Mohon periksa koneksi internet anda dan coba lagi." : "Terjadi kesalahan saat menyimpan perubahan. Mohon periksa koneksi internet anda dan coba lagi.";
              const confirm = window.confirm(confirmmsg);
              if (!confirm) {
                return;
              }
              setIsSubmitting(true);
              try {
                const submittedData = { secret: userData.token_activation, name: inputData.name };
                const formData = new FormData();
                formData.append("data", JSON.stringify(submittedData));
                if (action === "update") {
                  formData.append("idedit", selectedID);
                }
                await apiCrud(formData, "office", "cudtags");
                alert(successmsg);
                log("submitted data:", submittedData);
                setSelectedMode("view");
                await fetchData();
                await fetchAdditionalData();
              } catch (error) {
                alert(errormsg);
                console.error(errormsg, error);
              } finally {
                setIsSubmitting(false);
              }
            };

            const handleDeleteTag = async () => {
              const confirmmsg = "Apakah anda yakin untuk menghapus data terpilih?";
              const successmsg = "Selamat! Data terpilih berhasil dihapus.";
              const errormsg = "Terjadi kesalahan saat menghapus data. Mohon periksa koneksi internet anda dan coba lagi.";
              const confirm = window.confirm(confirmmsg);
              if (!confirm) {
                return;
              }
              setIsSubmitting(true);
              try {
                const submittedData = { secret: userData.token_activation, name: "" };
                const formData = new FormData();
                formData.append("data", JSON.stringify(submittedData));
                formData.append("iddel", selectedID);
                await apiCrud(formData, "office", "cudtags");
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
                    Tag Berita
                  </H1>
                  {/* <P align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod.</P> */}
                </Header>
                <Section overflow="unset" isWrap alignItems="center" justifyContent="space-between" gap="var(--pixel-10) var(--pixel-10)" margin="0">
                  <Section overflow="unset" isWrap alignItems="center" justifyContent="center" gap="var(--pixel-10)">
                    <Input id="limit-data" isLabeled={false} variant="select" noEmptyValue baseColor="var(--color-secondlight)" placeholder="Baris per Halaman" value={limit} options={limitopt} onSelect={handleLimitChange} isReadonly={!isDataShown} isDisabled={selectedMode === "add"} />
                  </Section>
                  <SwitchButton buttons={modeSwitcher} />
                </Section>
                <Section gap="unset">
                  {selectedMode === "add" && <TagCard openState title={inputData.name} timeCreate="" timeUpdate="" inputData={inputData} setInputData={setInputData} onChange={handleInputChange} onClose={closeAddTag} onSave={() => handleSaveTag("add")} />}
                  {tagsData.map((item, index) => (
                    <TagCard key={index} title={item.nama_kategori_tag} timeCreate={item.created_at} timeUpdate={item.updated_at} onEdit={() => openEditTag(item.id, item.nama_kategori_tag)} inputData={inputData} setInputData={setInputData} onChange={handleInputChange} onClose={closeEditTag} onSave={() => handleSaveTag("update")} onDelete={handleDeleteTag} isDisabled={selectedMode === "add"} />
                  ))}
                </Section>
                {isDataShown && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
              </Fragment>
            );
          case "banner":
            const handleUpload = async (e) => {
              const successmsg = "Selamat! Banner baru berhasil ditambahkan.";
              const errormsg = "Terjadi kesalahan saat menambahkan banner. Mohon periksa koneksi internet anda dan coba lagi.";
              const file = e.target.files?.[0];
              if (file) {
                setIsSubmitting(true);
                try {
                  const submittedData = { secret: userData.token_activation };
                  const formData = new FormData();
                  formData.append("data", JSON.stringify(submittedData));
                  formData.append("fileimg", file);
                  await apiCrud(formData, "office", "bannerfile");
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
              }
            };

            const handleDelete = async (iddel) => {
              const confirmmsg = "Apakah anda yakin untuk menghapus banner terpilih?";
              const successmsg = "Selamat! Banner terpilih berhasil dihapus.";
              const errormsg = "Terjadi kesalahan saat menghapus banner. Mohon periksa koneksi internet anda dan coba lagi.";
              const confirm = window.confirm(confirmmsg);
              if (!confirm) {
                return;
              }
              setIsSubmitting(true);
              try {
                const submittedData = { secret: userData.token_activation, status: "1" };
                const formData = new FormData();
                formData.append("data", JSON.stringify(submittedData));
                formData.append("idedit", iddel);
                await apiCrud(formData, "office", "editbanner");
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

            const handleBDragStart = (index) => {
              setDraggingIndex(index);
            };

            const handleBDragOver = (e, hoverIndex) => {
              e.preventDefault();
              if (draggingIndex === hoverIndex) return;
              const newItems = [...bannerData];
              const [draggedItem] = newItems.splice(draggingIndex, 1);
              newItems.splice(hoverIndex, 0, draggedItem);
              setDraggingIndex(hoverIndex);
              setBannerData(newItems);
            };

            const handleBDrop = async () => {
              if (draggingIndex === null) return;
              const draggedItem = bannerData[draggingIndex];
              try {
                const formData = new FormData();
                formData.append("data", JSON.stringify({ secret: userData.token_activation, status: "0", index: (draggingIndex + 1).toString() }));
                formData.append("idedit", draggedItem.idbanner);
                await apiCrud(formData, "office", "editbanner");
                console.log("Order updated successfully");
                setDraggingIndex(null);
              } catch (error) {
                console.error("Error updating order:", error);
              }
            };

            return (
              <Fragment>
                <Header isasChild alignItems="center" gap="var(--pixel-15)">
                  <H1 size="lg" color="var(--color-primary)" align="center">
                    Banner Berita
                  </H1>
                  {/* <P align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod.</P> */}
                </Header>
                <Section gap="var(--pixel-10)">
                  {bannerData
                    .filter((item) => item.bannerstatus === "0")
                    .map((item, index) => (
                      <BannerCard key={index} type="exist" src={`${imgdomain}/images/banner/${item.bannerimg}`} onDelete={() => handleDelete(item.idbanner)} isUploading={isSubmitting} draggable onDragStart={() => handleBDragStart(index)} onDragOver={(e) => handleBDragOver(e, index)} onDrop={handleBDrop} />
                    ))}
                  <BannerCard type="add" onUpload={handleUpload} isUploading={isSubmitting} />
                </Section>
              </Fragment>
            );
          default:
            return null;
        }
      case "event":
        switch (slug) {
          case "module":
            modeSwitcher = [
              { icon: <VList size="var(--pixel-20)" />, label: "Daftar Modul", onClick: () => setSelectedMode("view"), active: selectedMode === "view" },
              { icon: <VPlus size="var(--pixel-20)" />, label: "Tambah Modul", onClick: () => setSelectedMode("add"), active: selectedMode === "add" },
            ];

            viewSwitcher = [
              { icon: <VGrid size="var(--pixel-20)" />, onClick: () => setSelectedView("grid"), active: selectedView === "grid" },
              { icon: <VList size="var(--pixel-20)" />, onClick: () => setSelectedView("list"), active: selectedView === "list" },
            ];

            return (
              <Fragment>
                <Header isasChild alignItems="center" gap="var(--pixel-15)">
                  <H1 size="lg" color="var(--color-primary)" align="center">
                    Modul Event
                  </H1>
                  {/* <P align="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod.</P> */}
                </Header>
                <Section overflow="unset" isWrap alignItems="center" justifyContent="space-between" gap="var(--pixel-10) var(--pixel-10)" margin="0">
                  <Section overflow="unset" isWrap alignItems="center" justifyContent="center" gap="var(--pixel-10)">
                    <Input id="limit-data" isLabeled={false} variant="select" noEmptyValue baseColor="var(--color-secondlight)" placeholder="Baris per Halaman" value={limit} options={limitopt} onSelect={handleLimitChange} isReadonly={!isDataShown} isDisabled={selectedMode === "add"} />
                    {selectedMode === "view" && width >= 464 && <SwitchButton type="ico" buttons={viewSwitcher} />}
                  </Section>
                  <SwitchButton type={width >= 464 ? "reg" : "ico"} buttons={modeSwitcher} />
                </Section>
                {selectedMode === "view" && (
                  <Fragment>
                    <Grid gridTemplateRows={selectedView === "grid" ? "unset" : "repeat(2, auto)"} gridTemplateColumns={selectedView === "grid" ? "repeat(auto-fill, minmax(var(--pixel-300), 1fr))" : "repeat(auto-fill, minmax(var(--pixel-350), 1fr))"} gap="var(--pixel-10)">
                      {moduleData.map((post, index) => (
                        <Fragment key={index}>
                          {selectedView === "grid" && <NewsCard title={post.title} short={`${post.descripiton} | ${post.highlight}`} image={`${imgdomain}/images/event/${post.img}`} loc={post.info} date={post.tanggal} slug={`/dashboard/${scope}/${slug}/update/${post.idevent}`} onClick={() => navigate(`/dashboard/${scope}/${slug}/update/${post.idevent}`)} />}
                          {selectedView === "list" && <CatAdmCard title={post.title} short={post.descripiton} image={`${imgdomain}/images/event/${post.img}`} onEdit={() => navigate(`/dashboard/${scope}/${slug}/update/${post.idevent}`)} />}
                        </Fragment>
                      ))}
                    </Grid>
                    {isDataShown && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
                  </Fragment>
                )}
                {selectedMode === "add" && (
                  <Section isWrap gap="var(--pixel-10)">
                    <Form minW="var(--pixel-350)" onSubmit={(e) => handleSubmit(e, "cudevent", "event")}>
                      <Input id="module-title" type="text" labelText="Judul Modul" placeholder="Masukkan judul modul" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
                      <Input id="module-banner" variant="upload" labelText="Thumbnail Modul" isPreview note="Rekomendasi ukuran: 1200 x 628 pixels" onSelect={handleImageSelect} maxSize={5 * 1024 * 1024} isRequired />
                      <Fieldset>
                        <Input id="module-desc" type="text" labelText="Deskripsi Modul" placeholder="Masukkan deskripsi" name="desc" value={inputData.desc} onChange={handleInputChange} errorContent={errors.desc} isRequired />
                        <Input id="module-date" type="text" labelText="Tanggal Event" placeholder="Masukkan tanggal" name="tanggal" value={inputData.tanggal} onChange={handleInputChange} errorContent={errors.tanggal} isRequired />
                      </Fieldset>
                      <Fieldset>
                        <Input id="module-hl" type="text" labelText="Highlight Modul" placeholder="Masukkan highlight" name="highlight" value={inputData.highlight} onChange={handleInputChange} errorContent={errors.highlight} isRequired />
                        <Input id="module-info" type="text" labelText="Informasi Modul" placeholder="Masukkan informasi" name="info" value={inputData.info} onChange={handleInputChange} errorContent={errors.info} isRequired />
                      </Fieldset>
                      <Input id="module-syarat" variant="textarea" rows={10} labelText="Syarat & Ketentuan" placeholder="Masukkan syarat & ketentuan" name="syarat" value={inputData.syarat} onChange={handleInputChange} errorContent={errors.syarat} isRequired />
                      <EditorFooter>
                        <Button id="submit-action" type="submit" buttonText="Publish Modul" action="save" isLoading={isSubmitting} />
                      </EditorFooter>
                    </Form>
                    <OGCard image={selectedImageUrl ? selectedImageUrl : "/img/fallback.jpg"} mssg="Hai, udah lihat event ini?" title={inputData.judul} desc={inputData.desc} scope="/event/" />
                  </Section>
                )}
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
    if (width < 464) {
      setSelectedView("list");
    }
  }, [width]);

  useEffect(() => {
    restoreFormState();
  }, [selectedMode, slug === "kategori" ? selectedCatType : null]);

  useEffect(() => {
    fetchData();
  }, [scope, slug, limit, selectedMode, slug === "kategori" ? selectedCatType : null, currentPage]);

  useEffect(() => {
    fetchAdditionalData();
  }, [scope]);

  if (userData.level !== "admin") {
    <Navigate to="/404-not-found" />;
  }

  return (
    <Fragment>
      <SEO title={pageTitle} route={`/dashboard/${scope}/${slug}`} isNoIndex />
      <Page pageid={id} type="private">
        <Container alignItems="center" minHeight="80vh" gap="var(--pixel-20)">
          {renderContent()}
        </Container>
      </Page>
    </Fragment>
  );
};

export default DashboardSlugPage;
