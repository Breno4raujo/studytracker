type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-lg bg-blue-500 text-white"
    >
      {children}
    </button>
  );
}