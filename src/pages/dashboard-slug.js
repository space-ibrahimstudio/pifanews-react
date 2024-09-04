import React, { Fragment, useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { useApi } from "../libs/plugins/api";
import { useAuth } from "../libs/security/auth";
import { useDocument } from "../libs/plugins/document";
import { useOptions, getCurrentDate } from "../libs/helpers";
import { inputSchema, errorSchema } from "../libs/plugins/common";
import { PageLayout } from "../components/layouts/pages";
import { DashboardContainer, DashboardHead, DashboardToolbar, DashboardTool } from "./dashboard";
import { NewsGridSection } from "../sections/news-grid-section";
import TabSwitch from "../components/user-inputs/tab-switch";
import Pagination from "../components/navigators/pagination";
import Fieldset from "../components/user-inputs/inputs";
import { TagsButton } from "../components/user-inputs/buttons";
import TextEditor, { EditorContent, EditorToolbar, EditorFooter } from "../components/user-inputs/text-editor";
import NewsCard from "../components/contents/cards";

const DashboardSlugPage = () => {
  const { scope, slug } = useParams();
  const navigate = useNavigate();
  const { isLoggedin, userData } = useAuth();
  const { apiRead, apiGet, apiCrud } = useApi();
  const { short } = useDocument();
  const { limitopt } = useOptions();
  const id = `${short}-${scope}-${slug}`;
  const [limit, setLimit] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataShown, setIsDataShown] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMode, setSelectedMode] = useState("view");
  const [selectedImage, setSelectedImage] = useState(null);

  const [postData, setPostData] = useState([]);
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
    setSelectedTags([]);
    setTagSuggests([]);
    setTagQuery("");
    setInitialContent("");
    setInputData({ ...inputSchema, tgl: getCurrentDate() });
    setLocaleDate(formattedDate);
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
  };

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat halaman. Mohon periksa koneksi internet anda dan coba lagi.";
    const formData = new FormData();
    let data;
    setIsFetching(true);
    try {
      const offset = (currentPage - 1) * limit;
      formData.append("data", JSON.stringify({ secret: userData.token_activation, limit: limit, hal: offset }));
      switch (scope) {
        case "berita":
          switch (slug) {
            case "isi-berita":
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

  const renderContent = () => {
    switch (scope) {
      case "berita":
        switch (slug) {
          case "isi-berita":
            const tools = [["h1", "h2", "bold", "italic", "underline", "strikethrough", "ol", "ul"]];
            const switchButton = [
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
                    <Input id={`limit-data-${id}`} isLabeled={false} variant="select" noEmptyValue baseColor="var(--color-secondlight)" placeholder="Baris per Halaman" value={limit} options={limitopt} onSelect={handleLimitChange} isReadonly={!isDataShown} />
                  </DashboardTool>
                  <TabSwitch buttons={switchButton} />
                </DashboardToolbar>
                {selectedMode === "view" ? (
                  <Fragment>
                    <NewsGridSection>
                      {postData.map((post, index) => (
                        <NewsCard key={index} title={post.judul_berita} short={post.isi_berita} tag={post.counter} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
                      ))}
                    </NewsGridSection>
                    {isDataShown > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
                  </Fragment>
                ) : (
                  <Fragment>
                    <TextEditor maxW="var(--pixel-700)" initialContent={initialContent} onSubmit={handlePublish}>
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
                  </Fragment>
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
    const formattedDate = formatDate(getCurrentDate());
    setSelectedImage(null);
    setSelectedTags([]);
    setTagSuggests([]);
    setTagQuery("");
    setInitialContent("");
    setInputData({ ...inputSchema, tgl: getCurrentDate() });
    setLocaleDate(formattedDate);
  }, [selectedMode]);

  useEffect(() => {
    fetchData();
  }, [scope, slug, limit, selectedMode, currentPage]);

  useEffect(() => {
    fetchAdditionalData();
  }, [scope]);

  if (!isLoggedin) {
    <Navigate to="/login" />;
  }

  return (
    <PageLayout pageid={id} type="private">
      <DashboardContainer>{renderContent()}</DashboardContainer>
    </PageLayout>
  );
};

export default DashboardSlugPage;
