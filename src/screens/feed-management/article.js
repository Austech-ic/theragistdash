import React, { useState } from "react";
import TotalCard from "../dashboard/components/TotalCard";
import { SmilePlus, View } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Editor from "react-simple-wysiwyg";
import { enqueueSnackbar } from "notistack";
import api from "../../api";
import { ClipLoader } from "react-spinners";
import EmtyTable from "../../components/common/EmtyTable";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../utils/helperFunctions";
import {
  Divider,
  Modal,
  Thead,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Edit, Eye, Trash } from "iconsax-react";

const Article = () => {
  const [html, setHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState("");
  const [editPreview, setEditPreview] = useState("");
  const [title, setTitle] = useState("");
  const [minute, setMinute] = useState("");

  const openEdit = (item) => {
    setId(item?.id);
    setEditPreview(item?.image_url);
    setHtml(item?.body);
    setImage(item?.image);
    setTitle(item?.title);
    setMinute(item?.read_minute);
    setIsEdit(true);
  };
  const closeEdit = () => {
    setId("");
    setIsEdit(false);
  };

  const openDelete = (id) => {
    setId(id);
    setIsDelete(true);
  };

  const closeDelete = () => {
    setId("");
    setIsDelete(false);
  };
  function onChange(e) {
    setHtml(e.target.value);
  }

  const createArticle = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image_url", image);
    formData.append("body", html);
    formData.append("title", title);
    formData.append("read_minute", minute);
    try {
      const response = await api.createArticle(formData);
      enqueueSnackbar(" Article Created Successfully", { variant: "success" });
      results.refetch();
      resultsCount.refetch();
      setIsLoading(false);
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  const updateArticle = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image_url", image);
    formData.append("body", html);
    formData.append("title", title);
    formData.append("read_minute", minute);
    try {
      const response = await api.updateArticle(id, formData);
      enqueueSnackbar(" Article Updated Successfully", { variant: "success" });
      results.refetch();
      resultsCount.refetch();

      setIsLoading(false);
      closeEdit();
      ClearForm();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  };

  async function getArticle(page) {
    const response = await api.getArticle({
      // params: {
      //   search: search,
      // },
    });
    return response;
  }

  const results = useQuery(["getArticle"], () => getArticle(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const ArticleData = results?.data?.data || [];

  async function getArticleCount(page) {
    const response = await api.getArticleCount({
      // params: {
      //   search: search,
      // },
    });
    return response;
  }

  const resultsCount = useQuery(["getArticleCount"], () => getArticleCount(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  const ArticleCountData = resultsCount?.data?.data || [];

  const [preview, setPreview] = useState("");

  const deleteArticle = async () => {
    setIsLoading(true);
    try {
      const response = await api.deleteArticle(id);
      enqueueSnackbar("Article Deleted Successfully", { variant: "success" });
      results.refetch();
      resultsCount.refetch();
      setIsLoading(false);
      closeDelete();
      ClearForm();
    } catch (error) {
      //console.log(error.message);
      enqueueSnackbar(error.details, { variant: "error" });

      setIsLoading(false);
    }
  };

  function ClearForm() {
    setHtml("");
    setImage("");
    setPreview("");
    setId("");
  }

  return (
    <div className="p-[18px] md:p-[28px] xl:p-[32px] 2xl:p-[38px]">
      <div className="flex flex-row gap-6 md:gap-8">
        <TotalCard
          icon={Icon}
          iconName={"map:post-box"}
          total={ArticleCountData?.total_article}
          totalLabel={"Total Article"}
        />
        <TotalCard
          icon={Icon}
          iconName={"mingcute:comment-2-fill"}
          total={ArticleCountData?.total_comment}
          totalLabel={"Total Comment"}
        />
        <TotalCard
          icon={SmilePlus}
          total={ArticleCountData?.total_likes}
          totalLabel={"Total Likes"}
        />
        <TotalCard
          icon={View}
          total={ArticleCountData?.total_view}
          totalLabel={"Total Views"}
        />
      </div>
      <div className="mt-6">
        <p className="text-[18px] md:text-[20px] lg:text-[24px] 2xl:text-[26px] text-primary">
          Create Article
        </p>

        <div className="flex flex-col mb-4 ">
          {" "}
          <label
            htmlFor="formFileMultiple"
            className="mb-2 inline-block ttext-[#6F6F6F]"
          >
            Title
          </label>
          <textarea
            className="py-1 h-[70px] relative text-[#6F6F6F] rounded-lg border px-3  focus:outline-none  focus:border-[#00B0C7]"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
          />
        </div>
        <Editor value={html} onChange={onChange} />

        <div className="flex flex-col mb-4 max-w-40 mt-4 ">
          {" "}
          <label
            htmlFor="formFileMultiple"
            className="mb-2 inline-block ttext-[#6F6F6F]"
          >
            Read Minute
          </label>
          <input
            className="py-1  relative text-[#6F6F6F] rounded-lg border px-3  focus:outline-none  focus:border-[#00B0C7]"
            onChange={(e) => {
              setMinute(e.target.value);
            }}
            type="text"
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="mb-3 max-w-96">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded mb-4"
            />
          )}
          <label
            htmlFor="formFileMultiple"
            className="mb-2 inline-block ttext-[#6F6F6F]"
          >
            Thumbnail
          </label>
          <input
            className="py-1 relative text-[#6F6F6F] rounded-lg border px-3 file:border-0 file:rounded-lg file:bg-[#f1f1f1] file:text-[#6F6F6F] file:transition file:duration-150 file:ease-in-out"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
        <button
          onClick={createArticle}
          className="primary-bg rounded-[8px] max-h-[48px] py-[8px] md:py-[12px] px-9 md:px-12 text-white "
        >
          {isLoading ? <ClipLoader color={"white"} size={20} /> : <> Submit </>}
        </button>
      </div>

      <div className="overflow-x-auto">
        <div class=" mt-5">
          <div class="inline-block  min-w-full  ">
            <div class="overflow-x-auto rounded-lg">
              <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                <thead className="bg-[#E6F7F9] ">
                  <tr className="">
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        SN{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Article{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex px-5 whitespace-nowrap   gap-[6px] md:gap-[12px] items-center">
                        Article Date
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap  gap-[6px] md:gap-[12px] items-center my-0">
                        Comments{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap   gap-[6px] md:gap-[12px] items-center my-0">
                        Reactions{" "}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex whitespace-nowrap   gap-[6px] md:gap-[12px] items-center my-0">
                        Views{" "}
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px]  text-[#282828]  font-medium  tracking-[0.2%]"
                    >
                      <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                        Action
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ArticleData && ArticleData?.length < 1 && (
                    <EmtyTable
                      label={"No Article yet"}
                      cols={6}
                      noButton={true}
                    />
                  )}

                  {ArticleData?.map((item, index) => (
                    <tr className="border-b-[0.8px] border-[#E4E7EC]">
                      <td className="px-5 py-[16px] text-[14px] text-center  text-[#2e2e2e]">
                        {index + 1}{" "}
                      </td>
                      <td className="px-5 py-[16px] text-center text-[14px] whitespace-nowrap ">
                        {/* <div dangerouslySetInnerHTML={{ __html: item?.body }} /> */}
                        {item?.title}
                      </td>
                      <td className="px-5 py-[16px] text-center whitespace-nowrap text-[14px]  text-[#9C9C9C]">
                        {formatDate(item?.created_at)}
                      </td>
                      <td className="px-5 py-[16px] text-center text-[14px]  text-[#9C9C9C]">
                        {item?.comments}
                      </td>
                      <td className="px-5 py-[16px] text-center text-[14px]  text-[#9C9C9C]">
                        {item?.reactions}
                      </td>
                      <td className="px-5 py-[16px] text-center text-[14px]  text-[#9C9C9C]">
                        {item?.views}
                      </td>

                      <td className="px-5 py-[16px] text-[14px] md:text-[16px] text-[#212121]">
                        <div className="flex items-center gap-1">
                          <Eye
                            // onClick={openSuspend}
                            size="20"
                            variant="Bold"
                            color="#F7A30A"
                            className="cursor-pointer"
                          />
                          <Edit
                            onClick={() => openEdit(item)}
                            size="20"
                            variant=""
                            color="blue"
                            className="cursor-pointer"
                          />
                          <Trash
                            onClick={() => openDelete(item?.id)}
                            size="20"
                            variant="Bold"
                            color="red"
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isCentered
        isOpen={isEdit}
        onClose={closeEdit}
        size={{ base: "xs", sm: "md", lg: "xl" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            py="4"
            color="#000000"
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight={"400"}
          >
            <div className="items-center">Edit Article</div>
          </ModalHeader>
          <ModalCloseButton size={"sm"} />
          <Divider color="#98A2B3" />
          <ModalBody
            pt={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
            pb={{ base: "16px", md: "20px" }}
            className="pt-[20px] md:pt-[24px] px-[16px] md:px-[24px] pb-[30px] md:pb-[40px]"
          >
            <div className="">
              <div className="flex flex-col mb-4 ">
                {" "}
                <label
                  htmlFor="formFileMultiple"
                  className="mb-2 inline-block ttext-[#6F6F6F]"
                >
                  Title
                </label>
                <textarea
                  className="py-1 h-[70px] relative text-[#6F6F6F] rounded-lg border px-2 focus:outline-none  focus:border-[#00B0C7]"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                />
              </div>
              <Editor value={html} onChange={onChange} />
              <div className="flex flex-col md:flex-row justify-between mt-4 ">
                <div className="flex flex-col mb-4 max-w-40 ">
                  {" "}
                  <label
                    htmlFor="formFileMultiple"
                    className="mb-2 inline-block ttext-[#6F6F6F]"
                  >
                    Read Minute
                  </label>
                  <input
                    className="py-1  relative text-[#6F6F6F] rounded-lg border px-3  focus:outline-none  focus:border-[#00B0C7]"
                    onChange={(e) => {
                      setMinute(e.target.value);
                    }}
                    type="text"
                  />
                </div>
                {editPreview && (
                  <img
                    src={editPreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded mb-4"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="mb-3 w-96">
                <label
                  htmlFor="formFileMultiple"
                  className="mb-2 inline-block ttext-[#6F6F6F]"
                >
                  Thumbnail
                </label>
                <input
                  className="py-1 relative text-[#6F6F6F] rounded-lg border px-3 file:border-0 file:rounded-lg file:bg-[#f1f1f1] file:text-[#6F6F6F] file:transition file:duration-150 file:ease-in-out"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImage(file);
                      setEditPreview(URL.createObjectURL(file));
                    }
                  }}
                  type="file"
                  id="formFileMultiple"
                  multiple
                />
              </div>
            </div>
          </ModalBody>
          <div className="flex justify-center py-3 ">
            {}
            <button
              onClick={updateArticle}
              className="border-[0.2px]  border-[#98A2B3] px-2 primary-bg flex banks-center justify-center text-center rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Update Article </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
      {/* Delete Counselor Modal */}
      <Modal
        isCentered
        isOpen={isDelete}
        onClose={closeDelete}
        size={{ base: "xs", sm: "md" }}
        style={{ borderRadius: 12 }}
        motionPreset="slideInBottom"
        className="rounded-[12px]"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size={"sm"} />
          <ModalBody
            py={{ base: "20px", md: "24px" }}
            px={{ base: "16px", md: "24px" }}
          >
            <p className=" text-[16px] md:text-lg text-center mt-4  text-[#000] leading-[24px] font-medium  ">
              You about to Delete this Article{" "}
            </p>

            <p className="text-[14px]  text-[#667185] leading-[20px] font-light text-center mt-2  ">
              Are you sure you want to delete this Article? This action will
              Permanently delete this Article on the platform.
            </p>
          </ModalBody>
          <div className="flex items-center justify-evenly pb-2 md:py-3">
            <button
              onClick={() => {
                closeDelete();
              }}
              className="border-[0.2px]  border-[#98A2B3] w-[99px] text-center rounded-[8px] py-[12px] text-[14px] font-medium text-black"
            >
              Cancel
            </button>
            <button
              onClick={deleteArticle}
              className=" w-[99px] text-center bg-[#B50000] rounded-[8px] py-[12px] text-[14px] font-medium text-white"
            >
              {isLoading ? (
                <ClipLoader color={"white"} size={20} />
              ) : (
                <> Delete </>
              )}
            </button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Article;
