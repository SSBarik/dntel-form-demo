import React, { useEffect } from "react";
import { useDntelForm } from "react-dntel-form";
import sampleSchema from "../input.json";

const App: React.FC = () => {
  const {
    FormComponent,
    editMode,
    setEditMode,
    changes,
    saveChanges,
    reset,
    clearLS,
    activeSection,
    scrollToSection,
    expandAll,
    collapseAll,
  } = useDntelForm(sampleSchema);

  const handleSave = () => {
    saveChanges();
    setEditMode(false);
    console.log("Saved changes:", changes);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem("dntel-editMode");
    if (stored === "true") setEditMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("dntel-editMode", editMode.toString());
  }, [editMode]);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 border-b bg-white sticky top-0 z-50">
        {/* Left: Title with Check Icon */}
        <div className="flex items-center gap-2 text-green-700 font-semibold text-lg">
          Dntel Form Demo
        </div>

        {/* Right: Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full border border-gray-300">
            Active:{" "}
            <span className="font-mono text-gray-900">
              {activeSection || "None"}
            </span>
          </span>
          {!editMode ? (
            <button
              className="px-4 py-1 border rounded text-xs hover:bg-gray-100 transition shadow-sm"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                className={`px-4 py-1 text-xs text-white rounded shadow-sm transition ${
                  Object.keys(changes).length === 0
                    ? "bg-green-600 opacity-50 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={handleSave}
                disabled={Object.keys(changes).length === 0}
              >
                Save
              </button>
              <button
                className="px-4 py-1 bg-gray-500 text-white shadow-sm text-xs rounded hover:bg-gray-600 transition"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}

          <button
            onClick={expandAll}
            className="px-4 py-1 border rounded text-xs shadow-sm hover:bg-gray-100 transition"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-1 border rounded text-xs shadow-sm hover:bg-gray-100 transition"
          >
            Collapse All
          </button>
          <button
            onClick={() => scrollToSection("InsuranceInformation")}
            className="px-4 py-1 border rounded text-xs shadow-sm hover:bg-gray-100 transition"
          >
            Scroll to Section 3
          </button>
          <button
            onClick={reset}
            disabled={Object.keys(changes).length === 0}
            className={`px-4 py-1 text-xs rounded shadow-sm text-white ${
              Object.keys(changes).length === 0
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Reset
          </button>
          <button
            onClick={clearLS}
            className="px-4 py-1 bg-yellow-500 shadow-sm text-white text-xs rounded hover:bg-yellow-600 transition"
          >
            Clear LS
          </button>
        </div>
      </div>

      <div>
        <FormComponent />
      </div>
    </>
  );
};

export default App;
