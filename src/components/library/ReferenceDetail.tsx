import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";
import MaxImage from "./MaxImage";
import { useEffect, useState } from "react";
import axios from "../../AxiosInterceptors";
import PopupDialog from "../PopupDialog";
import { NewReferenceItemDialog } from "./NewReferenceItemDialog";
import Breadcrumb from "../Breadcrumb";
import EditBanner from "../EditBanner";
import ReferenceImage from "../ReferenceImage";
import { GameInfoPanel } from "./GameInfoPanel";

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
        game: "",
        image_contents: [],
        preview_image: "",
      });

      return;
    }
    fetchReference();
  }, [id]);

  const fetchReference = async () => {
    await axios.get(`/references/references/${id}/`).then((res) => {
      setReference(res.data);
      setPreviewReference(res.data);
      console.log(res.data);
      axios.get(`/references/games/${res.data.game}/`).then((res) => {
        setGame(res.data);
      });
    });
  };

  const handleNewImages = (dialogimages: FileList) => {
    setPopupDialogOpen(false);

    const img = Array.from(dialogimages);
    // add to new images
    setNewImages((prevImages) => [...prevImages, ...img]);
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
    if (
      newImages?.length === 0 &&
      previewReference?.image_contents.length === 0
    ) {
      setShowValidationErrors(true);
      console.log("images");
      return false;
    }
    if (reference.game === "") {
      setShowValidationErrors(true);
      console.log("game");
      return false;
    }
    // if (reference.preview_image.length === 0){
    //   setShowValidationErrors(true);
    //   console.log("preview");
    //   return false;
    // }
    return true;
  };

  const uploadImages = (images: File[], reference: Reference) => {
    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      const formData = new FormData();
      formData.append("title", "test");
      formData.append("image_file", images[i]);
      formData.append("reference_image", reference?.id.toString());

      axios
        .post("/references/images/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setPreviewReference({
            ...reference,
            preview_image: response.data.image_file,
          });
          const setPreviewImage = async () => {
            await axios
              .put(`/references/references/${reference.id}/`, {
                ...reference,
                preview_image: response.data.image_file,
              })
              .then((response) => {
                if (response.status === 200) {
                  setPreviewReference(response.data);
                }
              });
          };
          setPreviewImage();
        })
        .catch((error) => {
          console.error("Error adding reference:", error);
        });
    }
  };

  const handleSaveReference = async () => {
    if (previewReference && validateReference(previewReference)) {
      if (id === "new") {
        await axios
          .post(`/references/references/`, previewReference)
          .then(async (res) => {
            if (res.status === 201) {
              setPreviewReference(res.data);
              setReference(res.data);
              setEditModus(false);

              // Upload images
              await uploadImages(newImages, res.data);

              setNewImages([]);
              console.log("navigate", res.data);
              navigate(`/reference/${res.data.id}`);
            }
          });
      } else {
        axios
          .put(`/references/references/${reference?.id}/`, previewReference)
          .then(async (res) => {
            if (res.status === 200) {
              // Upload images
              await uploadImages(newImages, res.data);

              setPreviewReference(res.data);
              setReference(res.data);
              setEditModus(false);
              setNewImages([]);
              fetchReference();
            }
          })
          .catch((err) => {
            console.log(err);
          });
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

  const handleGameChanged = (game: Game) => {
    console.log(game);
    if (previewReference) {
      setPreviewReference({
        ...previewReference,
        game: game.name,
      });
    }
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
    <div className="pt-32 text-brandtext bg-brandgray-700 ">
      {editModus ? (
        <EditBanner
          onSave={handleSaveReference}
          onCancel={handleCancelReference}
        />
      ) : null}
      {/* maximized window popup */}
      {isMaximized ? (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70">
          <MaxImage content={MaximizedContent} onClose={onImageClose} />
        </div>
      ) : null}
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
            <Breadcrumb lastName={reference?.name}></Breadcrumb>
          </div>
        </div>
      </section>
      <hr className="my-4 border-slate-50/20 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
      {/* content section */}
      <section className="max-w-[1760px] mx-auto mt-12  px-8 items-center">
        <div className="flex flex-row space-x-8 ">
          <div className="flex flex-col w-full  pr-4">
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
                <ReferenceImage
                  reference={reference}
                  onDeleteItem={handleDeleteContentItem}
                  onMaximize={handleMaximize}
                  onThumbnailSet={handleThumbnailSet}
                  editModus={editModus}
                  id={index}
                />
              ))}
            </div>
          </div>

          <GameInfoPanel
            editModus={editModus}
            onEditModus={handleEditModus}
            onDelete={handleDelete}
            onGameChanged={handleGameChanged}
            onPreviewReferenceItemChange={handlePreviewReferenceItemChange}
            game={game}
            showValidationErrors={showValidationErrors}
            reference={reference}
            previewReference={previewReference}
          />
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
