interface EmbedYouTubeProps {
  src: string;
}

const EmbedYouTube = ({ src }: EmbedYouTubeProps) => {
  return (
    <div className="w-full h-full">
      <iframe
        className="w-full h-full"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default EmbedYouTube;
