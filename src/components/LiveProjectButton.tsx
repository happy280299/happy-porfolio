import { Link } from "react-router-dom";

interface LinkProps {
  href: string;
}
const LiveProjectButton = ({ href }: LinkProps) => {
  return (
    <Link
      to={href}
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-200 hover:bg-[#D7E2EA]/10 whitespace-nowrap"
      target="_blank"
      rel={"noopener"}
    >
      Live Project
    </Link>
  );
};

export default LiveProjectButton;
