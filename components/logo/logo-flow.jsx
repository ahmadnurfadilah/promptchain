function LogoFLow({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className ?? "w-5 h-5"}`}
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        fill="#00EF8B"
        d="M20.833 41.833c11.506 0 20.834-9.327 20.834-20.833C41.667 9.494 32.339.167 20.833.167S0 9.494 0 21c0 11.506 9.327 20.833 20.833 20.833z"
      ></path>
      <path fill="#fff" d="M29.973 17.742H24.09v5.883h5.883v-5.883z"></path>
      <path
        fill="#fff"
        d="M18.214 25.83a2.208 2.208 0 11-2.208-2.21h2.208v-5.878h-2.208a8.087 8.087 0 108.087 8.087v-2.208h-5.88v2.208zM26.298 14.8h6.617V8.917h-6.617a8.096 8.096 0 00-8.087 8.087v.738h5.88v-.738a2.209 2.209 0 012.207-2.204z"
      ></path>
      <path fill="#00EF8B" d="M18.21 23.62h5.88v-5.878h-5.88v5.879z"></path>
    </svg>
  );
}

export default LogoFLow;
