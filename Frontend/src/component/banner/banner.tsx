type BannerStatus = "success" | "error";

type BannerProps = {
  status: BannerStatus | null;
  message: string | undefined;
  clearStatus: () => void;
}

function Banner({ status, message, clearStatus }: BannerProps) {
  if (!status) return null;

  const styles =
    status === "success"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  
      console.log("hejsan");

  return (
    <div className={`absolute w-full p-3 mb-4 rounded text-sm ${styles}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={clearStatus} className="font-bold">×</button>
      </div>
    </div>
  );
}

export default Banner;
