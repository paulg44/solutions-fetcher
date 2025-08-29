import { SyncArticles } from "../../core/api/sync-articles";
import { useState } from "react";
import SharedButton from "../../shared/button/button";

const ArticleUpdates = () => {
  const [status, setStatus] = useState<string>("Idle");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSyncArticles = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await SyncArticles();
      setStatus("Articles synchronized successfully.");
    } catch (error) {
      console.error("Error syncing articles:", error);
      setStatus("Error syncing articles. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h1>Update Articles</h1>
      <SharedButton labelKey="Sync Articles" onClick={handleSyncArticles} />
      {status && <p>{status}</p>}
    </div>
  );
};
export default ArticleUpdates;
