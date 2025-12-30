const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white/80 backdrop-blur-md rounded-2xl 
      shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
      border border-white/60 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
