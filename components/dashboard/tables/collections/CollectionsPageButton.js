import { useRouter } from "next/navigation";

const CollectionsPageButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("collections/new")}
      className="DashbardProductPageButton"
    >
      New Collection
    </button>
  );
};

export default CollectionsPageButton;
