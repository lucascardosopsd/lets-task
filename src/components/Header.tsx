const Header = () => {
  return (
    <>
      <nav className="hidden tablet:flex justify-end py-2 px-2 border-b border-zinc-800">
        <button className="btn btn-primary-outline h-10">
          <span className="text-2xl">+</span> Nova
        </button>
      </nav>
      <button className="flex tablet:hidden items-center justify-center absolute bottom-2 right-2 w-10 h-10 text-xl rounded-full border border-green-500 text-green-500 bg-zinc-800">
        +
      </button>
    </>
  );
};

export default Header;
