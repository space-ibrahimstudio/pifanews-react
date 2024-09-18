import React, { Fragment, useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useDevmode } from "@ibrahimstudio/react";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { useApi } from "../../libs/plugins/apis";
import { useAuth } from "../../libs/guards/auth";
import { useOptions, getCurrentDate, inputValidator, useInputSchema, useDocument } from "../../libs/plugins/helpers";
import { SEO } from "../../libs/plugins/seo";
import Page from "../../components/layout/frames";
import { Container } from "../../components/layout/frames";
import { CatGridSection } from "../../sections/cat-grid-section";
import { DashboardContainer, DashboardHead, DashboardToolbar, DashboardTool } from "./index";
import { NewsGridSection } from "../../sections/news-grid-section";
import Pagination from "../../components/navigation/pagination";
import Fieldset from "../../components/formel/inputs";
import { TagsButton, SwitchButton } from "../../components/formel/buttons";
import TextEditor, { EditorContent, EditorToolbar, EditorFooter } from "../../components/formel/text-editor";
import Form from "../../components/formel/form";
import NewsCard, { CatAdmCard, OGCard, TagCard } from "../../components/layout/cards";

const DashboardSlugPage = () => {
  const { scope, slug } = useParams();
  const navigate = useNavigate();
  const { log } = useDevmode();
  const { userData } = useAuth();
  const { apiRead, apiGet, apiCrud } = useApi();
  const { short } = useDocument();
  const { limitopt } = useOptions();
  const { inputSch, errorSch } = useInputSchema();
  const id = `${short}-${scope}-${slug}`;
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataShown, setIsDataShown] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [selectedMode, setSelectedMode] = useState("view");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedCatType, setSelectedCatType] = useState("berita");
  const [pageTitle, setPageTitle] = useState("");

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
    if (name === "tgl" && value !== "") {
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
    setInputData({ ...inputSch, tgl: getCurrentDate() });
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
              formData.append("data", JSON.stringify({ secret: userData.token_activation, limit: limit, hal: offset }));
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
              formData.append("data", JSON.stringify({ secret: userData.token_activation, limit: limit, hal: offset }));
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

  const handleSubmit = async (e, endpoint) => {
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
        default:
          break;
      }
      const formData = new FormData();
      formData.append("data", JSON.stringify(submittedData));
      if (slug === "kategori") {
        formData.append("fileimg", selectedImage);
      }
      await apiCrud(formData, "office", endpoint);
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
    switch (scope) {
      case "berita":
        switch (slug) {
          case "isi-berita":
            const tools = [["h1", "h2", "bold", "italic", "underline", "strikethrough", "ol", "ul"]];
            modeSwitcher = [
              { label: "Daftar Berita", onClick: () => setSelectedMode("view"), active: selectedMode === "view" },
              { label: "Tambah Berita", onClick: () => setSelectedMode("add"), active: selectedMode === "add" },
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
              const formData = new FormData();
              const base64Content = btoa(unescape(encodeURIComponent(content)));
              formData.append("data", JSON.stringify({ secret: userData.token_activation, tgl: localeDate, judul: inputData.judul, penulis: inputData.penulis, catberita: inputData.catberita, catdaerah: inputData.catdaerah, content: base64Content, thumbnail: inputData.thumbnail, tag: selectedTags }));
              formData.append("fileimg", selectedImage);
              const confirm = window.confirm("Apakah anda yakin untuk mempublish berita baru?");
              if (!confirm) {
                return;
              }
              setIsSubmitting(true);
              try {
                await apiCrud(formData, "office", "addnews");
                alert("Selamat, postingan berita baru berhasil dipublish!");
                restoreFormState();
              } catch (error) {
                console.error("error:", error);
              } finally {
                setIsSubmitting(false);
              }
            };

            return (
              <Fragment>
                <DashboardHead title="Isi Berita" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod." />
                <DashboardToolbar>
                  <DashboardTool>
                    <Input id={`limit-data-${id}`} isLabeled={false} variant="select" noEmptyValue baseColor="var(--color-secondlight)" placeholder="Baris per Halaman" value={limit} options={limitopt} onSelect={handleLimitChange} isReadonly={!isDataShown} isDisabled={selectedMode === "add"} />
                  </DashboardTool>
                  <SwitchButton buttons={modeSwitcher} />
                </DashboardToolbar>
                {selectedMode === "view" && (
                  <Fragment>
                    <NewsGridSection>
                      {postData.map((post, index) => (
                        <NewsCard key={index} title={post.judul_berita} short={post.isi_berita} tag={`Views: ${post.counter}`} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/dashboard/${scope}/${slug}/update/${post.slug}`)} />
                      ))}
                    </NewsGridSection>
                    {isDataShown && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
                  </Fragment>
                )}
                {selectedMode === "add" && (
                  <Container isasChild isWrap gap="var(--pixel-10)">
                    <TextEditor minW="var(--pixel-350)" initialContent={initialContent} onSubmit={handlePublish}>
                      <Input id={`${id}-post-title`} type="text" labelText="Judul Berita" placeholder="Masukkan judul berita" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
                      <Input id={`${id}-post-banner`} variant="upload" labelText="Thumbnail Berita" isPreview note="Rekomendasi ukuran: 1200 x 628 pixels" onSelect={handleImageSelect} maxSize={5 * 1024 * 1024} isRequired />
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
                        <Button type="submit" buttonText="Publish Berita" action="save" isLoading={isSubmitting} />
                      </EditorFooter>
                    </TextEditor>
                    <OGCard image={selectedImageUrl ? selectedImageUrl : "/img/fallback.jpg"} title={inputData.judul} desc={inputData.thumbnail} scope="/berita/" />
                  </Container>
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

            return (
              <Fragment>
                <DashboardHead title={selectedCatType === "berita" ? "Kategori Berita" : "Kategori Daerah"} desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod." />
                <DashboardToolbar>
                  <SwitchButton buttons={switchCatType} />
                  <SwitchButton buttons={modeSwitcher} />
                </DashboardToolbar>
                {selectedMode === "view" && (
                  <CatGridSection>
                    {categoryData.map((item, index) => (
                      <CatAdmCard key={index} title={selectedCatType === "berita" ? item.nama_kategori_berita : item.nama_kategori_daerah} short={item.desc} image={item.img} onEdit={() => navigate(`/dashboard/${scope}/${slug}/update/${item.slug}`)} />
                    ))}
                  </CatGridSection>
                )}
                {selectedMode === "add" && (
                  <Container isasChild isWrap gap="var(--pixel-10)">
                    <Form minW="var(--pixel-350)" onSubmit={selectedCatType === "berita" ? (e) => handleSubmit(e, "cudcatberita") : (e) => handleSubmit(e, "cudcatdaerah")}>
                      <Input id={`${id}-cat-image`} variant="upload" labelText="Thumbnail (og:image)" isPreview note="Rekomendasi ukuran: 920 x 470 pixels" onSelect={handleImageSelect} isRequired />
                      <Input id={`${id}-cat-title`} type="text" labelText="Judul (og:title)" placeholder="Masukkan judul kategori" name="judul" value={inputData.judul} onChange={handleInputChange} errorContent={errors.judul} isRequired />
                      <Input id={`${id}-cat-desc`} type="text" labelText="Deskripsi (og:description)" placeholder="Masukkan deskripsi kategori" name="desc" value={inputData.desc} onChange={handleInputChange} errorContent={errors.desc} isRequired />
                      <EditorFooter>
                        <Button type="submit" buttonText="Publish Kategori" action="save" isLoading={isSubmitting} />
                      </EditorFooter>
                    </Form>
                    <OGCard image={selectedImageUrl ? selectedImageUrl : "/img/fallback.jpg"} title={inputData.judul} desc={inputData.desc} scope="/berita/kategori/" />
                  </Container>
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
                <DashboardHead title="Tag Berita" desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut lectus dui. Nullam vulputate commodo euismod." />
                <DashboardToolbar>
                  <DashboardTool>
                    <Input id={`limit-data-${id}`} isLabeled={false} variant="select" noEmptyValue baseColor="var(--color-secondlight)" placeholder="Baris per Halaman" value={limit} options={limitopt} onSelect={handleLimitChange} isReadonly={!isDataShown} isDisabled={selectedMode === "add"} />
                  </DashboardTool>
                  <SwitchButton buttons={modeSwitcher} />
                </DashboardToolbar>
                <Container isasChild gap="unset">
                  <Fragment>
                    {selectedMode === "add" && <TagCard openState title={inputData.name} timeCreate="" timeUpdate="" inputData={inputData} setInputData={setInputData} onChange={handleInputChange} onClose={closeAddTag} onSave={() => handleSaveTag("add")} />}
                    {tagsData.map((item, index) => (
                      <TagCard key={index} title={item.nama_kategori_tag} timeCreate={item.created_at} timeUpdate={item.updated_at} onEdit={() => openEditTag(item.id, item.nama_kategori_tag)} inputData={inputData} setInputData={setInputData} onChange={handleInputChange} onClose={closeEditTag} onSave={() => handleSaveTag("update")} onDelete={handleDeleteTag} isDisabled={selectedMode === "add"} />
                    ))}
                  </Fragment>
                </Container>
                {isDataShown && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
              </Fragment>
            );
        }
      default:
        return null;
    }
  };

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
    <Navigate to="/" />;
  }

  return (
    <Fragment>
      <SEO title={pageTitle} route={`/dashboard/${scope}/${slug}`} isNoIndex />
      <Page pageid={id} type="private">
        <DashboardContainer>{renderContent()}</DashboardContainer>
      </Page>
    </Fragment>
  );
};

export default DashboardSlugPage;
