import { ImSpinner9 } from "react-icons/im";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ImSpinner9 className="text-red-600 text-2xl animate-spin" />
    </div>
  );
}
