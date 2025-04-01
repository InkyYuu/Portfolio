const Explosion = ({ size = 200, color = "black" }) => {
  const strokeWidth = size / 50;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        {/* Lignes cardinales éloignées */}
        <line x1="100" y1="10" x2="100" y2="40" />
        <line x1="190" y1="100" x2="160" y2="100" />
        <line x1="100" y1="190" x2="100" y2="160" />
        <line x1="10" y1="100" x2="40" y2="100" />

        {/* Lignes diagonales éloignées */}
        <line x1="175" y1="25" x2="145" y2="55" />
        <line x1="175" y1="175" x2="145" y2="145" />
        <line x1="25" y1="175" x2="55" y2="145" />
        <line x1="25" y1="25" x2="55" y2="55" />
      </g>
    </svg>
  );
};

export default Explosion;
