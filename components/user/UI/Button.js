const Button = ({ className, children, onClick, ...props }) => {
  return (
    <button className={`py-3 px-4 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
