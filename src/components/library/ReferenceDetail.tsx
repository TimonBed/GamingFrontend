import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";
import MaxImage from "./MaxImage";
import { useEffect, useState } from "react";
import axios from "../../AxiosInterceptors";
import PopupDialog from "../PopupDialog";
import { NewReferenceItemDialog } from "./NewReferenceItemDialog";
import { useUser } from "../../UserContext";
import { FilterInput } from "./filter/FilterInput";

interface Image {
  id: number;
  title: string;
  image_file: string;
  reference: number;
}

interface Reference {
  id: number;
  name: string;
  game: string;
  image_contents: Image[];
  preview_image: string;
}

interface Game {
  id: number;
  game_category: string[];
  name: string;
  release_date: string;
}

const ReferenceDetail = () => {
  const onImageClose = () => {
    setIsMaximized(false);
    // remove # from url
    window.location.hash = "";
  };

  const { user } = useUser();
  useEffect(() => {
    if (window.location.hash) {
      setIsMaximized(true);
    }
  }, []);

  const { id } = useParams();
  const [reference, setReference] = useState<Reference>();
  const [previewReference, setPreviewReference] = useState<Reference>();
  const [game, setGame] = useState<Game>();
  const [PopupDialogOpen, setPopupDialogOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [MaximizedContent, setMaximizedContent] = useState<Image | null>(null);
  const [editModus, setEditModus] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const navigate = useNavigate();

  // get reference with id
  useEffect(() => {
    if (id === "new") {
      setEditModus(true);
      setPreviewReference({
        id: 0,
        name: "",
        game: "Astroneer",
        image_contents: [],
        preview_image: "",
      });

      return;
    }
    axios.get(`/references/references/${id}/`).then((res) => {
      setReference(res.data);
      setPreviewReference(res.data);
      console.log(res.data);
      axios.get(`/references/games/${res.data.game}/`).then((res) => {
        setGame(res.data);
      });
    });
  }, [id]);

  const handleNewImages = (dialogimages: FileList) => {
    setPopupDialogOpen(false);

    const img = Array.from(dialogimages);
    // add to new images
    setNewImages((prevImages) => [...prevImages, ...img]);
  };

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleThumbnailSet = (image: Image) => {
    if (previewReference) {
      setPreviewReference({
        ...previewReference,
        preview_image: image.image_file,
      });
    }
    console.log("thumbnail set", previewReference);
  };

  const validateReference = (reference: Reference) => {
    if (reference.name === "") {
      setShowValidationErrors(true);
      console.log("name");
      return false;
    }
    if (newImages?.length === 0  && previewReference?.image_contents.length === 0) {
      setShowValidationErrors(true);
      console.log("images");
      return false;
    }
    // if (reference.preview_image.length === 0){
    //   setShowValidationErrors(true);
    //   console.log("preview");
    //   return false;
    // }
    return true;
  };

  const handleSaveReference = async () => {
    if (previewReference && validateReference(previewReference)) {
      // upload files

      if (id === "new") {
        await axios
          .post(`/references/references/`, previewReference)
          .then((res) => {
            if (res.status === 201) {
              setPreviewReference(res.data);
              setReference(res.data);
              setEditModus(false);
              for (let i = 0; i < newImages!.length; i++) {
                if (!reference) {
                  const formData = new FormData();
                  formData.append("title", "test");
                  console.log(newImages![i] instanceof File);
                  formData.append("image_file", newImages![i]);
                  formData.append("reference_image", res.data.id.toString());

                  const uploadImages = async () => {
                    await axios
                      .post("/references/images/", formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      })
                      .then((response) => {
                        if (response.status === 201) {
                          setPreviewReference({...res.data, preview_image: response.data.image_file});
                          const setPreviewImage = async () => {
                            await axios
                              .put(`/references/references/${res.data.id}/`, {
                                ...res.data,
                                preview_image: response.data.image_file,
                              })
                              .then((response) => {
                                if (response.status === 200) {
                                  setPreviewReference(response.data);
                                  navigate(`/reference/${res.data.id}`);
                        }
                              });
                          };
                          setPreviewImage();
                        }
                      })
                      .catch((error) => {
                        console.error("Error adding reference:", error);
                      })
                      .finally(() => {
                        setNewImages([]);
                      });
                  };

                  uploadImages();
                }
              }
            }
          });
      } else {
        axios
          .put(`/references/references/${reference?.id}/`, previewReference)
          .then(
            (res) => {
              if (res.status === 200) {
                setPreviewReference(res.data);
                setEditModus(false);
              }
            },
            (err) => {
              console.log(err);
            }
          );
      }
    }
  };

  const handleDeleteContentItem = (image: Image) => {
    console.log(reference);
    console.log(image);

    // are you sure popup

    axios.delete(`/references/images/${image?.id}/`).then((res) => {
      if (res.status === 204) {
        if (reference) {
          setReference({
            ...reference,
            image_contents: reference?.image_contents?.filter(
              (item) => item.id !== image.id
            ),
          });
        }
      }
    });
  };

  const handleMaximize = (reference: Image) => {
    setIsMaximized(true);
    setMaximizedContent(reference);
    console.log("maximize", reference);
  };

  const handleEditModus = () => {
    setEditModus(true);
  };

  const handleCancelReference = () => {
    if (id === "new") {
      window.history.back();
      return;
    }
    setPreviewReference(reference);
    setEditModus(false);
  };

  const handlePreviewReferenceItemChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.name, e.target.value);
    if (previewReference) {
      setPreviewReference({
        ...previewReference,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDelete = () => {
    axios.delete(`/references/references/${reference?.id}/`).then((res) => {
      if (res.status === 204) {
        navigate("/library");
      }
    });
  };

  return (
    <div className="pt-32 text-brandtext bg-brandgray-700 h-full ">
      {editModus ? (
        <div className=" absolute inset-0 mt-16 bg-brandprimary/40 h-min text-center font-bold text-lg justify-center">
          Edit Modus
          <button
            onClick={handleCancelReference}
            className="bg-gray-700 shadow shadow-brandgray-750 text-white m-2 p-1 px-8 rounded hover:bg-brandgray-700 active:bg-brandgray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveReference}
            className="bg-gray-700 shadow shadow-brandgray-750 text-white m-2 p-1 px-8 rounded hover:bg-brandgray-700 active:bg-brandgray-900"
          >
            Save
          </button>
        </div>
      ) : null}
      {/* maximized window popup */}
      {isMaximized ? (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70">
          <MaxImage
            content={MaximizedContent}
            onClose={onImageClose}
          ></MaxImage>
        </div>
      ) : (
        <div></div>
      )}
      <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
      {/* nav section */}
      <section className=" max-w-[1760px] px-8 mx-auto">
        <div className="flex felx-row justify-between">
          <div className="flex flex-row space-x-16">
            {/* back button with arrow */}
            <Link
              to="/library"
              className="flex items-center flex-row space-x-2 bg-brandprimary hover:bg-brandprimaryhover active:bg-brandprimaryactive text-brandtext font-bold py-1 px-4 rounded"
            >
              <ArrowLongLeftIcon className="h-6 w-6" />
              <p>Back</p>
            </Link>
            {/* breadcrumb */}
            <nav className="flex text-brandtext" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium hover:text-brandprimaryhover"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      to="../library"
                      className="ms-1 text-sm font-medium  hover:text-brandprimaryhover md:ms-2"
                    >
                      Library
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 ">
                      {reference?.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* next prev buttons */}
          <div className="inline-flex space-x-1">
            {/* <Link to="/" className="flex disabled flex-row space-x-2 bg-brandprimary hover:bg-brandprimaryhover active:bg-brandprimaryactive text-brandtext font-bold py-1 px-4 rounded-l">
              <ArrowLongLeftIcon className="h-6 w-6" />
              <p>Last</p>
            </Link>
            <Link to="/" className=" flex disabled flex-row space-x-2 bg-brandprimary hover:bg-brandprimaryhover active:bg-brandprimaryactive text-brandtext font-bold py-1 px-4 rounded-r">
              <p>Next</p>
              <ArrowLongRightIcon className="h-6 w-6" />
            </Link> */}
          </div>
        </div>
      </section>
      <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
      {/* content section */}
      <section className="max-w-[1760px] mx-auto mt-12  px-8 items-center">
        <div className="flex flex-row space-x-8">
          <div className="flex flex-col w-full">
            {editModus ? (
              <div>
                {/* error message */}
                {showValidationErrors &&
                newImages?.length === 0 &&
                previewReference?.image_contents?.length === 0 ? (
                  <p className="text-red-500">Please add atleast one Image</p>
                ) : null}
                <div className=" w-full rounded border-2 border-dashed border-brandgray-400 h-32 mb-4">
                  <button
                    onClick={() => setPopupDialogOpen(true)}
                    className="w-full h-full flex justify-center items-center rounded bg-brandgray-800 hover:bg-brandgray-700 active:bg-brandgray-900 text-brandtext font-bold"
                  >
                    Add New Reference Item
                  </button>
                </div>
                {/* show new images */}
                {newImages ? (
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(newImages).map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          className="rounded-md border border-slate-50/10 overflow-clip shadow-lg w-min h-min max-w-[265px] max-h-[288px] object-cover"
                        />
                      ))}
                    </div>
                    <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className=" justify-strech flex flex-wrap w-full gap-2">
              {/* embedd yt video */}
              {reference?.image_contents?.map((reference, index) => (
                // reference.isVideo ? (
                //   <div
                //     key={index}
                //     className="rounded-md border min-h-64 border-slate-50/10 overflow-clip shadow-lg w-full max-w-[512px] h-[288px]"
                //   >
                //     <EmbedYouTube src={reference.link}></EmbedYouTube>
                //   </div>
                // ) : (
                //   <Link to={`#${reference.id}`}>
                //     <img
                //       key={index}
                //       src={reference.link}
                //       className="rounded-md border border-slate-50/10 overflow-clip hover:scale-[101%] duration-100 cursor-pointer transition-transform ease-in-out  shadow-lg w-min h-min max-w-[512px] max-h-[288px] object-cover"
                //       onClick={() => {
                //         setIsMaximized(true);
                //       }}
                //     />
                //   </Link>
                // )
                <div className="w-full min-w-[265px] max-w-[512px] flex-1 relative overflow-clip hover:scale-[101%] duration-100 cursor-pointer transition-transform ease-in-out  shadow-lg h-min object-cover">
                  {/* delete cross */}
                  {editModus && (
                    // make image a thumbnail
                    <div className="flex flex-row ">
                      <button
                        onClick={() => handleThumbnailSet(reference)}
                        className="absolute top-2 left-2 px-4 bg-brandprimary text-white rounded p-1 hover:bg-brandprimaryhover focus:bg-brandprimaryfocus"
                      >
                        Make Thumbnail
                      </button>
                      <button
                        onClick={() => handleDeleteContentItem(reference)}
                        className="absolute top-2 right-2  bg-brandprimary text-white rounded-full p-1 hover:bg-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                  )}
                  <Link to={`#${reference.id}`} className="w-full">
                    <img
                      key={index}
                      src={reference.image_file}
                      className="rounded border w-full border-slate-50/10 "
                      onClick={() => {
                        handleMaximize(reference);
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/4">
            <div className="flex flex-col space-y-4">
              <div>
                {/* title and game name */}
                {editModus ? (
                  <div className="space-y-2">
                    {/* error message */}
                    {showValidationErrors && previewReference?.name === "" ? (
                      <p className="text-red-500">
                        Please fill out Reference Name
                      </p>
                    ) : null}
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => handlePreviewReferenceItemChange(e)}
                      placeholder="Reference Name"
                      className="w-full px-4 py-2 bg-brandgray-800 rounded border border-brandgray-500/10 focus:border-brandgray-500  focus:ring-brandgray-500"
                      value={reference?.name}
                    ></input>
                    <div className=" space-y-1">
                      {/* input search for games */}
                      {/* error message */}
                      {showValidationErrors && previewReference?.game === "" ? (
                        <p className="text-red-500">Please set Related Game</p>
                      ) : null}
                      <FilterInput
                        name="game"
                        apiEndpoint="references/games/"
                        key="game"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="uppercase">{reference?.name ?? "Error"}</h1>
                    <h2>{reference?.game ?? "Error"}</h2>
                  </div>
                )}
                <p>Reference Description</p>
              </div>
              {/* preview image */}
              {editModus && previewReference ? (
                <div className="flex flex-col">
                  <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
                  <h2>Preview Image</h2>
                  <img
                    src={previewReference?.preview_image ?? "Error"}
                    className="rounded border border-slate-50/10 w-full aspect-square object-cover"
                  />
                </div>
              ) : null}
              <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
              <div>
                <p>
                  Released: {formatReleaseDate(game?.release_date ?? "Error")}
                </p>
              </div>
              {/* tags */}
              <div className="flex flex-wrap gap-2">
                {game?.game_category.map((tag) => (
                  <Link
                    to="/library"
                    className="rounded border border-slate-50/10 min-w-16 text-center p-1 my-auto text-sm bg-brandprimary/40 hover:bg-brandprimaryhover active:bg-brandprimaryactive"
                  >
                    <p>{tag}</p>
                  </Link>
                ))}
              </div>
              <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
              <div>
                {user?.role === "admin" ? (
                  <div className="space-x-4 w-full flex flex-row h-10">
                    {/* show edit when not in edit modus */}
                    {editModus ? null : (
                      <button
                        onClick={() => handleEditModus()}
                        className="bg-brandprimary text-white p-2 px-8 rounded hover:bg-brandprimaryhover active:bg-brandprimaryactive"
                      >
                        Edit
                      </button>
                    )}

                    <Link
                      to={`/admin/references/${id}`}
                      className=" bg-yellow-600 text-white p-2 px-8 rounded hover:bg-brandprimaryhover active:bg-brandprimaryactive"
                    >
                      Admin
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white p-2 px-8 rounded hover:bg-red-600 active:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
      {/* add popupdialog */}
      <PopupDialog
        isOpen={PopupDialogOpen}
        onClose={() => setPopupDialogOpen(false)}
        onSave={() => {
          console.log("save");
        }}
      >
        <NewReferenceItemDialog
          images={(e) => handleNewImages(e)}
          game={game?.name ?? ""}
        />
      </PopupDialog>
    </div>
  );
};

export default ReferenceDetail;
