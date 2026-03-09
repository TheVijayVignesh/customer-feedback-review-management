import { useState } from "react";
import type { Props, SentimentCount, SetSentimentType } from "./types";

const AnalysisDataFetch = ({
  name,
  setName,
  setSentimentArray,
}: Props & Pick<SetSentimentType, "setSentimentArray">) => {
  const [loading, setLoading] = useState<"analyze" | "download" | null>(null);

  const handleImport = async () => {
    if (!name?.trim()) {
      alert("Please enter a trainer name (or search term).");
      return;
    }
    try {
      setLoading("analyze");
      const response = await fetch("http://localhost:5000/api/analysis/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Fetching analysis failed");
        return;
      }

      const data: SentimentCount[] = await response.json();
      setSentimentArray(data);
    } catch (err) {
      console.error(err);
      alert("Network error while fetching analysis");
    } finally {
      setLoading(null);
    }
  };

  const handleExport = async () => {
    if (!name?.trim()) {
      alert("Please enter a trainer name before downloading.");
      return;
    }
    try {
      setLoading("download");
      const response = await fetch("http://localhost:5000/api/analysis/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Export failed");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${name}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Network error while downloading report");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <div className="shadow-xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <div className="pl-8 mt-3">
          <p className="text-xl font-semibold text-white">📄 Analysis Generator</p>

          <div className="mt-3 pr-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter trainer / search keyword"
              className="flex-1 py-3 px-3 border border-gray-300 rounded-xl bg-gray-300/40
                         text-black focus:bg-white focus:outline-none focus:ring-2 transition duration-200"
            />

            <div className="flex gap-3">
              <button
                onClick={handleImport}
                disabled={loading !== null}
                className={`px-4 py-3 rounded-xl text-white font-medium shadow-md transition duration-200
                            ${loading === "analyze" ? "bg-indigo-400 cursor-not-allowed"
                              : "bg-purple-700 hover:bg-indigo-500 active:scale-95"}`}
              >
                {loading === "analyze" ? "Loading…" : "Show analysis"}
              </button>

              <button
                onClick={handleExport}
                disabled={loading !== null}
                className={`px-4 py-3 rounded-xl text-white font-medium shadow-md transition duration-200
                            ${loading === "download" ? "bg-slate-400 cursor-not-allowed"
                              : "bg-emerald-600 hover:bg-emerald-500 active:scale-95"}`}
              >
                {loading === "download" ? "Downloading…" : "Download"}
              </button>
            </div>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default AnalysisDataFetch;
