type HeaderProps = {
  name?: string
}

function Header({name=""}: HeaderProps) {
  return (
    <header className="h-17.5 bg-neutral-300 flex justify-end items-center p-4">
      <div className="font-bold text-lg text-blue-700">{name}</div>
    </header>
  );
}

export default Header;