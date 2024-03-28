import { Link } from "react-router-dom";
import { useUser } from "../../UserContext";
import { GameInput } from "./GameInput";

interface GameInfoPanelProps {
  editModus: boolean;
  onEditModus: () => void;
  onDelete: () => void;
  onPreviewReferenceItemChange: (
    ref: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onGameChanged: (game: Game) => void;
  game?: Game;
  showValidationErrors: boolean;
  reference?: Reference;
  previewReference?: Reference;
}

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

export const GameInfoPanel = ({
  editModus,
  onEditModus,
  onDelete,
  onPreviewReferenceItemChange,
  onGameChanged,
  game,
  showValidationErrors,
  reference,
  previewReference,
}: GameInfoPanelProps) => {
  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { user } = useUser();

  return (
    <div className="w-1/4">
      <div className="flex flex-col space-y-4">
        <div>
          {/* title and game name */}
          {editModus ? (
            <div className="space-y-2">
              {/* error message */}
              {showValidationErrors && previewReference?.name === "" ? (
                <p className="text-red-500">Please fill out Reference Name</p>
              ) : null}
              <p className=" font-bold text-lg">Reference Name</p>
              <input
                type="text"
                name="name"
                onChange={(e) => onPreviewReferenceItemChange(e)}
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
                <GameInput
                  onChange={onGameChanged}
                  oldSelected={reference?.game}
                  key={"game"}
                />
              </div>
            </div>
          ) : (
            <div>
              <h1 className="uppercase">{previewReference?.name ?? "Error"}</h1>
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
          <p>Released: {formatReleaseDate(game?.release_date ?? "Error")}</p>
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
                  onClick={() => onEditModus()}
                  className="bg-brandprimary text-white p-2 px-8 rounded hover:bg-brandprimaryhover active:bg-brandprimaryactive"
                >
                  Edit
                </button>
              )}

              <Link
                to={`/admin/references/${reference?.id}`}
                className=" bg-yellow-600 text-white p-2 px-8 rounded hover:bg-brandprimaryhover active:bg-brandprimaryactive"
              >
                Admin
              </Link>
              <button
                onClick={onDelete}
                className="bg-red-500 text-white p-2 px-8 rounded hover:bg-red-600 active:bg-red-700"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
