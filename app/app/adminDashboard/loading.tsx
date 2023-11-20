import { Spinner } from "@/ui/index";

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-black/10 flex justify-center items-center">
      <Spinner className="h-48 w-48 text-gray-500/50" />
    </div>
  );
}
