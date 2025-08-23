// import addArticle from "../../core/api/testUpload";
import SharedButton from "../../shared/button/button";
import { firestore } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const HomeDashboard = () => {
  const handleAddSolution = async () => {
    // await addArticle({
    //   id: "article1",
    //   title: "How to reset your password",
    //   content: "Navigate to settings...",
    //   category: "Account",
    //   tags: ["password", "reset", "account"],
    //   authorId: "user123",
    // });

    // console.log("Article added");
    try {
      const testCollection = collection(firestore, "test");
      addDoc(testCollection, { hello: "world" });
      console.log("✅ Firestore is working");
    } catch (error) {
      console.error("❌ Firestore error:", error);
    }
  };

  console.log(
    "Running in:",
    typeof window === "undefined" ? "server" : "browser"
  );

  return (
    <div className="home-dashboard">
      <h1>Welcome to the Home Dashboard</h1>
      {/* Additional components and content can be added here */}
      <SharedButton
        labelKey="Add Solution Article"
        onClick={handleAddSolution}
      />
    </div>
  );
};

export default HomeDashboard;
